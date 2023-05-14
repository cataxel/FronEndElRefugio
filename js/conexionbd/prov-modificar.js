window.addEventListener('DOMContentLoaded', () => {
    getinfo();
  })

  // Obtener datos de la API utilizando fetch
  const getinfo = () => {
    const {id} = '6440945626b148f5db03f562';
    console.log({id});
    fetch('https://backendelrefugio-production.up.railway.app/proveedor/:${id}')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }


const form = document.getElementById('formulario');

let nombre = document.querySelector('#form-control-nombre');
let direccion = document.querySelector('#form-control-direccion');
let estado = document.querySelector('#form-control-estado');
let localidad = document.querySelector('#form-control-localidad');
let codpost = document.querySelector('#form-control-codpost');
let telefono = document.querySelector('#form-control-telefono');

var telregex1 = /^\d{3}-\d{3}-\d{4}$/;
var telregex2 = /^\d{10}$/;

var ban = false;

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    if(ban==true){
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data);
        console.log(jsonData)
        fetch('https://backendelrefugio-production.up.railway.app/proveedor/:id', {
            method: 'POST',
            mode: 'cors',
            body: jsonData,
        }).then(res => res.json())
        .then(result=>console.log(result))
        .catch(err => alert(err))

    }
})

function validarcampos()
{
    ban = false;
    var cont = 0;
    if(nombre.value.trim() === ''){
        setErrorFor(nombre, 'Debes ingresar el nombre del proveedor.');
    }else if(!validarNombre(nombre.value.trim())){
        setErrorFor(nombre, 'Ingresaste caracteres incorrectos');
    }else{        
        cont += 1;
    }

    if(direccion.value.trim() === ''){
        setErrorFor(direccion, 'Debes ingresar la dirección del proveedor.');
    }else{        
        cont += 1;
    }

    if(estado.value.trim() === ''){
        setErrorFor(estado, 'Debes ingresar el estado del proveedor.');
    }else{        
        cont += 1;
    }

    if(codpost.value.trim() === ''){
        setErrorFor(codpost, 'Debes ingresar el codigo postal del proveedor.');
    }else{        
        cont += 1;
    }

    if(telefono.value.trim() === ''){
        setErrorFor(telefono, 'Debes ingresar el telefono del proveedor.');
    }else if(!validarTelefono(telefono.value.trim())){
        setErrorFor(telefono, 'Ingresaste un numero de telefono invalido');
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
    if(patron1.test(telefono)){
        return true;
    }else if(patron2.test(telefono)){
        return true;
    }else if(patron3.test(telefono)){
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
    console.log(mensajeError)
}

function removeErrorFor(input){
    const formControl = input.parentElement;
    const celda = formControl.querySelector('input');
    const mensajeError = formControl.querySelector('.mensaje-error');
    mensajeError.textContent = 'Error message';
    console.log(mensajeError)
    mensajeError.className = 'mensaje-error';
    formControl.classList.remove('error');
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});