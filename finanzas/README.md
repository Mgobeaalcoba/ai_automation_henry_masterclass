# IA vs. Wall Street: Monitor de Tendencias Financieras

**Masterclass: AI Automation para Finanzas**  
**Instructor:** Mariano Gobea Alcoba  
**Fecha:** Jueves 12 de febrero, 2026 - 19:00 hs (Argentina)  
**Duración:** 40 minutos

---

## 📋 Descripción

Esta masterclass te enseña a construir un **sistema de monitoreo financiero automático** que analiza noticias 24/7, identifica señales de mercado y te envía alertas solo cuando detecta movimientos significativos.

### El Problema que Resolvemos

Los traders e inversores enfrentan un dilema:
- **Demasiada información:** Miles de noticias financieras por día
- **Tiempo limitado:** Imposible leer todo y mantener un trabajo normal
- **FOMO constante:** Miedo a perder oportunidades mientras duermes
- **Ruido vs. Señal:** 95% de noticias son irrelevantes para tu cartera

**Resultado:** Análisis paralizante o decisiones emocionales basadas en titulares.

### La Solución

Un sistema automatizado que:
1. **Monitorea** RSS feeds de noticias financieras 24/7 (Yahoo Finance, Reuters)
2. **Filtra** solo las noticias de empresas en tu cartera (NVIDIA, Tesla, Apple, BTC)
3. **Analiza** el sentiment con IA (Bullish, Bearish, Neutral)
4. **Califica** el impacto en una escala de -10 a +10
5. **Alerta** vía email solo cuando el score supera umbrales definidos

**De leer 200 noticias al día a recibir 3-5 alertas relevantes.**

---

## 🏗️ Arquitectura del Sistema

```
RSS Feed (Yahoo Finance)
        ↓
Ticker Filter (JavaScript)
        ↓
Jina AI Reader (Web Scraper)
        ↓
AI Agent (Analista de Riesgo)
        ↓
Output Parser (Estructurador)
        ↓
Gmail Alert (Email Formateado)
```

### Flujo de Datos

1. **Captura:** RSS Feed consulta Yahoo Finance cada hora (o cada 15 min)
2. **Filtrado:** JavaScript identifica si la noticia menciona tickers en watchlist
3. **Limpieza:** Jina AI extrae solo el contenido relevante (sin ads, menús, popups)
4. **Análisis:** AI Agent actúa como analista de hedge fund:
   - Lee la noticia completa
   - Evalúa impacto en el precio (Bullish/Bearish/Neutral)
   - Asigna score de -10 (muy negativo) a +10 (muy positivo)
   - Da recomendación: BUY, SELL, HOLD
5. **Estructuración:** Output Parser garantiza formato JSON consistente
6. **Alerta:** Si score > 7 o < -7, envía email con análisis completo

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito | Plan Gratuito |
|-------------|-----------|---------------|
| **n8n Cloud** | Orquestación del workflow | 5,000 ejecuciones/mes |
| **RSS Feed** | Monitoreo de noticias | Nativo de n8n (gratis) |
| **Jina AI** | Web scraping limpio | Plan gratuito disponible |
| **OpenRouter** | Acceso a modelos IA | Modelos gratuitos (GLM-4.5) |
| **Gmail** | Envío de alertas | Gratis con cuenta Google |

### Por Qué Este Stack

- **RSS Feed** es el método más confiable para monitorear noticias en tiempo real
- **Jina AI** elimina 80% del ruido visual (ads, menús, widgets financieros)
- **OpenRouter** da acceso a modelos gratuitos con capacidad de análisis financiero
- **Gmail** es universal, confiable y permite formateo HTML rico
- **n8n** orquesta todo sin código complejo

### Ventajas vs. Alternativas

**vs. Alertas de Google:**
- Google solo busca keywords, no analiza sentiment
- No puede dar recomendaciones de trading

**vs. Bloomberg Terminal:**
- Bloomberg cuesta $2,000/mes
- Este sistema es gratis y personalizable

