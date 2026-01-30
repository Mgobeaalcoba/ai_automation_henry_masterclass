# 🎤 Guía de Presentación - Masterclass 40 Minutos

Esta guía te ayudará a estructurar y entregar la masterclass de manera efectiva y dentro del tiempo asignado.

---

## 🎯 Objetivos de la Masterclass

Al final de la sesión, los estudiantes deberán:

- ✅ Entender cómo funcionan los workflows de automatización
- ✅ Conocer las herramientas gratuitas disponibles para automatización con IA
- ✅ Ver una demo en vivo del workflow funcionando
- ✅ Poder replicar el proyecto por su cuenta
- ✅ Identificar oportunidades de automatización en sus propios proyectos

---

## ⏱️ Estructura Temporal (40 minutos)

| Sección | Tiempo | Tiempo Acum. | Contenido |
|---------|--------|--------------|-----------|
| 1. Introducción | 5 min | 0:00 - 0:05 | Problema, solución, preview |
| 2. Tech Stack | 5 min | 0:05 - 0:10 | Herramientas y arquitectura |
| 3. Arquitectura | 10 min | 0:10 - 0:20 | Explicación de nodos |
| 4. Demo en Vivo | 15 min | 0:20 - 0:35 | Ejecución y resultados |
| 5. Q&A y Cierre | 5 min | 0:35 - 0:40 | Preguntas y próximos pasos |

---

## 📝 Sección 1: Introducción (5 minutos)

### Slide 1: Título y Presentación (1 min)

**Contenido del slide:**
```
🤖 AI Automation para Ventas
Automatiza tu prospección con $0 de inversión

[Tu Nombre]
Henry Bootcamp - [Fecha]
```

**Qué decir:**
- Preséntate brevemente (nombre, background)
- Contexto: "Hoy vamos a aprender a automatizar el proceso de prospección de ventas usando IA"
- "Todo lo que veremos hoy es 100% gratuito"

---

### Slide 2: El Problema (2 min)

**Contenido del slide:**
```
❌ Prospección Manual: El Cuello de Botella

• Investigar cada empresa manualmente: 15-30 min/lead
• Redactar emails personalizados: 10-20 min/lead
• Copiar datos al CRM: 5 min/lead
• Seguimiento manual y propenso a errores

RESULTADO: 30-55 minutos por lead
           Solo 10-15 leads/día por persona
```

**Qué decir:**
- "¿Alguna vez han tenido que contactar muchos leads potenciales?"
- "El proceso manual es extremadamente lento"
- "Investigar la empresa, redactar un email personalizado, actualizar el CRM..."
- "Esto limita cuántos leads puedes contactar por día"

---

### Slide 3: La Solución (2 min)

**Contenido del slide:**
```
✅ Solución: Automatización con IA

1. Lead completa un formulario → Instantáneo
2. Sistema investiga la empresa → 5 segundos
3. IA genera email personalizado → 10 segundos
4. Datos guardados en CRM → 2 segundos

RESULTADO: 17 segundos por lead
           Ilimitados leads/día
           Personalización superior
```

**Qué decir:**
- "Imaginen automatizar todo esto"
- "Desde el momento que el lead envía el formulario hasta que está en tu CRM con un email personalizado"
- "Todo en menos de 20 segundos"
- "Y lo mejor: la personalización es MEJOR que manual porque usamos IA"

---

## 📝 Sección 2: Tech Stack Overview (5 minutos)

### Slide 4: Stack Tecnológico (3 min)

**Contenido del slide:**
```
🛠️ Stack 100% Gratuito

┌─────────────┬──────────────┬─────────────────┐
│ Tally.so    │ Formularios  │ Ilimitado       │
│ n8n Cloud   │ Orquestación │ 5K ejecuciones  │
│ Serper.dev  │ Búsquedas    │ 2,500 créditos  │
│ OpenRouter  │ IA Generativa│ Modelos gratis  │
│ HubSpot     │ CRM          │ 1M contactos    │
└─────────────┴──────────────┴─────────────────┘

💰 Costo Total: $0
```

