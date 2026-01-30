# 🔗 Nodo 1: Tally Form Webhook

## 📋 Información General

| Propiedad | Valor |
|-----------|-------|
| **Tipo de Nodo** | Webhook (Trigger) |
| **Nombre** | Tally Form Webhook |
| **Propósito** | Recibir datos del formulario Tally cuando un usuario lo completa |
| **Posición** | Inicio del workflow (nodo trigger) |

---

## 🎯 ¿Qué hace este nodo?

Este es el **punto de entrada** del workflow. Actúa como un "receptor" que espera peticiones HTTP POST desde el formulario de Tally. Cuando alguien completa el formulario:

1. Tally envía automáticamente los datos a esta URL
2. El webhook captura los datos
3. El workflow se ejecuta automáticamente
4. Los datos fluyen al siguiente nodo

---

## ⚙️ Configuración

### HTTP Method
```
POST
```

### Path
```
tally-form-submission
```

### Authentication
```
None (No se requiere autenticación)
```

💡 **Por qué no hay autenticación:** Para este caso de uso educativo, mantenemos el webhook abierto. En producción, podrías agregar un token secreto en los headers.

---

## 🔗 URL del Webhook

Una vez que el workflow esté activo, n8n generará automáticamente dos URLs:

### URL de Prueba (Test)
```
https://[tu-instancia].app.n8n.cloud/webhook-test/tally-form-submission
```

⚠️ **Importante:** Esta URL solo funciona cuando estás probando manualmente en n8n. **NO la uses en Tally.**

### URL de Producción
```
https://[tu-instancia].app.n8n.cloud/webhook/tally-form-submission
```

✅ **Usa esta URL en Tally:** Esta es la URL que debes configurar en las integraciones de Tally.

---

## 📥 Estructura de Datos Recibida

Cuando Tally envía datos, el webhook recibe un JSON con esta estructura:

```json
{
  "eventId": "evt_abc123xyz789",
  "eventType": "FORM_RESPONSE",
  "createdAt": "2025-01-30T14:30:00.000Z",
  "data": {
    "responseId": "resp_123",
    "submissionId": "sub_456",
    "respondentId": "user_789",
    "formId": "form_abc",
    "formName": "Captación de Leads - AI Automation",
    "createdAt": "2025-01-30T14:30:00.000Z",
    "fields": [
      {
        "key": "question_1",
        "label": "¿Cuál es tu nombre completo?",
        "type": "INPUT_TEXT",
        "value": "María González"
      },
      {
        "key": "question_2",
        "label": "¿Cuál es tu email de trabajo?",
        "type": "INPUT_EMAIL",
        "value": "maria@empresa.com"
      },
      {
        "key": "question_3",
        "label": "¿En qué empresa trabajas?",
        "type": "INPUT_TEXT",
        "value": "TechCorp"
      },
      {
        "key": "question_4",
        "label": "¿Cuál es el sitio web de tu empresa?",
        "type": "INPUT_URL",
        "value": "https://www.techcorp.com"
      },
      {
        "key": "question_5",
        "label": "¿Cuál es tu cargo?",
        "type": "INPUT_TEXT",
        "value": "Head of Marketing"
      },
      {
        "key": "question_6",
        "label": "¿Hay algo más que quieras compartir?",
        "type": "TEXTAREA",
        "value": "Interesados en IA"
      }
    ]
  }
}
```

---

## 🔑 Campos Clave

### Metadata del Evento
- **eventId**: ID único del evento (generado por Tally)
- **eventType**: Siempre será "FORM_RESPONSE"
- **createdAt**: Timestamp de cuándo se envió el formulario

### Data del Formulario
- **responseId**: ID único de esta respuesta
- **submissionId**: ID de envío
- **formId**: ID del formulario en Tally
- **formName**: Nombre del formulario

### Fields (Array de campos)
Cada objeto en el array contiene:
- **key**: Identificador interno (question_1, question_2, etc.)
- **label**: Texto de la pregunta tal como aparece en el formulario
- **type**: Tipo de input (INPUT_TEXT, INPUT_EMAIL, INPUT_URL, TEXTAREA)
- **value**: El valor que ingresó el usuario

