# 📝 Configuración de Tally.so

Esta guía explica cómo crear y configurar el formulario de captura de leads en Tally.so y conectarlo con n8n mediante webhook.

## 🎯 Objetivo

Crear un formulario que capture información de leads (nombre, email, empresa, etc.) y envíe automáticamente los datos a n8n cuando alguien lo complete.

---

## Paso 1: Crear el Formulario

### 1.1 Nuevo Formulario

1. En el dashboard de Tally, haz clic en **"Create new form"**
2. Selecciona **"Start from scratch"**
3. Dale un nombre: **"Captación de Leads - AI Automation"**

### 1.2 Agregar Campos

Agrega los siguientes campos en este orden:

#### Campo 1: Nombre Completo
- **Tipo:** Short text
- **Label:** "¿Cuál es tu nombre completo?"
- **Variable name:** `nombre_completo`
- **Required:** ✅ Sí
- **Placeholder:** "Juan Pérez"

#### Campo 2: Email
- **Tipo:** Email
- **Label:** "¿Cuál es tu email de trabajo?"
- **Variable name:** `email`
- **Required:** ✅ Sí
- **Placeholder:** "juan@empresa.com"

#### Campo 3: Nombre de la Empresa
- **Tipo:** Short text
- **Label:** "¿En qué empresa trabajas?"
- **Variable name:** `empresa`
- **Required:** ✅ Sí
- **Placeholder:** "Acme Corp"

#### Campo 4: Sitio Web de la Empresa
- **Tipo:** URL
- **Label:** "¿Cuál es el sitio web de tu empresa?"
- **Variable name:** `sitio_web`
- **Required:** ✅ Sí
- **Placeholder:** "https://www.empresa.com"
- **Validation:** Debe ser una URL válida

#### Campo 5: Cargo
- **Tipo:** Short text
- **Label:** "¿Cuál es tu cargo?"
- **Variable name:** `cargo`
- **Required:** ✅ Sí
- **Placeholder:** "CEO, CTO, Marketing Manager, etc."

#### Campo 6: Mensaje (Opcional)
- **Tipo:** Long text
- **Label:** "¿Hay algo más que quieras compartir?"
- **Variable name:** `mensaje`
- **Required:** ❌ No
- **Placeholder:** "Cuéntanos sobre tus necesidades..."

### 1.3 Personalizar Diseño

1. **Título del formulario:**
   ```
   ✨ ¿Quieres recibir información personalizada?
   ```

2. **Descripción:**
   ```
   Completa este formulario y te enviaremos información relevante
   sobre tu empresa en menos de 1 minuto.
   ```

