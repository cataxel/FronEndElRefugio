let nombre = document.getElementById('nombre');
let contra = document.getElementById('contra');
let ingresar = document.getElementById('ingresar');

ingresar.addEventListener('click', () => {
    if(nombre.value === ''){
        alert('Debes ingresar un nombre de usuario');
    }else if(contra.value === ''){
        alert('Debes ingresar una clave para ingresar');
    }else if((nombre.value === 'Administrador' && contra.value === 'admin123') 
    || (nombre.value === 'Tadeo Vazquez Manzo' && contra.value === 'Tvm3c4')
    || (nombre.value === 'Veronica Barragán' && contra.value === 'Vbzff3')
    || (nombre.value === 'Axel Lopez Lopez' && contra.value === 'Alld11')){
        var nombreUsuario = [nombre.value]
        sessionStorage.setItem('nombre', JSON.stringify(nombreUsuario));
        window.location = 'index.html';
    }else{
        alert('Debes ingresar un usuario valido');
    }
    
})


