#!/usr/bin/env node

/**
 * Test Webhook Script para Marketing Content Factory
 * 
 * Uso:
 *   node test-webhook.js <URL_DEL_ARTICULO> <TITULO_DEL_ARTICULO>
 * 
 * Ejemplo:
 *   node test-webhook.js "https://techcrunch.com/ai-article" "The Future of AI"
 */

const https = require('https');
const http = require('http');

// ========================================
// CONFIGURACIÓN
// ========================================
const WEBHOOK_URL = 'https://YOUR_INSTANCE.app.n8n.cloud/webhook/marketing-magic';
const USER_NAME = 'Test User';

// ========================================
// ARGUMENTOS DE LÍNEA DE COMANDOS
// ========================================
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Error: Faltan argumentos\n');
  console.log('Uso:');
  console.log('  node test-webhook.js <URL> <TITULO>\n');
  console.log('Ejemplo:');
  console.log('  node test-webhook.js "https://techcrunch.com/ai" "The Future of AI"\n');
  process.exit(1);
}

const [articleUrl, articleTitle] = args;

// ========================================
// PAYLOAD
// ========================================
const payload = {
  url: articleUrl,
  title: articleTitle,
  user: USER_NAME
};

// ========================================
// PARSEAR URL
// ========================================
const url = new URL(WEBHOOK_URL);
const isHttps = url.protocol === 'https:';
const httpModule = isHttps ? https : http;

const options = {
  hostname: url.hostname,
  port: url.port || (isHttps ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(payload))
  }
};

// ========================================
// REALIZAR REQUEST
// ========================================
console.log('🚀 Enviando contenido a Content Factory...\n');
console.log('URL:', articleUrl);
console.log('Título:', articleTitle);
console.log('Usuario:', USER_NAME);
console.log('Webhook:', WEBHOOK_URL);
console.log('\nPayload:');
console.log(JSON.stringify(payload, null, 2));
console.log('\n⏳ Esperando respuesta...\n');

const req = httpModule.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📊 Status Code:', res.statusCode);
    console.log('📋 Headers:');
    console.log(JSON.stringify(res.headers, null, 2));
    
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('\n✅ ¡Éxito! Contenido enviado correctamente.');
      console.log('\n💡 Revisa Notion en 10-15 segundos para ver el resultado.');
    } else {
      console.log('\n⚠️ Warning: Status code inesperado:', res.statusCode);
      console.log('Respuesta:', data);
    }
    
    if (data) {
      console.log('\n📄 Response Body:');
      try {
        console.log(JSON.stringify(JSON.parse(data), null, 2));
      } catch (e) {
        console.log(data);
      }
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error al enviar request:');
  console.error(error.message);
  console.error('\n💡 Verifica que:');
  console.error('  1. La URL del webhook sea correcta');
  console.error('  2. El workflow esté activo en n8n');
  console.error('  3. Tengas conexión a internet');
  process.exit(1);
});

req.write(JSON.stringify(payload));
req.end();
