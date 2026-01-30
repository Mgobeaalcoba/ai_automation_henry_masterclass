# 📦 Workflows Directory

Este directorio contiene el workflow principal de n8n para la automatización de ventas con IA.

---

## 📄 Archivo Principal

### `sales-automation-workflow.json`

**Estado:** 📝 Pendiente de agregar

Este archivo debe contener el workflow completo de n8n con la siguiente estructura:

```json
{
  "name": "AI Sales Automation - Henry Masterclass",
  "nodes": [
    {
      "parameters": {},
      "name": "Tally Form Webhook",
      "type": "n8n-nodes-base.webhook",
      ...
    },
    {
      "parameters": {},
      "name": "Workflow Configuration (Set)",
      "type": "n8n-nodes-base.set",
      ...
    },
    ...
  ],
  "connections": {},
  "settings": {},
  "staticData": null
}
```

---

## 🔧 Nodos del Workflow

El workflow debe incluir estos 9 nodos:

### Nodos Principales (6)

1. **Tally Form Webhook**
   - Tipo: `n8n-nodes-base.webhook`
   - Propósito: Recibir datos del formulario Tally
   - Path: `tally-form-submission`
   - Method: POST

2. **Workflow Configuration (Set)**
   - Tipo: `n8n-nodes-base.set`
   - Propósito: Configurar variables (serperApiKey)
   - Variables:
     - `serperApiKey`: Tu API key de Serper

3. **Extract Company Domain (Code)**
   - Tipo: `n8n-nodes-base.code`
   - Propósito: Extraer el dominio del sitio web de la empresa
   - Lenguaje: JavaScript
   - Input: URL del sitio web
   - Output: Dominio limpio (ej: "example.com")

4. **Search Company News (HTTP Request)**
   - Tipo: `n8n-nodes-base.httpRequest`
   - Propósito: Buscar noticias recientes de la empresa en Google
   - API: Serper.dev
   - Endpoint: `https://google.serper.dev/news`
   - Method: POST
   - Headers:
     - `X-API-KEY`: `{{ $node["Workflow Configuration (Set)"].json["serperApiKey"] }}`
     - `Content-Type`: `application/json`
   - Body:
     ```json
     {
       "q": "{{ $node["Extract Company Domain (Code)"].json["domain"] }}",
       "num": 3
     }
     ```

5. **Generate Personalized Email (AI Agent)**
   - Tipo: `@n8n/n8n-nodes-langchain.agent`
   - Propósito: Generar email personalizado con IA
   - Chat Model: OpenRouter
   - Model: `nousresearch/hermes-3-llama-3.1-405b:free`
   - System Message: [Ver docs/nodos/05-AI-AGENT.md]
   - Options:
     - Temperature: 0.7
     - Max Tokens: 1000

6. **Create/Update HubSpot Contact**
   - Tipo: `n8n-nodes-base.hubspot`
   - Propósito: Crear o actualizar contacto en HubSpot CRM
   - Resource: Contact
   - Operation: Create or Update
   - Email: `{{ $json.email }}`
   - Additional Fields:
     - firstname
     - lastname
     - company
     - jobtitle
     - website
     - notes (email generado)

### Nodos de Soporte (3)

7. **OpenRouter Chat Model** (GLM-4.5)
   - Tipo: Sub-node del AI Agent
   - Model: `nousresearch/hermes-3-llama-3.1-405b:free`

8. **OpenRouter Chat Model** (Fallback)
   - Tipo: Sub-node del AI Agent
   - Model: `google/gemini-2.0-flash-thinking-exp:free`

9. **Email Structure Parser (Output Parser)**
   - Tipo: Sub-node del AI Agent
   - Propósito: Parsear el JSON generado por la IA
   - Schema:
     ```json
     {
       "type": "object",
       "properties": {
         "subject": { "type": "string" },
         "greeting": { "type": "string" },
         "body": { "type": "string" },
         "closing": { "type": "string" },
         "signature": { "type": "string" }
       },
       "required": ["subject", "greeting", "body", "closing", "signature"]
     }
     ```

---

## 📊 Flujo de Datos

```
[Tally Form]
     ↓
[Webhook] ──→ [Set Variables]
     ↓              ↓
[Extract Domain]    ↓
     ↓              ↓
[Search News] ←─────┘
     ↓
[AI Agent] ──→ [Generate Email]
     ↓              ↓
     └─────────→ [Parser]
                    ↓
              [HubSpot]
```

---

## 🔄 Conexiones entre Nodos

```javascript
{
  "Tally Form Webhook": {
    "main": [[
      { "node": "Workflow Configuration (Set)", "type": "main", "index": 0 }
    ]]
  },
  "Workflow Configuration (Set)": {
    "main": [[
      { "node": "Extract Company Domain (Code)", "type": "main", "index": 0 }
    ]]
  },
  "Extract Company Domain (Code)": {
    "main": [[
      { "node": "Search Company News (HTTP Request)", "type": "main", "index": 0 }
    ]]
  },
  "Search Company News (HTTP Request)": {
    "main": [[
      { "node": "Generate Personalized Email (AI Agent)", "type": "main", "index": 0 }
    ]]
  },
  "Generate Personalized Email (AI Agent)": {
    "main": [[
      { "node": "Create/Update HubSpot Contact", "type": "main", "index": 0 }
    ]]
  }
}
```

---

## 📥 Cómo Exportar desde n8n

Si ya tienes el workflow en n8n:

1. Abre el workflow en n8n
2. Haz clic en el menú (⋮) en la esquina superior derecha
3. Selecciona "Download"
4. Guarda el archivo como `sales-automation-workflow.json`
5. Mueve el archivo a este directorio

---