---

## 📤 Salida del Nodo

Este nodo simplemente pasa todos los datos recibidos al siguiente nodo sin transformación:

```javascript
// Output exactamente igual al input
{
  eventId: "evt_abc123xyz789",
  eventType: "FORM_RESPONSE",
  createdAt: "2025-01-30T14:30:00.000Z",
  data: { ... }
}
```

---

## 🔗 Cómo Acceder a los Datos en Nodos Siguientes

En cualquier nodo después del webhook, puedes acceder a los datos usando expresiones de n8n:

### Acceso por índice del array
```javascript
// Nombre completo (primer campo)
{{ $json.data.fields[0].value }}

// Email (segundo campo)
{{ $json.data.fields[1].value }}

// Empresa (tercer campo)
{{ $json.data.fields[2].value }}

// Sitio web (cuarto campo)
{{ $json.data.fields[3].value }}

// Cargo (quinto campo)
{{ $json.data.fields[4].value }}

// Mensaje (sexto campo)
{{ $json.data.fields[5].value }}
```

### Acceso por búsqueda de label (más robusto)
```javascript
// Buscar por parte del label
{{ $json.data.fields.find(f => f.label.includes('nombre')).value }}

{{ $json.data.fields.find(f => f.label.includes('email')).value }}

{{ $json.data.fields.find(f => f.label.includes('empresa')).value }}

{{ $json.data.fields.find(f => f.label.includes('sitio web')).value }}

{{ $json.data.fields.find(f => f.label.includes('cargo')).value }}

{{ $json.data.fields.find(f => f.label.includes('compartir')).value }}
```

💡 **Recomendación:** Usar búsqueda por label es más robusto porque funciona incluso si cambias el orden de las preguntas en Tally.

---

## 🧪 Cómo Probar el Nodo

### Opción 1: Manual Testing en n8n

1. Abre el workflow en n8n
2. Haz clic en el nodo "Tally Form Webhook"
3. Haz clic en **"Listen for Test Event"**
4. n8n mostrará "Waiting for webhook call..."
5. Envía el formulario en Tally (o usa el script test-webhook.js)
6. Los datos aparecerán en n8n

### Opción 2: Usando el Script de Prueba

```bash
# Desde la carpeta del proyecto
cd scripts
node test-webhook.js https://tu-instancia.app.n8n.cloud/webhook-test/tally-form-submission
```

### Opción 3: Test con cURL

```bash
curl -X POST https://tu-instancia.app.n8n.cloud/webhook-test/tally-form-submission \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "test_123",
    "eventType": "FORM_RESPONSE",
    "createdAt": "2025-01-30T12:00:00.000Z",
    "data": {
      "formName": "Test Form",
      "fields": [
        {"key": "q1", "label": "Nombre", "value": "Test User"},
        {"key": "q2", "label": "Email", "value": "test@example.com"},
        {"key": "q3", "label": "Empresa", "value": "Test Corp"},
        {"key": "q4", "label": "Sitio web", "value": "https://test.com"},
        {"key": "q5", "label": "Cargo", "value": "Tester"},
        {"key": "q6", "label": "Mensaje", "value": "Test message"}
      ]
    }
  }'
```

---

## 🐛 Problemas Comunes

### ❌ "No executions appear in n8n"

**Causa:** El workflow no está activo.

**Solución:**
```
1. Ve al workflow en n8n
2. Haz clic en el switch "Active" (arriba a la derecha)
3. Verifica que esté en verde
```

---

### ❌ "Tally sends data but n8n doesn't receive it"

**Causa:** URL del webhook incorrecta en Tally.

**Solución:**
```
1. En n8n, copia la URL de PRODUCCIÓN (no la de test)
2. En Tally → Integrations → Webhooks
3. Pega la URL correcta
4. Asegúrate de que el método sea POST
```

---

### ❌ "Webhook receives data but fields are empty"

**Causa:** Tally cambió la estructura de datos o los campos del formulario cambiaron.

