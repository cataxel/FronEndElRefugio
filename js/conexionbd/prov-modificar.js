const form = document.getElementById('formulario');

let idprov = document.querySelector('#id-emp');
let nombre = document.querySelector('#form-control-nombre');
let direccion = document.querySelector('#form-control-direccion');
let estado = document.querySelector('#form-control-estado');
let localidad = document.querySelector('#form-control-localidad');
let codpost = document.querySelector('#form-control-codpost');
let telefono = document.querySelector('#form-control-telefono');
let estatus = document.querySelector('#btn-toggle');

var telregex1 = /^\d{3}-\d{3}-\d{4}$/;
var telregex2 = /^\d{10}$/;

var ban = false;

var urlActual = window.location.href;
var idActual = urlActual.substring(urlActual.indexOf('=')+1, urlActual.length)


window.addEventListener('DOMContentLoaded', () => {
    getinfo();
  })

  // Obtener datos de la API utilizando fetch
  const getinfo = () => {
    fetch('https://backendelrefugio-production.up.railway.app/proveedor/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idprov.value = data1[index]._id;
      nombre.value = data1[index].nombreProveedores;
      //direccion.value = data1[index].DireccionProveedores;
      if(!(data1[index].DireccionProveedores===undefined)){
        direccion.value = data1[index].DireccionProveedores;
      }
      //estado.value = data1[index].EstadoProveedores;
      if(!(data1[index].EstadoProveedores===undefined)){
        estado.value = data1[index].EstadoProveedores;
      }
      if(!(data1[index].LocalidadProveedores===undefined)){
        localidad.value = data1[index].LocalidadProveedores;
      }
      //codpost.value = data1[index].CPProveedores;
      if(!(data1[index].CPProveedores===undefined)){
        codpost.value = data1[index].CPProveedores;
      }
      telefono.value = data1[index].telefonoProveedores;
      var toggleButton = $('#btn-toggle');
      if(data1[index].Estatus===true){
        toggleButton.prop('checked', true);
        toggleButton.bootstrapToggle('on');
      }else{
        toggleButton.prop('checked', false);
        toggleButton.bootstrapToggle('off');
      }
    });
  }

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    const estat = estatus.checked===true;
    console.log(estat)
    if(ban==true){
        const a = {
            nombreProveedores: nombre.value,
            telefonoProveedores: telefono.value,
            LocalidadProveedores: localidad.value,
            EstadoProveedores: estado.value,
            CPProveedores: codpost.value,
            DireccionProveedores: direccion.value,
            Estatus: estat,
          };
          console.log(a);
          console.log(JSON.stringify(a))
        fetch('https://backendelrefugio-production.up.railway.app/proveedor/actualizar/'+idActual, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: jsonData,
            body: JSON.stringify(a)
        }).then(res => res.json())
        .then(result=>showAlert())
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

function showAlert() {
    // Create the alert element
    // Remove existing alert, if any
    var container = document.getElementById('alert-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible');
    alertDiv.setAttribute('role', 'alert');

    // Add the close button
    var closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    var closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.innerHTML = '&times;';

    closeButton.appendChild(closeIcon);
    alertDiv.appendChild(closeButton);

    // Add the alert message
    var message = document.createElement('span');
    message.textContent = 'Proveedor modificado con éxito';

    alertDiv.appendChild(message);

    // Add the alert to the document
    container.appendChild(alertDiv);
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});
