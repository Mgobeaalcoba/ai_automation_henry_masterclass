# 🤖 Masterclass: AI Automation para Ventas con n8n

## 📋 Descripción del Proyecto

Este repositorio contiene todos los materiales para la masterclass de 40 minutos sobre automatización de ventas con IA, dirigida a estudiantes de Henry. El proyecto demuestra cómo crear un sistema completo de captación y personalización de leads utilizando herramientas gratuitas.

## 🎯 Objetivo

Enseñar a crear una automatización que:
1. Captura leads mediante formularios web (Tally.so)
2. Investiga automáticamente a las empresas (Serper.dev + Google)
3. Genera emails personalizados con IA (OpenRouter)
4. Guarda los contactos en un CRM (HubSpot)

## 🛠️ Stack Tecnológico (100% Gratuito)

| Herramienta | Propósito | Plan Gratuito |
|-------------|-----------|---------------|
| **Tally.so** | Formularios web con webhooks | Formularios ilimitados |
| **n8n Cloud** | Orquestación de workflows | 5,000 ejecuciones/mes |
| **Serper.dev** | Búsquedas en Google | 2,500 créditos (2,500 búsquedas) |
| **OpenRouter** | Acceso a modelos IA | Modelos gratuitos (GLM-4.5, GPT-OSS) |
| **HubSpot** | CRM para gestión de contactos | 1,000,000 contactos |

## 🔧 Herramienta Recomendada: n8n-flow-manager