**Qué decir:**
- "Cinco herramientas, todas con planes gratuitos generosos"
- [Explica cada una brevemente]
  - **Tally:** "Formularios web modernos con webhooks"
  - **n8n:** "Orquestador de workflows, como Zapier pero mejor"
  - **Serper:** "API para buscar en Google, mucho más barata que Google Search API"
  - **OpenRouter:** "Acceso a múltiples modelos de IA con una sola API"
  - **HubSpot:** "CRM profesional, usado por miles de empresas"

---

### Slide 5: ¿Por qué estas herramientas? (2 min)

**Contenido del slide:**
```
🤔 ¿Por qué NO usar...?

❌ Zapier → $20/mes, limitado
❌ Google Search API → $5/1K búsquedas
❌ OpenAI API → Requiere tarjeta, $$$
❌ Salesforce → Complejo, caro

✅ Nuestro stack:
• Sin tarjeta de crédito
• Setup en 15 minutos
• Suficiente para 100+ leads/mes
• Herramientas reales de producción
```

**Qué decir:**
- "Podrían preguntar: ¿por qué no Zapier?"
- "Zapier cobra desde el primer plan"
- "Estas herramientas son igualmente profesionales pero con mejores tiers gratuitos"
- "Y lo importante: son las MISMAS herramientas que usan empresas reales"

---

## 📝 Sección 3: Arquitectura del Workflow (10 minutos)

### Slide 6: Vista General del Flujo (2 min)

**Contenido del slide:**
```
📊 Arquitectura del Sistema

[Formulario Tally]
       ↓ webhook
   [n8n Cloud]
       ↓
  ┌────┴────────┬──────────┐
  ↓             ↓          ↓
[Webhook]  [Extraer]  [Buscar]
           [Dominio]  [Noticias]
               ↓          ↓
               └────┬─────┘
                    ↓
               [AI Agent]
                    ↓
                [HubSpot]
```

**Qué decir:**
- "Esta es la arquitectura de alto nivel"
- "El flujo es lineal y lógico"
- "Comienza con un formulario, termina con un contacto en el CRM"
- "En el medio: investigación y IA"

---

### Slide 7-12: Explicación de Nodos (8 min ~ 1.3 min/nodo)

**Para cada nodo, usa este formato:**

#### Slide [X]: Nodo [N] - [Nombre]

**Contenido visual:**
- Icono del tipo de nodo
- Nombre del nodo
- Qué hace (1 línea)
- Input → Output

**Qué explicar:**
1. **Propósito:** "Este nodo hace X"
2. **Input:** "Recibe Y"
3. **Proceso:** "Transforma/procesa Z"
4. **Output:** "Produce W"

---

#### Slide 7: Nodo 1 - Webhook

```
🔗 1. Tally Form Webhook

Propósito: Punto de entrada del workflow

Input:  Formulario enviado por un lead
Proceso: Captura los datos del POST request
Output: JSON con todos los campos del formulario

Datos capturados:
• Nombre, email, empresa
• Sitio web, cargo
• Mensaje del lead
```

**Qué decir (90 seg):**
- "El webhook es como un 'timbre' que suena cuando alguien envía el formulario"
- "Tally envía automáticamente los datos a esta URL"
- "n8n captura todo y lo convierte en un JSON estructurado"
- "A partir de aquí, el workflow se ejecuta automáticamente"

---

#### Slide 8: Nodo 2 - Set Variables

```
⚙️ 2. Workflow Configuration (Set)

Propósito: Configurar variables globales

Variables:
• serperApiKey: Para buscar en Google

¿Por qué aquí?
• Centraliza configuración
• Fácil de cambiar sin tocar otros nodos
• Buena práctica de desarrollo
```

**Qué decir (60 seg):**
- "Este nodo simplemente configura variables"
- "Ponemos la API key de Serper aquí"
- "Es como declarar constantes al inicio del código"
- "Facilita el mantenimiento"

---

