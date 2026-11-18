/**
CRUD DE LA ENTIDAD CORREOS
 */


/** UPDATE TELEPHONE */
async function editarCorreoAPI() {
const data = {
  bloque: "correo",
    accion: "editarCorreo",
      correoCorporativo: {
        correoCorporativo: document.getElementById("correoCorporativo").value,
        type: document.getElementById("type").value
      }
};

console.log(data)

fetch(API_URL + "?bloque=telefonos", {
  method: "POST",
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(response => {
    console.log(response);

});
    
}


/** CREATE TELEPHONE */
async function crearCorreoAPI() {
const data = {
  bloque: "correos",
    accion: "crearCorreo",
      correoCorporativo: {
        correoCorporativo: document.getElementById("correoCorporativo").value,
        password: document.getElementById("password").value,
        type: document.getElementById("type").value
      }
};

console.log(data)

fetch(API_URL + "?bloque=correos", {
  method: "POST",
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(response => {
  console.log("entraste a correos");
  actualizarCorreo(data) ;

});
    
}


async function eliminarCorreoAPI(idUsuario, idCorreo) {
  const data = {
    bloque: "correos",
    accion: "softDelete",
    correo: { idUsuario, idCorreo }
  };

  try {
    const res = await fetch(API_URL + "?bloque=correos", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const response = await res.json();
    console.log("Respuesta del servidor:", response);

    if (response.ok === false) {
      console.warn("No se pudo inactivar:", response.mensaje);
      return response;
    }

    inactivarRelacionCorreoLocal(idUsuario, idCorreo);
    return response;

  } catch (error) {
    console.error("Error al eliminar correo:", error);
  }
}

function inactivarRelacionCorreoLocal(idUsuario, idCorreo) {
  const rel = relacionesCorreos.find(r =>
    String(r.idUsuario) === String(idUsuario) &&
    String(r.idCorreo) === String(idCorreo) &&
    String(r.estado).trim().toUpperCase() === 'ACTIVO'
  );

  if (!rel) return false;

  rel.estado = 'INACTIVO';
  rel.fechaFinalizacion = new Date();

  renderUsuarios();   // la función que repinta las tarjetas
  return true;
}