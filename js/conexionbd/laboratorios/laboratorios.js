$(document).ready(function() {
    
    var filaSeleccionada = null;
    
      $('#example').DataTable({
        select: {
          info : false
        },
        columns: [
          { data: '_id',
            "defaultContent": "No definido",
            visible: false 
          },
          { data: 'Nombre',
            "defaultContent": "No definido"
          },
          { data: 'Direccion',
            "defaultContent": "No definido"
          },
          { data: 'Estado',
            "defaultContent": "No definido"
          },
          { data: 'CP',
            "defaultContent": "No definido"
          },
          { data: 'Localidad',
            "defaultContent": "No definido"
          },
          { data: 'Email',
            "defaultContent": "No definido",
            render: function(type, row) {
              if (type === "") {
                  return 'N/A';
              }
              return type;
            }
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
  
      var mod = document.querySelector('#modificar');
      mod.addEventListener('click', ()=>{
        if(filaSeleccionada === null){
          alert('Debes seleccionar un elemento de la tabla primero para continuar con la operación');
        }else{
          location.href='laboratorios-modificar.html?id='+filaSeleccionada._id
        }
      })

      var visual = document.querySelector('#visualizar');
      visual.addEventListener('click', ()=>{
        if(filaSeleccionada === null){
          alert('Debes seleccionar un elemento de la tabla primero para continuar con la operación');
        }else{
          location.href='laboratorios-visualizar.html?id='+filaSeleccionada._id
        }
      })
      
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      getLabs();
    })
  
    // Obtener datos de la API utilizando fetch
    const getLabs = () => {
      fetch('https://farmaexpress.azurewebsites.net/laboratorios/')
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