# 📋 Prerequisitos y Configuración Inicial

Esta guía te ayudará a configurar todas las herramientas necesarias para el workflow de automatización de ventas con IA.

## 🎯 Resumen de Herramientas

Todas las herramientas utilizadas tienen planes gratuitos suficientes para aprender y probar el workflow:

| Herramienta | Qué hace | Plan Gratuito | Tiempo de Setup |
|-------------|----------|---------------|-----------------|
| n8n Cloud | Orquestación de workflows | 5,000 ejecuciones/mes | 5 minutos |
| Tally.so | Formularios con webhooks | Ilimitados | 3 minutos |
| Serper.dev | API de búsqueda Google | 2,500 búsquedas | 2 minutos |
| OpenRouter | Acceso a modelos IA | Modelos gratuitos | 3 minutos |
| HubSpot | CRM para contactos | 1,000,000 contactos | 10 minutos |

**Tiempo total estimado:** 25-30 minutos

---

## 1️⃣ n8n Cloud

### ¿Qué es n8n?
n8n es una plataforma de automatización de workflows de código abierto. Permite conectar diferentes aplicaciones y servicios sin necesidad de escribir código complejo.

### Registro

1. **Ir a n8n Cloud:**
   ```
   https://app.n8n.cloud/register
   ```

2. **Crear cuenta:**
   - Opción 1: Email + contraseña
   - Opción 2: Sign up con GitHub
   - Opción 3: Sign up con Google

3. **Verificar email:**
   - Revisa tu bandeja de entrada
   - Haz clic en el enlace de verificación

4. **Crear tu primera instancia:**
   - n8n te pedirá crear un "workspace"
   - Dale un nombre (ej: "Henry Automation")
   - Selecciona región: US o EU (elige la más cercana)

### Plan Gratuito

✅ **Incluye:**
- 5,000 ejecuciones por mes
- 1 workflow activo
- Credenciales ilimitadas
- Webhooks
- Integraciones con 400+ apps

⚠️ **Limitaciones:**
- Solo 1 workflow puede estar activo simultáneamente
- Ejecuciones limitadas a 5,000/mes

💡 **Tip:** Para esta masterclass, 5,000 ejecuciones son más que suficientes.

### Primera Configuración

Una vez dentro de n8n:

1. **Explora el dashboard:**
   - Workflows: Donde crearás tus automatizaciones
   - Executions: Historial de ejecuciones
   - Credentials: Tus API keys guardadas

2. **Familiarízate con la interfaz:**
   - Canvas: Área de trabajo para diseñar workflows
   - Nodes panel: Panel lateral con todos los nodos disponibles
   - Execution panel: Ver resultados de cada nodo

---

## 2️⃣ Tally.so

### ¿Qué es Tally?
Tally es un creador de formularios simple y moderno. Lo usamos porque:
- Soporta webhooks (envía datos automáticamente)
- No requiere tarjeta de crédito
- Formularios ilimitados en plan gratuito

### Registro

1. **Ir a Tally:**
   ```
   https://tally.so/signup
   ```

2. **Crear cuenta:**
   - Email + contraseña
   - O usar Google/GitHub

3. **Verificar email:**
   - Revisa tu bandeja
   - Confirma tu cuenta

### Plan Gratuito

✅ **Incluye:**
- Formularios ilimitados
- Respuestas ilimitadas
- Webhooks
- Personalización completa
- Sin marca de agua

⚠️ **Limitaciones:**
- Algunas integraciones avanzadas requieren plan Pro

💡 **Para este proyecto:** El plan gratuito es perfecto.

### Configuración del Webhook

Lo configuraremos más adelante cuando tengamos la URL del webhook de n8n. Por ahora, solo necesitas tener la cuenta creada.

📖 Ver guía detallada en [`TALLY_SETUP.md`](TALLY_SETUP.md)

---

## 3️⃣ Serper.dev

