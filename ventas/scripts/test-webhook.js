/**
 * Script de prueba para el webhook de n8n
 *
 * Este script envía datos de prueba al webhook simulando un envío de formulario Tally.
 * Útil para probar el workflow sin tener que completar el formulario manualmente cada vez.
 *
 * Uso:
 *   node test-webhook.js
 *
 * O con URL personalizada:
 *   node test-webhook.js https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission
 */

const https = require('https');

// Configuración
const WEBHOOK_URL = process.argv[2] || 'https://YOUR_N8N_INSTANCE.app.n8n.cloud/webhook/tally-form-submission';

// Datos de prueba (simula el payload de Tally)
const testData = {
  eventId: `test_${Date.now()}`,
  eventType: "FORM_RESPONSE",
  createdAt: new Date().toISOString(),
  data: {
    responseId: `resp_test_${Date.now()}`,
    submissionId: `sub_test_${Date.now()}`,
    respondentId: "user_test_123",
    formId: "form_sales_automation_test",
    formName: "Captación de Leads - AI Automation",
    createdAt: new Date().toISOString(),
    fields: [
      {
        key: "question_1",
        label: "¿Cuál es tu nombre completo?",
        type: "INPUT_TEXT",
        value: "Test User"
      },
      {
        key: "question_2",
        label: "¿Cuál es tu email de trabajo?",
        type: "INPUT_EMAIL",
        value: "test.user@example-company.com"
      },
      {
        key: "question_3",
        label: "¿En qué empresa trabajas?",
        type: "INPUT_TEXT",
        value: "Example Company Inc"
      },
      {
        key: "question_4",
        label: "¿Cuál es el sitio web de tu empresa?",
        type: "INPUT_URL",
        value: "https://www.example-company.com"
      },
      {
        key: "question_5",
        label: "¿Cuál es tu cargo?",
        type: "INPUT_TEXT",
        value: "Product Manager"
      },
      {
        key: "question_6",
        label: "¿Hay algo más que quieras compartir?",
        type: "TEXTAREA",
        value: "Estoy probando el workflow de automatización. Este es un envío de prueba para verificar que todos los nodos funcionan correctamente."
      }
    ]
  }
};

// Función para enviar el request
function sendWebhookRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Tally-Webhook-Test-Script/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseBody
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Ejecutar el test
console.log('🚀 Enviando datos de prueba al webhook...');
console.log(`📡 URL: ${WEBHOOK_URL}`);
console.log('\n📦 Payload:');
console.log(JSON.stringify(testData, null, 2));
console.log('\n⏳ Esperando respuesta...\n');

sendWebhookRequest(WEBHOOK_URL, testData)
  .then(response => {
    console.log('✅ Respuesta recibida:');
    console.log(`   Status: ${response.statusCode}`);
    console.log(`   Body: ${response.body || '(vacío)'}`);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('\n🎉 ¡Webhook ejecutado exitosamente!');
      console.log('   Ve a n8n → Executions para ver los detalles de la ejecución.');
    } else {
      console.log('\n⚠️  El webhook respondió pero con un código de error.');
      console.log('   Verifica la configuración en n8n.');
    }
  })
  .catch(error => {
    console.error('❌ Error al enviar el webhook:');
    console.error(`   ${error.message}`);
    console.log('\n🔍 Posibles causas:');
    console.log('   - La URL del webhook es incorrecta');
    console.log('   - El workflow no está activo en n8n');
    console.log('   - Problemas de red o conectividad');
    console.log('\n💡 Solución:');
    console.log('   1. Verifica la URL del webhook en n8n');
    console.log('   2. Asegúrate de que el workflow esté activado');
    console.log('   3. Ejecuta: node test-webhook.js https://tu-url-correcta');
  });

// Ejemplos adicionales de payloads para diferentes casos de prueba
const additionalTestCases = {
  // Caso 1: Empresa con sitio web sin https://
  missingProtocol: {
    ...testData,
    data: {
      ...testData.data,
      fields: [
        ...testData.data.fields.slice(0, 3),
        {
          key: "question_4",
          label: "¿Cuál es el sitio web de tu empresa?",
          type: "INPUT_URL",
          value: "www.example.com"  // Sin protocolo
        },
        ...testData.data.fields.slice(4)
      ]
    }
  },

  // Caso 2: Campo de mensaje vacío (opcional)
  emptyMessage: {
    ...testData,
    data: {
      ...testData.data,
      fields: [
        ...testData.data.fields.slice(0, 5),
        {
          key: "question_6",
          label: "¿Hay algo más que quieras compartir?",
          type: "TEXTAREA",
          value: ""  // Mensaje vacío
        }
      ]
    }
  },

  // Caso 3: Empresa con dominio complejo
  complexDomain: {
    ...testData,
    data: {
      ...testData.data,
      fields: [
        ...testData.data.fields.slice(0, 3),
        {
          key: "question_4",
          label: "¿Cuál es el sitio web de tu empresa?",
          type: "INPUT_URL",
          value: "https://www.subdomain.example-company.co.uk/path?query=param"  // URL compleja
        },
        ...testData.data.fields.slice(4)
      ]
    }
  }
};

// Para ejecutar casos de prueba adicionales, descomenta:
/*
console.log('\n\n🧪 Casos de prueba adicionales disponibles:');
console.log('1. missingProtocol - Prueba con URL sin https://');
console.log('2. emptyMessage - Prueba con mensaje opcional vacío');
console.log('3. complexDomain - Prueba con URL compleja');
console.log('\nPara ejecutar un caso específico, modifica el script.');
*/
