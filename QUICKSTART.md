# ⚡ Quick Start Guide - 15 Minutos de Setup

Esta guía te llevará desde cero hasta tener el workflow funcionando en aproximadamente 15 minutos.

---

## 🎯 Objetivo

Al final de esta guía tendrás:
- ✅ Todas las cuentas creadas
- ✅ API keys configuradas
- ✅ Workflow importado en n8n
- ✅ Formulario Tally conectado
- ✅ Primera prueba exitosa

---

## ⏱️ Checklist de 15 Minutos

### ☑️ Paso 1: Crear Cuentas (5 minutos)

Abre todas estas páginas en pestañas diferentes y regístrate:

```bash
1. n8n Cloud:     https://app.n8n.cloud/register
2. Tally.so:      https://tally.so/signup
3. Serper.dev:    https://serper.dev/signup
4. OpenRouter:    https://openrouter.ai/
5. HubSpot:       https://www.hubspot.com/products/get-started
```

**Consejos:**
- Usa la misma dirección de email para todas
- Usa "Sign up with Google" para ir más rápido
- Verifica los emails de confirmación

---

### ☑️ Paso 2: Obtener API Keys (3 minutos)

#### Serper API Key
1. Ve a [serper.dev](https://serper.dev) → Dashboard
2. Copia tu API Key
3. Guárdala en un archivo de texto

#### OpenRouter API Key
1. Ve a [openrouter.ai](https://openrouter.ai) → Keys
2. Haz clic en "Create Key"
3. Copia y guarda la key

#### HubSpot API Key
1. HubSpot → Settings (⚙️) → Integrations → Private Apps
2. "Create a private app"
3. Name: "n8n Automation"
4. Scopes: `crm.objects.contacts.read` + `crm.objects.contacts.write`
5. "Create app" → Copia el token

---

### ☑️ Paso 3: Importar Workflow en n8n (2 minutos)

1. **Descargar el workflow:**
   - Ve a `workflows/sales-automation-workflow.json`
   - Descárgalo a tu computadora

2. **Importar en n8n:**
   - Abre n8n Cloud
   - Haz clic en "Workflows" → "Import from File"
   - Selecciona el archivo JSON
   - El workflow se abrirá automáticamente

3. **Primer vistazo:**
   - Verás 9 nodos conectados
   - Algunos mostrarán iconos de advertencia (⚠️) - es normal
   - Significa que faltan las credenciales

---

### ☑️ Paso 4: Configurar Credenciales (3 minutos)

#### 4.1 Serper API Key

1. Abre el nodo **"Workflow Configuration (Set)"**
2. En el campo `serperApiKey`, pega tu API key de Serper
3. Guarda (Ctrl/Cmd + S)

#### 4.2 OpenRouter API Key

1. Ve a "Credentials" en el menú lateral de n8n
2. Haz clic en "+ Add Credential"
3. Busca "OpenRouter"
4. **Name:** "OpenRouter API"
5. **API Key:** Pega tu key de OpenRouter
6. Guarda

7. Abre los nodos **"OpenRouter Chat Model"** (hay 2)
8. En "Credentials", selecciona "OpenRouter API"
9. **Modelo:** `nousresearch/hermes-3-llama-3.1-405b:free`
10. Guarda ambos nodos

#### 4.3 HubSpot API Key

1. Ve a "Credentials" → "+ Add Credential"
2. Busca "HubSpot"
3. **Authentication:** "API Key"
4. **API Key:** Pega tu token de HubSpot
5. Guarda

6. Abre el nodo **"Create/Update HubSpot Contact"**
7. En "Credentials", selecciona la credencial de HubSpot
8. Guarda

---

### ☑️ Paso 5: Activar Workflow y Obtener URL (30 segundos)

1. Haz clic en el switch **"Active"** (arriba a la derecha)
2. El workflow debe ponerse verde
3. Abre el nodo **"Tally Form Webhook"**
4. Copia la **Production URL**

Ejemplo:
```
https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission
```

---

### ☑️ Paso 6: Crear Formulario en Tally (2 minutos)

1. **Crear nuevo formulario:**
   - Ve a Tally → "Create new form"
   - "Start from scratch"

2. **Agregar campos (en este orden):**
   - Short text: "¿Cuál es tu nombre completo?"
   - Email: "¿Cuál es tu email de trabajo?"
   - Short text: "¿En qué empresa trabajas?"
   - URL: "¿Cuál es el sitio web de tu empresa?"
   - Short text: "¿Cuál es tu cargo?"
   - Long text: "¿Hay algo más que quieras compartir?" (opcional)

3. **Configurar webhook:**
   - Haz clic en "Integrations" → "Webhooks"
   - **URL:** Pega la URL del webhook de n8n
   - **Trigger:** "On form submit"
   - **Method:** POST
   - Guarda

4. **Publicar:**
   - Haz clic en "Publish"
   - Copia el enlace del formulario

---

### ☑️ Paso 7: Primera Prueba (2 minutos)

1. **Abrir formulario:**
   - Ve al enlace del formulario de Tally
   - Completa con datos de prueba:

   ```
   Nombre: Test User
   Email: test@example.com
   Empresa: Example Corp
   Sitio web: https://www.example.com
   Cargo: Product Manager
   Mensaje: Probando el workflow de automatización
   ```

2. **Enviar formulario:**
   - Haz clic en "Submit"

3. **Verificar en n8n:**
   - Ve a n8n → "Executions"
   - Deberías ver una nueva ejecución
   - Haz clic para ver los detalles
   - Todos los nodos deben estar en verde ✅

4. **Verificar en HubSpot:**
   - Ve a HubSpot → "Contacts"
   - Busca "test@example.com"
   - Verifica que el contacto se creó
   - Revisa las "Notes" (ahí estará el email generado)

---

## ✅ ¡Listo!

Si completaste todos los pasos, tu workflow está funcionando. Ahora puedes:

1. **Personalizar el formulario** según tus necesidades
2. **Ajustar el prompt de la IA** para cambiar el estilo de los emails
3. **Probar con datos reales** de tu negocio
4. **Compartir el formulario** con prospectos reales

---

## 🐛 ¿Algo salió mal?

### Si el formulario no dispara el workflow:

```bash
✓ Verifica que el workflow esté Active (verde)
✓ Revisa que la URL del webhook esté correcta en Tally
✓ Asegúrate de que el formulario esté publicado
```

### Si algún nodo falla:

```bash
✓ Revisa las credenciales (API keys)
✓ Verifica que las API keys sean válidas
✓ Comprueba que no hayas agotado los créditos (Serper)
```

### Si el email no se genera bien:

```bash
✓ Revisa el modelo de OpenRouter (debe ser uno gratuito)
✓ Verifica que el prompt esté completo
✓ Prueba con otro modelo gratuito
```

📖 **Guía completa de troubleshooting:** [`docs/troubleshooting/COMMON_ISSUES.md`](docs/troubleshooting/COMMON_ISSUES.md)

---

## 📚 Próximos Pasos

### Para Aprender Más:

1. **Leer la documentación de cada nodo:**
   - [`docs/nodos/01-WEBHOOK.md`](docs/nodos/01-WEBHOOK.md)
   - [`docs/nodos/05-AI-AGENT.md`](docs/nodos/05-AI-AGENT.md)

2. **Explorar ejemplos:**
   - [`examples/sample-form-submission.json`](examples/sample-form-submission.json)
   - [`examples/sample-email-output.json`](examples/sample-email-output.json)

3. **Personalizar el workflow:**
   - Cambiar el prompt de la IA
   - Agregar más campos al formulario
   - Integrar con otras herramientas

---

## 🎓 Tips para la Masterclass

Si vas a presentar este proyecto:

1. **Pre-configuración:**
   - Ten todas las cuentas creadas antes
   - API keys listas en un archivo de texto
   - Workflow ya importado (solo muestra la configuración)

2. **Durante la demo:**
   - Usa el script `test-webhook.js` para pruebas rápidas
   - Ten datos de prueba predefinidos
   - Muestra una ejecución exitosa previamente completada

3. **Backup:**
   - Ten capturas de pantalla por si algo falla
   - Prepara un video corto de la demo funcionando
   - Ten el workflow en una cuenta de prueba funcionando

---

## ⏱️ Resumen de Tiempos

| Paso | Tiempo | Total Acumulado |
|------|--------|-----------------|
| 1. Crear cuentas | 5 min | 5 min |
| 2. Obtener API keys | 3 min | 8 min |
| 3. Importar workflow | 2 min | 10 min |
| 4. Configurar credenciales | 3 min | 13 min |
| 5. Activar workflow | 30 seg | 13.5 min |
| 6. Crear formulario Tally | 2 min | 15.5 min |
| 7. Primera prueba | 2 min | **17.5 min** |

💡 **Meta:** Completar en menos de 20 minutos

---

## 🚀 Stack Completo (Recordatorio)

| Herramienta | Propósito | Costo |
|-------------|-----------|-------|
| n8n Cloud | Orquestación | Gratis (5,000 ejecuciones/mes) |
| Tally.so | Formularios | Gratis (ilimitado) |
| Serper.dev | Búsquedas Google | Gratis (2,500 créditos) |
| OpenRouter | IA Generativa | Gratis (modelos seleccionados) |
| HubSpot | CRM | Gratis (1,000,000 contactos) |

**Costo total:** $0 💰

---

**¿Listo para automatizar tu prospección de ventas? ¡Adelante! 🚀**

Si tienes dudas o problemas, consulta:
- 📖 [README principal](README.md)
- 📋 [Prerequisitos detallados](docs/setup/PREREQUISITES.md)
- 🐛 [Troubleshooting](docs/troubleshooting/COMMON_ISSUES.md)
