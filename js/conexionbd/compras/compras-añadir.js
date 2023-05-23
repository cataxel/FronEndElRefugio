const form = document.getElementById('formulario');

let empleado = document.getElementById('form-control-empleado');
let prov = document.getElementById('form-control-prov');
let idprov = document.getElementById('form-control-idprov');
let fecha = document.getElementById('form-control-fecha');
let med = document.getElementById('form-control-med');
let idmed = document.getElementById('form-control-idmed');
let buscarEmpleado = document.getElementById('buscarEmpleado');
let buscarProv = document.getElementById('buscarProv');
let buscarMed = document.getElementById('buscarMed');
let cant = document.getElementById('form-control-cant');
let precio = document.getElementById('form-control-precio');
let caducidad = document.getElementById('form-control-caducidad');
let ingresarMed = document.getElementById('ingresarMed');
let totale = document.getElementById('form-control-totale');

var ban = false;

valueData();
asignarEmpleado();
inicioTotal();

$(document).ready(function() {
    $('#buscarMed').click(function() {
      $('#buscarMedModal').modal('show');
    });
    $('#buscarProv').click(function() {
        $('#buscarProvModal').modal('show');
      });
});


function valueData()
{
    //antiguedad.value='2010-10-10'
    var fechaAc = new Date();

    var year = fechaAc.getFullYear();
    var month = String(fechaAc.getMonth() + 1).padStart(2, '0');
    var day = String(fechaAc.getDate()).padStart(2, '0');

    var fechaActualFormateada = year + '-' + month + '-' + day;
    fecha.value=fechaActualFormateada;
}

function inicioTotal(){
    totale.value = '0'
}

function asignarEmpleado(){
    empleado.value = JSON.parse(sessionStorage.getItem('nombre'));
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    //if(prov.value.trim()===''){
        //alert('Debes ingresar el proveedor');
    //}else if($('#example').DataTable().rows().count() > 0){
        if($('#example').DataTable().rows().count() > 0){
        form.addEventListener('submit', (event)=>{
            event.preventDefault();
            var tabla = document.getElementById('example'); // Obtener la referencia a la tabla por su ID
                    var recorrido = 0
                    fetch('https://farmaexpress.azurewebsites.net/lotes/')
                        .then(response => response.json())
                        .then(data => {
                          console.log(data.length);
                          info = data;
                          var numlotes = data.length;
                            var numlotesInc = 0
                            var arrayIDLotes = [];
                            for (var i = 1; i < tabla.rows.length; i++) {
                            var fila = tabla.rows[i]; // Obtener la referencia a la fila actual
                                numlotesInc = numlotes + numlotesInc;
                                // Recorrer las celdas de la fila
                                //for (var j = 0; j < fila.cells.length-1; j++) {
                                    var celda0 = fila.cells[0]; // Obtener la referencia a la celda
                                    var valor0idmed = celda0.innerHTML; // Obtener el contenido de la celda
                                    console.log(valor0idmed)
                                    var celda1 = fila.cells[1]; // Obtener la referencia a la celda
                                    var valor1nombremed = celda1.innerHTML; // Obtener el contenido de la celda
                                    console.log(valor1nombremed)
                                    var celda2 = fila.cells[2]; // Obtener la referencia a la celda
                                    var valor2cantidad = celda2.innerHTML; // Obtener el contenido de la celda
                                    console.log(valor2cantidad)
                                    var celda3 = fila.cells[3]; // Obtener la referencia a la celda
                                    var valor3precio = celda3.innerHTML; // Obtener el contenido de la celda
                                    console.log(valor3precio)
                                    var celda4 = fila.cells[4]; // Obtener la referencia a la celda
                                    var valor4fechacad = celda4.innerHTML; // Obtener el contenido de la celda
                                    var celda5 = fila.cells[5]; // Obtener la referencia a la celda
                                    var valor5subtotal = celda5.innerHTML; 
                                    const b = {
                                        ExistenciasFisica: valor2cantidad,
                                        ExistenciasComprada: valor2cantidad,
                                        FechaCaducidad: valor4fechacad
                                    };
                                    fetch('https://farmaexpress.azurewebsites.net/lotes/nuevo', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(b),
                                    }).then(res => res.json())
                                    .then(result=>console.log(result))
                                    .catch(err => alert(err))
                                    numlotesInc += 1;
                                    fetch('https://farmaexpress.azurewebsites.netp/lotes/')
                                    .then(response1 => response1.json())
                                    .then(data1 => {
                                    // Cargar los datos en DataTables
                                    //const tabla1 = $('#example').DataTable();
                                    //var filasSeleccionadas = tabla1.rows('.selected').data();
                                    console.log(data1[numlotes-1]._id)
                                    var loteid = data1[numlotes-1]._id;
                                    arrayIDLotes.push(loteid)
                                    console.log(arrayIDLotes);
                                    const a = {
                                        FechaCompra: fecha.value,
                                        TotalCompra: totale.value,
                                        Lote: loteid
                                    };
                                    console.log(JSON.stringify(a));
                                    fetch('https://farmaexpress.azurewebsites.net/compras/nueva', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        //body: jsonData,
                                        body: JSON.stringify(a),
                                    }).then(res => res.json())
                                    .then(result=>console.log(result))
                                    .catch(err => alert(err))
                                    });
                                //}
                            }
                        });
        })
    }else{
        alert('Debes adquirir al menos un elemento');
    }
    
})