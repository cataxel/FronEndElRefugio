const form = document.getElementById('formulario');

let idemp = document.getElementById('id-emp');
let fecha = document.getElementById('form-control-fecha');
let totale = document.getElementById('form-control-totale');
let prov = document.getElementById('form-control-prov');


var urlActual = window.location.href;
var idActual = urlActual.substring(urlActual.indexOf('=')+1, urlActual.length)

window.addEventListener('DOMContentLoaded', () => {
    getinfo();
    drawTable();
  })

  // Obtener datos de la API utilizando fetch
  const getinfo = () => {
    fetch('https://farmaexpress.azurewebsites.net/compras/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idemp.value = data1[index]._id;
      var isoDate = data1[index].FechaCompra;
      var date = new Date(isoDate);
      var year = date.getUTCFullYear();
      var month = String(date.getUTCMonth() + 1).padStart(2, '0');
      var day = String(date.getUTCDate()).padStart(2, '0');
      console.log(day);
      var formattedDate = year + '-' + month + '-' + day;
      fecha.value = formattedDate;
      totale.value = data1[index].TotalCompra;
      prov.value = data1[index].Proveedores;
    });
  }

  const drawTable = () => {
    fetch('https://farmaexpress.azurewebsites.net/lotes/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data2 => {
      var index;
      var tablaDat = $('#example').DataTable();
      for(index=0;index<data2.length;index++){
        if(data2[index].Compra===idActual){
            console.log(data2[index]);
                var fila = [
                  data2[index]._id,
                  data2[index].Medicamento,
                  data2[index].ExistenciasComprada,
                  data2[index].Precio,
                  data2[index].FechaCaducidad,
                  data2[index].ExistenciasComprada * data2[index].Precio,
                ];
                
              // Agregar la fila a la tabla
              tablaDat.row.add(fila);
              // Dibujar la tabla con los nuevos datos
              tablaDat.draw();
        }
      }
    });
  }

  $(document).ready(function() {
    
    var filaSeleccionada = null;
    
      $('#example').DataTable({
        select: {
          info : false
        },
        language: {
          "lengthMenu": "Mostrando _MENU_ registros por página",
          "zeroRecords": "No se encontro ningun registro",
          "info": "Mostrando la pagina _PAGE_ de un total de _PAGES_ paginas",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(Filtrado de _MAX_ registros totales)",
          'search': "Buscar: ",
          'paginate': {
            'next': "Siguiente",
            'previous': 'Anterior'
          }
         },
      });
  
      var tablaDatos = $('#example').DataTable();
    
    // Agrega un escucha de evento para hacer algo cuando se seleccione una fila
    $('#example tbody').on('click', 'tr', function() {
      // Obtén la fila seleccionada
      filaSeleccionada = tablaDatos.row(this).data();
      
      // Registra la información de la fila seleccionada en la consola
      console.log(filaSeleccionada);
      console.log(filaSeleccionada._id);
    });
  
    $('#example tbody').on('click', 'tr.selected', function() {
      // If a row is deselected, set selectedRowData back to null
      if ($(this).hasClass('selected')) {
        filaSeleccionada = null;
      }
    });
      
    });
  
    // Obtener datos de la API utilizando fetch

