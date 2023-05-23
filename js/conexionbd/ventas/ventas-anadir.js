const form = document.getElementById('formulario');

let med = document.getElementById('form-control-med');
let idmed = document.getElementById('form-control-idmed');
let cant = document.getElementById('form-control-cant');
let precio = document.getElementById('form-control-precio');
let caducidad = document.getElementById('form-control-caducidad');
let subtotal = document.getElementById('form-control-subtotal');
let iva = document.getElementById('form-control-iva');
let metodo = document.getElementById('form-control-metodo');

let lote = document.getElementById('form-control-lote');

let fecha = document.getElementById('form-control-fecha');

let buscarMed = document.getElementById('buscarMed');

var porcentajeIVA = 16;
var ban = false;

valueData();
inicioTotal();

precio.addEventListener('input', () => {
    //iva.value = (parseFloat(precio.value) * (parseFloat(cant.value)))*0.16;
    subtotal.value = ((parseFloat(precio.value) * (parseFloat(cant.value)))/(1 + (porcentajeIVA / 100))).toFixed(2);
    iva.value = ((subtotal.value)*0.16).toFixed(2);
});

cant.addEventListener('input', () => {
     //iva.value = (parseFloat(precio.value) * (parseFloat(cant.value)))*0.16;
     subtotal.value = ((parseFloat(precio.value) * (parseFloat(cant.value)))/(1 + (porcentajeIVA / 100))).toFixed(2);
     iva.value = ((subtotal.value)*0.16).toFixed(2);
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

$(document).ready(function() {
    $('#buscarMed').click(function() {
      $('#buscarMedModal').modal('show');
    });
});

function inicioTotal(){
    subtotal.value = 0
    iva.value = 0
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    if(ban===true){
        form.addEventListener('submit', (event)=>{
            const a = {
                Iva: iva.value,
                SubTotal: subtotal.value,
                Fecha: fecha.value,
                MetodoPago: metodo.value,
                CantidadVendida: cant.value,
                Lote: lote.value
            };
            console.log(JSON.stringify(a));
            fetch('https://farmaexpress.azurewebsites.net/ventas/nueva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: jsonData,
                body: JSON.stringify(a),
            }).then(res => res.json())
            .then(result=>console.log(result), vaciarCampos())
            .catch(err => alert(err))
        })
    }
})

function vaciarCampos(){
    inicioTotal();
    med.value = '';
    cant.value = '';
    precio.value = '';
    caducidad.value = '';
    lote.value = '';
    getMedicamentos();
}

function validarcampos()
{
    ban = false;
    var cont = 0;
    if(med.value.trim() === ''){
        alert('Debes ingresar el nombre del medicamento.');
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

