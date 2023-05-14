
    let formData = new formData(document.querySelector('#formulario'));
    let data = Object.fromEntries(formData);
    
    const prov  = {
        nombreProveedores: formData.get('nombre'),
        telefonoProveedores: formData.get('telefono'),
        LocalidadProveedores: formData.get('localidad'),
        EstadoProveedores: formData.get('estado'),
        CPProveedores: formData.get('codpost'),
        DireccionProveedores: formData.get('direccion'),
    }

    console.log(prov);