#### Slide 9: Nodo 3 - Extract Domain

```
🔍 3. Extract Company Domain (Code)

Propósito: Extraer dominio limpio del sitio web

Input:  "https://www.techcorp.com/about"
Proceso: JavaScript para limpiar la URL
Output: "techcorp.com"

¿Por qué?
• Serper necesita solo el dominio
• Los usuarios pueden ingresar URLs completas
• Necesitamos normalizar el formato
```

**Qué decir (90 seg):**
- "Los usuarios pueden poner cualquier formato de URL"
- "Este nodo usa JavaScript para extraer solo el dominio"
- "Remueve https://, www., paths, etc."
- "Salida limpia: 'techcorp.com'"
- [Mostrar código brevemente si hay tiempo]

---

#### Slide 10: Nodo 4 - Search Company News

```
🔎 4. Search Company News (HTTP Request)

Propósito: Investigar la empresa automáticamente

API: Serper.dev (Google Search API)
Query: Nombre de dominio de la empresa
Resultados: Top 3 noticias recientes

Output:
[
  {
    "title": "TechCorp anuncia nueva ronda...",
    "snippet": "La empresa planea expandir...",
    "date": "2025-01-15"
  }
]
```

**Qué decir (90 seg):**
- "Aquí viene la magia de la investigación"
- "Hacemos una búsqueda automática en Google sobre la empresa"
- "Serper nos da las últimas 3 noticias"
- "Esto es lo que usaremos para personalizar el email"
- "En vez de que un humano google manualmente, lo hacemos automáticamente"

---

#### Slide 11: Nodo 5 - AI Agent (⭐ MÁS IMPORTANTE)

```
🤖 5. Generate Personalized Email (AI Agent)

Propósito: Generar email personalizado con IA

Input:
• Datos del lead (nombre, cargo, empresa)
• Noticias recientes de la empresa

Proceso:
• Modelo de IA analiza todo el contexto
• Genera email estructurado
• Personalización basada en datos reales

Output:
{
  "subject": "...",
  "body": "...",
  "greeting": "..."
}
```

**Qué decir (2 min - el nodo más importante):**
- "Este es el cerebro del workflow"
- "Usamos un modelo de IA gratuito (Hermes 3 Llama 405B)"
- "Le damos TODO el contexto: quién es el lead, en qué empresa trabaja, qué noticias recientes hay"
- "La IA genera un email completamente personalizado"
- "NO es un template con placeholders"
- "La IA PIENSA sobre cómo conectar las noticias con las necesidades del lead"
- "El resultado es un email que parece escrito por un humano que investigó"
- [Mostrar ejemplo de email si hay tiempo]

---

#### Slide 12: Nodo 6 - HubSpot

```
📊 6. Create/Update HubSpot Contact

Propósito: Guardar en el CRM automáticamente

Campos guardados:
• Información básica (nombre, email, cargo)
• Empresa y sitio web
• Email personalizado (en notas)

Operación: Create or Update
• Si existe: actualiza
• Si no existe: crea nuevo
```

**Qué decir (90 seg):**
- "El último paso: guardar todo en el CRM"
- "Usamos 'Create or Update': si el contacto ya existe, se actualiza"
- "El email generado se guarda en las notas del contacto"
- "Ahora el equipo de ventas puede ver todo en un solo lugar"
- "Sin necesidad de copiar/pegar manualmente"

---

## 📝 Sección 4: Demo en Vivo (15 minutos)

### Preparación Previa (IMPORTANTE)

**Antes de la masterclass:**
- ✅ Workflow ya importado y configurado en n8n
- ✅ Todas las API keys configuradas y probadas
- ✅ Formulario Tally creado y publicado
- ✅ Webhook conectado y verificado
- ✅ Al menos UNA ejecución exitosa guardada como backup
- ✅ Datos de prueba listos en un archivo de texto
- ✅ Video de backup grabado (por si algo falla)

---

### Slide 13: Preparación de la Demo (1 min)

