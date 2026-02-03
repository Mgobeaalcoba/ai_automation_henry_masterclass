# **🏭 Masterclass: The Omni-Channel Content Factory**

**Instructor:** Mariano Gobea Alcoba   
**Estrategia:** Discurso de fondo (Slides 1-15) \+ Construcción en vivo.

---

## **El Manifiesto Estratégico (Presentación)**

### **Slide 1: Portada \- The Omni-Channel Content Factory**

**Discurso:** "Bienvenidos a todos. Hoy no estamos aquí para aprender un 'truco' de ChatGPT. Estamos aquí para cambiar nuestra identidad: de creadores de contenido manuales a Arquitectos de Sistemas de Contenido. El título de esta charla no es casualidad. Una 'Fábrica' implica procesos, repetibilidad y, sobre todo, independencia del esfuerzo humano constante. Vamos a construir una infraestructura que convierta una simple lectura de domingo en una estrategia de marketing distribuida en tres canales en menos de 5 segundos. Mi nombre es Mariano Gobea Alcoba, y hoy vamos a ver cómo n8n a traves de LangChain se convierten en la columna vertebral de sus carrera en automatización y marketing"

### **Slide 2: La Trampa de la Fricción**

**Discurso:** "¿Cuántas veces han leído un artículo brillante y pensado: 'Debería escribir un post sobre esto', pero luego el proceso de abrir LinkedIn, resumir, adaptar el tono y formatear les dio tanta pereza que no lo hicieron? Eso se llama fricción. La fricción es el asesino silencioso de la marca personal y corporativa. Cada paso manual (copiar, pegar, abrir pestañas) es una oportunidad para abandonar. El contenido omnicanal hoy no es un lujo, es una necesidad, pero el costo de oportunidad de hacerlo a mano es prohibitivo. Hoy venimos a eliminar esa fricción de raíz."

### **Slide 3: El Navegador como Terminal**

**Discurso:** "Para ser productivos de verdad, debemos dejar de ir hacia las herramientas. Las herramientas deben venir hacia nosotros. El cambio de paradigma que les propongo hoy es convertir su navegador Brave o Chrome (cualquier navegador construido sobre Chromium) en una terminal de comandos. No vamos a entrar a n8n para cargar datos. Vamos a 'inyectar' nuestra fábrica en cualquier sitio web mediante un Bookmarklet. Si están leyendo una noticia de TechCrunch o un paper de investigación, con un clic la fábrica se activa. Es la filosofía hacker aplicada al marketing: el mínimo esfuerzo para el máximo output."

### **Slide 4: Arquitectura del Flujo (Workflow)**

**Discurso:** "Miren este mapa. Es simple, pero cada nodo tiene una razón de ser. Tenemos un 'Oído' (Webhook) que escucha lo que el navegador envía. Un 'Traductor' (JavaScript) que limpia los datos. Un 'Limpiador' (Jina AI) que elimina la basura visual de la web. Un 'Cerebro' (AI Agent) que toma las decisiones creativas y aplica un 'Filtro' (Output Parser) que garantiza que el resultado sea usable (JSON). Y finalmente, un 'Archivo' (Notion) donde todo se organiza. Esta es la arquitectura de un sistema escalable. Si aprenden esta lógica, pueden automatizar cualquier proceso de su empresa."

### **Slide 5: Nodo 1 \- Webhook (The Listener)**

**Discurso:** "El Webhook es el puerto de entrada a nuestra fábrica. Imagínenlo como un recepcionista que espera 24/7. No importa desde dónde enviemos los datos, el Webhook los recibe de forma estandarizada. En n8n, este es el nodo que nos da la URL única de nuestra fábrica. Es el puente entre el mundo exterior (nuestro navegador) y nuestra infraestructura privada."

### **Slide 6: Nodo 2 \- Code in JavaScript (The Parser)**

**Discurso:** "A veces, la web nos habla de forma desordenada. Debido a protocolos de seguridad de los navegadores, los datos suelen llegar 'empaquetados'. Aquí es donde entra un poco de ingeniería. Usamos una pizca de JavaScript para desempaquetar ese paquete, leer el título, la URL y quién envió el dato. No necesitamos ser desarrolladores senior, solo necesitamos saber cómo darle orden al caos inicial."

