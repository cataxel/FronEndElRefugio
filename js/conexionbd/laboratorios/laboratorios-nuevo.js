const form = document.getElementById('formulario');

let nombre = document.querySelector('#form-control-nombre');
let direccion = document.querySelector('#form-control-direccion');
let estado = document.querySelector('#form-control-estado');
let localidad = document.querySelector('#form-control-localidad');
let codpost = document.querySelector('#form-control-codpost');
let email = document.querySelector('#form-control-email');

var ban = false;

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    if(ban==true){
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data);
        console.log(jsonData)
        fetch('https://farmaexpress.azurewebsites.net/laboratorios/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData,
        }).then(res => res.json())
        .then(result=>vaciarCampos())
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
}

function removeErrorFor(input){
    const formControl1 = input.parentElement;
    const celda = formControl1.querySelector('input');
    const mensajeError1 = formControl1.querySelector('.mensaje-error');
    mensajeError1.className = 'mensaje-error';
    mensajeError1.textContent = 'Error message';
    formControl1.classList.remove('error');
}

function vaciarCampos(){
    showAlert();
    nombre.value = "";
    direccion.value = ""; 
    estado.value = ""; 
    localidad.value = ""; 
    codpost.value = ""; 
    email.value = ""; 
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
    message.textContent = 'Laboratorio registrado con éxito';

    alertDiv.appendChild(message);

    // Add the alert to the document
    container.appendChild(alertDiv);
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});