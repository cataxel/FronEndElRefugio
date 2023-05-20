const form = document.getElementById('formulario');

let total = document.getElementById('form-control-total');
let tot = document.getElementById('form-control-tot');
form-control-empleado;
form-control-prov;
form-control-fecha;
form-control-med;
buscarEmpleado
buscarProv
buscarMed
form-control-cant
form-control-precio
form-control-caducidad
ingresarMed


var ban = false;

valueData();

function valueData()
{
    //antiguedad.value='2010-10-10'
    var fechaAc = new Date();

    var year = fechaAc.getFullYear();
    var month = String(fechaAc.getMonth() + 1).padStart(2, '0');
    var day = String(fechaAc.getDate()).padStart(2, '0');

    var fechaActualFormateada = year + '-' + month + '-' + day;
    antiguedad.value=fechaActualFormateada
}