**Contenido del slide:**
```
🎬 Demo en Vivo

Vamos a ver el workflow en acción:

1. Completar formulario (1 min)
2. Ver ejecución en n8n (5 min)
3. Revisar contacto en HubSpot (2 min)
4. Analizar email generado (2 min)
5. Mostrar código (opcional, 2 min)
```

**Qué decir:**
- "Ahora viene la parte divertida"
- "Voy a completar el formulario en vivo y vamos a ver cómo se procesa"
- "Vamos a abrir n8n y ver cada nodo ejecutándose"
- "Y finalmente vamos a ver el resultado en HubSpot"

---

### Paso 1: Completar Formulario (2 min)

**Acciones:**
1. Comparte pantalla mostrando el formulario Tally
2. Completa con estos datos de ejemplo:

```
Nombre: María González
Email: maria.gonzalez@techcorp-demo.com
Empresa: TechCorp Solutions
Sitio web: https://www.techcorp-demo.com
Cargo: Head of Marketing
Mensaje: Estamos buscando soluciones de automatización con IA para mejorar nuestra prospección de ventas.
```

3. Haz clic en "Enviar"

**Qué decir mientras completas:**
- "Imaginen que soy un lead potencial"
- "Completo el formulario con mi información"
- "Noten que pongo un mensaje personalizado sobre mis necesidades"
- "Ahora envío..."
- "En este momento, el workflow ya se está ejecutando en segundo plano"

---

### Paso 2: Ver Ejecución en n8n (6 min)

**Acciones:**
1. Cambia a la pestaña de n8n
2. Ve a "Executions"
3. Abre la última ejecución
4. Muestra cada nodo uno por uno

**Para cada nodo (1 min cada uno):**

#### Nodo 1: Webhook
```
Qué mostrar: El JSON recibido
Qué decir: "Aquí están todos los datos del formulario,
estructurados en JSON"
```

#### Nodo 2: Set Variables
```
Qué mostrar: La variable serperApiKey configurada
Qué decir: "Aquí está configurada nuestra API key"
```

#### Nodo 3: Extract Domain
```
Qué mostrar: Input (URL completa) vs Output (dominio limpio)
Qué decir: "Miren cómo transformó la URL completa en solo 'techcorp-demo.com'"
```

#### Nodo 4: Search News
```
Qué mostrar: El array de noticias devuelto
Qué decir: "Aquí están las noticias que encontró sobre TechCorp.
           Serper buscó en Google y nos dio estos 3 resultados"
```

#### Nodo 5: AI Agent (⭐ DEDICA MÁS TIEMPO AQUÍ)
```
Qué mostrar: El email completo generado
Qué decir: "Este es el resultado del AI Agent.
           Noten cómo:
           - Usa el nombre real de María
           - Menciona su cargo (Head of Marketing)
           - Referencia TechCorp Solutions
           - Incluye contexto de las noticias
           - El tono es profesional pero cercano
           - NO es un template genérico"
```

#### Nodo 6: HubSpot
```
Qué mostrar: El ID del contacto creado
Qué decir: "Y finalmente, el contacto se creó exitosamente en HubSpot"
```

---

### Paso 3: Revisar en HubSpot (3 min)

**Acciones:**
1. Cambia a la pestaña de HubSpot
2. Ve a Contacts
3. Busca el email "maria.gonzalez@techcorp-demo.com"
4. Abre el contacto

**Qué mostrar:**
1. **Datos básicos:**
   - "Aquí están todos los campos: nombre, email, empresa, cargo"

2. **Notas:**
   - "Y en las notas, está el email completo generado por la IA"
   - "Un vendedor puede entrar aquí, copiar este email, y enviarlo directamente"

3. **Timeline:**
   - "HubSpot también registra cuándo se creó"
   - "Podemos ver todo el historial de interacciones"

---

### Paso 4: Analizar Email (3 min)

**Acciones:**
1. Copia el email de las notas de HubSpot
2. Pégalo en un editor de texto o muéstralo en pantalla grande

**Analiza cada parte:**

