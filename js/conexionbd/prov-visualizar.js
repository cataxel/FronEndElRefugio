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
      estatus.disabled = true; 
    });
  }
