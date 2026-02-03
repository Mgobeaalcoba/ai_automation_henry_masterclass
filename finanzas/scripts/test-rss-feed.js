#!/usr/bin/env node

/**
 * Test RSS Feed Script para Financial Monitor
 * 
 * Uso:
 *   node test-rss-feed.js
 * 
 * Propósito:
 *   Verificar que los feeds RSS de noticias financieras están funcionando
 *   y devolviendo datos correctamente.
 */

const https = require('https');

// ========================================
// CONFIGURACIÓN
// ========================================
const RSS_FEEDS = [
  {
    name: 'Yahoo Finance',
    url: 'https://finance.yahoo.com/news/rss',
    description: 'Noticias financieras generales'
  },
  {
    name: 'Reuters Business',
    url: 'http://feeds.reuters.com/reuters/businessNews',
    description: 'Noticias de negocios internacionales'
  },
  {
    name: 'MarketWatch',
    url: 'http://feeds.marketwatch.com/marketwatch/topstories/',
    description: 'Principales noticias del mercado'
  }
];

// ========================================
// FUNCIÓN PARA TESTEAR UN FEED
// ========================================
function testFeed(feed) {
  return new Promise((resolve, reject) => {
    console.log(`\n📡 Testeando: ${feed.name}`);
    console.log(`   URL: ${feed.url}`);
    console.log(`   Descripción: ${feed.description}`);
    
    const urlObj = new URL(feed.url);
    const protocol = urlObj.protocol === 'https:' ? https : require('http');
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; n8n-financial-monitor/1.0)'
      }
    };
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          // Contar items en el feed (muy básico, busca <item> o <entry>)
          const itemCount = (data.match(/<item>/g) || data.match(/<entry>/g) || []).length;
          
          console.log(`   ✅ Status: ${res.statusCode} OK`);
          console.log(`   📰 Items encontrados: ${itemCount}`);
          console.log(`   📏 Tamaño: ${(data.length / 1024).toFixed(2)} KB`);
          
          // Extraer primer título (muy básico)
          const titleMatch = data.match(/<title>(.*?)<\/title>/);
          if (titleMatch && titleMatch[1]) {
            console.log(`   📄 Primer título: "${titleMatch[1].substring(0, 80)}..."`);
          }
          
          resolve({
            feed: feed.name,
            status: 'success',
            statusCode: res.statusCode,
            itemCount: itemCount
          });
        } else {
          console.log(`   ⚠️  Status: ${res.statusCode}`);
          resolve({
            feed: feed.name,
            status: 'warning',
            statusCode: res.statusCode,
            itemCount: 0
          });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}`);
      resolve({
        feed: feed.name,
        status: 'error',
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`   ⏱️  Timeout: El feed tardó más de 10 segundos`);
      resolve({
        feed: feed.name,
        status: 'timeout'
      });
    });
    
    req.end();
  });
}

// ========================================
// EJECUTAR TESTS
// ========================================
(async () => {
  console.log('🚀 Iniciando test de RSS Feeds financieros...\n');
  console.log('━'.repeat(60));
  
  const results = [];
  
  for (const feed of RSS_FEEDS) {
    const result = await testFeed(feed);
    results.push(result);
  }
  
  // Resumen
  console.log('\n━'.repeat(60));
  console.log('\n📊 RESUMEN DE RESULTADOS:\n');
  
  const successful = results.filter(r => r.status === 'success').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const errors = results.filter(r => r.status === 'error' || r.status === 'timeout').length;
  
  console.log(`✅ Exitosos: ${successful}/${RSS_FEEDS.length}`);
  console.log(`⚠️  Warnings: ${warnings}/${RSS_FEEDS.length}`);
  console.log(`❌ Errores: ${errors}/${RSS_FEEDS.length}`);
  
  console.log('\n💡 RECOMENDACIONES:\n');
  
  if (successful === RSS_FEEDS.length) {
    console.log('✨ Todos los feeds están funcionando correctamente!');
    console.log('   Puedes usar cualquiera de ellos en tu workflow de n8n.');
  } else if (successful > 0) {
    console.log('⚠️  Algunos feeds tienen problemas.');
    console.log('   Usa los feeds exitosos para tu workflow.');
    const workingFeeds = results.filter(r => r.status === 'success');
    console.log('\n   Feeds recomendados:');
    workingFeeds.forEach(r => {
      const feed = RSS_FEEDS.find(f => f.name === r.feed);
      console.log(`   - ${r.feed}: ${feed.url}`);
    });
  } else {
    console.log('❌ Ningún feed está funcionando correctamente.');
    console.log('   Verifica tu conexión a internet o prueba más tarde.');
  }
  
  console.log('\n━'.repeat(60));
})();