```
Subject: [Léelo en voz alta]
→ "Noten que es específico, menciona TechCorp"

Greeting: Hola María,
→ "Personalizado con su nombre"

Body: [Lee partes clave]
→ "Aquí menciona su cargo"
→ "Aquí referencia las noticias que encontramos"
→ "Aquí conecta con su mensaje sobre automatización"

Call to Action: [Lee]
→ "CTA claro y de bajo compromiso (15 minutos)"

Signature: [Muestra]
→ "Placeholder que cada vendedor puede personalizar"
```

**Qué decir:**
- "Este email fue generado en 10 segundos"
- "Un humano tardaría 15-30 minutos en investigar y redactar algo similar"
- "Y probablemente no encontraría las mismas noticias o no las usaría tan bien"

---

### Paso 5: Mostrar Código (Opcional, 2 min)

**Solo si hay tiempo y la audiencia es técnica:**

1. Vuelve a n8n
2. Abre el nodo "Extract Company Domain (Code)"
3. Muestra el código JavaScript brevemente

```javascript
// Ejemplo
const url = $input.item.json.websiteUrl;
const domain = new URL(url).hostname.replace('www.', '');
return { json: { domain } };
```

4. Abre el nodo "AI Agent"
5. Muestra parte del prompt

```markdown
INSTRUCCIONES:
1. PERSONALIZACIÓN:
   - Menciona específicamente el cargo...
   - Si hay noticias recientes, refiérelas...
```

**Qué decir:**
- "Si son técnicos, pueden ver que el código es simple"
- "n8n hace el trabajo pesado de la orquestación"
- "Ustedes solo se enfocan en la lógica"

---

### ⚠️ Plan B: Si Algo Falla en la Demo

**Si el formulario no dispara:**
```
- "Parece que hay un delay de red"
- Rápidamente cambia a una ejecución pre-grabada
- "Les voy a mostrar una ejecución que hice antes"
```

**Si un nodo falla:**
```
- "Interesante, esto nos da la oportunidad de ver cómo debuggear"
- Muestra el error
- Explica qué podría estar pasando
- Cambia a la ejecución de backup
```

**Si todo falla:**
```
- "Parece que tenemos problemas técnicos"
- "Les voy a mostrar un video corto que grabé"
- Reproduce el video de backup
- Continúa explicando sobre el video
```

💡 **Tip:** Practica la demo al menos 3 veces antes de la masterclass.

---

## 📝 Sección 5: Q&A y Cierre (5 minutos)

### Slide 14: Recapitulación (1 min)

**Contenido del slide:**
```
✅ Lo que Aprendimos Hoy

• Arquitectura de workflows de automatización
• 5 herramientas gratuitas para IA y automatización
• Cómo integrar múltiples APIs
• Generación de contenido con IA
• Investigación automática con Serper
• Integración con CRM (HubSpot)

💰 Costo: $0
⏱️ Setup: ~15 minutos
📈 Resultado: Prospección 100x más rápida
```

**Qué decir:**
- "Repasemos rápidamente lo que cubrimos"
- [Lee los puntos]
- "Todo esto con cero inversión"
- "Y pueden tenerlo funcionando hoy mismo"

---

### Slide 15: Próximos Pasos (1 min)

**Contenido del slide:**
```
🚀 Próximos Pasos

Para Implementar:
1. Descargar el workflow del repositorio
2. Crear cuentas en las 5 herramientas
3. Importar a n8n y configurar API keys
4. Probar con datos de ejemplo
5. Personalizar según tus necesidades

Recursos:
📦 GitHub: [tu-repo-url]
📖 Docs: README completo + guías detalladas
🎥 Video: Tutorial paso a paso (próximamente)
```

**Qué decir:**
- "Si quieren implementar esto, estos son los pasos"
- "Todo el código y documentación está en GitHub"
- "Hay guías paso a paso para cada herramienta"
- "Pueden hacerlo en 15-20 minutos siguiendo el Quick Start"

---

### Slide 16: Ideas para Expandir (1 min)

