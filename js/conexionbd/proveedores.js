
// Hacer una solicitud HTTP al backend para obtener datos JSON
fetch('https://backendelrefugio-production.up.railway.app/proveedor/')
  .then(response => response.json()) // Analizar los datos JSON
  .then(data => {
    // Usar los datos JSON en el frontend
    console.log(data); // Imprimir los datos en la consola
    // Acceder a los datos y mostrarlos en una tabla HTML
    
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });