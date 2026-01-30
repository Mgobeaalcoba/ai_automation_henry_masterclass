# 🐛 Troubleshooting - Problemas Comunes y Soluciones

Esta guía cubre los problemas más comunes que puedes encontrar al configurar y ejecutar el workflow de automatización de ventas con IA.

---

## 📑 Índice

1. [Problemas con el Webhook](#problemas-con-el-webhook)
2. [Errores de Serper API](#errores-de-serper-api)
3. [Errores de OpenRouter / IA](#errores-de-openrouter--ia)
4. [Errores de HubSpot](#errores-de-hubspot)
5. [Problemas de Extracción de Dominio](#problemas-de-extracción-de-dominio)
6. [Errores de Parsing JSON](#errores-de-parsing-json)
7. [Problemas de Rendimiento](#problemas-de-rendimiento)

---

## 1. Problemas con el Webhook

### ❌ Error: "Webhook no recibe datos"

**Síntomas:**
- Envías el formulario en Tally pero no aparece ninguna ejecución en n8n
- El workflow está activo pero no se dispara

**Causas posibles:**
1. El workflow no está activado
2. URL del webhook incorrecta en Tally
3. El formulario no está publicado

**Soluciones:**

```bash
✅ Verificar estado del workflow:
1. Abre n8n
2. Ve a tu workflow
3. Verifica que el switch "Active" esté en verde
4. Si está en gris, haz clic para activarlo
```

```bash
✅ Verificar URL del webhook:
1. En n8n, abre el nodo "Tally Form Webhook"
2. Copia la Production URL (NO la Test URL)
3. Formato correcto: https://[tu-instancia].app.n8n.cloud/webhook/tally-form-submission
4. En Tally → Integrations → Webhooks → Pega la URL
5. Asegúrate de usar POST method
```

```bash
✅ Verificar publicación del formulario:
1. En Tally, ve a tu formulario
2. Haz clic en "Publish"
3. Confirma que el formulario esté publicado (no en modo draft)
```

---

### ❌ Error: "Webhook recibe datos pero falla inmediatamente"

**Síntomas:**
- La ejecución aparece en n8n pero falla en el primer nodo
- Error: "Invalid input data"

**Causa:**
- Estructura de datos de Tally no coincide con lo esperado

**Solución:**

```javascript
✅ Verificar estructura de datos:
1. Abre la ejecución fallida en n8n
2. Ve al nodo "Tally Form Webhook"
3. Inspecciona el JSON recibido
4. Compara con la estructura esperada en examples/sample-form-submission.json
5. Ajusta las expresiones en los nodos siguientes si es necesario
```

---

## 2. Errores de Serper API

### ❌ Error: "API Key not found"

**Síntomas:**
- El nodo "Search Company News" falla
- Error: "Authentication failed"

**Solución:**

```bash
✅ Configurar API Key:
1. Abre el nodo "Workflow Configuration (Set)"
2. Verifica que el campo "serperApiKey" tenga tu API key
3. La API key debe tener este formato: [64 caracteres alfanuméricos]
4. Si no la tienes, ve a https://serper.dev y copia tu API key
```

---

### ❌ Error: "402 Payment Required"

**Síntomas:**
- Mensaje: "You have exceeded your credit limit"
- El nodo de Serper falla con código 402

**Causa:**
- Has agotado tus 2,500 créditos gratuitos de Serper

**Soluciones:**

```bash
⚠️ Opciones:
1. TEMPORAL: Comentar/desactivar el nodo de Serper y trabajar sin búsquedas
2. ALTERNATIVA: Usar una API de búsqueda diferente (Google Custom Search)
3. PAID: Contratar plan de Serper ($50/mes por 5,000 búsquedas)
```

Para trabajar sin Serper temporalmente:

```javascript
// En el nodo "Generate Personalized Email"
// Modifica el system message para no esperar datos de noticias:

"Genera un email personalizado basado únicamente en la información del lead.
NO tienes información de noticias disponible.
Usa el contexto general de la empresa basándote en su sitio web y cargo del contacto."
```

---

### ❌ Error: "No results found"

**Síntomas:**
- Serper responde exitosamente pero con resultados vacíos
- El array de noticias está vacío: `{ "news": [] }`

**Causas:**
- El dominio de la empresa es muy nuevo o no tiene presencia online
- El dominio extraído es incorrecto

**Solución:**

```javascript
✅ Agregar fallback en el workflow:
1. Después del nodo "Search Company News", agrega un nodo "IF"
2. Condición: {{ $json.news.length > 0 }}
3. Ruta TRUE: Continúa con AI Agent normal
4. Ruta FALSE: AI Agent con prompt alternativo (sin noticias)
```

---

## 3. Errores de OpenRouter / IA

### ❌ Error: "Invalid API Key"

**Síntomas:**
- El nodo "Generate Personalized Email" falla
- Mensaje: "401 Unauthorized"

**Solución:**

```bash
✅ Configurar credenciales de OpenRouter:
1. En n8n, ve a Credentials (menú lateral)
2. Busca "OpenRouter"
3. Si no existe, créala:
   - Name: "OpenRouter API"
   - API Key: tu key de OpenRouter (formato: sk-or-v1-...)
4. En los nodos "OpenRouter Chat Model", selecciona esta credencial
```

---

### ❌ Error: "Model not found" o "Model is not free"

**Síntomas:**
- Error al ejecutar el nodo de IA
- Mensaje: "The model you requested is not available"

**Causa:**
- El modelo especificado no existe o ya no es gratuito

**Solución:**

```javascript
✅ Modelos gratuitos verificados (2025):
- "nousresearch/hermes-3-llama-3.1-405b:free"
- "google/gemini-2.0-flash-thinking-exp:free"
- "meta-llama/llama-3.2-3b-instruct:free"

// Actualiza el campo "Model" en los nodos OpenRouter:
1. Abre el nodo "OpenRouter Chat Model"
2. Campo "Model": nousresearch/hermes-3-llama-3.1-405b:free
3. Guarda y prueba
```

Para verificar modelos disponibles:
```bash
# Visita: https://openrouter.ai/models
# Filtra por: Price = Free
# Copia el "Model ID" exacto
```

---

### ❌ Error: "Rate limit exceeded"

**Síntomas:**
- Error 429 de OpenRouter
- Mensaje: "Too many requests"

**Causa:**
- Has excedido el límite de requests por minuto del modelo gratuito

**Solución:**

```bash
✅ Agregar retry logic:
1. En el nodo OpenRouter, ve a "Settings"
2. Activa "Continue On Fail": true
3. "Retry On Fail": true
4. "Max Tries": 3
5. "Wait Between Tries": 5000 ms (5 segundos)
```

---

### ❌ Error: "AI output is not valid JSON"

**Síntomas:**
- El nodo "Email Structure Parser" falla
- Error: "Expected JSON but got plain text"

**Causa:**
- El modelo de IA no respetó el formato JSON solicitado

**Solución:**

```javascript
✅ Mejorar el system message:
"IMPORTANTE: Tu respuesta DEBE ser ÚNICAMENTE un objeto JSON válido.
NO incluyas texto antes o después del JSON.
NO uses markdown code blocks (```json).
SOLO el JSON puro.

Formato requerido:
{
  \"subject\": \"...\",
  \"greeting\": \"...\",
  \"body\": \"...\",
  \"closing\": \"...\",
  \"signature\": \"...\"
}"
```

Si el problema persiste:

```javascript
// Agregar un nodo "Code" antes del parser:
const text = $input.item.json.output;

// Intentar extraer JSON si viene con markdown
let cleaned = text;
if (text.includes('```json')) {
  cleaned = text.match(/```json\n([\s\S]*?)\n```/)[1];
} else if (text.includes('```')) {
  cleaned = text.match(/```\n([\s\S]*?)\n```/)[1];
}

return { json: JSON.parse(cleaned) };
```

---

## 4. Errores de HubSpot

### ❌ Error: "Invalid API Token"

**Síntomas:**
- El nodo "Create/Update HubSpot Contact" falla
- Error: "401 Unauthorized"

**Solución:**

```bash
✅ Configurar credenciales de HubSpot:
1. En n8n, ve a Credentials
2. Busca "HubSpot API"
3. Verifica:
   - API Key: debe empezar con "pat-na1-" o similar
   - Format: Access Token (no OAuth)
4. Si no tienes la key, obtén una nueva:
   - HubSpot → Settings → Integrations → Private Apps
   - Create a private app
   - Scopes: crm.objects.contacts.read + write
   - Copy token
```

---

### ❌ Error: "Contact already exists"

**Síntomas:**
- Error al crear contacto
- Mensaje: "Contact already exists with email"

**Causa:**
- Intentas crear un contacto que ya existe

**Solución:**

```bash
✅ Usar "Create or Update" en lugar de "Create":
1. Abre el nodo HubSpot
2. Operation: "Create or Update"
3. Esto buscará por email y actualizará si existe
```

---

### ❌ Error: "Property does not exist"

**Síntomas:**
- Error al guardar contacto
- Mensaje: "Property 'custom_field' does not exist"

**Causa:**
- Intentas escribir en un campo personalizado que no existe en HubSpot

**Solución:**

```bash
✅ Verificar propiedades en HubSpot:
1. HubSpot → Settings → Properties → Contact properties
2. Verifica que existan todos los campos que intentas usar
3. Usa solo campos estándar o crea los personalizados primero
```

Campos estándar seguros:
```javascript
{
  "email": "...",        // ✅ Siempre existe
  "firstname": "...",    // ✅ Siempre existe
  "lastname": "...",     // ✅ Siempre existe
  "company": "...",      // ✅ Siempre existe
  "jobtitle": "...",     // ✅ Siempre existe
  "website": "...",      // ✅ Siempre existe
  "phone": "..."         // ✅ Siempre existe
}
```

---

## 5. Problemas de Extracción de Dominio

### ❌ Error: "Cannot extract domain"

**Síntomas:**
- El nodo "Extract Company Domain" falla
- Error: "url.hostname is undefined"

**Causa:**
- El sitio web ingresado no es una URL válida

**Solución:**

```javascript
✅ Mejorar el código de extracción:
// Reemplaza el código del nodo "Extract Company Domain" con:

const websiteUrl = $input.item.json.data.fields.find(
  f => f.label.includes('sitio web')
)?.value || '';

let domain = '';

try {
  // Agregar https:// si no tiene protocolo
  let url = websiteUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const urlObj = new URL(url);
  domain = urlObj.hostname;

  // Remover www.
  domain = domain.replace(/^www\./, '');

} catch (error) {
  // Si falla, intentar extraer dominio manualmente
  domain = websiteUrl
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0]
    .split('?')[0];
}

return {
  json: {
    domain: domain,
    originalUrl: websiteUrl
  }
};
```

---

## 6. Errores de Parsing JSON

### ❌ Error: "Unexpected token in JSON"

**Síntomas:**
- Error al parsear respuesta de la IA
- Error: "SyntaxError: Unexpected token"

**Causa:**
- La IA devolvió texto plano o JSON malformado

**Solución:**

Ver solución en: [Errores de OpenRouter / IA → "AI output is not valid JSON"](#-error-ai-output-is-not-valid-json)

---

## 7. Problemas de Rendimiento

### ❌ Problema: "Workflow muy lento"

**Síntomas:**
- La ejecución tarda más de 30 segundos
- Timeout en algunos nodos

**Causas:**
- Modelo de IA muy lento
- Búsqueda de Serper devuelve muchos resultados

**Soluciones:**

```bash
✅ Optimizar búsqueda de Serper:
// En el nodo "Search Company News"
// Query parameters:
{
  "num": 3,  // Solo 3 resultados (suficiente para contexto)
  "autocorrect": false,
  "type": "news"
}
```

```bash
✅ Usar modelo de IA más rápido:
// Cambiar a un modelo más ligero:
"meta-llama/llama-3.2-3b-instruct:free"
// O
"google/gemini-2.0-flash-thinking-exp:free"
```

```bash
✅ Configurar timeouts:
1. Cada nodo → Settings → Timeout
2. HTTP Request (Serper): 10000 ms
3. AI Agent: 30000 ms
4. HubSpot: 10000 ms
```

---

## 🆘 ¿Aún tienes problemas?

### Pasos de debugging avanzado:

1. **Activar modo debug en n8n:**
   ```bash
   Settings → Log level → Debug
   ```

2. **Revisar ejecuciones detalladas:**
   - Ve a Executions
   - Haz clic en la ejecución fallida
   - Revisa el Input y Output de cada nodo
   - Busca el primer nodo que falla

3. **Probar nodos individualmente:**
   - Desactiva el workflow
   - Ejecuta manualmente cada nodo con "Execute node"
   - Verifica que cada uno funcione por separado

4. **Logs de error comunes:**
   ```bash
   # Error de sintaxis en Code node:
   SyntaxError: Unexpected identifier
   → Revisa el código JavaScript

   # Error de autenticación:
   401 Unauthorized
   → Revisa las credenciales

   # Error de timeout:
   ETIMEDOUT
   → Aumenta el timeout del nodo

   # Error de rate limit:
   429 Too Many Requests
   → Agrega retry logic o espera
   ```

### Recursos de ayuda:

- **n8n Community:** [community.n8n.io](https://community.n8n.io)
- **n8n Documentation:** [docs.n8n.io](https://docs.n8n.io)
- **Serper Discord:** [serper.dev/discord](https://serper.dev/discord)
- **OpenRouter Discord:** [discord.gg/openrouter](https://discord.gg/openrouter)
- **HubSpot Developers:** [developers.hubspot.com](https://developers.hubspot.com)

---

## ✅ Checklist de Resolución

Cuando encuentres un problema, sigue este checklist:

- [ ] Identificar en qué nodo falla el workflow
- [ ] Leer el mensaje de error completo
- [ ] Revisar el Input del nodo (datos que recibe)
- [ ] Revisar el Output esperado
- [ ] Verificar credenciales (API keys)
- [ ] Probar el nodo individualmente
- [ ] Revisar logs de ejecución
- [ ] Consultar esta guía de troubleshooting
- [ ] Buscar en la documentación oficial
- [ ] Preguntar en la comunidad si es necesario

---

**¡La mayoría de los problemas tienen solución rápida! 💪**

No te frustres si algo falla. El debugging es parte natural del proceso de automatización.
