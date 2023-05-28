let user = document.querySelector('#nomUsuario')
let menuPanel = document.querySelector('.menu-panel')
let menuCompras = document.querySelector('.menu-compras')
let menuVentas = document.querySelector('.menu-ventas')
let menumedicamentos = document.querySelector('.menu-medicamentos')
let menulaboratorios = document.querySelector('.menu-laboratorios')
let menuproveedores = document.querySelector('.menu-proveedores')
let menulotes = document.querySelector('.menu-lotes')
let menuempleados = document.querySelector('.menu-empleados')

//seppies
let sepPanel = document.querySelector('.menu-panel-sep')
let sepCompras = document.querySelector('.menu-compras-sep')
let sepVentas = document.querySelector('.menu-ventas-sep')
let sepmedicamentos = document.querySelector('.menu-medicamentos-sep')
let seplaboratorios = document.querySelector('.menu-laboratorios-sep')
let sepproveedores = document.querySelector('.menu-proveedores-sep')
let seplotes = document.querySelector('.menu-lotes-sep')
let sepempleados = document.querySelector('.menu-empleados-sep')

//end seppies

console.log(sepproveedores)
let nombreUser = JSON.parse(sessionStorage.getItem("nombre"))

if(nombreUser==null){
    user.innerHTML = '<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Perfil'
}else{
    user.innerHTML = '<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>'+nombreUser
}

if(nombreUser!='Administrador'){
    menuproveedores.classList.add('d-none');
    sepproveedores.classList.add('d-none');
    sepproveedores.classList.remove('d-md-block');

    menulaboratorios.classList.add('d-none');
    seplaboratorios.classList.add('d-none');
    seplaboratorios.classList.remove('d-md-block');

    menuempleados.classList.add('d-none');
    sepempleados.classList.add('d-none');
    sepempleados.classList.remove('d-md-block');
}


var inputBuscar = document.querySelector('#inputBuscar');
var inputBuscar2 = document.querySelector('#inputBuscar input');
var buttonBuscar = document.querySelector('#buttonBuscar');

buttonBuscar.addEventListener('click', ()=>{
    var valorBusqueda = inputBuscar.value.toLowerCase();
    if(valorBusqueda != ""){
        switch(valorBusqueda){
            case 'panel':
                window.location='index.html'
                break;
            case 'compras':
                window.location='compras.html'
                break;
            case 'ventas':
                window.location='ventas.html'
                break;
            case 'medicamentos':
                window.location='medicamentos.html'
                break;
            case 'proveedores':
                window.location='proveedores.html'
                break;
            case 'laboratorios':
                window.location='laboratorios.html'
                break;
            case 'lotes':
                window.location='lotes.html'
                break;
            case 'empleados':
                window.location='empleados.html'
                break;
        }
    }
})


inputBuscar.addEventListener('keydown', function(event){
    if (event.keyCode === 13 || event.which === 13){
            var valorBusqueda = inputBuscar.value.toLowerCase();
            if(valorBusqueda != ""){
                switch(valorBusqueda){
                    case 'panel':
                        window.location='index.html'
                        break;
                    case 'compras':
                        window.location='compras.html'
                        break;
                    case 'ventas':
                        window.location='ventas.html'
                        break;
                    case 'medicamentos':
                        window.location='medicamentos.html'
                        break;
                    case 'proveedores':
                        window.location='proveedores.html'
                        break;
                    case 'laboratorios':
                        window.location='laboratorios.html'
                        break;
                    case 'lotes':
                        window.location='lotes.html'
                        break;
                    case 'empleados':
                        window.location='empleados.html'
                        break;
                }
            }
    }
})
