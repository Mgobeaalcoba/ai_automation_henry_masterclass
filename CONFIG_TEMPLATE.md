# 🔑 Configuración de API Keys y Credenciales

Este archivo te ayuda a mantener un registro de todas las credenciales necesarias para el workflow.

⚠️ **IMPORTANTE:** Este es un template. Copia este archivo a `CONFIG.env` y llénalo con tus keys reales.
**NO subas tus keys reales a GitHub o repositorios públicos.**

---

## 📋 Checklist de Credenciales

- [ ] Serper API Key
- [ ] OpenRouter API Key
- [ ] HubSpot Private App Token
- [ ] n8n Webhook URL
- [ ] Tally Form URL

---

## 🔐 API Keys

### 1. Serper.dev API Key

**Dónde obtenerla:**
1. Ve a https://serper.dev
2. Dashboard → API Key
3. Copia tu key

**Formato:**
```
Longitud: 64 caracteres hexadecimales
Ejemplo: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Tu API Key:**
```
SERPER_API_KEY=TU_KEY_AQUI
```

**Dónde usarla:**
- n8n → Nodo "Workflow Configuration (Set)" → Campo `serperApiKey`

**Plan Gratuito:**
- 2,500 búsquedas totales (no renovables)
- Sin necesidad de tarjeta de crédito

---

### 2. OpenRouter API Key

**Dónde obtenerla:**
1. Ve a https://openrouter.ai
2. Sign in with Google
3. Ve a "Keys" → "Create Key"
4. Copia tu key

**Formato:**
```
Prefijo: sk-or-v1-
Ejemplo: sk-or-v1-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Tu API Key:**
```
OPENROUTER_API_KEY=TU_KEY_AQUI
```

**Dónde usarla:**
- n8n → Credentials → "OpenRouter API"
- Aplicar en nodos "OpenRouter Chat Model"

**Modelos Gratuitos a Usar:**
```
nousresearch/hermes-3-llama-3.1-405b:free
google/gemini-2.0-flash-thinking-exp:free
meta-llama/llama-3.2-3b-instruct:free
```

---

### 3. HubSpot Private App Token

**Dónde obtenerlo:**
1. HubSpot → Settings (⚙️)
2. Integrations → Private Apps
3. "Create a private app"
4. Name: "n8n Automation"
5. Scopes necesarios:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
6. "Create app" → Copia el token

**Formato:**
```
Prefijo: pat-na1- o pat-eu1-
Ejemplo: pat-na1-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

**Tu Token:**
```
HUBSPOT_API_TOKEN=TU_TOKEN_AQUI
```

**Dónde usarlo:**
- n8n → Credentials → "HubSpot API"
- Aplicar en nodo "Create/Update HubSpot Contact"

**Permisos Requeridos:**
- ✅ Leer contactos (read)
- ✅ Escribir contactos (write)

---

## 🔗 URLs y Endpoints

### n8n Webhook URL

**Dónde obtenerla:**
1. Abre tu workflow en n8n
2. Haz clic en el nodo "Tally Form Webhook"
3. Copia la "Production URL"

**Formato:**
```
https://[tu-instancia].app.n8n.cloud/webhook/tally-form-submission
```

**Tu Webhook URL:**
```
N8N_WEBHOOK_URL=TU_URL_AQUI
```

**Dónde usarla:**
- Tally.so → Integrations → Webhooks → URL

⚠️ **Importante:** Usa la URL de producción, NO la de test.

---

### Tally Form URL

**Dónde obtenerla:**
1. Tally → Tu formulario
2. Haz clic en "Publish"
3. Copia el enlace público

**Formato:**
```
https://tally.so/r/[id-del-form]
```

**Tu Form URL:**
```
TALLY_FORM_URL=TU_URL_AQUI
```

**Dónde usarla:**
- Para compartir con leads
- Para probar el workflow

---

## 📧 Información de Contacto (Para el Email)

Estos datos se usan en la firma del email generado por la IA:

```
TU_NOMBRE=Tu Nombre Completo
TU_CARGO=Tu Cargo / Título
TU_EMPRESA=Tu Empresa
TU_EMAIL=tu.email@empresa.com
TU_TELEFONO=+1 (555) 123-4567 (opcional)
TU_WEBSITE=https://www.tuempresa.com (opcional)
```

---

## 🧪 Datos de Prueba

Usa estos datos para probar el workflow:

```
TEST_NOMBRE=Test User
TEST_EMAIL=test.user@example.com
TEST_EMPRESA=Example Corporation
TEST_WEBSITE=https://www.example.com
TEST_CARGO=Product Manager
TEST_MENSAJE=Esta es una prueba del workflow de automatización
```

---

## ✅ Verificación de Configuración

Usa este checklist para verificar que todo esté configurado:

### Serper
- [ ] API Key copiada
- [ ] Configurada en nodo "Workflow Configuration (Set)"
- [ ] Probada con una búsqueda de prueba
- [ ] Créditos disponibles verificados (https://serper.dev/dashboard)

### OpenRouter
- [ ] API Key copiada
- [ ] Credencial creada en n8n
- [ ] Aplicada en ambos nodos "OpenRouter Chat Model"
- [ ] Modelo gratuito seleccionado
- [ ] Probada con un prompt de prueba

### HubSpot
- [ ] Private App creada
- [ ] Token copiado
- [ ] Scopes correctos configurados (read + write)
- [ ] Credencial creada en n8n
- [ ] Aplicada en nodo "Create/Update HubSpot Contact"
- [ ] Probada creando un contacto de prueba

### n8n
- [ ] Workflow importado
- [ ] Todas las credenciales configuradas
- [ ] Workflow activado (switch verde)
- [ ] Webhook URL copiada
- [ ] Ejecución de prueba exitosa

### Tally
- [ ] Formulario creado con todos los campos
- [ ] Webhook configurado con URL de n8n
- [ ] Formulario publicado
- [ ] Envío de prueba realizado
- [ ] Form URL copiada

---

## 🔒 Seguridad y Mejores Prácticas

### DO ✅
- ✅ Guarda tus API keys en un password manager
- ✅ Usa un archivo `.env` local (agregado a `.gitignore`)
- ✅ Rota las keys periódicamente
- ✅ Usa keys diferentes para dev/staging/prod
- ✅ Revoca keys que ya no uses

### DON'T ❌
- ❌ NO subas tus keys a GitHub
- ❌ NO compartas tus keys por email/Slack
- ❌ NO uses keys de producción en demos públicas
- ❌ NO comitees archivos con keys reales
- ❌ NO reutilices la misma key en múltiples proyectos

---

## 🆘 Si Pierdes una API Key

### Serper
```
1. Ve a https://serper.dev/dashboard
2. Tu key siempre está visible ahí
3. No se puede regenerar, es única por cuenta
```

### OpenRouter
```
1. Ve a https://openrouter.ai/keys
2. Haz clic en "Create Key" para generar una nueva
3. Las keys antiguas siguen funcionando
4. Puedes tener múltiples keys activas
```

### HubSpot
```
1. HubSpot → Settings → Integrations → Private Apps
2. Abre tu app "n8n Automation"
3. Haz clic en "Show token"
4. Si la perdiste, genera una nueva:
   - "Generate new token"
   - La anterior se revocará automáticamente
