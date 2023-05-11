$(document).ready(function() {
    $('#example').DataTable({
      columns: [
        { data: '_id' },
        { data: 'nombreProveedores' },
        { data: 'telefonoProveedores' },
        { data: 'LocalidadProveedores',
          "defaultContent": "No definido"
        },
        { data: 'EstadoProveedores',
          "defaultContent": "No definido"
        },
        { data: 'CPProveedores',
          "defaultContent": "No definido"
        },
        { data: 'DireccionProveedores',
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
    }
    });
  });

  // Obtener datos de la API utilizando fetch
  fetch('https://backendelrefugio-production.up.railway.app/proveedor/')
    .then(response => response.json())
    .then(data => {
      // Cargar los datos en DataTables
      const tabla = $('#example').DataTable();
      data.forEach(item => {
        tabla.row.add(item).draw();
      });
    });