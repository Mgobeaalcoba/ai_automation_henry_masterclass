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

---

## 🏗️ Arquitectura del Sistema

```
Formulario Tally
      ↓
  Webhook n8n
      ↓
Workflow Configuration (Set API keys)
      ↓
Extract Company Domain (Code)
      ↓
Search Company News (Serper API)
      ↓
AI Agent (OpenRouter + LangChain)
      ↓
Create/Update Contact (HubSpot CRM)
```

### Flujo de Datos

1. **Captura:** Lead completa formulario Tally (nombre, email, empresa, cargo, mensaje)
2. **Webhook:** Tally envía datos a n8n automáticamente
3. **Extracción:** JavaScript extrae el dominio de la URL de la empresa
4. **Investigación:** Serper busca las 3 noticias más recientes de la empresa
5. **Generación:** AI Agent crea email personalizado basado en:
   - Datos del lead (cargo, empresa, mensaje)
   - Noticias encontradas (contexto real)
6. **CRM:** El contacto se crea/actualiza en HubSpot con el email generado

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
- **Serper** accede a Google News API sin complejidad de OAuth
- **OpenRouter** da acceso a modelos gratuitos (Hermes 405B, Gemini Flash)
- **HubSpot** CRM gratuito sin restricciones absurdas (vs. Salesforce)

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

**Modelos recomendados:**
- `nousresearch/hermes-3-llama-3.1-405b:free` (gratis)
- `google/gemini-2.0-flash-thinking-exp:free` (gratis)
- `google/gemini-flash-1.5` (muy barato, excelente calidad)

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
4. El workflow se abrirá con 9 nodos
```

#### 2.2 Configurar Nodos

El workflow tiene **6 nodos principales** + **3 sub-nodos**:

**Nodo 1: Tally Form Webhook**
- Path: `tally-form-submission` (ya configurado)
- Method: POST
- Copiar la URL de producción (no la de test)
- Formato: `https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission`

**Nodo 2: Workflow Configuration (Set)**
- Agregar variable: `serperApiKey`
- Value: Tu API key de Serper (sin comillas)

**Nodo 3: Extract Company Domain (Code)**
- Lenguaje: JavaScript
- Código ya incluido en el workflow
- Extrae dominio de URLs como: `https://www.example.com/about` → `example.com`

**Nodo 4: Search Company News (HTTP Request)**
- URL: `https://google.serper.dev/news`
- Method: POST
- Headers:
  - `X-API-KEY`: `{{ $node["Workflow Configuration"].json["serperApiKey"] }}`
  - `Content-Type`: `application/json`
- Body:
  ```json
  {
    "q": "{{ $node['Extract Company Domain'].json['domain'] }}",
    "num": 3
  }
  ```

**Nodo 5: Generate Personalized Email (AI Agent)**
- Requiere configurar sub-nodos:
  - OpenRouter Chat Model (credenciales)
  - Output Parser (schema JSON)

**Sub-nodo: OpenRouter Chat Model**
- Credential Type: Generic Credential Type
- Credential: Crear nueva credencial HTTP Request
  - Name: `OpenRouter API`
  - Method: POST
  - URL: `https://openrouter.ai/api/v1/chat/completions`
  - Authentication: Header Auth
    - Header Name: `Authorization`
    - Header Value: `Bearer tu_openrouter_api_key`
- Model: `nousresearch/hermes-3-llama-3.1-405b:free`
- Temperature: 0.7
- Max Tokens: 1000

**Sub-nodo: Structured Output Parser**
- Type: Structured Output Parser
- Schema (JSON):
  ```json
  {
    "type": "object",
    "properties": {
      "subject": { "type": "string", "description": "Email subject line" },
      "greeting": { "type": "string", "description": "Email greeting" },
      "body": { "type": "string", "description": "Email body content" },
      "closing": { "type": "string", "description": "Email closing" },
      "signature": { "type": "string", "description": "Email signature" }
    },
    "required": ["subject", "greeting", "body", "closing", "signature"]
  }
  ```