## 📤 Cómo Importar a n8n

Para importar este workflow:

1. Abre n8n Cloud (app.n8n.cloud)
2. Ve a "Workflows"
3. Haz clic en "Import from File"
4. Selecciona `sales-automation-workflow.json`
5. El workflow se abrirá automáticamente
6. Configura las credenciales necesarias:
   - Serper API Key (en el nodo Set)
   - OpenRouter API Key (en Credentials)
   - HubSpot API Key (en Credentials)
7. Activa el workflow

---

## ⚙️ Configuración Requerida

Antes de activar el workflow, asegúrate de tener:

### API Keys
- [ ] Serper API Key
- [ ] OpenRouter API Key
- [ ] HubSpot Private App Token

### Credenciales en n8n
- [ ] OpenRouter API (tipo: HTTP Request Credential)
- [ ] HubSpot API (tipo: HubSpot Credential)

### Configuración de Nodos
- [ ] Serper API Key en nodo "Workflow Configuration (Set)"
- [ ] OpenRouter credential aplicada en nodos de chat model
- [ ] HubSpot credential aplicada en nodo de HubSpot
- [ ] Webhook path configurado: `tally-form-submission`

---

## 🧪 Testing

### Test Individual de Nodos

Puedes probar cada nodo individualmente:

1. **Webhook:**
   ```bash
   curl -X POST https://tu-instancia.app.n8n.cloud/webhook-test/tally-form-submission \
     -H "Content-Type: application/json" \
     -d '{"data": {"fields": [...]}}'
   ```

2. **Extract Domain:**
   - Input: `{ "url": "https://www.example.com" }`
   - Expected Output: `{ "domain": "example.com" }`

3. **Search News:**
   - Input: `{ "domain": "example.com" }`
   - Expected Output: `{ "news": [...] }`

4. **AI Agent:**
   - Input: Lead data + news
   - Expected Output: JSON con email estructurado

5. **HubSpot:**
   - Input: Lead data + email generado
   - Expected Output: Contact ID de HubSpot

---

## 📚 Documentación de Nodos

Cada nodo tiene su propia documentación detallada:

- [Nodo 1: Tally Form Webhook](../docs/nodos/01-WEBHOOK.md)
- [Nodo 2: Workflow Configuration](../docs/nodos/02-SET.md)
- [Nodo 3: Extract Company Domain](../docs/nodos/03-CODE.md)
- [Nodo 4: Search Company News](../docs/nodos/04-HTTP.md)
- [Nodo 5: Generate Personalized Email](../docs/nodos/05-AI-AGENT.md)
- [Nodo 6: Create/Update HubSpot Contact](../docs/nodos/06-HUBSPOT.md)

---

## 🔧 Modificaciones Comunes

### Cambiar el modelo de IA

En el nodo "Generate Personalized Email":
```
Model: google/gemini-2.0-flash-thinking-exp:free
```

### Ajustar temperatura de la IA

```
Temperature: 0.7  // Más alto = más creativo
Temperature: 0.3  // Más bajo = más conservador
```

### Aumentar número de noticias

En el nodo "Search Company News":
```json
{
  "q": "{{ $json.domain }}",
  "num": 5  // Aumentar de 3 a 5
}
```

### Cambiar campos de HubSpot

En el nodo "Create/Update HubSpot Contact", puedes agregar más campos:
```
- phone
- city
- state
- industry
- lifecyclestage
```

---

## 🐛 Troubleshooting

### Si el workflow no importa correctamente:

```bash
1. Verifica que el JSON sea válido (usa jsonlint.com)
2. Asegúrate de que la versión de n8n sea compatible
3. Revisa que todos los tipos de nodos existan en tu instalación
```

### Si faltan nodos después de importar:

```bash
1. Actualiza n8n a la última versión
2. Instala los paquetes necesarios:
   - @n8n/n8n-nodes-langchain (para AI Agent)
   - n8n-nodes-base (nodos estándar)
```

---

## 📝 Notas de Versión

### Versión 1.0 (Inicial)
- Workflow completo con 9 nodos
- Integración con Tally, Serper, OpenRouter, HubSpot
- Generación de emails personalizados con IA
- Investigación automática de empresas

### Mejoras Futuras Posibles
- [ ] Agregar retry logic a las llamadas API
- [ ] Implementar rate limiting
- [ ] Agregar validación de datos de entrada
- [ ] Crear versión con múltiples idiomas
- [ ] Agregar análisis de sentimiento del mensaje del lead
- [ ] Integrar con servicio de envío de emails
- [ ] Agregar notificaciones (Slack, Discord, email)

---

## ⚠️ Importante

- Este workflow usa servicios de terceros con límites gratuitos
- Serper tiene solo 2,500 búsquedas (no renovables)
- OpenRouter tiene rate limits por modelo
- HubSpot free tier tiene algunas limitaciones
- n8n Cloud free tier: 5,000 ejecuciones/mes

**Recomendación:** Monitorea tu uso regularmente para no quedarte sin créditos.

---

## 🎓 Para la Masterclass

**Tips para presentar:**

1. Ten el workflow ya importado y configurado
2. Usa datos de prueba predefinidos
3. Ten una ejecución exitosa guardada para mostrar
4. Prepara ejemplos de emails generados
5. Ten capturas de pantalla de backup

**Demo recomendada:**

1. Mostrar el workflow completo (vista general)
2. Explicar cada nodo (5 min)
3. Mostrar una ejecución en vivo (5 min)
4. Mostrar el contacto creado en HubSpot (2 min)
5. Mostrar el email generado (3 min)

---

**¿Listo para automatizar? 🚀**

Si necesitas ayuda, consulta la documentación completa en el README principal.
