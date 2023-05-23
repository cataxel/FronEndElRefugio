const form = document.getElementById('formulario');

let idemp = document.querySelector('#id-emp');
let nombre = document.querySelector('#form-control-nombre');
let direccion = document.querySelector('#form-control-direccion');
let estado = document.querySelector('#form-control-estado');
let localidad = document.querySelector('#form-control-localidad');
let codpost = document.querySelector('#form-control-codpost');
let email = document.querySelector('#form-control-email');
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
    fetch('https://farmaexpress.azurewebsites.net/laboratorios/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idemp.value = data1[index]._id;
      nombre.value = data1[index].Nombre;
      //direccion.value = data1[index].DireccionProveedores;
      if(!(data1[index].Direccion===undefined)){
        direccion.value = data1[index].Direccion;
      }
      //estado.value = data1[index].EstadoProveedores;
      if(!(data1[index].Estado===undefined)){
        estado.value = data1[index].Estado;
      }
      if(!(data1[index].CP===undefined)){
        codpost.value = data1[index].CP;
      }
      //codpost.value = data1[index].CPProveedores;
      if(!(data1[index].Localidad===undefined)){
        localidad.value = data1[index].Localidad;
      }
      email.value = data1[index].Email;
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
            Nombre: nombre.value,
            Direccion: direccion.value,
            Estado: estado.value,
            CP: codpost.value,
            Localidad: localidad.value,
            Email: email.value,
            Estatus: estat,
          };
          console.log(a);
          console.log(JSON.stringify(a))
        fetch('https://farmaexpress.azurewebsites.net/laboratorios/actualizar/'+idActual, {
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
        setErrorFor(nombre, 'Debes ingresar el nombre del laboratorio.');
    }else{        
        cont += 1;
    }

    if(direccion.value.trim() === ''){
        setErrorFor(direccion, 'Debes ingresar la dirección del laboratorio.');
    }else{        
        cont += 1;
    }

    if(estado.value.trim() === ''){
        setErrorFor(estado, 'Debes ingresar el estado donde se encuentra localizado el laboratorio.');
    }else{        
        cont += 1;
    }

    if(localidad.value.trim() === ''){
        setErrorFor(localidad, 'Debes ingresar la localidad donde del laboratorio.');
    }else{        
        cont += 1;
    }

    if(codpost.value.trim() === ''){
        setErrorFor(codpost, 'Debes ingresar el codigo postal del laboratorio.');
    }else{        
        cont += 1;
    }

    if(email.value === ''){
        cont += 1;
    }else if(!validarEmail(email.value.trim())){
        setErrorFor(email, 'Ingresaste un correo electronico inválido');
    }else{        
        cont += 1;
    }

    if(cont==6){
        ban=true;
    }
}

  function validarEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
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
    message.textContent = 'Laboratorio modificado con éxito';

    alertDiv.appendChild(message);

    // Add the alert to the document
    container.appendChild(alertDiv);
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});