### ¿Qué es Serper?
Serper es una API de búsqueda de Google. Nos permite buscar noticias e información sobre empresas de forma automática.

### Por qué Serper y no Google Search API directa?
- Google Search API cuesta $5 por cada 1,000 búsquedas
- Serper.dev da 2,500 búsquedas gratis
- API más simple y fácil de usar
- Resultados en formato JSON limpio

### Registro

1. **Ir a Serper:**
   ```
   https://serper.dev/signup
   ```

2. **Crear cuenta:**
   - Email + contraseña
   - O usar Google

3. **Obtener API Key:**
   - Una vez dentro, ve a "API Key"
   - Copia tu API key
   - **GUÁRDALA EN UN LUGAR SEGURO**

### Plan Gratuito

✅ **Incluye:**
- 2,500 créditos (= 2,500 búsquedas)
- Acceso a Google Search
- Búsqueda de noticias
- Sin tarjeta de crédito

⚠️ **Limitaciones:**
- 2,500 búsquedas totales (no se renuevan mensualmente)
- Después necesitas plan de pago ($50/mes por 5,000 búsquedas)

💡 **Tip:** Para aprendizaje y pruebas, 2,500 búsquedas son suficientes.

### Guardar la API Key

```bash
# Ejemplo de API key (NO es real):
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Guárdala en un archivo de texto seguro
# La necesitarás para configurar el workflow
```

📖 Ver guía detallada en [`SERPER_SETUP.md`](SERPER_SETUP.md)

---

## 4️⃣ OpenRouter

### ¿Qué es OpenRouter?
OpenRouter es una puerta de acceso unificada a múltiples modelos de IA (GPT, Claude, Llama, etc.). Lo usamos porque:
- Ofrece modelos gratuitos
- Una sola API key para múltiples modelos
- n8n tiene integración nativa

### Modelos Gratuitos Disponibles

Para este proyecto usamos modelos 100% gratuitos:

| Modelo | Proveedor | Capacidad | Costo |
|--------|-----------|-----------|-------|
| **nousresearch/hermes-3-llama-3.1-405b:free** | Nous Research | Generación de texto | Gratis |
| **google/gemini-2.0-flash-thinking-exp:free** | Google | Razonamiento | Gratis |
| **meta-llama/llama-3.2-3b-instruct:free** | Meta | Instrucciones | Gratis |

### Registro

1. **Ir a OpenRouter:**
   ```
   https://openrouter.ai/
   ```

2. **Crear cuenta:**
   - Haz clic en "Sign In"
   - Opción: Sign in with Google (recomendado)
   - O crear con email

3. **Obtener API Key:**
   - Una vez dentro, ve a "Keys" en el menú
   - Haz clic en "Create Key"
   - Dale un nombre (ej: "n8n-automation")
   - **COPIA Y GUARDA LA KEY** (solo se muestra una vez)

### Plan Gratuito

✅ **Incluye:**
- Acceso a modelos gratuitos
- Sin límite de requests
- API estándar OpenAI-compatible

⚠️ **Limitaciones:**
- Solo modelos marcados como "free"
- Rate limits por modelo (generalmente suficientes)

💡 **Modelos que usaremos:**
```javascript
// Modelo principal (gratis, potente)
"nousresearch/hermes-3-llama-3.1-405b:free"

// Alternativa (si el primero está saturado)
"google/gemini-2.0-flash-thinking-exp:free"
```

### Guardar la API Key

```bash
# Ejemplo de formato (NO es real):
sk-or-v1-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Guárdala de forma segura
# La necesitarás en n8n para los nodos de OpenRouter
```

📖 Ver guía detallada en [`OPENROUTER_SETUP.md`](OPENROUTER_SETUP.md)

---

## 5️⃣ HubSpot

### ¿Qué es HubSpot?
HubSpot es un CRM (Customer Relationship Management) profesional. Lo usamos para:
- Guardar automáticamente los leads capturados
- Mantener historial de interacciones
- Gestionar el pipeline de ventas