**Contenido del slide:**
```
💡 Ideas para Expandir Este Proyecto

🔹 Envío Automático de Emails
   Integrar con SendGrid/Gmail para enviar automáticamente

🔹 Seguimiento Automático
   Si no responden en 3 días, enviar follow-up

🔹 Calificación de Leads
   Usar IA para scorear la calidad del lead

🔹 Múltiples Idiomas
   Detectar idioma y generar email en ese idioma

🔹 Integración con LinkedIn
   Buscar perfil de LinkedIn del contacto

🔹 Análisis de Sentimiento
   Analizar el tono del mensaje del lead
```

**Qué decir:**
- "Este workflow es solo el comienzo"
- "Pueden expandirlo de muchas formas"
- [Menciona 2-3 ideas rápidamente]
- "La belleza de n8n es que pueden agregar nodos fácilmente"

---

### Q&A (2-3 min)

**Preguntas Frecuentes Anticipadas:**

#### P: "¿Qué pasa cuando se acaban los 2,500 créditos de Serper?"
```
R: Tienes 3 opciones:
   1. Pagar el plan de Serper ($50/mes)
   2. Usar otra API de búsqueda (Google Custom Search tiene tier gratuito)
   3. Remover el nodo de búsqueda y generar emails sin noticias
```

#### P: "¿Puedo usar ChatGPT en vez de OpenRouter?"
```
R: Sí, pero:
   - Necesitas pagar (OpenAI API requiere créditos)
   - OpenRouter da acceso a modelos gratuitos
   - La configuración es similar
```

#### P: "¿Funciona en n8n self-hosted o solo Cloud?"
```
R: Funciona en ambos:
   - n8n Cloud: Más fácil, ya está configurado
   - Self-hosted: Necesitas instalar tú mismo pero es gratis
```

#### P: "¿Qué tan buena es la personalización de la IA?"
```
R: Sorprendentemente buena:
   - Entiende contexto
   - Conecta noticias con necesidades
   - Tono profesional
   - A veces mejor que humanos (no se cansa, no tiene sesgos)
```

#### P: "¿Esto reemplaza a los vendedores?"
```
R: No, los POTENCIA:
   - Automatiza lo repetitivo (investigación, primer contacto)
   - Los vendedores se enfocan en lo estratégico (calls, cierres)
   - Aumenta productividad 10-100x
   - Los vendedores siguen siendo necesarios para la parte humana
```

---

### Slide 17: Llamado a la Acción Final (30 seg)

**Contenido del slide:**
```
🎯 Tu Turno

1. Clona el repositorio
2. Sigue el Quick Start (15 min)
3. Personalízalo para tu caso de uso
4. ¡Comparte tu éxito!

📧 Preguntas: [tu-email]
💬 Slack: #automation-channel
🐙 GitHub: [repo-url]

¡Gracias! 🙏
```

**Qué decir:**
- "Ahora es su turno"
- "Todo está documentado y listo para usar"
- "Si tienen preguntas, pueden contactarme por [medio preferido]"
- "Me encantaría ver cómo lo implementan en sus proyectos"
- "¡Gracias por su atención!"

---

## 📌 Tips para una Presentación Exitosa

### Antes de la Masterclass

- [ ] **Practica 3 veces completas** (cronometra cada vez)
- [ ] **Prueba TODO el tech stack** el día anterior
- [ ] **Ten backup de todo:**
  - Ejecución pre-guardada en n8n
  - Screenshots de cada paso
  - Video grabado de la demo completa
- [ ] **Prepara datos de prueba** en un archivo de texto (copy-paste rápido)
- [ ] **Revisa tu internet** (usa cable si es posible)
- [ ] **Cierra apps innecesarias** (más RAM para screen share)
- [ ] **Ten agua cerca** (hablarás 40 minutos seguidos)

### Durante la Masterclass

