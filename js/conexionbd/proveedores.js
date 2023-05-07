
// Hacer una solicitud HTTP al backend para obtener datos JSON
fetch('https://backendelrefugio-production.up.railway.app/proveedor/')
  .then(response => response.json()) // Analizar los datos JSON
  .then(data => {
    // Usar los datos JSON en el frontend
    console.log(data); // Imprimir los datos en la consola
    // Acceder a los datos y mostrarlos en una tabla HTML
    let tabla = document.createElement('table');
    for (let i = 0; i < data.length; i++) {
      let fila = tabla.insertRow();
      let celda1 = fila.insertCell();
      let celda2 = fila.insertCell();
      celda1.innerHTML = data[i].nombre;
      celda2.innerHTML = data[i].edad;
    }
    document.body.appendChild(tabla);
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });