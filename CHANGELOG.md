# Changelog - AI Automation Henry MasterClass Series

Registro de cambios y actualizaciones del proyecto.

---

## [2.1.0] - 2026-02-03

### Nueva Clase: Finanzas - IA vs. Wall Street

Agregada tercera masterclass sobre monitoreo financiero automático con análisis de sentiment.

### ✨ Agregado

#### Clase 3: Finanzas - Monitor de Tendencias Financieras

**Materiales completos:**
- `finanzas/README.md` - Guía completa de 900+ líneas
- `finanzas/workflow.json` - Workflow n8n con 7 nodos (RSS Feed + Filter + Jina AI + AI Agent + Gmail)
- `finanzas/materials/presentation.pdf` - Slides de la masterclass
- `finanzas/materials/script.md` - Guion detallado con construcción paso a paso
- `finanzas/examples/sample-rss-feed-item.json` - Ejemplo de noticia RSS
- `finanzas/examples/sample-analysis-output.json` - Ejemplo de análisis de sentiment
- `finanzas/examples/sample-email-template.html` - Template de alerta HTML
- `finanzas/scripts/test-rss-feed.js` - Script para testear feeds RSS
- `finanzas/scripts/test-ticker-filter.js` - Script para testear filtro de tickers

**Stack tecnológico:**
- n8n + RSS Feed + Jina AI + OpenRouter + Gmail

**Objetivo:**
- Monitorear noticias financieras 24/7
- Analizar sentiment (Bullish/Bearish/Neutral) con IA
- Enviar alertas solo para señales significativas
- De leer 200 noticias al día a recibir 3-5 alertas relevantes

**Workflow:**
1. RSS Feed (Yahoo Finance) - Monitoreo cada hora
2. Ticker Filter (JavaScript) - Filtra por tickers específicos
3. Jina AI Reader - Limpia contenido de noticias
4. AI Agent - Analiza sentiment y asigna score (-10 a +10)
5. Output Parser - Estructura respuesta JSON
6. Gmail - Envía alerta HTML con recomendación (BUY/SELL/HOLD)

### 🔄 Actualizado

**README.md (root)**
- Agregada sección de Finanzas con descripción completa
- Actualizada estructura del repositorio (3 clases)
- Agregado enlace a `finanzas/` en quick links

### 📊 Estadísticas del Proyecto

**Ahora:**
- 3 clases independientes (Marketing + Ventas + Finanzas)
- 3 READMEs auto-contenidos (~2,500 líneas totales)
- 3 workflows JSON completamente funcionales
- 15 archivos de examples (JSONs, HTML)
- 9 scripts de testing

**Comparativa:**
- v1.0.0: 1 clase
- v2.0.0: 2 clases
- v2.1.0: 3 clases (Marketing, Ventas, Finanzas)

### 🎯 Cobertura de Casos de Uso

El proyecto ahora cubre:
1. **Marketing:** Generación de contenido multi-canal
2. **Ventas:** Automatización de prospección y personalización
3. **Finanzas:** Monitoreo de mercados y análisis de sentiment

Tres áreas críticas de automatización con IA aplicada a negocios reales.

---

## [2.0.0] - 2026-02-03

### REESTRUCTURACIÓN COMPLETA - Monorepo Multi-Clase

Transformación del proyecto de una clase única (Ventas) a una serie de masterclasses con arquitectura modular.

### ✨ Agregado

#### Nueva Clase: Marketing - The Omni-Channel Content Factory

**Materiales completos:**
- `marketing/README.md` - Guía completa de 800+ líneas
- `marketing/workflow.json` - Workflow n8n con 7 nodos (Webhook + Jina AI + AI Agent + Notion)
- `marketing/materials/presentation.pdf` - Slides de la masterclass
- `marketing/materials/script.md` - Guion detallado con timing y discursos
- `marketing/examples/sample-content-output.json` - Ejemplo de LinkedIn + X + Newsletter
- `marketing/examples/sample-webhook-payload.json` - Ejemplo de payload del bookmarklet
- `marketing/scripts/bookmarklet.js` - Activador desde navegador
- `marketing/scripts/test-webhook.js` - Script de testing Node.js

