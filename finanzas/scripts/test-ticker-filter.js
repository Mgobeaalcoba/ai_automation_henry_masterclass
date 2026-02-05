#!/usr/bin/env node

/**
 * Test Ticker Filter Script
 * 
 * Uso:
 *   node test-ticker-filter.js
 * 
 * Propósito:
 *   Testear la lógica del filtro de tickers antes de usar en n8n
 */

// ========================================
// LÓGICA DEL FILTRO (idéntica al nodo Code)
// ========================================
function tickerFilter(input) {
  const keywords = ['NVIDIA', 'TSLA', 'AAPL', 'BTC', 'COMMODITY', 'AI'];
  const title = input.title.toUpperCase();
  const matches = keywords.filter(k => title.includes(k));

  return {
    interesting: matches.length > 0,
    ticker: matches[0] || 'GENERIC',
    title: input.title,
    link: input.link
  };
}

// ========================================
// CASOS DE PRUEBA
// ========================================
const testCases = [
  {
    title: "NVIDIA Announces Record Q4 Earnings",
    link: "https://finance.yahoo.com/news/nvidia-earnings-1",
    expected: { interesting: true, ticker: 'NVIDIA' }
  },
  {
    title: "Tesla Stock Jumps After Strong Deliveries",
    link: "https://finance.yahoo.com/news/tsla-deliveries-2",
    expected: { interesting: true, ticker: 'TSLA' }
  },
  {
    title: "Apple Unveils New iPhone with AI Features",
    link: "https://finance.yahoo.com/news/aapl-iphone-3",
    expected: { interesting: true, ticker: 'AAPL' }
  },
  {
    title: "Bitcoin Surges Past $50,000 Milestone",
    link: "https://finance.yahoo.com/news/btc-surge-4",
    expected: { interesting: true, ticker: 'BTC' }
  },
  {
    title: "Gold Prices Rise as Commodity Markets Rally",
    link: "https://finance.yahoo.com/news/commodity-rally-5",
    expected: { interesting: true, ticker: 'COMMODITY' }
  },
  {
    title: "OpenAI Announces GPT-5 with Revolutionary AI Capabilities",
    link: "https://finance.yahoo.com/news/openai-gpt5-6",
    expected: { interesting: true, ticker: 'AI' }
  },
  {
    title: "Federal Reserve Announces Interest Rate Decision",
    link: "https://finance.yahoo.com/news/fed-rates-7",
    expected: { interesting: false, ticker: 'GENERIC' }
  },
  {
    title: "Amazon Reports Strong Holiday Sales",
    link: "https://finance.yahoo.com/news/amazon-sales-8",
    expected: { interesting: false, ticker: 'GENERIC' }
  }
];

// ========================================
// EJECUTAR TESTS
// ========================================
console.log('🧪 Testeando filtro de tickers...\n');
console.log('━'.repeat(60));

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  console.log(`\n📝 Test ${index + 1}: "${testCase.title.substring(0, 50)}..."`);
  
  const result = tickerFilter(testCase);
  
  const interestingMatch = result.interesting === testCase.expected.interesting;
  const tickerMatch = result.ticker === testCase.expected.ticker;
  
  if (interestingMatch && tickerMatch) {
    console.log('   ✅ PASSED');
    console.log(`   📊 Resultado: interesting=${result.interesting}, ticker=${result.ticker}`);
    passed++;
  } else {
    console.log('   ❌ FAILED');
    console.log(`   📊 Esperado: interesting=${testCase.expected.interesting}, ticker=${testCase.expected.ticker}`);
    console.log(`   📊 Obtenido: interesting=${result.interesting}, ticker=${result.ticker}`);
    failed++;
  }
});

// Resumen
console.log('\n━'.repeat(60));
console.log('\n📊 RESUMEN:\n');
console.log(`✅ Tests exitosos: ${passed}/${testCases.length}`);
console.log(`❌ Tests fallidos: ${failed}/${testCases.length}`);

if (failed === 0) {
  console.log('\n✨ ¡Todos los tests pasaron! El filtro está funcionando correctamente.');
} else {
  console.log('\n⚠️  Algunos tests fallaron. Revisa la lógica del filtro.');
}

console.log('\n💡 PERSONALIZACIÓN:\n');
console.log('Para agregar más tickers a tu watchlist, edita el array keywords:');
console.log('const keywords = [\'NVIDIA\', \'TSLA\', \'AAPL\', \'BTC\', \'COMMODITY\', \'AI\', \'TU_TICKER\'];');

console.log('\n━'.repeat(60));