### **Slide 7: Nodo 3 \- Jina Reader (The Scraper)**

**Discurso:** "Este es un secreto de los profesionales. Si ustedes le pasan una URL a una IA, la IA va a intentar leer el menú, los banners de publicidad, el footer y los avisos de cookies. Eso gasta dinero y confunde al modelo. Jina AI es un motor de renderizado que toma una web y la convierte en Markdown puro. Es como quitarle la cáscara a la fruta para quedarnos solo con la pulpa. Esto hace que nuestra IA sea un 70% más precisa y mucho más barata."

### **Slide 8: Nodo 4 \- AI Agent (The Architect)**

**Discurso:** "Aquí ocurre la magia. Pero atención: no es un simple chat. Es un Agente de LangChain. A diferencia de un chat normal, el Agente tiene una 'misión'. Le asignamos el rol de Content Architect Senior. Su trabajo no es solo resumir, es transformar. Debe entender que LinkedIn requiere un gancho, que X requiere brevedad y que el Newsletter requiere profundidad. Es nuestro empleado más brillante y nunca se cansa."  
**Parte 2 de Slide 8:** "No todos los modelos son iguales. Para esta fábrica, necesitamos velocidad y bajo costo, en este caso costo cero. Podemos usar z-ai/glm-4.5 (gratis) o los modelos flash de Gemini que funcionan muy bien con este tipo de tareas y son muy baratas. LangChain nos permite cambiar de cerebro sin cambiar de cuerpo. Si mañana sale un modelo nuevo que es mejor y más barato, simplemente cambiamos este nodo y nuestra fábrica sigue funcionando igual."

### **Slide 9: El “Cerebro” detras del prompt**

**Discurso**: “Ahora, entremos en el 'cómo'. Tener el mejor modelo del mundo no sirve de nada si no sabemos darle órdenes quirúrgicas. Lo que ven en pantalla es la Anatomía de un Prompt de Grado Industrial. No le pedimos a la IA 'hazme un post'; le construimos una arquitectura de pensamiento dividida en tres pilares críticos.

- Rol y Tono (La Identidad): Primero, le asignamos una personalidad técnica. No es un asistente, es un Content Architect Senior. Es profesional y analítico. Y aquí está el truco para elevar la calidad: las prohibiciones. Le prohibimos terminantemente usar adjetivos como 'increíble', 'revolucionario' o 'asombroso'. ¿Por qué? Porque esas palabras son el 'delator' de la IA. Queremos que el contenido hable por su valor, no por su exageración.  
- Restricciones de Formato (Los Guardrieles): Una fábrica necesita piezas estandarizadas. Aquí le exigimos que cada canal tenga su propia psicología: un gancho AIDA para LinkedIn, un hilo de exactamente 5 tweets para X (ni uno más, ni uno menos) y un resumen técnico de 150 palabras para la Newsletter. Al ser tan específicos, eliminamos la aleatoriedad de la respuesta.  
- Objetivo (La Calidad): El fin último es eliminar el 'Olor a IA'. En ingeniería de prompts, Especificidad \= Calidad. Cuanto más cerramos el margen de maniobra de la IA, más humano y curado se siente el resultado final.

Estamos pasando de la 'inspiración' a la ingeniería de procesos. Y para que vean que esto no es solo teoría, este es el código que vamos a inyectar en nuestro nodo de n8n para que nuestro arquitecto empiece a trabajar

### **Slide 10: Aux Tool: Structured Output Parser**

**Discurso:** "Este es el nodo más técnico y el más importante. La IA a veces se pone creativa y te responde con '¡Claro, aquí tienes tus posts\!'. Eso rompe cualquier automatización. El Output Parser obliga a la IA a entregarnos un objeto JSON estricto. 'Dame el post de LinkedIn en este cajón, el de X en este otro y la Newsletter aquí'. Sin esto, los datos no podrían fluir hacia Notion de manera automática."

### **Slide 11: Nodo 5 \- Notion (The Content Hub)**

**Discurso:** "Finalmente, llegamos a nuestra base de operaciones. Notion no es solo para tomar notas; aquí es nuestra base de datos relacional. Cada ejecución crea una página nueva con los contenidos ya listos para que un humano les dé el toque final. Pasamos de la hoja en blanco a una base de datos llena de propuestas listas para editar. Aquí es donde el marketing se vuelve escalable."

