$(document).ready(function() {
    
    var filaSeleccionada = null;
    
      $('#example').DataTable({
        select: {
          info : false
        },
        columns: [
          { data: '_id',
            "defaultContent": "No definido"
          },
          { data: 'Fecha',
            "defaultContent": "No definido",
            render: 
              function (type) {
                var isoDate = type;
                var date = new Date(isoDate);
                var year = date.getUTCFullYear();
                var month = String(date.getUTCMonth() + 1).padStart(2, '0');
                var day = String(date.getUTCDate()).padStart(2, '0');
                console.log(day);
                var formattedDate = day + '-' + month + '-' + year;
                return formattedDate
            }
          },
          { data: 'Iva',
            "defaultContent": "No definido",
            render: 
              function (type) {
                var formatoDinero = type.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                return formatoDinero
            }
          },
          { data: 'SubTotal',
            "defaultContent": "No definido",
            render: 
              function (type) {
                var formatoDinero = type.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                return formatoDinero
            }
          },
          { data: 'MetodoPago',
            "defaultContent": "No definido"
          },
          { data: 'CantidadVendida',
            "defaultContent": "No definido"
          },
          { data: 'Estatus',
          render: function(type, row) {
              if (type === true) {
                return 'Activo';
              } else if (type === false) {
                return 'Inactivo';
              }
            return type;
          }
        },
        ],
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
  
      var visual = document.querySelector('#visualizar');
      visual.addEventListener('click', ()=>{
        if(filaSeleccionada === null){
          alert('Debes seleccionar un elemento de la tabla primero para continuar con la operación');
        }else{
          location.href='compras-consultar.html?id='+filaSeleccionada._id
        }
      });
      
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      getVentas();
    })
  
    // Obtener datos de la API utilizando fetch
    const getVentas = () => {
      fetch('https://backendelrefugio-production.up.railway.app/ventas/')
      .then(response => response.json())
      .then(data => {
        // Cargar los datos en DataTables
        const tabla = $('#example').DataTable();
        var filasSeleccionadas = tabla.rows('.selected').data();
        console.log(data);
        data.forEach(item => {
          tabla.row.add(item).draw();
        });
      });
    }
  
  