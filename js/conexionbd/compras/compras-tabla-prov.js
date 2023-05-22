$(document).ready(function() {
    
    var filaSeleccionada = null;
  
    $('#tableProv').DataTable({
      select: {
        info : false
      },
      columns: [
        { data: '_id' },
        { data: 'nombreProveedores',
          "defaultContent": "No definido"
        },
        { data: 'telefonoProveedores',
          "defaultContent": "No definido"
        },
        { data: 'EstadoProveedores',
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
  
      var tablaDatos = $('#tableProv').DataTable();
    
    // Agrega un escucha de evento para hacer algo cuando se seleccione una fila
    $('#tableProv tbody').on('click', 'tr', function() {
      // Obtén la fila seleccionada
      filaSeleccionada = tablaDatos.row(this).data();
      
      // Registra la información de la fila seleccionada en la consola
      console.log(filaSeleccionada);
      console.log(filaSeleccionada._id);
    });
  
    $('#tableProv tbody').on('click', 'tr.selected', function() {
      // If a row is deselected, set selectedRowData back to null
      if ($(this).hasClass('selected')) {
        filaSeleccionada = null;
      }
    });
  
      var mod = document.querySelector('#buscarProvContinuar');
      mod.addEventListener('click', ()=>{
        if(filaSeleccionada === null){
          alert('Debes seleccionar un elemento de la tabla primero para continuar con la operación');
        }else{
          $(document).ready(function() {
            $('#buscarProvContinuar').click(function() {
              $('#buscarProvModal').modal('hide');
            });
          });
          idprov.value = filaSeleccionada._id;
          prov.value = filaSeleccionada.nombreProveedores;
        }
      })
    });
  
    window.addEventListener('DOMContentLoaded', () => {
        getProveedores();
    })
  
    // Obtener datos de la API utilizando fetch
    const getProveedores = () => {
      fetch('https://backendelrefugio-production.up.railway.app/proveedor/')
      .then(response => response.json())
      .then(data => {
        // Cargar los datos en DataTables
        const tabla = $('#tableProv').DataTable();
        console.log(data);
        data.forEach(item => {
          tabla.row.add(item).draw();
        });
      });
    }

    let buscarProvContinuar = document.getElementById('buscarProvModal');

