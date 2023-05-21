const form = document.getElementById('formulario');

let total = document.getElementById('form-control-total');
let tot = document.getElementById('form-control-tot');
let empleado = document.getElementById('form-control-empleado');
let prov = document.getElementById('form-control-prov');
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

var ban = false;

valueData();
asignarEmpleado();

function valueData()
{
    //antiguedad.value='2010-10-10'
    var fechaAc = new Date();

    var year = fechaAc.getFullYear();
    var month = String(fechaAc.getMonth() + 1).padStart(2, '0');
    var day = String(fechaAc.getDate()).padStart(2, '0');

    var fechaActualFormateada = year + '-' + month + '-' + day;
    fecha.value=fechaActualFormateada
}

function asignarEmpleado(){
    empleado.value = JSON.parse(sessionStorage.getItem('nombre'));
}