```

---

## 📝 Notas Adicionales

### Límites y Quotas

| Servicio | Límite Gratuito | Renovación |
|----------|-----------------|------------|
| Serper | 2,500 búsquedas | No se renueva |
| OpenRouter | Ilimitado* | - |
| HubSpot | 1M contactos | - |
| n8n Cloud | 5,000 ejecuciones | Mensual |
| Tally | Ilimitado | - |

\* Solo modelos gratuitos, sujeto a rate limits por modelo

### Monitoreo de Uso

**Serper:**
- Dashboard: https://serper.dev/dashboard
- Muestra créditos usados y restantes

**OpenRouter:**
- Dashboard: https://openrouter.ai/activity
- Muestra requests por modelo

**HubSpot:**
- Settings → Account → Usage
- Muestra contactos y llamadas API

**n8n:**
- Dashboard → Usage
- Muestra ejecuciones del mes

---

## 🔄 Actualización de Credenciales

Si cambias alguna API key:

1. **Actualiza en n8n:**
   - Ve a Credentials
   - Edita la credencial correspondiente
   - Guarda los cambios

2. **Prueba el workflow:**
   - Ejecuta manualmente el workflow
   - Verifica que no haya errores de autenticación

3. **Actualiza este archivo:**
   - Mantén este CONFIG actualizado
   - Documenta la fecha del cambio

---

**Fecha de última actualización:** [YYYY-MM-DD]

**Versión del workflow:** 1.0

**Configurado por:** [Tu Nombre]

---

## 📋 Template para .env

Si prefieres usar un archivo `.env`, aquí está el template:

```bash
# Serper API
SERPER_API_KEY=tu_key_aqui

# OpenRouter API
OPENROUTER_API_KEY=sk-or-v1-tu_key_aqui

# HubSpot API
HUBSPOT_API_TOKEN=pat-na1-tu_token_aqui

# n8n Webhook
N8N_WEBHOOK_URL=https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission

# Tally Form
TALLY_FORM_URL=https://tally.so/r/tu_form_id

# Datos de firma
TU_NOMBRE="Tu Nombre"
TU_CARGO="Tu Cargo"
TU_EMPRESA="Tu Empresa"
TU_EMAIL=tu@email.com
```

Guarda esto en un archivo llamado `.env` en la raíz del proyecto.

⚠️ **Asegúrate de agregar `.env` a tu `.gitignore`:**
```bash
echo ".env" >> .gitignore
```

---

**¡Mantén tus credenciales seguras! 🔒**
