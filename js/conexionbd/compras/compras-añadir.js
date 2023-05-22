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
    if(prov.value.trim()===''){
        alert('Debes ingresar el proveedor');
    }else if($('#example').DataTable().rows().count() > 0){
        form.addEventListener('submit', (event)=>{
            event.preventDefault();
            console.log($('#example').DataTable().rows());
                const a = {
                    FechaCompra: fecha.value,
                    TotalCompra: totale.value,
                  };
                console.log(JSON.stringify(a));
                fetch('https://backendelrefugio-production.up.railway.app/compras/nueva', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //body: jsonData,
                    body: JSON.stringify(a),
                }).then(res => res.json())
                .then(result=>console.log(result))
                .catch(err => alert(err))
        })
    }else{
        alert('Debes adquirir al menos un elemento');
    }
    
})