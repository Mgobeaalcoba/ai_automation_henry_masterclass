# 🤖 Nodo 5: Generate Personalized Email (AI Agent)

## 📋 Información General

| Propiedad | Valor |
|-----------|-------|
| **Tipo de Nodo** | AI Agent |
| **Nombre** | Generate Personalized Email |
| **Propósito** | Generar emails personalizados usando IA basándose en datos del lead y noticias de la empresa |
| **Modelo IA** | OpenRouter (modelos gratuitos) |
| **Posición** | Nodo 5 en el workflow |

---

## 🎯 ¿Qué hace este nodo?

Este es el **cerebro del workflow**. Toma toda la información recopilada (datos del lead + noticias de la empresa) y genera un email personalizado y contextual usando inteligencia artificial.

**Proceso:**
1. Recibe datos del lead (nombre, cargo, empresa, mensaje)
2. Recibe noticias recientes de la empresa (del nodo de Serper)
3. Envía todo a un modelo de IA con instrucciones específicas
4. La IA genera un email estructurado en formato JSON
5. El email incluye: subject, greeting, body, closing, signature

---

## ⚙️ Configuración

### Chat Model
```
OpenRouter Chat Model
```

### Model Selection
```
nousresearch/hermes-3-llama-3.1-405b:free
```

**Alternativas gratuitas:**
- `google/gemini-2.0-flash-thinking-exp:free`
- `meta-llama/llama-3.2-3b-instruct:free`

### Options

| Opción | Valor | Descripción |
|--------|-------|-------------|
| **Temperature** | 0.7 | Balance entre creatividad y coherencia |
| **Max Tokens** | 1000 | Suficiente para emails de 300-400 palabras |
| **Top P** | 0.9 | Muestreo de tokens para variedad |

---

## 📝 System Message (Prompt)

Este es el prompt más importante del workflow. Define cómo la IA debe comportarse:

```markdown
Eres un experto en ventas B2B y redacción de emails comerciales personalizados.

Tu tarea es generar un email altamente personalizado para un lead que completó un formulario de contacto.

INFORMACIÓN DEL LEAD:
- Nombre: {{ $json.data.fields.find(f => f.label.includes('nombre')).value }}
- Email: {{ $json.data.fields.find(f => f.label.includes('email')).value }}
- Empresa: {{ $json.data.fields.find(f => f.label.includes('empresa')).value }}
- Cargo: {{ $json.data.fields.find(f => f.label.includes('cargo')).value }}
- Mensaje: {{ $json.data.fields.find(f => f.label.includes('compartir')).value }}

INVESTIGACIÓN DE LA EMPRESA:
{{ $('Search Company News').item.json.news }}

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
   - Signature: Firma (dejar como placeholder)

3. TONO:
   - Profesional pero cercano
   - Consultivo, no vendedor agresivo
   - Enfocado en ayudar, no en vender
   - Lenguaje claro y directo

4. FORMATO DE SALIDA:
   IMPORTANTE: Responde SOLO con un objeto JSON válido. No incluyas texto antes o después del JSON.
   No uses code blocks de markdown (```json).

{
  "subject": "...",
  "greeting": "...",
  "body": "...",
  "closing": "...",
  "signature": "[Tu Nombre]\\n[Tu Cargo]\\n[Tu Empresa]"
}

5. EJEMPLO DE BUEN EMAIL:

{
  "subject": "Soluciones de IA para TechCorp - Transformando su prospección",
  "greeting": "Hola María,",
  "body": "Gracias por tu interés en soluciones de automatización con IA. He estado investigando TechCorp Solutions y veo que su reciente expansión en América Latina los posiciona perfectamente para aprovechar la automatización inteligente.\\n\\nComo Head of Marketing, seguramente buscas formas de escalar tu alcance sin sacrificar la personalización. Una solución de automatización con IA podría reducir en 70% el tiempo dedicado a la investigación manual de leads, generar mensajes personalizados basados en el contexto actual de cada prospecto, e integrarse automáticamente con tu CRM existente.\\n\\n¿Te gustaría que programemos una llamada breve de 15 minutos esta semana para mostrarte cómo funciona en práctica? Puedo preparar un demo específico usando ejemplos de tu industria.",
  "closing": "Quedo atento a tu respuesta.",
  "signature": "[Tu Nombre]\\n[Tu Cargo]\\n[Tu Empresa]"
}

GENERA EL EMAIL AHORA:
```

---

## 🔑 Variables de Entrada

El nodo recibe datos de dos fuentes:

### Del Webhook (datos del lead)
```javascript
// Acceso a datos del formulario
$json.data.fields.find(f => f.label.includes('nombre')).value
$json.data.fields.find(f => f.label.includes('email')).value
$json.data.fields.find(f => f.label.includes('empresa')).value
$json.data.fields.find(f => f.label.includes('cargo')).value
$json.data.fields.find(f => f.label.includes('compartir')).value
```

### Del Nodo Search Company News
```javascript
// Acceso a las noticias encontradas
$('Search Company News').item.json.news