3. **Botón de envío:**
   - Texto: "Enviar información"
   - Color: Azul (#0066FF)

4. **Mensaje de agradecimiento:**
   ```
   🎉 ¡Gracias por tu interés!

   Estamos procesando tu información y te contactaremos pronto.
   ```

---

## Paso 2: Obtener URL del Webhook de n8n

Antes de configurar el webhook en Tally, necesitas la URL del webhook de n8n.

### 2.1 En n8n

1. Abre tu workflow en n8n
2. Busca el nodo **"Tally Form Webhook"**
3. Haz clic en el nodo para ver sus propiedades
4. Copia la **"Webhook URL"**

La URL se verá así:
```
https://[tu-instancia].app.n8n.cloud/webhook/tally-form-submission
```

O en modo de prueba:
```
https://[tu-instancia].app.n8n.cloud/webhook-test/tally-form-submission
```

💡 **Tip:** Usa la URL de producción (sin "test"), no la de prueba.

---

## Paso 3: Configurar Webhook en Tally

### 3.1 Acceder a Integraciones

1. En el editor de tu formulario, haz clic en el botón **"Integrations"** (arriba a la derecha)
2. Busca y selecciona **"Webhooks"**
3. Haz clic en **"Connect"**

### 3.2 Configurar el Webhook

1. **Webhook URL:**
   - Pega la URL del webhook de n8n que copiaste antes
   - Ejemplo: `https://tu-instancia.app.n8n.cloud/webhook/tally-form-submission`

2. **Trigger:**
   - Selecciona: **"On form submit"**
   - Esto enviará los datos cada vez que alguien complete el formulario

3. **Method:**
   - Selecciona: **POST**

4. **Headers (opcional):**
   - No es necesario agregar headers adicionales para esta integración

5. **Test the webhook:**
   - Haz clic en **"Test webhook"**
   - Tally enviará datos de ejemplo a n8n
   - Verifica en n8n que llegó la ejecución de prueba

### 3.3 Guardar Configuración

1. Haz clic en **"Save"**
2. El webhook ahora está activo y enviará datos automáticamente

---

## Paso 4: Publicar el Formulario

### 4.1 Configuración de Publicación

1. Haz clic en **"Publish"** (esquina superior derecha)
2. Opciones de publicación:

   **Opción A: Enlace directo**
   - Tally te dará un enlace único
   - Ejemplo: `https://tally.so/r/abc123`
   - Comparte este enlace en redes sociales, email, etc.

   **Opción B: Embeber en tu sitio**
   - Copia el código embed
   - Pégalo en tu página web
   ```html
   <iframe src="https://tally.so/embed/abc123" width="100%" height="500"></iframe>
   ```

   **Opción C: Popup**
   - Configura el formulario para aparecer como popup
   - Ideal para landing pages

### 4.2 Configuración Adicional

1. **Remove Tally branding (opcional):**
   - Disponible en plan Pro
   - No es necesario para este proyecto

2. **Custom domain (opcional):**
   - Disponible en plan Pro
   - Puedes usar: `forms.tudominio.com`

---

## Paso 5: Probar la Integración Completa

### 5.1 Activar el Workflow en n8n

1. Ve a n8n
2. Abre tu workflow
3. Haz clic en el botón **"Active"** (esquina superior derecha)
4. El workflow debe mostrarse como **"Active"** (verde)

### 5.2 Enviar Formulario de Prueba

1. Abre el formulario publicado en Tally
2. Completa con datos de prueba:
   ```
   Nombre: Test User
   Email: test@example.com
   Empresa: Test Company
   Sitio web: https://www.example.com
   Cargo: Tester
   Mensaje: Esta es una prueba del workflow
   ```

3. Haz clic en **"Enviar información"**

### 5.3 Verificar en n8n

1. Ve a n8n → **"Executions"**
2. Deberías ver una nueva ejecución (marca verde si fue exitosa)
3. Haz clic en la ejecución para ver los detalles
4. Verifica que cada nodo procesó los datos correctamente

### 5.4 Verificar en HubSpot

1. Ve a tu cuenta de HubSpot
2. Navega a **Contacts**
3. Busca el contacto de prueba (`test@example.com`)
4. Verifica que los datos se guardaron correctamente
5. Revisa las **Notes** del contacto (ahí estará el email personalizado)

---

## 📊 Estructura de Datos del Webhook

Cuando Tally envía datos a n8n, lo hace en este formato JSON:

```json
{
  "eventId": "abc123xyz789",
  "eventType": "FORM_RESPONSE",
  "createdAt": "2025-01-30T12:00:00.000Z",
  "data": {
    "responseId": "resp_abc123",
    "submissionId": "sub_xyz789",
    "respondentId": "user_123",
    "formId": "form_abc",
    "formName": "Captación de Leads - AI Automation",
    "createdAt": "2025-01-30T12:00:00.000Z",
    "fields": [
      {
        "key": "question_1",
        "label": "¿Cuál es tu nombre completo?",
        "type": "INPUT_TEXT",
        "value": "Juan Pérez"
      },
      {
        "key": "question_2",
        "label": "¿Cuál es tu email de trabajo?",
        "type": "INPUT_EMAIL",
        "value": "juan@empresa.com"
      },
      {
        "key": "question_3",
        "label": "¿En qué empresa trabajas?",
        "type": "INPUT_TEXT",
        "value": "Acme Corp"
      },
      {
        "key": "question_4",
        "label": "¿Cuál es el sitio web de tu empresa?",
        "type": "INPUT_URL",
        "value": "https://www.acmecorp.com"
      },
      {
        "key": "question_5",
        "label": "¿Cuál es tu cargo?",
        "type": "INPUT_TEXT",
        "value": "CEO"
      },
      {
        "key": "question_6",
        "label": "¿Hay algo más que quieras compartir?",
        "type": "TEXTAREA",
        "value": "Estamos interesados en soluciones de IA"
      }
    ]
  }
}
```

### Acceder a los Valores en n8n

En los nodos siguientes, puedes acceder a los datos así:

```javascript
// Nombre completo
{{ $json.data.fields[0].value }}

// Email
{{ $json.data.fields[1].value }}

// Empresa
{{ $json.data.fields[2].value }}

// Sitio web
{{ $json.data.fields[3].value }}

// Cargo
{{ $json.data.fields[4].value }}

// Mensaje
{{ $json.data.fields[5].value }}
```

O usando el helper de n8n para encontrar por label:
```javascript
{{ $json.data.fields.find(f => f.label.includes('nombre')).value }}
```

---

## 🐛 Troubleshooting

### Problema: El webhook no recibe datos

**Posibles causas:**
1. El workflow no está activo en n8n
2. La URL del webhook es incorrecta
3. El formulario no está publicado

**Solución:**
1. Verifica que el workflow esté **"Active"** en n8n
2. Copia nuevamente la URL del webhook y actualízala en Tally
3. Asegúrate de que el formulario esté publicado (no en modo borrador)

### Problema: Datos llegan pero con errores

**Posibles causas:**
1. Los campos del formulario no coinciden con lo esperado en n8n
2. Validación de campos mal configurada

**Solución:**
1. Verifica la estructura JSON recibida en n8n (sección "Input")
2. Ajusta las expresiones de acceso a los datos según sea necesario

### Problema: Test webhook falla

**Posibles causas:**
1. n8n está esperando en modo "test" pero Tally envía a producción
2. Firewall o bloqueador de red

**Solución:**
1. En n8n, haz clic en "Listen for test event" en el nodo webhook
2. Luego envía el test desde Tally
3. Si falla, prueba con un formulario real

---

## ✅ Checklist de Configuración

- [ ] Formulario creado con todos los campos requeridos
- [ ] Diseño personalizado (título, descripción, botón)
- [ ] URL del webhook de n8n obtenida
- [ ] Webhook configurado en Tally (Integrations → Webhooks)
- [ ] Webhook testeado exitosamente
- [ ] Formulario publicado
- [ ] Workflow activado en n8n
- [ ] Prueba completa realizada (formulario → n8n → HubSpot)
- [ ] Contacto de prueba verificado en HubSpot

---

## 📚 Recursos Adicionales

- [Tally Webhooks Documentation](https://tally.so/help/webhooks)
- [Tally Integrations](https://tally.so/help/integrations)
- [n8n Webhook Node Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

---

**¡Tu formulario está listo para capturar leads! 🎉**

Ahora cada vez que alguien complete el formulario, la información se enviará automáticamente a n8n para ser procesada por el workflow de IA.
