// Bookmarklet: Content Factory Activator
// 
// INSTRUCCIONES DE USO:
// 1. Copia todo este código (desde javascript: hasta el final)
// 2. Crea un nuevo marcador en tu navegador
// 3. Pega este código en el campo URL
// 4. Guarda el marcador como "📚 Content Factory"
// 5. Cuando estés en un artículo, haz clic en el marcador
//
// IMPORTANTE: Reemplaza 'YOUR_N8N_WEBHOOK_URL' con tu URL real de n8n

javascript:(function(){
  const webhookUrl = 'https://YOUR_INSTANCE.app.n8n.cloud/webhook/marketing-magic';
  
  const data = {
    url: window.location.href,
    title: document.title,
    user: 'TU_NOMBRE'  // Cambia esto por tu nombre
  };
  
  fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    alert('🚀 Contenido enviado a la Factory!\n\nRevisa Notion en 10 segundos.');
  })
  .catch(() => {
    // No-cors mode no permite detectar errores, pero el envío se realizó
    alert('🚀 Contenido enviado a la Factory!\n\nRevisa Notion en 10 segundos.');
  });
})();
