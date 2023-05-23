const form = document.getElementById('formulario');

let idemp = document.querySelector('#id-emp');
let nombre = document.querySelector('#form-control-nombre');
let puesto = document.querySelector('#form-control-puesto');
let sexo = document.querySelector('#form-control-sexo');
let edad = document.querySelector('#form-control-edad');
let antiguedad = document.querySelector('#form-control-antiguedad');
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
    fetch('https://farmaexpress.azurewebsites.net/users/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idemp.value = data1[index]._id;
      nombre.value = data1[index].nombreEmpleado;
      if(!(data1[index].puestoEmpleado===undefined)){
        puesto.value = data1[index].puestoEmpleado;
      }
      if(!(data1[index].sexoEmpleado===undefined)){
        sexo.value = data1[index].sexoEmpleado;
      }
      if(!(data1[index].edadEmpleado===undefined)){
        edad.value = data1[index].edadEmpleado;
      }
      var isoDate = data1[index].AntiguedadEmpleado;
      var date = new Date(isoDate);
      var year = date.getUTCFullYear();
      var month = String(date.getUTCMonth() + 1).padStart(2, '0');
      var day = String(date.getUTCDate()).padStart(2, '0');
      console.log(day);
      var formattedDate = year + '-' + month + '-' + day;
      antiguedad.value = formattedDate;
      telefono.value = data1[index].telefonoEmpleado;
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