**Solución:**
```
1. Ve a Executions en n8n
2. Abre la última ejecución
3. Inspecciona el JSON recibido
4. Verifica la estructura actual
5. Ajusta las expresiones en los nodos siguientes
```

---

## 📊 Métricas y Monitoreo

### ¿Cómo saber si el webhook está funcionando?

1. **Execution History:**
   - Ve a n8n → Executions
   - Deberías ver una nueva ejecución cada vez que se envía el formulario

2. **Webhook Logs:**
   - Haz clic en una ejecución
   - Ve al nodo "Tally Form Webhook"
   - Revisa el "Output" para ver los datos recibidos

3. **Tally Webhook Logs:**
   - Tally también guarda logs de webhooks enviados
   - Ve a tu formulario → Integrations → Webhooks → View logs

---

## ⚡ Optimizaciones

### Rate Limiting (opcional)

Si esperas mucho tráfico, considera agregar rate limiting:

```bash
# En n8n Cloud, no hay rate limiting nativo en webhooks
# Pero puedes agregar un nodo Code después del webhook:

const executions = $execution.history || [];
const lastMinuteExecs = executions.filter(e =>
  new Date(e.startedAt) > new Date(Date.now() - 60000)
);

if (lastMinuteExecs.length > 10) {
  throw new Error('Rate limit exceeded: max 10 submissions per minute');
}

return $input.all();
```

### Validación de Datos (opcional)

Agrega un nodo Code después del webhook para validar datos:

```javascript
const fields = $json.data.fields;

// Validar que todos los campos requeridos existan
const requiredFields = ['nombre', 'email', 'empresa', 'sitio web', 'cargo'];

for (const required of requiredFields) {
  const field = fields.find(f => f.label.toLowerCase().includes(required));
  if (!field || !field.value) {
    throw new Error(`Campo requerido faltante: ${required}`);
  }
}

// Validar formato de email
const emailField = fields.find(f => f.label.includes('email'));
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(emailField.value)) {
  throw new Error('Email inválido');
}

// Validar formato de URL
const urlField = fields.find(f => f.label.includes('sitio web'));
try {
  new URL(urlField.value);
} catch (e) {
  throw new Error('URL inválida');
}

// Si todo está bien, pasar los datos
return $input.all();
```

---

## 🎓 Conceptos Clave

### ¿Qué es un Webhook?

Un webhook es como un "timbre" en tu sistema. Cuando alguien lo activa (presiona el botón), tu sistema recibe una notificación y puede responder automáticamente.

**En este caso:**
- El "timbre" es la URL del webhook
- El "botón" es el envío del formulario en Tally
- La "respuesta" es la ejecución de todo el workflow

### ¿Por qué usar Webhooks vs Polling?

**Webhook (lo que usamos):**
- ✅ Inmediato: Se ejecuta al instante cuando se envía el formulario
- ✅ Eficiente: No consume recursos cuando no hay actividad
- ✅ Escalable: Puede manejar miles de envíos

**Polling (alternativa):**
- ❌ Lento: Revisa cada X minutos si hay nuevos datos
- ❌ Ineficiente: Consume recursos incluso sin actividad
- ❌ Limitado: n8n Cloud tiene límites en polling

---

## 📚 Recursos Adicionales

- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Tally Webhooks Guide](https://tally.so/help/webhooks)
- [HTTP Methods Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

---

## ✅ Checklist de Configuración

Antes de continuar al siguiente nodo, verifica:

- [ ] El webhook está configurado en el workflow
- [ ] El path es: `tally-form-submission`
- [ ] El método es: `POST`
- [ ] Has copiado la URL de producción (no la de test)
- [ ] La URL está configurada en Tally
- [ ] El webhook está configurado para "On form submit"
- [ ] Has probado el webhook con datos de prueba
- [ ] Los datos aparecen correctamente en n8n Executions
- [ ] Puedes acceder a los campos usando las expresiones

---

**¡Nodo configurado! 🎉 Continúa con el Nodo 2: Workflow Configuration**

👉 [`02-SET.md`](02-SET.md)