### Por qué HubSpot?
- Plan gratuito MUY generoso (hasta 1,000,000 contactos)
- API bien documentada
- Integración nativa con n8n
- Herramienta real que se usa en empresas

### Registro

1. **Ir a HubSpot:**
   ```
   https://www.hubspot.com/products/get-started
   ```

2. **Crear cuenta gratuita:**
   - Completa el formulario de registro
   - Email + contraseña
   - Información de tu "empresa" (puede ser de prueba)

3. **Verificar email:**
   - HubSpot enviará un correo de verificación
   - Haz clic en el enlace

4. **Configurar cuenta:**
   - HubSpot te hará algunas preguntas sobre tu negocio
   - Puedes saltarlas o completarlas con datos de prueba

### Plan Gratuito

✅ **Incluye:**
- Hasta 1,000,000 de contactos
- Marketing Hub básico
- Sales Hub básico
- CRM completo
- API con límite generoso

⚠️ **Limitaciones:**
- Algunas funcionalidades avanzadas requieren plan Pro
- Email marketing limitado a 2,000 emails/mes

💡 **Para este proyecto:** El CRM gratuito es más que suficiente.

### Obtener API Key

1. **Ir a Settings:**
   - En HubSpot, haz clic en el ícono de configuración (⚙️) arriba a la derecha

2. **Integrations → Private Apps:**
   - Ve a "Integrations" en el menú izquierdo
   - Selecciona "Private Apps"
   - Haz clic en "Create a private app"

3. **Configurar la App:**
   - **Name:** "n8n Automation"
   - **Description:** "Workflow automation for lead capture"

4. **Scopes (Permisos):**
   Necesitas estos scopes:
   ```
   ✅ crm.objects.contacts.read
   ✅ crm.objects.contacts.write
   ```

5. **Crear y copiar token:**
   - Haz clic en "Create app"
   - **COPIA EL TOKEN** (se muestra solo una vez)
   - Guárdalo de forma segura

📖 Ver guía detallada en [`HUBSPOT_SETUP.md`](HUBSPOT_SETUP.md)

---

## ✅ Checklist de Prerequisitos

Antes de continuar con la importación del workflow, verifica que tienes:

### Cuentas Creadas
- [ ] n8n Cloud (cuenta verificada)
- [ ] Tally.so (cuenta verificada)
- [ ] Serper.dev (cuenta creada)
- [ ] OpenRouter (cuenta creada)
- [ ] HubSpot (cuenta configurada)

### API Keys Obtenidas
- [ ] Serper API Key (guardada)
- [ ] OpenRouter API Key (guardada)
- [ ] HubSpot Private App Token (guardado)

### Entorno Preparado
- [ ] n8n workspace creado
- [ ] Familiarizado con la interfaz de n8n
- [ ] Navegador actualizado (Chrome/Firefox recomendado)

---

## 🚀 Próximos Pasos

Una vez que tengas todos los prerequisitos listos:

1. **Importar el workflow:** Descarga e importa `sales-automation-workflow.json` en n8n
2. **Configurar credenciales:** Agrega tus API keys en los nodos correspondientes
3. **Crear formulario Tally:** Configura el formulario de captura de leads
4. **Probar el workflow:** Envía un formulario de prueba y verifica que todo funcione

---

## 🆘 ¿Problemas?

Si tienes dificultades con algún servicio:

- **n8n:** [Documentación oficial](https://docs.n8n.io/) | [Community forum](https://community.n8n.io/)
- **Tally:** [Help center](https://tally.so/help)
- **Serper:** [Documentación](https://serper.dev/docs)
- **OpenRouter:** [Discord](https://discord.gg/openrouter) | [Docs](https://openrouter.ai/docs)
- **HubSpot:** [Developers docs](https://developers.hubspot.com/)

---

**¡Listo para comenzar! 🎉**

Una vez completados estos prerequisitos, estarás preparado para importar y configurar el workflow completo de automatización.
