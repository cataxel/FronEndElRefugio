var modif = document.querySelector('#modificar');
var insertaMed21 = document.querySelector('#insertarMed');

console.log(sepproveedores)
let nombreUser = JSON.parse(sessionStorage.getItem("nombre"))

if(nombreUser==null){
    user.innerHTML = '<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Perfil'
}else{
    user.innerHTML = '<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>'+nombreUser
}

if(nombreUser!='Administrador'){
    modif.classList.add('d-none');
    insertaMed21.classList.add('d-none');
}