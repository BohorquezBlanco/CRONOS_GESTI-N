//actualiza el array y lo renderiza para volver a cargarlo
//con los datos actualizados

function actualizarEstudiante(data) {

    const index = estudiantes.findIndex(
        e => String(e.id) === String(data.idUsuario)
    );

    if (index === -1) {
        return false;
    }

    estudiantes[index].ci = data.ci;
    estudiantes[index].nombres = data.nombres;
    estudiantes[index].apellidos = data.apellidos;
    estudiantes[index].celularPersonal = data.celularPersonal;
    estudiantes[index].estado = data.estado;
    estudiantes[index].tipo = data.tipo;

    renderUsuarios();
    return true;

}




function actualizarTelefono(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesTelefonos.length
        ? Math.max(...relacionesTelefonos.map(r => Number(r.id))) + 1
        : 1;

    relacionesTelefonos.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idTelefono: data.idTelefono
    });

    renderUsuarios()

    return true;
}



function actualizarCorreo(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesCorreos.length
        ? Math.max(...relacionesCorreos.map(r => Number(r.id))) + 1
        : 1;

    relacionesCorreos.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idCorreo: data.idCorreo
    });

    renderUsuarios()

    return true;
}



function actualizarDiplomado(data) {

    // Obtener el siguiente ID
    const ultimoId = relacionesDiplomados.length
        ? Math.max(...relacionesDiplomados.map(r => Number(r.id))) + 1
        : 1;

    relacionesDiplomados.push({
        id: ultimoId,
        idUsuario: data.idUsuario,
        idDiplomado: data.idDiplomado
    });

    renderUsuarios()

    return true;
}


