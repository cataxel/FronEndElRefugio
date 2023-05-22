
const form = document.getElementById('formulario');

let nombre = document.querySelector('#form-control-nombre');
let tipo = document.querySelector('#form-control-tipo');
let prcompra = document.querySelector('#form-control-prcompra');
let ganancia = document.querySelector('#form-control-ganancia');
let prventa = document.querySelector('#form-control-prventa');
let aplicacion = document.querySelector('#form-control-aplicacion');
let comp = document.querySelector('#form-control-comp');
let contenido = document.querySelector('#form-control-contenido');
let clasif = document.querySelector('#btn-toggle-clasif');
let rec = document.querySelector('#btn-toggle-rec');

var ban = false;

ganancia.addEventListener('input', () => {
    prventa.value = parseFloat(prcompra.value) + (parseFloat(prcompra.value) * (parseFloat(ganancia.value) / 100));
});

prcompra.addEventListener('input', () => {
    prventa.value = parseFloat(prcompra.value) + (parseFloat(prcompra.value) * (parseFloat(ganancia.value) / 100));
});


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    validarcampos();
    var clasificacion = clasif.checked;
    var clfinal
    if(clasificacion===true){
        clfinal = 'Patente'
    }else{
        clfinal = 'Genérico'
    }
    const receta = rec.checked===true;
    console.log(receta)
    if(ban==true){
        const a = {
            nombreMedicamento: nombre.value,
            tipoMedicamento: tipo.value,
            PrecioCompra: prcompra.value,
            PrecioVenta: prventa.value,
            Ganancia: ganancia.value,
            RecetaNecesaria: receta,
            Aplicacion: aplicacion.value,
            Compuesto: comp.value,
            Contenido: contenido.value,
            PatenteOGenerico: clfinal,

        };
        console.log(JSON.stringify(a));
        fetch('https://backendelrefugio-production.up.railway.app/medicamentos/nuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a),
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
        setErrorFor(nombre, 'Debes ingresar el nombre del medicamento.');
    }else{        
        cont += 1;
    }

    if(tipo.value.trim() === ''){
        setErrorFor(tipo, 'Debes ingresar el tipo del mediamento.');
    }else{        
        cont += 1;
    }

    if(prcompra.value.trim() === ''){
        setErrorFor(prcompra, 'Debes ingresar el precio de compra del mediamento.');
    }else{        
        cont += 1;
    }

    if(ganancia.value.trim() === ''){
        setErrorFor(ganancia, 'Debes ingresar el porcentaje de ganancia a obtener con el medicamento');
    }else if(ganancia.value.trim() < 1 || ganancia.value.trim() > 100){
        setErrorFor(ganancia, 'El porcentaje de ganacia debe ser entre 1 a 100%');
    }else{
        cont += 1;
    }

    if(aplicacion.value.trim() === ''){
        setErrorFor(aplicacion, 'Debes ingresar la forma de aplicación del medicamento.');
    }else{        
        cont += 1;
    }

    if(comp.value.trim() === ''){
        setErrorFor(comp, 'Debes ingresar el compuesto del medicamento.');
    }else{        
        cont += 1;
    }

    if(contenido.value.trim() === ''){
        setErrorFor(contenido, 'Debes ingresar el contenido del medicamento.');
    }else{        
        cont += 1;
    }

    if(cont==7){
        ban=true;
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
    tipo.value = "";
    prcompra.value = "";
    ganancia.value = "";
    prventa.value = "";
    aplicacion.value = "";
    comp.value = "";
    contenido.value = "";
    clasif.checked = false;
    rec.checked = false;
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
    message.textContent = 'Medicamento registrado con éxito';

    alertDiv.appendChild(message);

    // Add the alert to the document
    container.appendChild(alertDiv);
}

document.getElementById('formulario').addEventListener('focusin', (event) => {
    /* event.target.value = ''; */
    removeErrorFor(event.target)
});