$(document).ready(function() {
    
    var filaSeleccionada = null;
    
      $('#tableMed').DataTable({
        select: {
          info : false
        },
        columns: [
          { data: '_id',
            "defaultContent": "No definido",
            visible: false 
          },
          { data: 'nombreMedicamento',
            "defaultContent": "No definido"
          },
          { data: 'tipoMedicamento',
            "defaultContent": "No definido"
          },
          { data: 'PrecioCompra',
            "defaultContent": "No definido",
            render: 
              function (type) {
                var formatoDinero = type.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                return formatoDinero
            }
          },
          { data: 'Aplicacion',
            "defaultContent": "No definido"
          },
          { data: 'Compuesto',
            "defaultContent": "No definido"
          },
          { data: 'Contenido',
            "defaultContent": "No definido"
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
  
      var tablaDatos = $('#tableMed').DataTable();
    
    // Agrega un escucha de evento para hacer algo cuando se seleccione una fila
    $('#tableMed tbody').on('click', 'tr', function() {
      // Obtén la fila seleccionada
      filaSeleccionada = tablaDatos.row(this).data();
      
      // Registra la información de la fila seleccionada en la consola
      console.log(filaSeleccionada);
      console.log(filaSeleccionada._id);
    });
  
    $('#tableMed tbody').on('click', 'tr.selected', function() {
      // If a row is deselected, set selectedRowData back to null
      if ($(this).hasClass('selected')) {
        filaSeleccionada = null;
      }
    });
  
      var mod = document.querySelector('#buscarMedContinuar');
      mod.addEventListener('click', ()=>{
        if(filaSeleccionada === null){
          alert('Debes seleccionar un elemento de la tabla primero para continuar con la operación');
        }else{
          $(document).ready(function() {
            $('#buscarMedContinuar').click(function() {
              $('#buscarMedModal').modal('hide');
            });
          });
          idmed.value = filaSeleccionada._id;
          med.value = filaSeleccionada.nombreMedicamento;
          precio.value = filaSeleccionada.PrecioCompra;
        }
      })
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      getMedicamentos();
    })
  
    // Obtener datos de la API utilizando fetch
    const getMedicamentos = () => {
      fetch('https://farmaexpress.azurewebsites.net/medicamentos/')
      .then(response => response.json())
      .then(data => {
        // Cargar los datos en DataTables
        const tabla = $('#tableMed').DataTable();
        var filasSeleccionadas = tabla.rows('.selected').data();
        console.log(data);
        data.forEach(item => {
          tabla.row.add(item).draw();
        });
      });
    }

    let buscarMedContinuar = document.getElementById('buscarMedModal');

