const form = document.getElementById('formulario');

let idmed = document.querySelector('#id-emp');
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

var urlActual = window.location.href;
var idActual = urlActual.substring(urlActual.indexOf('=')+1, urlActual.length)

ganancia.addEventListener('input', () => {
    prventa.value = parseFloat(prcompra.value) + (parseFloat(prcompra.value) * (parseFloat(ganancia.value) / 100));
});

prcompra.addEventListener('input', () => {
    prventa.value = parseFloat(prcompra.value) + (parseFloat(prcompra.value) * (parseFloat(ganancia.value) / 100));
});

window.addEventListener('DOMContentLoaded', () => {
    getinfo();
  })

  // Obtener datos de la API utilizando fetch
  const getinfo = () => {
    fetch('https://backendelrefugio-production.up.railway.app/medicamentos/?id=${idActual}')
    .then(response1 => response1.json())
    .then(data1 => {
      var index;
      for(index=0;index<data1.length;index++){
        if(data1[index]._id===idActual){
            break
        }
      }
      idmed.value = data1[index]._id;
      nombre.value = data1[index].nombreMedicamento;
      if(!(data1[index].tipoMedicamento===undefined)){
        tipo.value = data1[index].tipoMedicamento;
      }
      if(!(data1[index].PrecioCompra===undefined)){
        prcompra.value = data1[index].PrecioCompra;
      }
      if(!(data1[index].PrecioVenta===undefined)){
        prventa.value = data1[index].PrecioVenta;
      }
      if(!(data1[index].Ganancia===undefined)){
        ganancia.value = data1[index].Ganancia;
      }
      if(!(data1[index].Aplicacion===undefined)){
        aplicacion.value = data1[index].Aplicacion;
      }
      if(!(data1[index].Compuesto===undefined)){
        comp.value = data1[index].Compuesto;
      }
      if(!(data1[index].Contenido===undefined)){
        contenido.value = data1[index].Contenido;
      }
      var toggleButtonRec = $('#btn-toggle-rec');
      var toggleButtonCls = $('#btn-toggle-clasif');
      if(data1[index].RecetaNecesaria===true){
        toggleButtonRec.prop('checked', true);
        toggleButtonRec.bootstrapToggle('on');
      }else{
        toggleButtonRec.prop('checked', false);
        toggleButtonRec.bootstrapToggle('off');

      }if(data1[index].PatenteOGenerico==='Patente'){
        toggleButtonCls.prop('checked', true);
        toggleButtonCls.bootstrapToggle('on');
      }else{
        toggleButtonCls.prop('checked', false);
        toggleButtonCls.bootstrapToggle('off');
      }
      clasif.disabled = true;
      rec.disabled = true;
    });
  }