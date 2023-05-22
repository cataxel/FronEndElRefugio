var ban = false;

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
        var acumulado = 0;
        var datosFilas = tablaDatos.rows().data();
        datosFilas.each(function (fila) {
          console.log(fila);
          var subtot = parseFloat(fila[5]);
          acumulado = acumulado+subtot;     
        });
        var prevTotale = parseFloat(acumulado);
        totale.value = prevTotale;
      });

      $('#ingresarMed').click(function() {
        validarcampos();
        if(ban === true){
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
          var acumulado = 0;
          var datosFilas = tablaDatos.rows().data();
          datosFilas.each(function (fila) {
            console.log(fila);
            var subtot = parseFloat(fila[5]);
            acumulado = acumulado+subtot;     
          });
          var prevTotale = parseFloat(acumulado);
          totale.value = prevTotale;
        }
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

function validarcampos()
{
    ban = false;
    var cont = 0;
    if(med.value.trim() === ''){
        alert('Debes ingresar un del medicamento.');
    }else{        
        cont += 1;
    }

    if(cant.value.trim() === ''){
        alert('Debes ingresar la cantidad del medicamento a adquirir');
    }else if(cant.value.trim() < 1 ){
        alert('La cantidad ingresada debe ser de 1 en adelante');
    }else{
        cont += 1;
    }

    var inputValue = caducidad.value;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var selectedDate = new Date(inputValue);

    if(caducidad.value.trim() === ''){
      alert('Debes ingresar la caducidad del medicamento a adquirir');
    }else if(selectedDate > today){
        cont += 1;
    }else{
        alert('La caducidad ingresada debe ser mayor al dia de hoy');
    }

    if(cont==3){
        ban=true;
    }
}
  
  