**vs. Twitter/Reddit:**
- Redes sociales son fuentes de FOMO, no análisis objetivo
- Este sistema usa fuentes verificadas (Yahoo Finance, Reuters)

---

## 🚀 Setup Completo (20 minutos)

### Prerequisitos

- Cuenta en n8n Cloud ([app.n8n.cloud](https://app.n8n.cloud))
- Cuenta en Jina AI ([jina.ai](https://jina.ai))
- Cuenta en OpenRouter ([openrouter.ai](https://openrouter.ai))
- Cuenta de Gmail (para enviar alertas)

---

### Paso 1: Crear Cuentas y Obtener API Keys (10 min)

#### 1.1 n8n Cloud

```bash
1. Registrarse en https://app.n8n.cloud/register
2. Crear workspace
3. Acceder al dashboard de workflows
```

#### 1.2 Jina AI

```bash
1. Registrarse en https://jina.ai
2. Ir a Dashboard → API Keys
3. Crear nueva API key
4. Guardar: jina_XXXXXXXXXX
```

#### 1.3 OpenRouter

```bash
1. Registrarse en https://openrouter.ai
2. Ir a Keys → Create Key
3. Guardar: sk-or-XXXXXXXXXX
```

**Modelo recomendado:**
- `z-ai/glm-4.5-air:free` (gratis, excelente para análisis financiero)
- `google/gemini-2.0-flash-exp:free` (alternativa gratuita)

#### 1.4 Gmail

```bash
1. Configurar en n8n usando OAuth2 (recomendado)
2. O generar App Password si usas 2FA:
   - Google Account → Security → 2-Step Verification
   - App passwords → Mail → Generate
   - Guardar la contraseña de 16 caracteres
```

---

### Paso 2: Importar y Configurar el Workflow (10 min)

#### 2.1 Importar el Workflow

```bash
1. Descargar workflow.json de este directorio
2. En n8n: Workflows → Import from File
3. Seleccionar workflow.json
4. El workflow se abrirá con 6 nodos
```

#### 2.2 Configurar Nodos

El workflow tiene **6 nodos principales**:

**Nodo 1: RSS Feed - Yahoo Finance**
- Type: RSS Feed Read Trigger
- URL: `https://finance.yahoo.com/news/rss`
- Poll Times: Every Hour (o cada 15 minutos para mercados activos)
- Alternativas:
  - Reuters: `http://feeds.reuters.com/reuters/businessNews`
  - CNBC: `https://www.cnbc.com/id/100003114/device/rss/rss.html`
  - MarketWatch: `http://feeds.marketwatch.com/marketwatch/topstories/`

**Nodo 2: Ticker Filter (Code in JavaScript)**
- Mode: Run Once for Each Item
- Código:
  ```javascript
  const keywords = ['NVIDIA', 'TSLA', 'AAPL', 'BTC', 'COMMODITY'];
  const title = $json.title.toUpperCase();
  const matches = keywords.filter(k => title.includes(k));

  return {
    interesting: matches.length > 0,
    ticker: matches[0] || 'GENERIC',
    title: $json.title,
    link: $json.link
  };
  ```

**Personalización:**
- Edita `keywords` con tus tickers: `['NVDA', 'TSLA', 'GOOGL', 'META', 'AMZN']`
- Usa símbolos oficiales: AAPL (Apple), MSFT (Microsoft), BTC (Bitcoin)

**Nodo 3: Jina AI Reader (HTTP Request)**
- Method: GET
- URL: `https://r.jina.ai/{{ $json.link }}`
- Authentication: Generic Credential Type → Bearer Auth
- Bearer Token: Tu API key de Jina

**Nodo 4: AI Agent (LangChain)**
- Requiere configurar sub-nodos:
  - OpenRouter Chat Model
  - Structured Output Parser

**Sub-nodo: OpenRouter Chat Model**
- Model: `z-ai/glm-4.5-air:free`
- Temperature: 0.3 (más conservador para finanzas)
- Max Tokens: 1000

**Configurar System Prompt:**
```
Eres un Analista de Riesgo de un Hedge Fund. Tu tarea es leer una noticia y determinar el impacto en el precio de la acción (Sentiment).

CRITERIOS DE ANÁLISIS:
- Bullish (10): Noticia muy positiva (ganancias récord, nuevos productos, expansión de mercado)
- Bearish (-10): Noticia muy negativa (fraude, multas, pérdida de market share, despidos masivos)
- Neutral (0): Información rutinaria sin impacto claro

METODOLOGÍA:
1. Identifica el ticker o activo mencionado
2. Evalúa si la noticia afecta fundamentales (ingresos, márgenes, productos)
3. Considera el contexto de mercado (sector, competidores)
4. Asigna score numérico de -10 a +10
5. Da recomendación clara: BUY, SELL o HOLD

TONO: Frío, numérico, basado en datos. Sin especulación.

El Output de reasoning debe estar en Español.
```

**Sub-nodo: Structured Output Parser**
- Schema (JSON):
  ```json
  {
    "type": "object",
    "properties": {
      "score": { 
        "type": "integer", 
        "description": "Impacto en precio de -10 (muy negativo) a 10 (muy positivo)" 
      },
      "recommendation": { 
        "type": "string", 
        "enum": ["BUY", "SELL", "HOLD"],
        "description": "Acción recomendada basada en el análisis"
      },
      "reasoning": { 
        "type": "string",
        "description": "Explicación técnica del análisis en español" 
      }
    },
    "required": ["score", "recommendation", "reasoning"]
  }
  ```

**Nodo 5: IF Conditional (Filtro de Alertas)**
- Condition: `{{ $json.output.score }}` > 7 OR `{{ $json.output.score }}` < -7
- Purpose: Solo enviar email si el score es extremo (muy bullish o muy bearish)
- Opcional: Ajustar umbral a 5/-5 para más alertas

**Nodo 6: Gmail (Send Email)**
- To: Tu email
- Subject: `🚨 ALERTA [{{ $('Ticker Filter').item.json.ticker }}] - {{ $json.output.recommendation }}`
- Email Type: HTML
- HTML Body: Ver ejemplo completo en [`examples/sample-email-template.html`](examples/sample-email-template.html)

---

## 🎯 Configuración de Prompts

### System Prompt del AI Agent

El prompt está diseñado para que la IA actúe como analista de hedge fund:

```
Eres un Analista de Riesgo de un Hedge Fund. Tu tarea es leer una noticia y determinar el impacto en el precio de la acción (Sentiment).

CRITERIOS DE ANÁLISIS:
- Bullish (10): Noticia muy positiva (ganancias récord, nuevos productos)
- Bearish (-10): Noticia muy negativa (fraude, multas, pérdida de mercado)
- Neutral (0): Información rutinaria

TONO: Frío, numérico y basado en datos.

El Output de reasoning debe estar en Español.
```

### Por Qué Este Prompt Funciona

- **Rol específico:** "Analista de Hedge Fund" induce rigor técnico
- **Escala clara:** -10 a +10 elimina ambigüedad
- **Ejemplos concretos:** La IA sabe qué considerar "muy positivo" vs "neutral"
- **Tono definido:** "Frío y numérico" previene sensacionalismo
- **Idioma:** Reasoning en español facilita lectura rápida de alertas

### Customización del Prompt

**Para más conservador (menos alertas):**
```
Sé extremadamente conservador. Solo asigna scores > 8 o < -8 si la noticia 
cambia fundamentalmente las proyecciones de ingresos de la empresa.
```

**Para análisis técnico:**
```
Además del sentiment, considera:
- Volumen de menciones en medios
- Reacción histórica del mercado a noticias similares
- Timing (pre-market, durante trading, after-hours)
```

---

## 🎬 Demo: Cómo Usar el Sistema

### Flujo Completo

1. **Activar el workflow** en n8n (botón "Active")
2. **RSS Feed empieza a consultar** Yahoo Finance cada hora
3. **Cuando sale una noticia** de uno de tus tickers:
   - Jina AI extrae el contenido
   - AI Agent analiza sentiment
   - Si score > 7 o < -7, recibes email
4. **Abres el email** y ves:
   - Ticker (ej: NVIDIA)
   - Recommendation (BUY/SELL/HOLD)
   - Score (ej: 9/10)
   - Reasoning (análisis en español)
   - Link a noticia original

### Ejemplo de Alerta Real

**Input (noticia RSS):**
- Título: "NVIDIA supera expectativas con ingresos récord en chips de IA"
- Link: https://finance.yahoo.com/news/nvidia-q4-earnings-beat

**Procesamiento:**
1. Ticker Filter detecta "NVIDIA" → interesante: true
2. Jina AI extrae contenido limpio del artículo
3. AI Agent analiza:
   - Lee: "Ingresos subieron 200% YoY, guía supera estimaciones"
   - Evalúa: Impacto muy positivo en fundamentales
   - Asigna: score = 9, recommendation = BUY

**Output (email HTML):**

```
🚨 ALERTA [NVIDIA] - BUY

RECOMMENDATION: BUY
Score: 9/10

📊 Análisis del Analista:
NVIDIA reportó ingresos récord impulsados por demanda de chips de IA. 
El crecimiento de 200% YoY supera ampliamente estimaciones del mercado. 
La guía para Q1 sugiere que la tendencia continuará. Fundamentales extremadamente 
sólidos. Recomendación de compra con alta convicción.

📰 Fuente:
"NVIDIA supera expectativas con ingresos récord en chips de IA"
[Leer Artículo Completo]
```

---

## 🧪 Testing del Workflow

### Test Completo (End-to-End)

**Método 1: Esperar noticia real**
1. Activa el workflow
2. Espera hasta 1 hora (próximo poll de RSS)
3. Revisa n8n → Executions para ver si detectó noticias
4. Si hay match de ticker, revisa tu email

**Método 2: Test manual con URL**
1. Desactiva el nodo RSS Feed
2. Agrega un nodo "Manual Trigger" al inicio
3. Conecta directamente al nodo "Ticker Filter"
4. Inyecta manualmente una noticia de prueba:
   ```json
   {
     "title": "NVIDIA announces breakthrough AI chip",
     "link": "https://finance.yahoo.com/news/nvidia-ai-chip"
   }
   ```
5. Ejecuta manualmente y observa el flujo

### Test Individual de Nodos

#### Probar RSS Feed

```bash
# Verificar que el feed está activo
curl -I https://finance.yahoo.com/news/rss

# Debería retornar 200 OK
```

#### Probar Ticker Filter

Input de prueba:
```json
{
  "title": "Tesla Stock Jumps After Strong Q4 Deliveries",
  "link": "https://example.com/tesla-news"
}
```

Expected Output:
```json
{
  "interesting": true,
  "ticker": "TSLA",
  "title": "Tesla Stock Jumps After Strong Q4 Deliveries",
  "link": "https://example.com/tesla-news"
}
```

#### Probar Jina AI

```bash
curl https://r.jina.ai/https://finance.yahoo.com \
  -H "Authorization: Bearer tu_jina_api_key"
```

Deberías recibir Markdown limpio del sitio.

#### Probar OpenRouter

```bash
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer tu_openrouter_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "z-ai/glm-4.5-air:free",
    "messages": [
      {"role": "system", "content": "Eres un analista financiero"},
      {"role": "user", "content": "Analiza esta noticia: Apple lanza nuevo iPhone con ventas récord"}
    ]
  }'
```

---

## 🐛 Troubleshooting

### Error: "RSS Feed no devuelve noticias"

**Causa:** URL del feed incorrecta o el feed cambió.

**Solución:**
1. Verifica la URL en tu navegador (debería mostrar XML)
2. Prueba feeds alternativos:
   - Reuters: `http://feeds.reuters.com/reuters/businessNews`
   - MarketWatch: `http://feeds.marketwatch.com/marketwatch/topstories/`
3. Revisa que Poll Times esté configurado (default: Every Hour)

---

### Error: "Ticker Filter no detecta mis tickers"

**Causa:** Keywords mal escritos o ticker no está en el título de la noticia.

**Solución:**
1. Edita el array `keywords` con símbolos oficiales:
   ```javascript
   const keywords = ['NVDA', 'NVIDIA', 'TSLA', 'TESLA', 'AAPL', 'APPLE'];
   ```
2. Agrega variantes del nombre (símbolo + nombre completo)
3. Usa mayúsculas (el código hace `.toUpperCase()` automáticamente)
4. Revisa logs de ejecución en n8n para ver títulos reales de noticias

---

### Error: "Jina AI devuelve 401 Unauthorized"

**Causa:** API key incorrecta.

**Solución:**
1. Regenera API key en Jina AI dashboard
2. Verifica que sea Bearer Auth (no API Key en header custom)
3. En n8n, Authentication → Generic Credential Type → Bearer Auth

---

### Error: "AI Agent no devuelve JSON válido"

**Causa:** Output Parser mal configurado o modelo incompatible.

**Solución:**
1. Verifica que el schema JSON sea exacto (3 propiedades: score, recommendation, reasoning)
2. Cambia a `google/gemini-2.0-flash-exp` (mejor con JSON estructurado)
3. Asegúrate de que el Output Parser esté conectado al AI Agent
4. Revisa logs del AI Agent para ver la respuesta raw

---

### Error: "Recibo alertas de noticias irrelevantes"

**Causa:** Score threshold muy bajo o prompt demasiado permisivo.

**Solución:**
1. Aumenta el umbral en el nodo IF:
   ```
   {{ $json.output.score }} > 8 OR {{ $json.output.score }} < -8
   ```
2. Mejora el System Prompt:
   ```
   Sé extremadamente selectivo. Solo asigna scores extremos (>8 o <-8) si la noticia 
   afecta directamente los ingresos, productos o valoración de la empresa.
   ```
3. Agrega más filtros en Ticker Filter (ej: excluir palabras como "rumor", "allegedly")

---

### Los emails no llegan

**Causa:** Configuración de Gmail incorrecta o bloqueados por spam.

**Solución:**
1. Verifica que el email en Gmail node sea correcto
2. Revisa carpeta de Spam
3. Si usas App Password:
   - Regenera la contraseña en Google Account
   - Asegúrate de que 2FA esté habilitado
4. Usa OAuth2 en lugar de App Password (más confiable)
5. Testea enviando a otro email (ej: secundario) para descartar filtros

---

## 🚀 Extensiones Posibles

### 1. Múltiples Watchlists

Crea diferentes workflows para diferentes estrategias:
- **Watchlist Tech:** NVDA, TSLA, AAPL, GOOGL, META
- **Watchlist Crypto:** BTC, ETH, SOL, ADA
- **Watchlist Commodities:** GOLD, OIL, WHEAT

Cada uno con thresholds y destinatarios diferentes.

---

### 2. Integración con Trading Bots

Conecta la salida del AI Agent a APIs de trading:
- **Alpaca API:** Trading automático de acciones
- **Binance API:** Trading automático de crypto
- **TradingView:** Enviar señales a estrategias

**⚠️ Advertencia:** Solo para traders experimentados. Siempre usa paper trading primero.

---

### 3. Backtesting Histórico

Guarda todas las alertas en una base de datos (Notion, Airtable, PostgreSQL):
- Fecha de alerta
- Ticker
- Score
- Recommendation
- Precio de la acción en ese momento

Luego analiza:
- ¿Las alertas BUY precedieron subas?
- ¿Cuál fue el ROI promedio siguiendo las señales?
- ¿Qué tickers tienen mejor predictibilidad?

---

### 4. Análisis de Volumen de Menciones

Agrega un nodo que cuente menciones del ticker en las últimas 24h:
- Si NVIDIA aparece 10+ veces → Alta cobertura mediática
- Correlacionar volumen de menciones con volatilidad

---

### 5. Sentiment Combinado (Multi-Fuente)

En lugar de solo RSS, analiza múltiples fuentes:
- RSS Feeds (Yahoo, Reuters)
- Twitter (API v2)
- Reddit (r/wallstreetbets API)
- Earnings Call Transcripts

Combina los sentiments y genera score ponderado.

---

### 6. Dashboard en Tiempo Real

Crea un dashboard con:
- **Grafana** o **Metabase:** Visualiza alertas históricas
- **Notion Database:** Tabla filtrable con todas las señales
- **Google Sheets:** Exporta cada alerta para análisis en Excel

---

### 7. Alertas por Telegram/Discord

Reemplaza Gmail por:
- **Telegram Bot:** Alertas instantáneas en el móvil
- **Discord Webhook:** Canal privado con tu equipo de trading
- **SMS via Twilio:** Para señales ultra-críticas

---

### 8. Machine Learning sobre Alertas

Entrena un modelo que aprenda:
- ¿Qué scores históricamente resultaron en ganancias?
- ¿Qué reasoning patterns son más confiables?
- ¿Hay overfitting en ciertos sectores?

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [n8n RSS Feed Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedread/)
- [Jina AI Docs](https://docs.jina.ai/)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Gmail API](https://developers.google.com/gmail/api)

### Fuentes de Noticias Financieras (RSS)
- [Yahoo Finance](https://finance.yahoo.com/news/rss)
- [Reuters Business](http://feeds.reuters.com/reuters/businessNews)
- [MarketWatch](http://feeds.marketwatch.com/marketwatch/topstories/)
- [CNBC](https://www.cnbc.com/id/100003114/device/rss/rss.html)
- [Seeking Alpha](https://seekingalpha.com/feed.xml)

### APIs de Datos Financieros
- [Alpha Vantage](https://www.alphavantage.co/) - Datos históricos gratuitos
- [Finnhub](https://finnhub.io/) - News API + Stock data
- [IEX Cloud](https://iexcloud.io/) - Financial data API

### Comunidades
- [n8n Community Forum](https://community.n8n.io/)
- [r/algotrading](https://reddit.com/r/algotrading) - Automated trading community
- [QuantConnect](https://www.quantconnect.com/) - Algorithmic trading platform

---

## 🎓 Notas para el Instructor

### Timing de la Demo (40 min)

- **0-5 min:** Presentación del problema (información overload en finanzas)
- **5-10 min:** Explicación del stack y arquitectura
- **10-20 min:** Construcción del workflow nodo por nodo
- **20-30 min:** Demo en vivo (activar workflow, mostrar email de alerta)
- **30-35 min:** Mostrar ejemplos de alertas reales recibidas
- **35-40 min:** Q&A y extensiones posibles

### Tips para la Presentación

1. **Ten 2-3 alertas reales guardadas** para mostrar (screenshots de emails)
2. **Prepara una noticia de prueba** en caso de que RSS no devuelva nada en vivo
3. **Explica los thresholds:** Por qué >7 o <-7 (evitar ruido)
4. **Menciona riesgos:** Este NO es asesoramiento financiero, solo herramienta educativa
5. **Muestra el HTML del email:** La estética profesional importa

### Puntos Clave a Enfatizar

- **Automatización NO es trading automático:** Esto es información, no ejecución
- **Siempre verifica las fuentes:** La IA puede interpretar mal el contexto
- **El sistema es una segunda opinión:** No reemplaza tu análisis
- **Sentiment ≠ Predicción de precio:** Correlación no es causalidad
- **Testing es crucial:** Backtestea antes de confiar ciegamente

### Disclaimers Legales

**⚠️ IMPORTANTE:**
- Este sistema es solo educativo
- No es asesoramiento financiero
- No garantiza retornos
- Los mercados son impredecibles
- Siempre consulta con un asesor financiero profesional

---

## 📝 Licencia

Proyecto educativo para Henry Bootcamp - 2026

Material libre para uso educativo con atribución.

---

**Preparado por:** Mariano Gobea Alcoba  
**GitHub:** [@Mgobeaalcoba](https://github.com/Mgobeaalcoba)

---

**¿Listo para monitorear Wall Street con IA? 📈**

[← Volver al índice principal](../README.md)