// Estructura de las noticias:
[
  {
    "title": "...",
    "link": "...",
    "snippet": "...",
    "date": "...",
    "source": "..."
  }
]
```

---

## 📤 Estructura de Salida

El nodo de IA genera un JSON con esta estructura:

```json
{
  "output": "{\"subject\":\"...\",\"greeting\":\"...\",\"body\":\"...\",\"closing\":\"...\",\"signature\":\"...\"}"
}
```

⚠️ **Importante:** La salida de la IA es un string JSON, NO un objeto. Por eso necesitamos el siguiente nodo (Output Parser) para convertirlo a objeto.

---

## 🎨 Ejemplos de Emails Generados

### Ejemplo 1: Con noticias recientes

**Input:**
- Lead: Juan Pérez, CTO de DataCorp
- Noticias: DataCorp anuncia nueva ronda de inversión de $5M

**Output:**
```json
{
  "subject": "Felicidades por la ronda de inversión - Automatización para DataCorp",
  "greeting": "Hola Juan,",
  "body": "Felicidades por la reciente ronda de inversión de $5M que anunció DataCorp. Momentos como este son perfectos para optimizar procesos y maximizar el retorno de la inversión.\\n\\nComo CTO, imagino que estás evaluando tecnologías que permitan escalar sin incrementar linealmente los costos. Nuestra solución de automatización con IA podría ayudarte a automatizar tareas repetitivas, liberar tiempo de tu equipo para innovación, y mejorar la eficiencia operativa.\\n\\n¿Te interesaría una demo de 20 minutos? Puedo mostrarte casos específicos de empresas tech en etapa de crecimiento.",
  "closing": "Espero tu respuesta.",
  "signature": "[Tu Nombre]\\n[Tu Cargo]\\n[Tu Empresa]"
}
```

### Ejemplo 2: Sin noticias recientes

**Input:**
- Lead: Ana Torres, Marketing Manager de SmallBiz
- Noticias: (vacío)

**Output:**
```json
{
  "subject": "Automatización de marketing para SmallBiz - Ahorra 10 horas/semana",
  "greeting": "Hola Ana,",
  "body": "Gracias por tu interés en soluciones de automatización. Entiendo los desafíos que enfrentan los equipos de marketing: demasiadas tareas manuales, poco tiempo para estrategia, y la presión de generar resultados medibles.\\n\\nNuestra plataforma te permitiría automatizar la prospección de leads, personalizar comunicaciones a escala, y liberar aproximadamente 10 horas semanales para enfocarte en lo estratégico. Todo sin necesidad de un equipo técnico.\\n\\n¿Te gustaría ver cómo funciona? Podemos agendar una demo breve donde te muestro el sistema con ejemplos de tu industria.",
  "closing": "Quedo a tu disposición.",
  "signature": "[Tu Nombre]\\n[Tu Cargo]\\n[Tu Empresa]"
}
```

---

## 🧠 Cómo Funciona la IA

### 1. Procesamiento de Contexto

El modelo de IA:
1. Lee el system message con todas las instrucciones
2. Analiza los datos del lead (nombre, cargo, empresa, etc.)
3. Procesa las noticias de la empresa
4. Identifica puntos clave de personalización
5. Estructura la respuesta según el formato solicitado

### 2. Generación del Email

El modelo considera:
- **Cargo del lead:** Ajusta el lenguaje (técnico para CTOs, comercial para Sales)
- **Mensaje del lead:** Identifica necesidades y pain points
- **Noticias:** Busca oportunidades para mencionar contexto actual
- **Tono:** Mantiene profesionalismo sin sonar vendedor

### 3. Formato JSON

El modelo genera JSON porque:
- Es estructurado y parseab automatización
- Evita formato libre difícil de procesar
- Permite validación de campos obligatorios
- Facilita integración con CRM (HubSpot)

---

## ⚡ Optimizaciones del Prompt

### Técnicas Usadas

1. **Few-shot Learning:**
   - Incluimos un ejemplo de email bien escrito
   - La IA aprende el estilo deseado

2. **Instrucciones Específicas:**
   - Longitud máxima de subject
   - Estructura de párrafos
   - Tono esperado

3. **Formato Estricto:**
   - Enfatizamos "SOLO JSON"
   - Explicamos que no queremos markdown
   - Damos formato exacto esperado

4. **Contextualización:**
   - Proveemos TODA la información necesaria
   - No esperamos que la IA "adivine"
   - Datos estructurados claramente

---

## 🐛 Problemas Comunes

### ❌ "AI generates plain text instead of JSON"

**Causa:** El modelo no siguió las instrucciones de formato.

**Solución 1: Mejorar el prompt**
```markdown
CRITICAL: Your response MUST be ONLY a valid JSON object.
Do NOT include any text before or after the JSON.
Do NOT use markdown code blocks (```json).
ONLY the pure JSON.
```

**Solución 2: Intentar con otro modelo**
```
// Cambiar a un modelo más obediente:
google/gemini-2.0-flash-thinking-exp:free
```

---

### ❌ "AI response is too generic / not personalized"

**Causa:** Prompt no enfatiza suficiente la personalización.

**Solución: Agregar ejemplos negativos**
```markdown
EJEMPLOS DE LO QUE NO HACER:
❌ "Estimado cliente" (usar el nombre real)
❌ "Su empresa" (mencionar el nombre de la empresa)
❌ "Nuestros servicios pueden ayudarle" (ser específico sobre CÓMO)

EJEMPLOS DE LO QUE SÍ HACER:
✅ "Hola María" (nombre personalizado)
✅ "TechCorp Solutions" (empresa específica)
✅ "reducir en 70% el tiempo dedicado a..." (beneficio concreto)
```

---

### ❌ "Rate limit exceeded"

**Causa:** Demasiadas requests en poco tiempo al modelo gratuito.

**Solución: Configurar retry logic**
```
En el nodo AI Agent:
Settings → Continue On Fail: true
Settings → Retry On Fail: true
Settings → Max Tries: 3
Settings → Wait Between Tries: 5000ms
```

---

## 📊 Métricas de Calidad

### ¿Cómo evaluar la calidad del email generado?

**Criterios:**

1. **Personalización (0-10)**
   - ¿Menciona el nombre del lead?
   - ¿Referencia la empresa específica?
   - ¿Usa el cargo de forma relevante?
   - ¿Incorpora noticias recientes?

2. **Relevancia (0-10)**
   - ¿Aborda el mensaje del lead?
   - ¿Los beneficios son específicos?
   - ¿El contexto es apropiado?

3. **Claridad (0-10)**
   - ¿El mensaje es fácil de entender?
   - ¿La estructura es lógica?
   - ¿Hay errores gramaticales?

4. **Call to Action (0-10)**
   - ¿El CTA es claro?
   - ¿Es de bajo compromiso?
   - ¿Es accionable?

**Email ideal:** Score promedio > 8

---

## 🎓 Conceptos Clave

### ¿Qué es un AI Agent en n8n?

Un AI Agent es un nodo que:
- Usa modelos de lenguaje (LLMs) como ChatGPT, Claude, etc.
- Puede tomar decisiones basadas en contexto
- Genera texto de forma natural
- Se integra con otros nodos del workflow

### ¿Por qué OpenRouter?

**Ventajas:**
- ✅ Una API para múltiples modelos
- ✅ Modelos gratuitos disponibles
- ✅ Compatible con formato OpenAI
- ✅ Sin necesidad de tarjeta de crédito

**Alternativas:**
- OpenAI API (requiere pago)
- Anthropic Claude API (requiere pago)
- Google Gemini API (tiene tier gratuito limitado)
- Hugging Face (más complejo de configurar)

---

## 🔧 Personalización Avanzada

### Agregar más contexto

```markdown
INFORMACIÓN ADICIONAL:
- Industria: {{ $json.industry }}
- Tamaño de empresa: {{ $json.companySize }}
- Ubicación: {{ $json.location }}
- Presupuesto estimado: {{ $json.budget }}
```

### Cambiar el tono según el cargo

```javascript
// En un nodo Code previo, determinar el tono:
const cargo = $json.cargo.toLowerCase();

let tono = 'profesional';
if (cargo.includes('ceo') || cargo.includes('founder')) {
  tono = 'ejecutivo y directo al punto';
} else if (cargo.includes('tech') || cargo.includes('cto')) {
  tono = 'técnico y detallado';
} else if (cargo.includes('marketing')) {
  tono = 'creativo y orientado a resultados';
}

return { json: { ...$ json, tono } };
```

Luego en el prompt:
```markdown
TONO: {{ $json.tono }}
```

---

## ✅ Checklist de Configuración

Antes de continuar, verifica:

- [ ] OpenRouter API Key configurada en credenciales
- [ ] Modelo gratuito seleccionado correctamente
- [ ] System message con instrucciones completas
- [ ] Variables de entrada correctamente referenciadas
- [ ] Temperature configurada (0.7 recomendado)
- [ ] Max Tokens suficiente (1000 mínimo)
- [ ] Formato JSON enfatizado en el prompt
- [ ] Ejemplo de email incluido en el prompt
- [ ] Retry logic configurado (opcional pero recomendado)
- [ ] Prueba realizada con datos reales

---

## 📚 Recursos Adicionales

- [n8n AI Agent Documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.agent/)
- [OpenRouter Models List](https://openrouter.ai/models)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [JSON Schema Validation](https://json-schema.org/)

---

**¡Nodo configurado! 🎉 Continúa con el Nodo 6: Output Parser**

👉 [`06-HUBSPOT.md`](06-HUBSPOT.md)
