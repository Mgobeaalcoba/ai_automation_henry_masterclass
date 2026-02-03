# The Omni-Channel Content Factory

**Masterclass: AI Automation para Marketing**  
**Instructor:** Mariano Gobea Alcoba  
**Fecha:** Martes 3 de febrero, 2026 - 19:00 hs (Argentina)  
**Duración:** 40 minutos

---

## 📋 Descripción

Esta masterclass te enseña a construir una **fábrica de contenido omnicanal** que convierte cualquier artículo web en contenido optimizado para LinkedIn, X (Twitter) y Newsletter con un solo clic desde tu navegador.

### El Problema que Resolvemos

¿Cuántas veces leíste un artículo brillante y pensaste "debería escribir algo sobre esto", pero la fricción de abrir LinkedIn, resumir, adaptar el tono y formatear te dio tanta pereza que nunca lo hiciste?

**Esa fricción es el asesino silencioso de la marca personal.**

### La Solución

Un sistema automatizado que:
1. Se activa con un **clic desde el navegador** (bookmarklet)
2. **Extrae y limpia** el contenido del artículo (Jina AI)
3. **Genera contenido** optimizado para 3 canales (AI Agent + LangChain)
4. **Guarda todo** estructurado en Notion para revisión humana

**De 15 minutos de trabajo manual a 5 segundos de automatización.**

---

## 🏗️ Arquitectura del Sistema

```
Navegador (Bookmarklet)
        ↓
    Webhook n8n
        ↓
  Parse JavaScript
        ↓
  Jina AI Reader (Web Scraper)
        ↓
  AI Agent (LangChain)
        ↓
  Output Parser (JSON)
        ↓
  Notion Database
```

### Flujo de Datos

1. **Activación:** Haces clic en el bookmarklet mientras lees un artículo
2. **Captura:** El bookmarklet envía URL y título al webhook de n8n
3. **Limpieza:** Jina AI extrae solo el contenido relevante (sin ads, menús, footers)
4. **Transformación:** El AI Agent genera 3 piezas de contenido:
   - Post de LinkedIn con estructura AIDA
   - Hilo de X (5 tweets exactos)
   - Resumen ejecutivo para newsletter (150 palabras)
5. **Almacenamiento:** Todo se guarda en Notion como una nueva página

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito | Plan Gratuito |
|-------------|-----------|---------------|
| **n8n Cloud** | Orquestación del workflow | 5,000 ejecuciones/mes |
| **Jina AI** | Web scraping limpio (Markdown) | Plan gratuito disponible |
| **OpenRouter** | Acceso a modelos IA | Modelos gratuitos (GLM-4.5, Gemini Flash) |
| **Notion** | Base de datos de contenido | Gratis para uso personal |
| **Bookmarklet** | Interfaz de activación | N/A (código JavaScript) |

### Por Qué Este Stack

- **Jina AI** elimina el 70% del ruido visual de las páginas web (ads, menús, cookies)
- **LangChain AI Agent** permite estructurar respuestas con herramientas y prompts avanzados
- **Output Parser** garantiza formato JSON consistente (no más respuestas creativas de la IA)
- **Notion** actúa como CMS donde puedes revisar y publicar contenido

---

## 🚀 Setup Completo (20 minutos)

### Prerequisitos