Este proyecto fue construido utilizando **[n8n-flow-manager](https://github.com/Mgobeaalcoba/n8n-flow-manager)**, una herramienta CLI profesional para gestionar workflows de n8n.

### ¿Por qué n8n-flow-manager?

- ✅ **Precisión Garantizada:** Exporta workflows 100% idénticos al original
- ✅ **Automatización:** Backup, deploy y gestión desde CLI
- ✅ **CI/CD Ready:** Integración nativa con pipelines de deployment
- ✅ **Templates:** Soporte para variables Jinja2 multi-entorno
- ✅ **Type-Safe:** Modelos Pydantic para validación automática
- ✅ **Open Source:** Herramienta gratuita creada por Mariano Gobea

### Instalación Rápida

```bash
pipx install n8n-flow-manager
n8n-py --version
```

### Uso en Este Proyecto

```bash
# Exportar el workflow de la masterclass
n8n-py get-workflow _fu3rrIxO_O60G9CvHDXN --output workflows/sales-automation-workflow.json

# Importar a tu instancia de n8n
n8n-py deploy workflows/sales-automation-workflow.json --activate

# Backup de todos tus workflows
n8n-py backup --output ./backups
```

📖 **Documentación completa:** [`docs/setup/N8N_FLOW_MANAGER.md`](docs/setup/N8N_FLOW_MANAGER.md)

---

## 📁 Estructura del Proyecto

```
ai_automation_henry_masterclass/
├── README.md                          # Este archivo
├── workflows/                         # Workflows de n8n
│   └── sales-automation-workflow.json # Workflow principal
├── docs/                              # Documentación
│   ├── setup/                         # Guías de instalación
│   │   ├── PREREQUISITES.md           # Requisitos previos
│   │   ├── N8N_FLOW_MANAGER.md       # Gestión de workflows con n8n-flow-manager
│   │   ├── TALLY_SETUP.md            # Configuración de Tally
│   │   ├── SERPER_SETUP.md           # Configuración de Serper
│   │   ├── OPENROUTER_SETUP.md       # Configuración de OpenRouter
│   │   └── HUBSPOT_SETUP.md          # Configuración de HubSpot
│   ├── nodos/                         # Documentación de cada nodo
│   │   ├── 01-WEBHOOK.md             # Tally Form Webhook
│   │   ├── 02-SET.md                 # Workflow Configuration
│   │   ├── 03-CODE.md                # Extract Company Domain
│   │   ├── 04-HTTP.md                # Search Company News
│   │   ├── 05-AI-AGENT.md            # Generate Personalized Email
│   │   └── 06-HUBSPOT.md             # Create/Update Contact
│   └── troubleshooting/               # Solución de problemas
│       └── COMMON_ISSUES.md          # Errores comunes
├── assets/                            # Recursos visuales
│   ├── logos/                         # Logos (Henry, n8n, etc.)
│   └── screenshots/                   # Capturas del workflow
├── examples/                          # Datos de ejemplo
│   ├── sample-form-submission.json   # Ejemplo de envío Tally
│   └── sample-email-output.json      # Ejemplo de email generado
└── scripts/                           # Scripts auxiliares
    └── test-webhook.js               # Script para probar webhook
```

## 🚀 Quick Start

### 1. Prerequisitos

Antes de comenzar, asegúrate de tener:
- [ ] Cuenta en n8n Cloud ([app.n8n.cloud](https://app.n8n.cloud))
- [ ] Cuenta en Tally.so ([tally.so](https://tally.so))
- [ ] API Key de Serper ([serper.dev](https://serper.dev))
- [ ] API Key de OpenRouter ([openrouter.ai](https://openrouter.ai))
- [ ] Cuenta en HubSpot ([hubspot.com](https://www.hubspot.com))

📖 Ver guía detallada en [`docs/setup/PREREQUISITES.md`](docs/setup/PREREQUISITES.md)

### 2. Importar el Workflow

1. Descarga el archivo [`workflows/sales-automation-workflow.json`](workflows/sales-automation-workflow.json)
2. Abre n8n Cloud y ve a **Workflows** → **Import from File**
3. Selecciona el archivo JSON descargado
4. Configura las credenciales necesarias

### 3. Configurar Credenciales

El workflow requiere las siguientes credenciales:

#### API Keys necesarias:
- **Serper API Key**: Configura en el nodo "Workflow Configuration (Set)"
- **OpenRouter API Key**: Configura en los nodos "OpenRouter Chat Model"
- **HubSpot API Key**: Configura en el nodo "Create/Update HubSpot Contact"

📖 Ver guías de configuración en [`docs/setup/`](docs/setup/)

### 4. Crear el Formulario Tally

1. Crea un nuevo formulario en Tally con estos campos:
   - Nombre completo
   - Email
   - Empresa
   - Sitio web de la empresa
   - Cargo
   - Mensaje (opcional)

2. Configura el webhook:
   - Ve a **Integraciones** → **Webhooks**
   - Pega la URL del webhook de n8n
   - Activa "Send on form submit"

📖 Ver guía detallada en [`docs/setup/TALLY_SETUP.md`](docs/setup/TALLY_SETUP.md)

### 5. Probar el Workflow

1. Activa el workflow en n8n (botón "Active")
2. Envía un formulario de prueba en Tally
3. Verifica la ejecución en n8n
4. Revisa el contacto creado en HubSpot

## 🎓 Contenido de la Masterclass

### Duración: 40 minutos

1. **Introducción** (5 min)
   - Presentación del problema: prospección manual vs automatizada
   - Demostración del resultado final

2. **Tech Stack Overview** (5 min)
   - Revisión de las herramientas gratuitas
   - Por qué esta combinación específica

3. **Arquitectura del Workflow** (10 min)
   - Explicación de cada nodo
   - Flujo de datos entre componentes
   - Decisiones de diseño

4. **Demo en Vivo** (15 min)
   - Importar el workflow
   - Configurar credenciales
   - Ejecutar una prueba completa
   - Revisar resultados

5. **Q&A y Mejoras Posibles** (5 min)
   - Preguntas de los estudiantes
   - Ideas para expandir el proyecto

## 📊 Flujo del Workflow

```
Formulario Tally
      ↓
   Webhook (n8n)
      ↓
Extraer Dominio → Buscar Noticias (Serper)
      ↓                    ↓
      └─────→ AI Agent (OpenRouter) ←────┘
                      ↓
            Parser de Estructura
                      ↓
              HubSpot Contact
```

## 🔑 Variables de Entorno

El workflow utiliza las siguientes configuraciones:

```javascript
// Serper API Key (configurada en el nodo Set)
serperApiKey: "tu_api_key_de_serper"

// OpenRouter (configurado en credenciales de n8n)
OPENROUTER_API_KEY: "tu_api_key_de_openrouter"

// HubSpot (configurado en credenciales de n8n)
HUBSPOT_API_KEY: "tu_api_key_de_hubspot"
```

## 🎨 Características Principales

### ✨ Investigación Automática
- Extrae el dominio de la empresa del sitio web
- Busca las últimas noticias y novedades
- Identifica contexto relevante para personalización

### 🤖 IA Generativa
- Utiliza modelos de lenguaje gratuitos (GLM-4.5, GPT-OSS)
- Genera emails personalizados basados en investigación real
- Estructura JSON garantizada mediante Output Parser

### 📧 Gestión de Contactos
- Crea o actualiza contactos automáticamente en HubSpot
- Guarda el email personalizado en las notas
- Mantiene historial de interacciones

## 🐛 Troubleshooting

### Errores Comunes

**Webhook no recibe datos:**
- Verifica que el workflow esté activo
- Revisa la URL del webhook en Tally
- Confirma que el formulario esté publicado

**Error en búsqueda Serper:**
- Verifica que la API key esté configurada correctamente
- Revisa que tengas créditos disponibles
- Confirma que el dominio se extrajo correctamente

**IA no genera email:**
- Verifica la API key de OpenRouter
- Confirma que estés usando modelos gratuitos
- Revisa los logs del nodo AI Agent

📖 Ver guía completa en [`docs/troubleshooting/COMMON_ISSUES.md`](docs/troubleshooting/COMMON_ISSUES.md)

## 📚 Recursos Adicionales

### Documentación Oficial
- [n8n Docs](https://docs.n8n.io/)
- [Tally Webhooks](https://tally.so/help/webhooks)
- [Serper API](https://serper.dev/docs)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [HubSpot API](https://developers.hubspot.com/)

### Tutoriales Relacionados
- [n8n AI Agent Tutorial](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.agent/)
- [Webhook Testing Best Practices](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

## 🤝 Contribuciones

Este es un proyecto educativo para la masterclass de Henry. Si encuentras mejoras o errores:

1. Documenta el issue claramente
2. Propón una solución si es posible
3. Comparte con la comunidad de Henry

## 📝 Notas para el Instructor

- El workflow está diseñado para ser importado y funcionar inmediatamente
- Los datos sensibles (API keys) deben configurarse en cada instalación
- Se recomienda tener una cuenta de prueba de HubSpot para demostraciones
- El formulario Tally puede personalizarse según las necesidades

## 🎯 Objetivos de Aprendizaje

Al completar esta masterclass, los estudiantes podrán:

- ✅ Entender cómo funcionan los webhooks y la comunicación entre sistemas
- ✅ Implementar búsquedas automatizadas con APIs
- ✅ Integrar IA generativa en workflows de automatización
- ✅ Conectar múltiples servicios en un flujo de trabajo cohesivo
- ✅ Aplicar estos conceptos a otros casos de uso de automatización

## 📄 Licencia

Este proyecto es material educativo para la comunidad de Henry.

---

**Preparado para la Masterclass de Henry - 2025**

🚀 ¡Automatiza tu prospección de ventas con IA!