**Nodo 6: Create/Update HubSpot Contact**
- Resource: Contact
- Operation: Create or Update
- Resolve Data: Using Fields Below
- Email: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('email')).value }}`
- Additional Fields:
  - First Name: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('nombre')).value.split(' ')[0] }}`
  - Last Name: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('nombre')).value.split(' ').slice(1).join(' ') }}`
  - Company: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('empresa')).value }}`
  - Job Title: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('cargo')).value }}`
  - Website: `{{ $json.data.fields.find(f => f.label.toLowerCase().includes('web')).value }}`
- Custom Properties:
  - `hs_note_body`: `{{ $('Generate Personalized Email').item.json.output }}`

---

### Paso 3: Crear Formulario Tally (5 min)

#### 3.1 Campos del Formulario

Crea un formulario en Tally con estos campos (en este orden):

1. **Nombre completo** (Text)
   - Label: "¿Cuál es tu nombre completo?"
   - Required: Yes

2. **Email** (Email)
   - Label: "¿Cuál es tu email?"
   - Required: Yes

3. **Empresa** (Text)
   - Label: "¿En qué empresa trabajas?"
   - Required: Yes

4. **Sitio web de la empresa** (URL)
   - Label: "¿Cuál es el sitio web de tu empresa?"
   - Required: Yes

5. **Cargo** (Text)
   - Label: "¿Cuál es tu cargo?"
   - Required: Yes

6. **Mensaje** (Textarea)
   - Label: "¿Qué te gustaría compartir con nosotros?"
   - Required: No

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
Eres un experto en ventas B2B y redacción de emails comerciales personalizados.

Tu tarea es generar un email altamente personalizado para un lead que completó un formulario de contacto.

INFORMACIÓN DEL LEAD:
- Nombre: {{ datos del formulario }}
- Email: {{ datos del formulario }}
- Empresa: {{ datos del formulario }}
- Cargo: {{ datos del formulario }}
- Mensaje: {{ datos del formulario }}

INVESTIGACIÓN DE LA EMPRESA:
{{ Noticias de Serper }}

INSTRUCCIONES:

1. PERSONALIZACIÓN:
   - Menciona específicamente el cargo y la empresa del lead
   - Si hay noticias recientes, refiérelas de forma natural
   - Usa el mensaje del lead para entender sus necesidades
   - Evita sonar genérico o templado

2. ESTRUCTURA DEL EMAIL:
   - Subject: Atractivo y personalizado (max 60 caracteres)
   - Greeting: Saludo cordial usando el nombre
   - Body: 2-3 párrafos (200-300 palabras)
     * Párrafo 1: Contexto y empatía con su situación
     * Párrafo 2: Cómo podemos ayudar (beneficios concretos)
     * Párrafo 3: Call to action claro y de bajo compromiso
   - Closing: Cierre profesional
   - Signature: Tu nombre y cargo

3. TONO:
   - Profesional pero cercano
   - Consultivo, no vendedor agresivo
   - Enfocado en ayudar, no en vender
   - Lenguaje claro y directo

4. EVITAR:
   - Lenguaje corporativo genérico
   - Promesas vacías
   - Presión de venta
   - Emails largos (máximo 300 palabras)

Responde SOLO con el JSON estructurado. No agregues texto adicional.
```

### Por Qué Este Prompt Funciona

- **Contexto claro:** La IA sabe exactamente qué información tiene disponible
- **Estructura definida:** No hay ambigüedad sobre el formato esperado
- **Restricciones explícitas:** "Evita X" previene errores comunes
- **Tono específico:** "Profesional pero cercano" es más preciso que "amigable"
- **Output Parser:** Garantiza formato JSON consistente

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

**Input (formulario):**
- Nombre: Juan Pérez
- Email: juan@techstartup.com
- Empresa: TechStartup
- Sitio: https://techstartup.com
- Cargo: CTO
- Mensaje: "Buscamos automatizar nuestro proceso de ventas"

**Noticias encontradas:**
- "TechStartup levanta $5M en Serie A"
- "TechStartup lanza nueva plataforma de IA"

**Output (email generado):**

```
Subject: Felicitaciones por la Serie A, Juan

Hola Juan,

Vi que TechStartup acaba de levantar $5M en Serie A - ¡felicitaciones! 
Entiendo que con el crecimiento viene la necesidad de escalar procesos, 
especialmente en ventas.

Como CTO, sabes que la automatización no es solo "nice to have" - es 
crítica para mantener márgenes saludables mientras escalas. Nuestra 
plataforma ayuda a equipos técnicos como el tuyo a automatizar desde 
la captación hasta el follow-up, sin necesidad de contratar más SDRs.

¿Te parece útil una llamada de 15 minutos para revisar cómo otras startups 
en crecimiento están resolviendo este problema?

Saludos,
[Tu nombre]
[Tu cargo]
```

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
curl -X POST https://google.serper.dev/news \
  -H "X-API-KEY: tu_serper_api_key" \
  -H "Content-Type: application/json" \
  -d '{"q": "techcrunch", "num": 3}'
```

#### Probar OpenRouter Manualmente

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer tu_openrouter_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nousresearch/hermes-3-llama-3.1-405b:free",
    "messages": [
      {"role": "system", "content": "Eres un asistente útil"},
      {"role": "user", "content": "Hola"}
    ]
  }'
```

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
2. En n8n, edita el nodo "Workflow Configuration"
3. Asegúrate de que `serperApiKey` tenga el valor correcto
4. NO incluyas espacios ni caracteres extra

---

### Error: "AI Agent no genera JSON válido"

**Causa:** Output Parser mal configurado o modelo incompatible.

**Solución:**
1. Verifica que el Output Parser esté conectado al AI Agent
2. Revisa el schema JSON (debe tener las 5 propiedades)
3. Cambia a `google/gemini-2.0-flash-exp` (más confiable con JSON)
4. Asegúrate de que el System Prompt termine con: "Responde SOLO con JSON"

---

### Error: "HubSpot devuelve 400 Bad Request"

**Causa:** Campos requeridos faltantes o mal mapeados.

**Solución:**
1. Verifica que el formulario Tally tenga TODOS los campos
2. Los labels deben coincidir (ej: "nombre", "email", "empresa")
3. En n8n, edita el nodo HubSpot
4. Usa "Resolve Data: Using Fields Below"
5. Mapea cada campo manualmente

---

### Los emails generados son genéricos

**Causa:** Prompt poco específico o datos insuficientes.

**Solución:**
1. Mejora el System Prompt:
   - Agrega ejemplos de "buenos" vs "malos" emails
   - Especifica exactamente qué mencionar de las noticias
   - Prohibe frases genéricas ("a quien corresponda", "espero que estés bien")
2. Verifica que Serper esté devolviendo noticias relevantes
3. Aumenta Max Tokens a 1500 para emails más detallados
4. Usa Gemini Flash (mejor calidad que modelos gratuitos)

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
