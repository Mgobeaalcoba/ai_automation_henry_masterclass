# AI-Powered Lead Personalization

**Masterclass: AI Automation para Ventas**  
**Instructor:** Mariano Gobea Alcoba  
**Fecha:** Miércoles 4 de febrero, 2026  
**Duración:** 40 minutos

---

## 📋 Descripción

Esta masterclass te enseña a construir un **sistema completo de automatización de prospección** que captura leads, investiga automáticamente a sus empresas y genera emails personalizados basados en datos reales.

### El Problema que Resolvemos

La prospección manual es costosa en tiempo:
- Capturar datos del lead: 2 minutos
- Investigar la empresa en Google: 5 minutos
- Redactar email personalizado: 8 minutos
- Cargar en CRM: 2 minutos

**Total: 17 minutos por lead.** Con 20 leads al día, son 5.6 horas de trabajo repetitivo.

### La Solución

Un workflow automatizado que:
1. **Captura** leads desde formularios web (Tally)
2. **Investiga** automáticamente la empresa (Serper + Google)
3. **Genera** email personalizado con IA (OpenRouter + LangChain)
4. **Guarda** todo en el CRM (HubSpot)

**De 17 minutos a 30 segundos. Automatizado 100%.**

**Diferenciador clave:** El sistema extrae el nombre de la empresa automáticamente del dominio del email, simplificando el formulario y mejorando la tasa de conversión.

---

## 🏗️ Arquitectura del Sistema

```
Formulario Tally
      ↓
  Webhook n8n
      ↓
Extract Company Domain (Code) → Extrae del EMAIL
      ↓
Search Company News (Serper API) → Google Search
      ↓
AI Agent (OpenRouter + LangChain)
      ↓
Email Structure Parser (JSON)
      ↓
Create/Update Contact (HubSpot CRM)
```

### Flujo de Datos

1. **Captura:** Lead completa formulario Tally (First name, Last name, Email)
2. **Webhook:** Tally envía datos a n8n automáticamente
3. **Extracción:** JavaScript extrae el dominio del EMAIL del lead
   - Ejemplo: `juan@techstartup.com` → `companyDomain: techstartup.com`, `companyName: Techstartup`
4. **Investigación:** Serper busca información de la empresa en Google (endpoint `/search`)
   - Devuelve resultados orgánicos con snippets
5. **Generación:** AI Agent crea email personalizado basado en:
   - Datos del lead (nombre, email, empresa)
   - Resultados de búsqueda de Google (noticias recientes, contexto)
6. **Parsing:** Output Parser estructura la respuesta en JSON con 3 campos:
   - `subject` - Línea de asunto personalizada
   - `emailBody` - Cuerpo del email (< 150 palabras)
   - `newsReference` - Noticia específica referenciada
7. **CRM:** El contacto se crea/actualiza en HubSpot con custom properties del email

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito | Plan Gratuito |
|-------------|-----------|---------------|
| **n8n Cloud** | Orquestación del workflow | 5,000 ejecuciones/mes |
| **Tally.so** | Formularios con webhooks | Formularios ilimitados |
| **Serper.dev** | API de búsqueda Google | 2,500 búsquedas (one-time) |
| **OpenRouter** | Acceso a modelos IA | Modelos gratuitos disponibles |
| **HubSpot** | CRM para gestión de contactos | 1,000,000 contactos |

### Por Qué Este Stack

- **Tally** es el formulario más simple con webhooks nativos (no code)
- **Serper** accede a Google Search API (endpoint `/search`) sin complejidad de OAuth
- **OpenRouter** da acceso a modelos gratuitos (GLM-4.5-air, GPT-OSS-120B)
- **HubSpot** CRM gratuito con soporte para custom properties ilimitadas

**Ventaja del endpoint `/search`:** Devuelve resultados orgánicos completos con snippets, no solo noticias. Esto permite a la IA tener más contexto para personalizar.

---

## 🚀 Setup Completo (25 minutos)

### Prerequisitos

