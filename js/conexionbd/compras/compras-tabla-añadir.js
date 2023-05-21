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

      $('#example tbody').on('click', '.eliminar', function() {
        var fila = $(this).closest('tr');
        tablaDatos.row(fila).remove().draw();
      });

      $('#ingresarMed').click(function() {
        var idmedica = $('#form-control-idmed').val();
        var nombremed = $('#form-control-med').val();
        var cantidad = $('#form-control-cant').val();
        var prec = $('#form-control-precio').val();
        var caducidad = $('#form-control-caducidad').val();
        var subtotal = cantidad*prec;
        var remover = '<a href="#" class="eliminar">Eliminar</a>';        
        tablaDatos.row.add([idmedica, nombremed, cantidad, prec, caducidad, subtotal, remover]).draw();

        idmed.value = '';
        med.value = '';
        precio.value = ''
        cant.value = '';
        valueData();
      });

      
    
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
  
  