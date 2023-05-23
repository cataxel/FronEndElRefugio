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
          { data: 'Medicamento',
            "defaultContent": "No definido"
          },
          { data: 'ExistenciasFisica',
            "defaultContent": "No definido"
          },
          { data: 'FechaCaducidad',
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
          lote.value = filaSeleccionada._id;
          med.value = filaSeleccionada.Medicamento;
          console.log(filaSeleccionada.FechaCaducidad);
          var isoDate = filaSeleccionada.FechaCaducidad;
          var date = new Date(isoDate);
          var year = date.getUTCFullYear();
          var month = String(date.getUTCMonth() + 1).padStart(2, '0');
          var day = String(date.getUTCDate()).padStart(2, '0');
          var formattedDate = year + '-' + month + '-' + day;
          caducidad.value = formattedDate;
          fetch('https://farmaexpress.azurewebsites.net/medicamentos/')
          .then(response => response.json())
          .then(data => {
            var index;
            for(index=0;index<data.length;index++){
              if(data[index].nombreMedicamento===med.value){
                  break
              }
            }
            precio.value = data[index].PrecioVenta;
            //iva.value = (parseFloat(precio.value) * (parseFloat(cant.value)))*0.16;
            subtotal.value = ((parseFloat(precio.value) * (parseFloat(cant.value)))/(1 + (porcentajeIVA / 100))).toFixed(2);
            iva.value = ((subtotal.value)*0.16).toFixed(2);
          });
        }
      })
    });
  
    window.addEventListener('DOMContentLoaded', () => {
      getMedicamentos();
    })
  
    // Obtener datos de la API utilizando fetch
    const getMedicamentos = () => {
      fetch('https://farmaexpress.azurewebsites.net/lotes/')
      .then(response => response.json())
      .then(data => {
        // Cargar los datos en DataTables
        const tabla = $('#tableMed').DataTable();
        tabla.clear().draw();
        var filasSeleccionadas = tabla.rows('.selected').data();
        console.log(data);
        data.forEach(item => {
          tabla.row.add(item).draw();
        });
      });
    }

    let buscarMedContinuar = document.getElementById('buscarMedModal');

