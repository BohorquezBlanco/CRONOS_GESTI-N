//Actualiza el Usuario en el arreglo de actualizarEstudiantes

function actualizarEstudiante(data) {

    const usuario = data.usuario;

    // Obtener el siguiente ID
    const ultimoId = estudiantes.length
        ? Math.max(...estudiantes.map(r => Number(r.id))) + 1
        : 1;

    estudiantes.push({
        id: ultimoId,
        apellidos: usuario.apellidos,
        nombreTelefono:usuario.telefonoPersonal,
        ci:usuario.ci,
        estado:usuario.estado,
        fecha:usuario.fecha,
        nombres:usuario.nombres,
        tipo:usuario.tipo,
    });

    if(usuario.idTelefono != "" ){
        const data = {
            accion: "agregarTelefonoUsuario",
            bloque: "usuarios",
            usuarios: {
            idUsuario: ultimoId,
            idTelefono: usuario.idTelefono,
            }
        };
        actualizarTelefonoUsuario(data.usuarios) ;
    }


    if(usuario.idCorreo != "" ){
            const data = {
                accion: "agregarTelefonoUsuario",
                bloque: "usuarios",
                usuarios: {
                idUsuario: ultimoId,
                idCorreo: usuario.idCorreo,
                }
            };
            actualizarCorreoUsuario(data.usuarios) ;
        }

    if(usuario.idDiplomado != "" ){
            const data = {
                accion: "agregarTelefonoUsuario",
                bloque: "usuarios",
                usuarios: {
                idUsuario: ultimoId,
                idDiplomado: usuario.idDiplomado,
                }
            };
            actualizarDiplomadoUsuario(data.usuarios) ;
        }

    renderUsuarios();


    return true;
}


//Actualiza el Usuario y Telefono en el arreglo relacionTelefonos 
function actualizarTelefonoUsuario(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesTelefonos.length
        ? Math.max(...relacionesTelefonos.map(r => Number(r.id))) + 1
        : 1;

    relacionesTelefonos.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idTelefono: data.idTelefono,
        estado:"ACTIVO",
        fechaCreacion: new Date(),
    });

    renderUsuarios();

    return true;
}


function actualizarCorreoUsuario(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesCorreos.length
        ? Math.max(...relacionesCorreos.map(r => Number(r.id))) + 1
        : 1;

    relacionesCorreos.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idCorreo: data.idCorreo,
        estado:"ACTIVO",
        fechaCreacion: new Date(),
    });

    renderUsuarios()

    return true;
}


function actualizarDiplomadoUsuario(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesDiplomados.length
        ? Math.max(...relacionesDiplomados.map(r => Number(r.id))) + 1
        : 1;

    relacionesDiplomados.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idDiplomado: data.idDiplomado,
        estado:"ACTIVO",
        fechaCreacion: new Date(),
    });

    renderUsuarios()

    return true;
}



function actualizarCorreo(data) {

    const correoCorporativo = data.correoCorporativo;

    // Obtener el siguiente ID
    const ultimoId = correos.length
        ? Math.max(...correos.map(r => Number(r.id))) + 1
        : 1;

    correos.push({
        id: ultimoId,
        nombreCorreo:correoCorporativo.correoCorporativo,
        password:correoCorporativo.password,
        estado:"ACTIVO",
        tipo:correoCorporativo.tipo,
    });

    renderCorreos();

    return true;
}


function actualizarTelefono(data) {

    const telefonoCorporativo = data.telefonoCorporativo;

    // Obtener el siguiente ID
    const ultimoId = telefonos.length
        ? Math.max(...telefonos.map(r => Number(r.id))) + 1
        : 1;

    telefonos.push({
        id: ultimoId,
        nombreTelefono:telefonoCorporativo.telefonoCorporativo,
        estado:"ACTIVO",
    });

    renderTelefonos();

    return true;
}


function actualizarDiplomado(data) {

    // Obtener el siguiente ID
    const ultimoId = diplomados.length
        ? Math.max(...diplomados.map(r => Number(r.id))) + 1
        : 1;

    diplomados.push({
        id: ultimoId,
        nombreDiplomado:data.nombreDiplomado,
        codigoClassroom:data.codigoClassroom,
        codigoDrive: data.codigoDrive,
        enlaceClassroom: data.enlaceClassroom,
        enlaceDrive: data.enlaceDrive,
        fichaPrograma: data.fichaPrograma,
        fichaTecnica: data.fichaTecnica,
        modulo: data.modulo,
        estado:"ACTIVO",
    });

    renderDiplomados();

    return true;
}

