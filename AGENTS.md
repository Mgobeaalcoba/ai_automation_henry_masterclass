# AGENTS.md — AI Automation Henry (serie de masterclasses)

Guía para cualquier agente (Claude Code, Codex, Antigravity/Gemini, Copilot). Los puentes `CLAUDE.md`, `GEMINI.md` y `.github/copilot-instructions.md` apuntan a este archivo.

## Qué es

Serie de masterclasses de automatización con IA y n8n para estudiantes de Henry Bootcamp (instructora: Mariano Gobea Alcoba). Repo público y didáctico: cada clase vive en su carpeta temática (`marketing/`, `finanzas/`, `ventas/`) con su README, workflow de n8n exportado y material de apoyo; `CHANGELOG.md` registra clases y cambios; el `README.md` raíz es el índice.

## Estructura

- `marketing/`, `finanzas/`, `ventas/` — una carpeta por clase, con README y workflow.
- `CHANGELOG.md` — historial de clases y cambios.
- `README.md` — índice general de la serie.

## Cómo trabajar acá

- Clase nueva: carpeta temática + README interno + entrada en `CHANGELOG.md` + enlace en el README raíz.
- Preservar el valor didáctico: workflows completos, importables y explicados paso a paso.
- Nunca versionar credenciales: los workflows se exportan con placeholders, sin API keys.
- Documentación en español rioplatense; fechas explícitas.

## Estado

Serie dictada (primera clase: 03/02/2026). Sin actividad reciente; última actualización: 05/02/2026.

## Memoria de sesiones

- `memory/STATE.md` (foto del estado) y `memory/LOG.md` (historial *append-only*).
- Al cerrar una sesión con cambios: actualizar STATE, agregar la entrada en LOG y commitear; `scripts/scan_secrets.py` corre como hook pre-commit.