### **Slide 12: La Fábrica en Acción (Live Demo)**

**Discurso:** "Basta de teoría. Después de la siguiente Slide iremos al lienzo en blanco. Voy a mostrarles cómo, desde una hoja vacía en n8n, conectamos estos cables invisibles para crear algo que parece magia. Vamos a ver los nodos iluminarse en verde, señal de que los datos están fluyendo."

### **Slide 13: El Dashboard de Notion (Resultados)**

**Discurso:** "Así se verá el resultado. En el tiempo que voy a tardar en explicarles esta slide, el sistema ya procesó la información y la clasificó. Tenemos el título, el link original y las tres piezas de contenido separadas. Esto es lo que separa a un 'hacedor' de un 'estratega'. y por supuesto queda espacio para el necesario rol humano en este tipo de contenidos (tenemos que revisarlos, curarlos, modificarlos si fuese necesario)"

---

## **Implementación Técnica (Lienzo en Blanco)**

A continuación, los bloques de código exactos que vas a copiar y pegar durante la demo en vivo:

### **1\. El Bookmarklet (Para el navegador)**

```javascript
javascript:(function(){
  fetch('https://TU_URL_N8N/webhook/marketing-magic', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      url: window.location.href,
      title: document.title,
      user: 'Mariano Gobea'
    })
  });
  alert('🚀 Contenido enviado a la Factory');
})();
```

### 

### **2\. El Parser (Nodo Code)**

```javascript
const rawData = $json.body;
const parsedData = JSON.parse(rawData);

return {
  url: parsedData.url,
  title: parsedData.title,
  user: parsedData.user
};
```

### 

### **3\. Jina AI (Nodo HTTP Request)**

* **URL:** `https://r.jina.ai/{{ $json.url }}`  
* **Authentication:** `Generic Credential Type`  
* **`Generic Auth Type`**`: Bearer Auth`  
* **`Bearer Auth`**`: Bearer Auth Jian AI // No expongo Credenciales!!!`

### **4\. El User Prompt y el System Prompt (Nodo AI Agent)**

```
Contenido para procesar:
{{ $json.data }}

Título del artículo:
{{ $('Code in JavaScript').item.json.title }}

Tarea: Genera el contenido para LinkedIn, X y la Newsletter basándote en este texto.
```

```
Eres un Content Architect Senior. Tu tarea es recibir el contenido de un artículo y transformarlo en tres piezas de marketing de alto impacto.

Debes completar EXACTAMENTE estas tres propiedades: 
1. linkedin: Un post con gancho, 3 bullets de valor y pregunta final. 
2. x: Un hilo de exactamente 5 posteos de X que resuma la esencia del artículo. 
3. newsletter: Un resumen ejecutivo técnico de 150 palabras con tono profesional.

IMPORTANTE: Escribe el contenido real. No describas el formato. No inventes campos. Evita palabras trilladas como 'revolucionario' o 'asombroso'.
```

### 

### **5\. Structured Output Parser (JSON Schema)**

```json
{
  "type": "object",
  "properties": {
    "linkedin": { "type": "string", "description": "Post para LinkedIn" },
    "x": { "type": "string", "description": "Hilo de Twitter" },
    "newsletter": { "type": "string", "description": "Resumen para newsletter" }
  },
  "required": ["linkedin", "x", "newsletter"]
}
```

---

### **Slide 14: Resultados e Impacto**

**Discurso:** "Hagamos números rápidos. Una persona tarda 15 minutos (quizas más) en hacer esta adaptación de forma mediocre. Esta fábrica lo hace en 1 minuto de forma profesional. En un mes de contenido diario, ahorras más de 10 horas de trabajo operativo. Ese es tiempo que podés usar para pensar la estrategia, no para pelearte con el teclado."

### **Slide 15: Próximos Pasos y Q\&A**

**Discurso:** "El futuro pertenece a quienes construyen sistemas. Hoy se llevan la lógica y el código. La pregunta ahora es: ¿qué otra parte de su trabajo van a automatizar mañana? Abrimos el espacio para preguntas."