- Cuenta en n8n Cloud ([app.n8n.cloud](https://app.n8n.cloud))
- Cuenta en Jina AI ([jina.ai](https://jina.ai))
- Cuenta en OpenRouter ([openrouter.ai](https://openrouter.ai))
- Cuenta en Notion ([notion.so](https://notion.so))
- Navegador basado en Chromium (Chrome, Brave, Edge)

---

### Paso 1: Crear Cuentas y Obtener API Keys (10 min)

#### 1.1 n8n Cloud

```bash
1. Registrarse en https://app.n8n.cloud/register
2. Crear una instancia (gratis, automático)
3. Acceder al dashboard de workflows
```

#### 1.2 Jina AI

```bash
1. Registrarse en https://jina.ai
2. Ir a Dashboard → API Keys
3. Crear nueva API key
4. Guardar: jina_XXXXXXXXXX
```

#### 1.3 OpenRouter

```bash
1. Registrarse en https://openrouter.ai
2. Ir a Keys → Create Key
3. Guardar: sk-or-XXXXXXXXXX
4. Créditos gratuitos disponibles para algunos modelos
```

**Modelos recomendados (gratuitos o muy baratos):**
- `z-ai/glm-4.5` (gratis)
- `google/gemini-2.0-flash-exp` (muy barato, excelente calidad)

#### 1.4 Notion

```bash
1. Registrarse en https://notion.so
2. Crear una nueva página llamada "Content Factory"
3. Convertir a base de datos (tipo: Full Page Database)
4. Crear integración:
   - Ir a Settings → Integrations → Develop your own integrations
   - New Integration → Content Factory Bot
   - Capabilities: Read content, Update content, Insert content
   - Guardar el Internal Integration Token
5. Conectar la integración a tu base de datos:
   - Abrir la base de datos
   - Click en ⋯ (arriba derecha) → Add connections
   - Seleccionar "Content Factory Bot"
```

**Propiedades de la base de datos:**
- `Título` (Title) - Automático
- `URL` (URL) - Para el link original
- `LinkedIn Post` (Text) - Post generado
- `X Thread` (Text) - Hilo de Twitter
- `Newsletter` (Text) - Resumen ejecutivo
- `Fecha` (Date) - Fecha de creación

---

### Paso 2: Importar y Configurar el Workflow (5 min)

#### 2.1 Importar el Workflow

```bash
1. Descargar workflow.json de este directorio
2. En n8n: Workflows → Import from File
3. Seleccionar workflow.json
4. El workflow se abrirá automáticamente
```

#### 2.2 Configurar Credenciales

El workflow tiene 7 nodos:

**Nodo 1: Webhook**
- Path: `marketing-magic` (ya configurado)
- Method: POST
- Copiar la URL del webhook (la necesitarás para el bookmarklet)

**Nodo 2: Code in JavaScript**
- No requiere configuración (solo parsing)

**Nodo 3: Jina AI Reader (HTTP Request)**
- URL: `https://r.jina.ai/{{ $json.url }}`
- Authentication: Generic Credential Type
- Type: Bearer Auth
- Bearer Token: `tu_jina_api_key`

**Nodo 4: AI Agent (LangChain)**
- Requiere configurar el nodo OpenRouter Chat Model (sub-nodo)

**Nodo 5: OpenRouter Chat Model**
- Credential Type: HTTP Request
- Method: POST
- URL: `https://openrouter.ai/api/v1/chat/completions`
- Authentication: Header Auth
  - Name: `Authorization`
  - Value: `Bearer tu_openrouter_api_key`
- Model: `z-ai/glm-4.5` o `google/gemini-2.0-flash-exp`

**Nodo 6: Structured Output Parser**
- Schema JSON (ya configurado en el workflow)

**Nodo 7: Notion (Create Page)**
- Credential: Notion API
- Database ID: Tu database ID de Notion
- Properties:
  - `title`: `{{ $('Code in JavaScript').item.json.title }}`
  - `URL`: `{{ $('Code in JavaScript').item.json.url }}`
  - `LinkedIn Post`: `{{ $json.linkedin }}`
  - `X Thread`: `{{ $json.x }}`
  - `Newsletter`: `{{ $json.newsletter }}`

---

### Paso 3: Crear el Bookmarklet (5 min)

#### 3.1 El Código del Bookmarklet

Reemplaza `TU_URL_N8N` con la URL de tu webhook (del Nodo 1):

```javascript
javascript:(function(){
  fetch('https://TU_INSTANCIA.app.n8n.cloud/webhook/marketing-magic', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      url: window.location.href,
      title: document.title,
      user: 'TU_NOMBRE'
    })
  });
  alert('🚀 Contenido enviado a la Factory');
})();
```

#### 3.2 Instalación en el Navegador

**Método 1: Barra de Marcadores (Recomendado)**

1. Muestra la barra de marcadores (Ctrl+Shift+B o Cmd+Shift+B)
2. Click derecho en la barra → "Add page" o "Agregar página"
3. Nombre: `📚 Content Factory`
4. URL: Pega el código JavaScript completo
5. Guardar

**Método 2: Consola de Desarrollador (Para Testing)**

1. Abre la consola (F12 o Cmd+Option+I)
2. Pega el código y presiona Enter
3. Verás la alerta de confirmación

---

## 🎯 Configuración de Prompts

### System Prompt del AI Agent

Este es el prompt que define el comportamiento del agente:

```
Eres un Content Architect Senior. Tu tarea es recibir el contenido de un artículo y transformarlo en tres piezas de marketing de alto impacto.

Debes completar EXACTAMENTE estas tres propiedades: 

1. linkedin: Un post con gancho, 3 bullets de valor y pregunta final. 
2. x: Un hilo de exactamente 5 posteos de X que resuma la esencia del artículo. 
3. newsletter: Un resumen ejecutivo técnico de 150 palabras con tono profesional.

IMPORTANTE: Escribe el contenido real. No describas el formato. No inventes campos. Evita palabras trilladas como 'revolucionario' o 'asombroso'.

Tono: Profesional y analítico. 
Prohibido usar: "increíble", "revolucionario", "asombroso", "game-changer".
```

**¿Por qué estos prompts?**

- **Rol específico:** "Content Architect Senior" eleva la calidad de respuesta
- **Prohibiciones explícitas:** Elimina el "olor a IA" (palabras exageradas)
- **Restricciones de formato:** 5 tweets exactos, 150 palabras, etc.
- **Instrucciones claras:** "Escribe el contenido real" previene meta-respuestas

### User Prompt (Input al Agente)

```
Contenido para procesar:
{{ $json.data }}

Título del artículo:
{{ $('Code in JavaScript').item.json.title }}

Tarea: Genera el contenido para LinkedIn, X y la Newsletter basándote en este texto.
```

### Output Parser Schema

```json
{
  "type": "object",
  "properties": {
    "linkedin": { 
      "type": "string", 
      "description": "Post para LinkedIn con estructura AIDA" 
    },
    "x": { 
      "type": "string", 
      "description": "Hilo de 5 tweets para X/Twitter" 
    },
    "newsletter": { 
      "type": "string", 
      "description": "Resumen ejecutivo de 150 palabras" 
    }
  },
  "required": ["linkedin", "x", "newsletter"]
}
```

**¿Por qué un Output Parser?**

Sin él, la IA a veces responde: "¡Claro! Aquí tienes tus posts:" y rompe la automatización.  
Con él, la IA DEBE entregar un JSON estricto: `{"linkedin": "...", "x": "...", "newsletter": "..."}`

---

## 🎬 Demo: Cómo Usar el Sistema

### Flujo de Uso

1. **Encuentra un artículo interesante** en cualquier sitio (TechCrunch, Medium, etc.)
2. **Click en el bookmarklet** "📚 Content Factory" en tu barra de marcadores
3. **Espera 5-10 segundos** mientras el workflow procesa
4. **Ve a Notion** y verás una nueva página con los 3 contenidos generados
5. **Revisa y ajusta** el contenido (siempre debe haber un toque humano)
6. **Publica** en tus canales

### Ejemplo de Output

**Artículo original:**  
"The Rise of Vector Databases in AI Applications" (TechCrunch)

**Output generado:**

**LinkedIn:**
```
Los Vector Databases están redefiniendo cómo las aplicaciones de IA manejan datos.

Tres puntos clave que todo desarrollador debe conocer:

• Búsqueda semántica vs. keyword matching: 40% más precisa
• Escalabilidad: millones de vectores consultados en milisegundos
• Casos de uso: RAG, sistemas de recomendación, detección de anomalías

¿Ya estás usando embeddings en tus proyectos? ¿Qué desafíos encontraste?

#AI #VectorDatabases #MachineLearning
```

**X (Thread):**
```
1/5 🧵 Vector Databases: la infraestructura invisible detrás del boom de IA generativa.

2/5 A diferencia de SQL, no buscan texto exacto. Buscan "significado" usando embeddings (vectores de 768+ dimensiones).

3/5 El problema: comparar vectores es computacionalmente costoso. Solución: algoritmos ANN (Approximate Nearest Neighbor).

4/5 Casos de uso real: ChatGPT con tus docs (RAG), Spotify recommendations, fraud detection en tiempo real.

5/5 Herramientas populares: Pinecone, Weaviate, Qdrant, pgvector. La elección depende de tu stack y escala.
```

**Newsletter:**
```
Vector Databases están emergiendo como componente crítico en arquitecturas de IA. 
A diferencia de bases tradicionales, almacenan embeddings (representaciones numéricas 
de datos) y permiten búsquedas semánticas en microsegundos. 

El principal caso de uso es RAG (Retrieval-Augmented Generation), donde modelos como 
GPT consultan documentos relevantes antes de responder. Empresas como Pinecone y 
Weaviate han levantado $100M+ para resolver el desafío de escalar búsquedas de 
similitud a billones de vectores.

Para desarrolladores: si tu aplicación requiere búsqueda "inteligente" (no keyword matching), 
considera pgvector como punto de partida (extensión de PostgreSQL) antes de migrar a 
soluciones especializadas. El trade-off típico es costo vs. latencia.
```

---

## 🧪 Testing del Workflow

### Test Completo (End-to-End)

1. Activa el workflow en n8n (botón "Active" arriba derecha)
2. Ve a un artículo de prueba (ej: https://techcrunch.com)
3. Click en el bookmarklet
4. Ve a n8n → Executions y observa el workflow ejecutarse
5. Verifica en Notion que se creó la nueva página

### Test Individual de Nodos

#### Probar el Webhook

Desde la terminal:

```bash
curl -X POST https://tu-instancia.app.n8n.cloud/webhook/marketing-magic \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://techcrunch.com/test-article",
    "title": "Test Article",
    "user": "Test User"
  }'
```

#### Probar Jina AI Manualmente

```bash
curl https://r.jina.ai/https://techcrunch.com/test-article \
  -H "Authorization: Bearer tu_jina_api_key"
```

Deberías recibir Markdown limpio del artículo.

#### Probar OpenRouter Manualmente

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer tu_openrouter_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-ai/glm-4.5",
    "messages": [
      {"role": "system", "content": "Eres un asistente útil"},
      {"role": "user", "content": "Hola, ¿cómo estás?"}
    ]
  }'
```

---

## 🐛 Troubleshooting

### Error: "Webhook no responde"

**Causa:** El workflow no está activo o la URL es incorrecta.

**Solución:**
1. Verifica que el workflow esté en estado "Active" (switch verde)
2. Copia nuevamente la URL del webhook desde n8n
3. Actualiza el bookmarklet con la URL correcta
4. Prueba con `curl` primero antes del bookmarklet

---

### Error: "Jina AI devuelve 401 Unauthorized"

**Causa:** API key incorrecta o mal configurada.

**Solución:**
1. Verifica que la API key sea correcta (empieza con `jina_`)
2. En n8n, edita el nodo HTTP Request de Jina
3. Authentication → Generic Credential Type → Bearer Auth
4. Pega la API key SIN el prefijo "Bearer" (n8n lo agrega automáticamente)

---

### Error: "Output Parser falla - IA no devuelve JSON"

**Causa:** El modelo IA está respondiendo en formato libre, ignorando el Output Parser.

**Solución:**
1. Verifica que el Output Parser esté conectado correctamente al AI Agent
2. Revisa el System Prompt - debe ser muy explícito sobre las propiedades requeridas
3. Prueba con otro modelo (Gemini Flash es muy confiable con JSON)
4. En el nodo AI Agent, asegúrate de tener "Response Format: JSON"

---

### Error: "Notion API devuelve 400 Bad Request"

**Causa:** Properties del nodo Notion no coinciden con la estructura de tu base de datos.

**Solución:**
1. Abre tu base de datos en Notion
2. Verifica los nombres EXACTOS de las propiedades (case-sensitive)
3. En n8n, edita el nodo Notion → Properties
4. Mapea cada campo correctamente:
   - `Name` (Title) → `{{ $('Code').item.json.title }}`
   - Custom properties deben coincidir con los nombres de Notion

---

### El contenido generado es de baja calidad

**Causa:** Prompt demasiado genérico o modelo inadecuado.

**Solución:**
1. Mejora el System Prompt:
   - Agrega ejemplos de output deseado
   - Especifica el tono y estilo con más detalle
   - Agrega más restricciones (ej: "Usa datos concretos del artículo")
2. Cambia el modelo:
   - `google/gemini-2.0-flash-exp` es excelente para contenido creativo
   - Ajusta temperature (0.7 = balanceado, 0.3 = conservador, 0.9 = creativo)
3. Verifica que Jina AI esté extrayendo el contenido completo:
   - Prueba manualmente la URL de Jina
   - Algunos sitios bloquean scrapers (usa User-Agent si es necesario)

---

### El bookmarklet no funciona en algunos sitios

**Causa:** Política de CORS o Content Security Policy del sitio web.

**Solución:**
1. El bookmarklet usa `mode: 'no-cors'` para evitar restricciones
2. Si aún falla, copia manualmente la URL y usa el script de testing:
   ```bash
   node scripts/test-webhook.js "https://url-del-articulo" "Título del Artículo"
   ```
3. Alternativa: crea un formulario simple en Tally/Typeform que envíe al webhook

---

## 🚀 Extensiones Posibles

### 1. Publicación Automática

Conecta el workflow a las APIs de:
- **LinkedIn:** LinkedIn API (requiere aprobación)
- **X/Twitter:** Twitter API v2
- **Newsletter:** ConvertKit, Mailchimp, Substack APIs

**Consideración:** Siempre deja una etapa de revisión humana antes de publicar.

---

### 2. Enriquecimiento de Datos

Agrega nodos adicionales:
- **Análisis de sentimiento:** Para adaptar el tono del contenido
- **Extracción de keywords:** Para sugerir hashtags automáticamente
- **Búsqueda de imágenes:** Unsplash API para ilustraciones relevantes

---

### 3. Multi-idioma

Modifica el prompt del AI Agent:
```
Genera el contenido en dos idiomas: español e inglés.
Output: {"es": {...}, "en": {...}}
```

---

### 4. Contenido de Video/Podcast

Reemplaza Jina AI con:
- **AssemblyAI:** Transcripción de audio
- **YouTube Transcript API:** Subtítulos de videos

El resto del workflow funciona igual.

---

### 5. Calendario de Publicación

Agrega un nodo **Schedule** en n8n:
- Crea un trigger programado
- Lee páginas pendientes de Notion (con status "Draft")
- Publica automáticamente según calendario

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [n8n Docs](https://docs.n8n.io/)
- [Jina AI Docs](https://docs.jina.ai/)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Notion API](https://developers.notion.com/)
- [LangChain JS Docs](https://js.langchain.com/docs/)

### Tutoriales Relacionados
- [n8n AI Agent Tutorial](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.agent/)
- [Output Parsers en LangChain](https://js.langchain.com/docs/modules/model_io/output_parsers/)

### Comunidades
- [n8n Community Forum](https://community.n8n.io/)
- [Discord de n8n](https://discord.gg/n8n)

---

## 🎓 Notas para el Instructor

### Timing de la Demo (40 min)

- **0-5 min:** Presentación del problema y arquitectura
- **5-10 min:** Explicación del stack y decisiones de diseño
- **10-25 min:** Construcción en vivo del workflow desde cero
- **25-35 min:** Demo completa (bookmarklet → Notion)
- **35-40 min:** Q&A y extensiones posibles

### Tips para la Presentación

1. **Ten el workflow pre-construido como backup** por si algo falla
2. **Usa un artículo de prueba conocido** (no dependas de internet en vivo)
3. **Muestra la página de Notion actualizada** en tiempo real (refresca manualmente)
4. **Prepara 2-3 ejecuciones exitosas previas** para mostrar si la demo en vivo falla

### Puntos Clave a Enfatizar

- **Arquitectura sobre herramientas:** El concepto es replicable con otras tools
- **Output Parser es crítico:** Sin él, la automatización se rompe
- **Jina AI elimina ruido:** Explica por qué no usar directamente la URL
- **Prompts quirúrgicos:** La calidad del output depende 80% del prompt
- **Siempre revisión humana:** La automatización acelera, no reemplaza el criterio

---

## 📝 Licencia

Proyecto educativo para Henry Bootcamp - 2026

Material libre para uso educativo con atribución.

---

**Preparado por:** Mariano Gobea Alcoba  
**GitHub:** [@Mgobeaalcoba](https://github.com/Mgobeaalcoba)

---

**¿Listo para construir tu fábrica de contenido? 🏭**

[← Volver al índice principal](../README.md)