- [ ] **Activa "Do Not Disturb"** (notificaciones OFF)
- [ ] **Aumenta zoom del navegador** (texto grande para screenshare)
- [ ] **Habla despacio y claro** (habrá estudiantes no nativos)
- [ ] **Pausa para preguntas** después de cada sección
- [ ] **Usa analogías** (webhooks = timbre, workflow = receta)
- [ ] **Celebra pequeños éxitos** ("¡Miren, funcionó!") - genera entusiasmo
- [ ] **Si algo falla, mantén la calma** - es una oportunidad de enseñar debugging

### Después de la Masterclass

- [ ] **Comparte los slides** (PDF en el repo)
- [ ] **Responde preguntas en Slack/Discord**
- [ ] **Recopila feedback** (form rápido de 3 preguntas)
- [ ] **Mejora la documentación** basado en preguntas recurrentes
- [ ] **Considera grabar un video** para los que no pudieron asistir

---

## 🎨 Consejos de Diseño para Slides

### Estilo Visual

```
• Fondo oscuro (más profesional para tech)
• Fuente grande (mínimo 24pt)
• Mucho espacio en blanco (no sobrecargues)
• Iconos/emojis para visualizar conceptos
• Máximo 5 bullet points por slide
• Usa colores consistentes:
  - Verde: Éxitos, resultados positivos
  - Rojo: Problemas, anti-patterns
  - Azul: Información, pasos
  - Amarillo: Warnings, tips importantes
```

### Herramientas Recomendadas

- **Google Slides:** Fácil, colaborativo, funciona en cualquier lugar
- **Canva:** Templates bonitos, fácil de usar
- **Pitch:** Más moderno, animaciones suaves
- **Keynote:** Si estás en Mac, muy potente

---

## 📊 Métricas de Éxito

**¿Cómo saber si la masterclass fue exitosa?**

### Durante la Sesión
- ✅ >80% de asistentes se quedan los 40 minutos
- ✅ Al menos 5 preguntas en Q&A (señal de interés)
- ✅ Demo funciona sin errores mayores
- ✅ Terminas a tiempo (±2 minutos)

### Después de la Sesión
- ✅ >50% de asistentes clonan el repo
- ✅ Al menos 10 estudiantes implementan el workflow
- ✅ Feedback positivo (>4/5 estrellas)
- ✅ Estudiantes comparten sus propias versiones

### Largo Plazo
- ✅ Estudiantes agregan el proyecto a su portfolio
- ✅ Algunos consiguen trabajos mencionando este skill
- ✅ El proyecto es citado como referencia en la comunidad

---

## 🎬 Frase de Apertura Sugerida

"Hola a todos. Hoy vamos a hacer algo que suena complejo pero es sorprendentemente simple: vamos a crear un sistema de automatización de ventas con inteligencia artificial, usando solo herramientas gratuitas. Al final de estos 40 minutos, van a tener las habilidades para replicar este proyecto y aplicarlo en sus propios emprendimientos o trabajos. Lo mejor: no vamos a escribir código complejo, no vamos a gastar un peso, y todo va a funcionar en producción. ¿Listos? Empecemos."

---

## 🎬 Frase de Cierre Sugerida

"Y con esto cerramos. En 40 minutos vimos cómo construir un sistema de automatización que reemplaza horas de trabajo manual. Más importante que el workflow en sí es la mentalidad: cada vez que encuentren una tarea repetitiva, pregúntense '¿puedo automatizar esto?'. Las herramientas existen, son gratuitas, y están al alcance de todos. Ahora depende de ustedes implementarlo. Nos vemos, y mucha suerte con sus proyectos."

---

**¡Éxito con tu masterclass! 🚀🎤**

Recuerda: la confianza viene de la práctica. Practica, practica, practica.

---

**Recursos Adicionales para Preparar:**
- [ ] Revisar [README.md](../README.md) para entender el proyecto completo
- [ ] Leer [QUICKSTART.md](../QUICKSTART.md) para conocer el setup rápido
- [ ] Estudiar [docs/nodos/](nodos/) para dominar cada componente
- [ ] Probar [scripts/test-webhook.js](../scripts/test-webhook.js) para debug rápido
