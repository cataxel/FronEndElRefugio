const form = document.getElementById('formulario');

let idemp = document.getElementById('id-emp');
let med = document.getElementById('form-control-med');
let idmed = document.getElementById('form-control-idmed');
let cant = document.getElementById('form-control-cant');
let precio = document.getElementById('form-control-precio');
let caducidad = document.getElementById('form-control-caducidad');
let subtotal = document.getElementById('form-control-subtotal');
let iva = document.getElementById('form-control-iva');
let metodo = document.getElementById('form-control-metodo');

let lote = document.getElementById('form-control-lote');

let fecha = document.getElementById('form-control-fecha');

let buscarMed = document.getElementById('buscarMed');

var urlActual = window.location.href;
var idActual = urlActual.substring(urlActual.indexOf('=')+1, urlActual.length)

window.addEventListener('DOMContentLoaded', () => {
    getinfo();
    drawTable();
  })

  // Obtener datos de la API utilizando fetch
  const getinfo = () => {
    fetch('https://farmaexpress.azurewebsites.net/ventas/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idemp.value = data1[index]._id;
      var isoDate = data1[index].Fecha;
      var date = new Date(isoDate);
      var year = date.getUTCFullYear();
      var month = String(date.getUTCMonth() + 1).padStart(2, '0');
      var day = String(date.getUTCDate()).padStart(2, '0');
      console.log(day);
      var formattedDate = year + '-' + month + '-' + day;
      fecha.value = formattedDate;
      subtotal.value = data1[index].SubTotal;
      iva.value = data1[index].Iva;
      metodo.value = data1[index].MetodoPago;
      lote.value = data1[index].Lote;
      cant.value = data1[index].CantidadVendida;
      fetch('https://farmaexpress.azurewebsites.net/lotes/')
          .then(response => response.json())
          .then(data => {
            var index;
            for(index=0;index<data.length;index++){
              if(data[index]._id===lote.value){
                  break
              }
            }
            med.value = data[index].Medicamento;
        });

        fetch('https://farmaexpress.azurewebsites.net/medicamentos/')
          .then(response => response.json())
          .then(data3 => {
            var index;
            for(index=0;index<data3.length;index++){
              if(data3[index].nombreMedicamento===med.value){
                  break
              }
            }
            precio.value = data3[index].PrecioVenta;
        });
    });
  }

