const form = document.getElementById('formulario');

let nombre = document.querySelector('#form-control-nombre');
let puesto = document.querySelector('#form-control-puesto');
let sexo = document.querySelector('#form-control-sexo');
let edad = document.querySelector('#form-control-edad');
let antiguedad = document.querySelector('#form-control-antiguedad');
let telefono = document.querySelector('#form-control-telefono');

var telregex1 = /^\d{3}-\d{3}-\d{4}$/;
var telregex2 = /^\d{10}$/;

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

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    if(ban==true){
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data);
        console.log(jsonData)
        fetch('https://backendelrefugio-production.up.railway.app/users/nuevo', {
            method: 'POST',
            mode: 'cors',
            //body: jsonData,
        }).then(res => res.json())
        .then(result=>console.log(result))
        .catch(err => alert(err))
    }
})

function validarcampos()
{
    ban = false;
    console.log(antiguedad.value);
    var cont = 0;
    if(nombre.value.trim() === ''){
        setErrorFor(nombre, 'Debes ingresar el nombre del proveedor.');
    }else if(!validarNombre(nombre.value.trim())){
        setErrorFor(nombre, 'Ingresaste caractéres incorrectos');
    }else{        
        cont += 1;
    }

    if(puesto.value.trim() === ''){
        setErrorFor(puesto, 'Debes ingresar el puesto del empleado.');
    }else{        
        cont += 1;
    }

    if(edad.value.trim() === ''){
        setErrorFor(edad, 'Debes ingresar la edad del empleado.');
    }else if(edad.value.trim()<18 && edad.value.trim()>65){        
        setErrorFor(edad, 'Debes poner una edad válida.');
    }else{
        cont += 1;
    }

    var fechaInput = document.getElementById('form-control-antiguedad').value;
    // Expresión regular para validar el formato YYYY-MM-DD y aceptar años a partir de 2000
    //var regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    var regexFecha = /^(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (regexFecha.test(fechaInput)) {
    var fechaIngresada = new Date(fechaInput);
    var fechaActual = new Date();
    // Verifica si el objeto Date es válido, coincide con la fecha ingresada, el año es a partir de 2000
    // y no supera la fecha actual
    if (
        fechaIngresada instanceof Date &&
        !isNaN(fechaIngresada) &&
        fechaIngresada.toISOString().split('T')[0] === fechaInput &&
        fechaIngresada.getFullYear() >= 2000 
    ) {
        if(fechaIngresada <= fechaActual){
            cont += 1;
        }else{
            setErrorFor(antiguedad, 'La fecha no puede sobrepasar el dia de hoy');
        }
    } else {
        setErrorFor(antiguedad, 'La fecha ingresada no es válida');
    }
    } else {
        setErrorFor(antiguedad, 'El formato de fecha ingresado no es válido o el año no es a partir de 2000');
    }


    if(telefono.value.trim() === ''){
        setErrorFor(telefono, 'Debes ingresar el telefono del proveedor.');
    }else if(!validarTelefono(telefono.value.trim())){
        setErrorFor(telefono, 'Ingresaste un numero de telefono inválido');
    }else{        
        cont += 1;
    }

    if(cont==5){
        ban=true;
    }
}

  function validarTelefono(telefono){
    var patron1 = /^\d{10}$/;
    var patron2 = /^\d{3}\s\d{3}\s\d{4}$/;
    var patron3 = /^\d{3}-\d{3}-\d{4}$/;
    if(patron1.test(telefono) || patron2.test(telefono) || patron3.test(telefono)){
        return true;
    }else{
        return false;
    }
}

function validarNombre(nombre){
    var patronNombre = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{1,40}$/;
    if(patronNombre.test(nombre)){
        return true;
    }else{
        return false;
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const celda = formControl.querySelector('input');
    formControl.classList.add('error');
    //alert(message);
    const mensajeError = formControl.querySelector('.mensaje-error');
    mensajeError.className = 'mensaje-error error';
    mensajeError.innerText = message;
}

function setErrorFor2(select, message){
    const formControl = select.parentElement;
    formControl.classList.add('error');
    const mensajeError = formControl.querySelector('.mensaje-error');
    mensajeError.className = 'mensaje-error error';
    mensajeError.innerText = message;
}

function removeErrorFor(input){
    const formControl1 = input.parentElement;
    const celda = formControl1.querySelector('input');
    const mensajeError1 = formControl1.querySelector('.mensaje-error');
    mensajeError1.className = 'mensaje-error';
    mensajeError1.textContent = 'Error message';
    formControl1.classList.remove('error');
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});