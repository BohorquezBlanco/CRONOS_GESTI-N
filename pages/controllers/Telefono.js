/**
CRUD DE LA ENTIDAD TELEFONOS
 */


/** UPDATE TELEPHONE */
async function editarTelefonoAPI() {
const data = {
  bloque: "telefonos",
    accion: "editarTelefono",
      telefonoCorporativo: {
        telefonoCorporativo: document.getElementById("telefonoCorporativo").value,
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
async function crearTelefonoAPI() {
const data = {
  bloque: "telefonos",
    accion: "crearTelefono",
      telefonoCorporativo: {
        telefonoCorporativo: document.getElementById("telefonoCorporativo").value,
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
    console.log("entraste a telefonos");

    actualizarTelefono(data);

});
    
}

/** DELETE TELEPHONE (soft delete de la relación) */
async function eliminarTelefonoAPI(idUsuario, idTelefono) {
  const data = {
    bloque: "telefonos",
    accion: "softDelete",
    telefonoCorporativo: { idUsuario, idTelefono }
  };

  try {
    const res = await fetch(API_URL + "?bloque=telefonos", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const response = await res.json();
    console.log("Respuesta del servidor:", response);

    // Solo actualiza lo local si el servidor confirmó el cambio
    if (response.ok === false) {
      console.warn("No se pudo inactivar:", response.mensaje);
      return response;
    }

    inactivarRelacionLocal(idUsuario, idTelefono);   // ← reemplaza a actualizarTelefono
    return response;

  } catch (error) {
    console.error("Error al eliminar teléfono:", error);
  }
}