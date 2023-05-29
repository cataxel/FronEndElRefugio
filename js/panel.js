let bloque1 = document.querySelector('#bloque-1');
let bloque2 = document.querySelector('#bloque-2');
let bloque3 = document.querySelector('#bloque-3');
let bloque4 = document.querySelector('#bloque-4');


window.addEventListener('DOMContentLoaded', () => {
    getinfoCompras();
    getinfoVentas();
})

const getinfoCompras = () => {
    fetch('https://farmaexpress.azurewebsites.net/compras/')
    .then(response1 => response1.json())
    .then(data1 => {
      var indexCompras;
      var totalCompras = 0;
      for(indexCompras=0;indexCompras<data1.length;indexCompras++){
        console.log(data1[indexCompras].TotalCompra)
        totalCompras = totalCompras + data1[indexCompras].TotalCompra;
        console.log(totalCompras)
      }
      var formatoDinero = totalCompras.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
      bloque2.textContent = formatoDinero;
      bloque3.textContent = indexCompras;
    });
  }

  const getinfoVentas = () => {
    fetch('https://farmaexpress.azurewebsites.net/ventas/')
    .then(response1 => response1.json())
    .then(data2 => {
      var indexVentas;
      var totalVentas = 0;
      for(indexVentas=0;indexVentas<data2.length;indexVentas++){
        totalVentas = totalVentas + data2[indexVentas].SubTotal + data2[indexVentas].Iva;
      }
      var formatoDineroV = totalVentas.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
      bloque1.textContent = formatoDineroV;
      bloque4.textContent = indexVentas;
    });
  }