**Stack tecnológico:**
- n8n + Jina AI + LangChain + OpenRouter + Notion + Bookmarklet

**Objetivo:**
- Convertir artículos web en contenido multi-canal con un clic
- De 15 minutos de trabajo manual a 5 segundos automatizados

#### Nueva Estructura Monorepo

```
ai_automation_henry_masterclass/
├── README.md                    # Índice de ambas clases
├── CHANGELOG.md                 # Este archivo
├── marketing/                   # Clase 1: Content Factory
│   ├── README.md
│   ├── workflow.json
│   ├── materials/
│   ├── examples/
│   └── scripts/
└── ventas/                      # Clase 2: Lead Automation
    ├── README.md
    ├── workflow.json
    ├── materials/
    ├── examples/
    └── scripts/
```

#### README.md de Root (Nuevo)

- Índice profesional de ambas masterclasses
- Descripción de stack tecnológico común
- Filosofía de las masterclasses
- Objetivos de aprendizaje
- Enlaces directos a cada clase

### 🔄 Cambiado

#### Ventas: Reestructuración Completa

**Movido a nueva ubicación:**
- `workflows/sales-automation-workflow.json` → `ventas/workflow.json`
- `examples/sample-form-submission.json` → `ventas/examples/`
- `examples/sample-email-output.json` → `ventas/examples/`
- `scripts/test-webhook.js` → `ventas/scripts/`
- PDF de presentación → `ventas/materials/presentation.pdf`

**Documentación condensada:**
- `ventas/README.md` - Guía completa auto-contenida (800+ líneas)
- Condensa información de `docs/setup/`, `docs/nodos/`, `docs/troubleshooting/`
- Secciones: Descripción, Arquitectura, Stack, Setup completo, Configuración de nodos, Testing, Troubleshooting, Extensiones
- Referencia breve a n8n-flow-manager (sin documentación exhaustiva)

**Contenido migrado:**
- Prerequisites → Sección "Setup Completo"
- Nodos (WEBHOOK, AI-AGENT, etc.) → Sección "Configurar Nodos"
- Troubleshooting → Sección "Troubleshooting"
- Presentation Guide → Ya existe en `materials/`

### 🗑️ Removido

**Directorios completos:**
- `docs/` - Documentación dispersa (4,500+ líneas)
  - `docs/setup/` (PREREQUISITES.md, N8N_FLOW_MANAGER.md, TALLY_SETUP.md)
  - `docs/nodos/` (01-WEBHOOK.md, 05-AI-AGENT.md)
  - `docs/troubleshooting/` (COMMON_ISSUES.md)
  - `docs/PRESENTATION_GUIDE.md`
- `workflows/` - Reemplazado por `ventas/workflow.json`
- `examples/` - Reemplazado por `ventas/examples/` y `marketing/examples/`
- `scripts/` - Reemplazado por `ventas/scripts/` y `marketing/scripts/`

**Archivos root:**
- `QUICKSTART.md` - Integrado en cada README
- `CONFIG_TEMPLATE.md` - Documentado en cada README
- `PROJECT_STATUS.md` - Reemplazado por este CHANGELOG
- `SECURITY.md` - Innecesario para proyecto educativo
- `LICENSE` - Simplificado (licencia mencionada en READMEs)
- `.env.example` - Documentado en sección Setup de cada README
- `AI Automation Ventas Henry MasterClass - Miércoles 04.02.2026.md` - Archivo vacío

### 🔧 Actualizado

#### .gitignore

**Nueva estrategia de exclusión:**
```gitignore
# Solo permite estos archivos .md:
!README.md
!CHANGELOG.md
!marketing/README.md
!ventas/README.md
!marketing/materials/script.md

# Excluye el resto:
*.md
docs/
*guion*.md
*script*.md (excepto marketing/materials/)
```

**Archivos que DEBEN estar en el repo:**
- README.md y CHANGELOG.md (root)
- marketing/README.md y ventas/README.md
- marketing/materials/script.md (guion pedagógico)
- Workflows JSON, ejemplos JSON, scripts JS
- PDFs de presentaciones

### 📊 Estadísticas

**Antes (v1.0.0):**
- 1 clase (Ventas)
- ~4,500 líneas de documentación dispersa en `/docs`
- 13 archivos .md en total
- Estructura orientada a proyecto único

**Después (v2.0.0):**
- 2 clases independientes (Marketing + Ventas)
- ~1,600 líneas de documentación (2 READMEs auto-contenidos)
- Solo 4 archivos .md visibles: root README, CHANGELOG, marketing/README, ventas/README
- Estructura escalable para futuras clases

**Reducción:**
- -64% de líneas de documentación (de 4,500 a 1,600)
- -69% de archivos .md (de 13 a 4)
- +100% de clases (de 1 a 2)
- +100% de auto-contenido (cada clase tiene TODO lo necesario)

### 🎯 Beneficios de la Reestructuración

1. **Modularidad:** Cada clase es completamente independiente
2. **Escalabilidad:** Fácil agregar clase 3, 4, 5, etc.
3. **Claridad:** Un README por clase con todo lo necesario
4. **Limpieza:** Solo archivos esenciales en root (2 archivos .md)
5. **Profesionalismo:** Estructura tipo monorepo estándar de la industria
6. **Facilidad de uso:** Los estudiantes van directo a `marketing/` o `ventas/`
7. **Mantenibilidad:** No hay documentación dispersa ni archivos huérfanos

### 🔗 Arquitectura de Ambas Clases

#### Marketing: Content Factory
```
Bookmarklet → Webhook → Parse JS → Jina AI → AI Agent → Output Parser → Notion
```

**Nodos:** 7 (incluyendo sub-nodos)  
**Tiempo de ejecución:** ~10 segundos  
**Output:** 3 piezas de contenido (LinkedIn, X, Newsletter)

#### Ventas: Lead Automation
```
Tally Form → Webhook → Set Config → Extract Domain → Serper → AI Agent → HubSpot
```

**Nodos:** 9 (incluyendo sub-nodos)  
**Tiempo de ejecución:** ~15 segundos  
**Output:** Email personalizado + contacto en CRM

### 🎓 Filosofía del Proyecto

**Principios de Diseño:**
- Sistemas, no trucos
- Repetibilidad (15-30 min setup)
- Gratuidad (100% herramientas gratuitas)
- Profesionalismo (estándares de producción)
- Autonomía (estudiantes pueden extender)

**Objetivo común:**
Eliminar la fricción que impide ejecutar tareas valiosas pero repetitivas. Ya sea crear contenido o personalizar emails, la automatización con IA convierte procesos de 15 minutos en sistemas de 5 segundos.

### 💡 Highlights

1. **Monorepo Multi-Clase:** Primera versión con arquitectura escalable
2. **Documentación Condensada:** De 4,500 a 1,600 líneas sin perder contenido crítico
3. **Auto-Contenido:** Cada clase tiene TODO (workflow, docs, examples, scripts)
4. **Nuevo Stack:** Jina AI + Bookmarklets + Notion para marketing
5. **Limpieza Radical:** Solo 2 archivos .md en root (vs. 8 anteriormente)

---

## [1.0.0] - 2025-01-30

### 🎉 Versión Inicial - Proyecto Completo (Ventas)

Primera versión completa del proyecto de masterclass, enfocada exclusivamente en automatización de ventas.

### ✨ Agregado

#### Core del Proyecto
- **Workflow JSON exportado** usando n8n-flow-manager
  - Archivo: `workflows/sales-automation-workflow.json`
  - Tamaño: 33KB, 888 líneas
  - ID: `_fu3rrIxO_O60G9CvHDXN`

#### Documentación Principal
- `README.md` - Documentación completa del proyecto
- `QUICKSTART.md` - Guía de setup en 15 minutos
- `CONFIG_TEMPLATE.md` - Template para gestión de API keys
- `PROJECT_STATUS.md` - Estado del proyecto y progreso
- `CHANGELOG.md` - Este archivo

#### Documentación de Setup
- `docs/setup/PREREQUISITES.md` - Guía detallada de prerequisitos
- `docs/setup/N8N_FLOW_MANAGER.md` - Documentación completa de n8n-flow-manager
- `docs/setup/TALLY_SETUP.md` - Configuración de formulario Tally + webhook

#### Documentación de Nodos
- `docs/nodos/01-WEBHOOK.md` - Tally Form Webhook (400+ líneas)
- `docs/nodos/05-AI-AGENT.md` - AI Agent con OpenRouter (500+ líneas)

#### Guías Especializadas
- `docs/PRESENTATION_GUIDE.md` - Guía completa para masterclass de 40 minutos
- `docs/troubleshooting/COMMON_ISSUES.md` - Resolución de problemas

#### Workflows
- `workflows/README.md` - Documentación del workflow
- `workflows/sales-automation-workflow.json` - Workflow completo

#### Ejemplos y Scripts
- `examples/sample-form-submission.json` - Ejemplo de payload Tally
- `examples/sample-email-output.json` - Ejemplo de email generado por IA
- `scripts/test-webhook.js` - Script Node.js para testing del webhook

#### Configuración
- `.gitignore` - Protección de datos sensibles
- `.env.example` - Template de variables de entorno

### 🔧 Herramientas Integradas

#### n8n-flow-manager
- **Versión:** 0.1.2
- **Uso:** Exportación precisa del workflow
- **Beneficios:** Precisión 100%, automatización de backup/deploy, CI/CD ready

### 📊 Estadísticas v1.0.0

#### Archivos Creados
- **Total:** 15 archivos
- **Markdown:** 13 archivos (~4,200 líneas)
- **JSON:** 2 archivos (examples + workflow)
- **JavaScript:** 1 archivo (test script)

#### Documentación
- **Páginas totales:** ~90 páginas
- **Líneas de código/docs:** ~4,500 líneas
- **Categorías:** 5 (Principal, Setup, Nodos, Troubleshooting, Examples)

#### Cobertura
- Setup guides: 3/6 (50%) - Los esenciales completados
- Node guides: 2/6 (33%) - Los más importantes completados
- Examples: 2 archivos (100%)
- Scripts: 1 archivo (100%)

### 🎯 Estado del Proyecto v1.0.0

**Completitud:** 85%

**Listo para:**
- Presentación de masterclass
- Uso por estudiantes
- Replicación del workflow
- Troubleshooting de problemas comunes

**Pendiente (Opcional):**
- 3 guías de setup (Serper, OpenRouter, HubSpot)
- 4 guías de nodos (Set, Code, HTTP, HubSpot)
- Screenshots y assets visuales

---

## Formato de Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/):
- **MAJOR:** Cambios incompatibles en la API/estructura
- **MINOR:** Nuevas funcionalidades compatibles
- **PATCH:** Bug fixes y mejoras menores

## Categorías de Cambios

- `Added` - Nuevas funcionalidades
- `Changed` - Cambios en funcionalidades existentes
- `Deprecated` - Funcionalidades que serán removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Bug fixes
- `Security` - Vulnerabilidades corregidas

---

**Mantenido por:** Mariano Gobea Alcoba  
**Última actualización:** 2026-02-03  
**Versión actual:** 2.0.0