- Cuenta en n8n Cloud ([app.n8n.cloud](https://app.n8n.cloud))
- Cuenta en Tally.so ([tally.so](https://tally.so))
- API Key de Serper ([serper.dev](https://serper.dev))
- API Key de OpenRouter ([openrouter.ai](https://openrouter.ai))
- Cuenta en HubSpot ([hubspot.com](https://www.hubspot.com))

---

### Paso 1: Crear Cuentas y Obtener API Keys (10 min)

#### 1.1 n8n Cloud

```bash
1. Registrarse en https://app.n8n.cloud/register
2. Verificar email
3. Crear workspace (nombre: "Henry Automation")
4. Acceder al dashboard
```

#### 1.2 Tally.so

```bash
1. Registrarse en https://tally.so/signup
2. Verificar email
3. Crear nuevo formulario (luego configuraremos campos)
```

#### 1.3 Serper.dev

```bash
1. Registrarse en https://serper.dev/signup
2. Verificar email
3. Ir a Dashboard → API Key
4. Copiar tu API key: XXXXXXXXXXXXXXXXXXXXXXXX
```

**Importante:** Serper te da 2,500 búsquedas ONE-TIME (no se renuevan). Úsalas sabiamente.

#### 1.4 OpenRouter

```bash
1. Registrarse en https://openrouter.ai
2. Ir a Keys → Create Key
3. Guardar: sk-or-XXXXXXXXXX
4. Algunos modelos son gratuitos, otros tienen costo mínimo
```

**Modelos recomendados (gratuitos):**
- `z-ai/glm-4.5-air:free` (principal - rápido y eficiente para emails)
- `openai/gpt-oss-120b:free` (fallback - excelente personalización)
- `google/gemini-2.0-flash-exp:free` (alternativa si los otros fallan)

#### 1.5 HubSpot

```bash
1. Registrarse en https://www.hubspot.com/products/get-started
2. Completar el onboarding básico
3. Ir a Settings → Integrations → Private Apps
4. Create Private App:
   - Name: "n8n Automation"
   - Scopes necesarios:
     * crm.objects.contacts.read
     * crm.objects.contacts.write
5. Copiar el Access Token: pat-na1-XXXXXXXXX
```

---

### Paso 2: Importar y Configurar el Workflow (10 min)

#### 2.1 Importar el Workflow

```bash
1. Descargar workflow.json de este directorio
2. En n8n: Workflows → Import from File
3. Seleccionar workflow.json
4. El workflow se abrirá con 7 nodos (5 principales + 2 sub-nodos)
```

#### 2.2 Configurar Nodos

El workflow tiene **5 nodos principales** + **2 sub-nodos**:

**Nodo 1: Tally Form Webhook**
- Path: `tally-form-submission` (ya configurado)
- Method: POST
- Copiar la URL de producción (no la de test)
- Formato: `https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission`

**Nodo 2: Extract Company Domain (Code)**
- Lenguaje: JavaScript
- Mode: Run Once for Each Item
- Código incluido en el workflow
- **Función:** Extrae el dominio del EMAIL del lead (no del sitio web)
- **Ejemplo:**
  - Input: `juan@techstartup.com`
  - Output: `companyDomain: "techstartup.com"`, `companyName: "Techstartup"`

```javascript
// Código del nodo (ya incluido en workflow.json)
const fields = $json.body.data.fields;
const emailField = fields.find(field => field.label === 'Email' || field.type === 'INPUT_EMAIL');
const email = emailField ? emailField.value : null;

if (!email) {
  return { ...$json, error: 'No email found in Tally fields' };
}

const domain = email.split('@')[1];
const companyNameRaw = domain.split('.')[0];
const companyName = companyNameRaw.charAt(0).toUpperCase() + companyNameRaw.slice(1);

return {
  ...$json,
  companyDomain: domain,
  companyName: companyName,
  email: email
};
```

**Nodo 3: Search Company News (Serper)**
- URL: `https://google.serper.dev/search` (endpoint `/search`, no `/news`)
- Method: POST
- Authentication: Generic Credential Type → Header Auth
- Header Name: `X-API-KEY`
- Header Value: Tu API key de Serper
- Body Parameters:
  - `q`: `{{ $json.body.data.fields[4].value }}` (campo de búsqueda del formulario)

**Importante:** Este nodo usa el campo index 4 del formulario Tally. Asegúrate de que ese campo exista.

**Nodo 4: Generate Personalized Email (AI Agent)**
- Prompt Type: Define Below
- Text (User Prompt):
  ```
  Lead Information:
  - Name: {{ First name }} {{ Last name }}
  - Email: {{ Email }}
  - Company: {{ companyName }}
  - Company Domain: {{ companyDomain }}

  All Research Results (Google Search):
  {{ JSON.stringify($json.organic) }}
  ```
- System Message: Ver sección "Configuración de Prompts" abajo
- Has Output Parser: Yes
- Requiere configurar sub-nodos

**Sub-nodo: OpenRouter Chat Model**
- Model: `z-ai/glm-4.5-air:free` (modelo gratuito, muy eficiente)
- Credential: OpenRouter API (OAuth o Header Auth)
- Options: Defaults (Temperature automática)

**Sub-nodo: Email Structure Parser (Output Parser)**
- Schema Type: Manual
- Input Schema (JSON):
  ```json
  {
    "type": "object",
    "properties": {
      "subject": {
        "type": "string",
        "description": "Email subject line"
      },
      "emailBody": {
        "type": "string",
        "description": "Personalized email body with news-based icebreaker"
      },
      "newsReference": {
        "type": "string",
        "description": "The specific news item referenced"
      }
    }
  }
  ```
- Auto Fix: Enabled

**Sub-nodo: OpenRouter Chat Model1 (Fallback)**
- Model: `openai/gpt-oss-120b:free` (modelo alternativo gratuito)
- Conectado al Output Parser como modelo secundario

**Nodo 5: Create/Update HubSpot Contact**
- Resource: Contact
- Operation: Create or Update
- Authentication: OAuth2
- Email: `{{ $('Extract Company Domain').item.json.email }}`
- Additional Fields:
  - First Name: `{{ $('Extract Company Domain').item.json.body.data.fields[0].value }}`
  - Last Name: `{{ $('Extract Company Domain').item.json.body.data.fields[1].value }}`
  - Company Name: `{{ $('Extract Company Domain').item.json.body.data.fields[4].value }}`
- Custom Properties:
  - `personalized_email_subject`: `{{ $json.output.subject }}`
  - `personalized_email_body`: `{{ $json.output.emailBody }}`
  - `news_reference`: `{{ $json.output.newsReference }}`

---

### Paso 3: Crear Formulario Tally (5 min)

#### 3.1 Campos del Formulario

Crea un formulario en Tally con estos campos **EN ESTE ORDEN EXACTO** (importante para los índices):

1. **First name** (Text)
   - Label: "First name"
   - Required: Yes
   - Index: 0

2. **Last name** (Text)
   - Label: "Last name"
   - Required: Yes
   - Index: 1

3. **Email** (Email)
   - Label: "Email"
   - Required: Yes
   - Index: 2
   - **Importante:** El dominio de este email se usa para extraer el nombre de la empresa

4. **Campo adicional 3** (Hidden o cualquier tipo)
   - Index: 3

5. **Company/Search Query** (Text)
   - Label: Lo que quieras (ej: "Company Name" o "What would you like to know?")
   - Required: Yes
   - Index: 4
   - **Importante:** Este campo se usa como query de búsqueda en Google

#### 3.2 Configurar Webhook

```bash
1. En Tally, ir a tu formulario → Integrations
2. Seleccionar "Webhooks"
3. Pegar la URL de producción de n8n
4. Event: "Form submission"
5. Enable: ON
6. Test webhook (envía un formulario de prueba)
```

---

## 🎯 Configuración de Prompts

### System Prompt del AI Agent

```
You are an expert sales outreach specialist who creates highly personalized cold emails.

Your task is to:
1. Analyze the recent news about the lead's company
2. Identify the most relevant and recent news item that could serve as a conversation starter
3. Craft a personalized email that:
   - Opens with a genuine reference to the news (not generic congratulations)
   - Shows you understand their business context
   - Briefly introduces value proposition
   - Includes a clear call-to-action
   - Keeps the tone professional but conversational
   - Is concise (under 150 words)

Guidelines:
- Use the news as a natural icebreaker, not a forced compliment
- Be specific about which news item you're referencing
- Avoid generic phrases like "I came across your company"
- Make it about them, not about you
- Keep subject line intriguing but professional (under 60 characters)

Return structured output with subject, emailBody, and newsReference fields.
```

### User Prompt (Input al AI Agent)

```
Lead Information:
- Name: {{ First name }} {{ Last name }}
- Email: {{ Email }}
- Company: {{ companyName }}
- Company Domain: {{ companyDomain }}

All Research Results (Google Search):
{{ JSON.stringify($json.organic) }}
```

### Por Qué Este Prompt Funciona

- **Enfoque en noticias como icebreaker:** No es un email genérico, usa contexto real
- **Instrucciones específicas:** "under 150 words", "under 60 characters" elimina ambigüedad
- **Prohibiciones explícitas:** "Avoid generic phrases" previene emails templados
- **Resultados orgánicos de Google:** La IA tiene acceso a múltiples fuentes, no solo títulos
- **Output estructurado:** 3 campos claros (subject, emailBody, newsReference)
- **Tono definido:** "Professional but conversational" es específico y medible

---

## 🎬 Demo: Cómo Usar el Sistema

### Flujo Completo

1. **Lead completa formulario Tally**
   - Ingresa sus datos (nombre, email, empresa, etc.)
   - Hace clic en "Submit"

2. **Automatización se activa**
   - Webhook recibe los datos
   - Workflow se ejecuta en n8n (tarda ~10-15 segundos)

3. **Investigación automática**
   - Extrae dominio de la empresa
   - Busca noticias en Google vía Serper

4. **IA genera email**
   - Analiza datos del lead + noticias
   - Crea email personalizado
   - Estructura en formato JSON

5. **Guardado en CRM**
   - Contacto se crea/actualiza en HubSpot
   - Email generado se guarda en notas del contacto

6. **Revisión humana**
   - Ve a HubSpot → Contacts
   - Busca el nuevo lead
   - Revisa el email generado en Notes
   - Edita si es necesario
   - Envía desde HubSpot o tu cliente de email

### Ejemplo de Email Generado

**Input (formulario Tally):**
- First name: Juan
- Last name: Pérez
- Email: juan@techstartup.com
- Company Search Query: "TechStartup funding news"

**Procesamiento:**
1. Extract Company Domain: `techstartup.com` → `Techstartup`
2. Serper Search: Busca "TechStartup funding news" en Google
3. Resultados encontrados:
   - "TechStartup Raises $5M Series A to Scale AI Platform"
   - "TechStartup Launches New Automation Tools for B2B"
   - "TechStartup Named in Forbes 30 Under 30"

**Output (JSON estructurado):**

```json
{
  "subject": "Your Series A and scaling automation at Techstartup",
  "emailBody": "Hi Juan,\n\nI noticed Techstartup just raised $5M in Series A - congratulations on the milestone. Scaling from seed to Series A often means your sales processes need to evolve faster than your team can grow.\n\nWe help B2B companies automate their lead qualification and outreach without sacrificing personalization. Companies similar to yours typically see 3x pipeline growth within 60 days.\n\nWould a 15-minute call make sense to explore if this approach fits your current priorities?",
  "newsReference": "TechStartup Raises $5M Series A to Scale AI Platform (February 2026)"
}
```

**Email final visto por el lead:**

```
Subject: Your Series A and scaling automation at Techstartup

Hi Juan,

I noticed Techstartup just raised $5M in Series A - congratulations on the 
milestone. Scaling from seed to Series A often means your sales processes 
need to evolve faster than your team can grow.

We help B2B companies automate their lead qualification and outreach without 
sacrificing personalization. Companies similar to yours typically see 3x 
pipeline growth within 60 days.

Would a 15-minute call make sense to explore if this approach fits your 
current priorities?
```

**Guardado en HubSpot:**
- Contact: juan@techstartup.com
- First Name: Juan
- Last Name: Pérez
- Company: TechStartup
- Custom Property `personalized_email_subject`: "Your Series A and scaling..."
- Custom Property `personalized_email_body`: "Hi Juan, I noticed..."
- Custom Property `news_reference`: "TechStartup Raises $5M..."

---

## 🧪 Testing del Workflow

### Test Completo (End-to-End)

1. Activa el workflow en n8n
2. Completa el formulario Tally con datos de prueba
3. Ve a n8n → Executions
4. Observa cada nodo ejecutarse (deben estar en verde)
5. Ve a HubSpot → Contacts
6. Busca el email del lead
7. Verifica que el email esté en Notes

### Test Individual de Nodos

#### Probar el Webhook

```bash
curl -X POST https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission \
  -H "Content-Type: application/json" \
  -d @examples/sample-form-submission.json
```

#### Probar Serper Manualmente

```bash
curl -X POST https://google.serper.dev/search \
  -H "X-API-KEY: tu_serper_api_key" \
  -H "Content-Type: application/json" \
  -d '{"q": "TechStartup funding news"}'
```

**Nota:** El endpoint cambió de `/news` a `/search` para obtener resultados orgánicos más completos.

#### Probar OpenRouter Manualmente

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer tu_openrouter_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-ai/glm-4.5-air:free",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Hello"}
    ]
  }'
```

**Modelos actualizados:**
- Primario: `z-ai/glm-4.5-air:free` (más rápido, mejor con structured outputs)
- Fallback: `openai/gpt-oss-120b:free` (conectado al Output Parser como alternativa)

---

## 🐛 Troubleshooting

### Error: "Webhook no recibe datos de Tally"

**Causa:** URL incorrecta o workflow inactivo.

**Solución:**
1. Verifica que el workflow esté "Active" (switch verde en n8n)
2. Usa la URL de **producción**, no la de test
3. En Tally, prueba el webhook con "Send test"
4. Revisa n8n → Executions para ver si llegó algo

---

### Error: "Serper devuelve 401 Unauthorized"

**Causa:** API key incorrecta o mal configurada.

**Solución:**
1. Verifica tu API key en serper.dev/dashboard
2. En n8n, edita el nodo "Search Company News (Serper)"
3. Verifica la autenticación: Generic Credential Type → Header Auth
4. Header Name debe ser exactamente: `X-API-KEY`
5. Header Value: Tu API key de Serper (sin espacios ni comillas extras)

---

### Error: "AI Agent no genera JSON válido"

**Causa:** Output Parser mal configurado o modelo incompatible.

**Solución:**
1. Verifica que el Email Structure Parser esté conectado al AI Agent
2. Revisa el schema JSON (debe tener exactamente 3 propiedades: subject, emailBody, newsReference)
3. El modelo actual `z-ai/glm-4.5-air:free` es muy confiable con JSON
4. Si falla, usa el modelo fallback `openai/gpt-oss-120b:free`
5. Asegúrate de que "Auto Fix" esté enabled en el Output Parser

---

### Error: "HubSpot devuelve 400 Bad Request"

**Causa:** Custom properties no existen en HubSpot o campos mal mapeados.

**Solución:**
1. **Crear custom properties en HubSpot primero:**
   - Ve a Settings → Properties → Create property
   - Crea estas 3 propiedades tipo "Single-line text":
     * `personalized_email_subject`
     * `personalized_email_body`
     * `news_reference`
2. Verifica que el formulario Tally tenga los campos en el ORDEN correcto (índices 0, 1, 2, 4)
3. En n8n, verifica que los mappings usen los índices correctos:
   - `fields[0]` = First name
   - `fields[1]` = Last name
   - `fields[2]` = Email
   - `fields[4]` = Company/Query

---

### Los emails generados son genéricos

**Causa:** Búsqueda de Google devuelve resultados poco relevantes o prompt necesita ajustes.

**Solución:**
1. Mejora la query de búsqueda en el formulario:
   - En lugar de solo "Company Name", pide "Company Name + recent news" o "Company Name funding"
   - Esto ayuda a que Serper devuelva resultados más relevantes
2. Mejora el System Prompt:
   - Especifica exactamente cómo usar las noticias: "Open with a genuine reference to the news"
   - Prohibe frases genéricas explícitamente
3. Verifica que Serper esté devolviendo resultados orgánicos completos:
   - Revisa `$json.organic` en el nodo AI Agent
   - Debe tener al menos 3-5 resultados con snippets
4. Considera usar el modelo fallback `openai/gpt-oss-120b:free` que es excelente para personalización

---

## 🚀 Extensiones Posibles

### 1. Envío Automático de Emails

Reemplaza el nodo de HubSpot con:
- **Gmail API** (envío directo)
- **SendGrid** (profesional, tracking)
- **Resend** (moderno, simple)

**Consideración:** Siempre deja revisión humana antes de enviar en frío.

---

### 2. Enriquecimiento de Datos

Agrega APIs adicionales:
- **Clearbit:** Información de empresa y persona
- **Hunter.io:** Verificar validez del email
- **LinkedIn API:** Foto y perfil del lead

---

### 3. Scoring de Leads

Agrega un nodo de código que calcule score basado en:
- Tamaño de empresa (más empleados = mayor score)
- Cargo (CTO/CEO = mayor score)
- Engagement (completó todos los campos = mayor score)

---

### 4. Follow-up Automático

Crea un segundo workflow con Schedule Trigger:
- Cada 3 días, revisa leads sin respuesta
- Genera follow-up email diferente
- Envía automáticamente si score > 70

---

### 5. Análisis de Intención

Usa el campo "Mensaje" para clasificar intención:
- **Alta intención:** "Quiero contratar", "Necesito urgente"
- **Media intención:** "Cuéntame más", "Tengo interés"
- **Baja intención:** "Solo curiosidad"

Enruta a diferentes equipos según intención.

---

## 🔧 Herramienta: n8n-flow-manager

Este workflow fue exportado usando **[n8n-flow-manager](https://github.com/Mgobeaalcoba/n8n-flow-manager)**, una herramienta CLI profesional para gestionar workflows.

### Instalación

```bash
pipx install n8n-flow-manager
```

### Uso Básico

```bash
# Exportar este workflow
n8n-py get-workflow [ID] --output ventas/workflow.json

# Importar a otra instancia
n8n-py deploy ventas/workflow.json --activate

# Backup de todos tus workflows
n8n-py backup --output ./backups
```

Documentación completa: [PyPI Package](https://pypi.org/project/n8n-flow-manager/)

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [n8n Docs](https://docs.n8n.io/)
- [Tally Webhooks](https://tally.so/help/webhooks)
- [Serper API](https://serper.dev/docs)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [HubSpot API](https://developers.hubspot.com/)

### Comunidades
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Discord](https://discord.gg/n8n)

---

## 🎓 Notas para el Instructor

### Timing de la Demo (40 min)

- **0-5 min:** Presentación del problema (prospección manual vs automatizada)
- **5-10 min:** Explicación del stack y arquitectura
- **10-20 min:** Walkthrough del workflow nodo por nodo
- **20-30 min:** Demo en vivo (formulario → HubSpot)
- **30-35 min:** Revisar email generado y ajustes de prompt
- **35-40 min:** Q&A y extensiones posibles

### Tips para la Presentación

1. **Ten un formulario pre-lleno** listo para enviar rápidamente
2. **Muestra 2-3 ejecuciones previas exitosas** por si la demo falla
3. **Prepara un email de ejemplo impreso** para comparar calidad
4. **Ten HubSpot abierto en otra pestaña** para mostrar resultado inmediatamente

### Puntos Clave a Enfatizar

- **ROI claro:** 17 min → 30 seg por lead
- **Personalización real:** No es template, usa datos actuales
- **Output Parser es crítico:** Sin él, JSON inconsistente rompe todo
- **Siempre revisión humana:** Automatización acelera, no reemplaza criterio
- **Escalabilidad:** Este patrón funciona para cualquier flujo B2B

---

## 📝 Licencia

Proyecto educativo para Henry Bootcamp - 2026

Material libre para uso educativo con atribución.

---

**Preparado por:** Mariano Gobea Alcoba  
**GitHub:** [@Mgobeaalcoba](https://github.com/Mgobeaalcoba)

---

**¿Listo para automatizar tu prospección? 🚀**

[← Volver al índice principal](../README.md)
