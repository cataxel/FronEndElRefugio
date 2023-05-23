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
      estatus.disabled = true;
    });
  }


