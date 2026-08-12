/**
CRUD DE LA ENTIDAD USUARIOS  
 */


/** UPDATE USER */
async function editarUsuarioAPI() {
const data = {
  accion: "editar",
  bloque: "estudiantes",
  estudiante: {
    idUsuario: document.getElementById("idUsuario").value,
    ci: document.getElementById("ci").value,
    nombres: document.getElementById("nombres").value,
    apellidos: document.getElementById("apellidos").value,
    celularPersonal: document.getElementById("celularPersonal").value,
    estado: document.getElementById("estado").value,
    tipo: document.getElementById("tipo").value
  }
};

console.log(data)

fetch(API_URL + "?bloque=estudiantes", {
  method: "POST",
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(response => {
    console.log(response);
    actualizarEstudiante(data.estudiante);

});
    
}





/** INSERT USER */
function guardarUsuario() {

  // 🔵 Mostrar loader
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  const modal = document.getElementById("modalGeneral");

  const ci = modal.querySelector("[name='ci']").value;
  const nombres = modal.querySelector("[name='nombres']").value;
  const apellidos = modal.querySelector("[name='apellidos']").value;
  const telefonoPersonal = modal.querySelector("[name='celularPersonal']")?.value || "";

  // ⚠️ Importante: NO usar Number()
  const idTelefono = modal.querySelector("[name='telefonos']").value || "";
  const idCorreo = modal.querySelector("[name='correos']").value || "";
  const idDiplomado = modal.querySelector("[name='diplomados']").value || "";

  const tipo = modal.querySelector("[name='tipo']").value;

  const data = {
    accion: "crearUsuario",
    bloque: "usuarios",
    usuario: {
      ci: ci,
      nombres: nombres,
      apellidos: apellidos,
      telefonoPersonal: telefonoPersonal,
      estado: "ACTIVO",
      tipo: tipo,
      idTelefono: idTelefono,
      idCorreo: idCorreo,
      idDiplomado: idDiplomado
    }
  };

  console.log("Enviando a AppScript:", data);

  fetch(API_URL + "?bloque=usuarios", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    console.log("Respuesta servidor:", response);
    alert("Usuario creado correctamente");

    // 🔄 refrescar datos sin recargar la página
    if (typeof refrescarDatos === "function") {
      refrescarDatos();
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Ocurrió un error al guardar el usuario");
  })
  .finally(() => {
    // 🔴 Cerrar loader SIEMPRE
    loader.classList.add("hidden");
  });

}



function agregarTelefonoUsuario(){
   const idUsuario = document.getElementById("idUsuarioSeleccionado").value;
  const idTelefono = document.getElementById("idTelefono").value;

  const data = {
    accion: "agregarTelefonoUsuario",
    bloque: "usuarios",
    usuarios: {
      idUsuario: idUsuario,
      idTelefono: idTelefono,
    }
  };
  console.log(data); // Verificar antes de enviar

  fetch(API_URL + "?bloque=usuarios", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
      console.log(response);
       actualizarTelefono(data.usuarios) ;
  });
}




function agregarCorreoUsuario(){
   const idUsuario = document.getElementById("idUsuarioSeleccionado").value;
  const idCorreo = document.getElementById("idCorreo").value;

  const data = {
    accion: "agregarCorreoUsuario",
    bloque: "usuarios",
    usuarios: {
      idUsuario: idUsuario,
      idCorreo: idCorreo,
    }
  };
  console.log(data); // Verificar antes de enviar

  fetch(API_URL + "?bloque=usuarios", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
      console.log(response);
       actualizarCorreo(data.usuarios) ;
  });
}





function agregarDiplomadoUsuario(){
   const idUsuario = document.getElementById("idUsuarioSeleccionado").value;
  const idDiplomado = document.getElementById("idDiplomado").value;

  const data = {
    accion: "agregarDiplomadoUsuario",
    bloque: "usuarios",
    usuarios: {
      idUsuario: idUsuario,
      idDiplomado: idDiplomado,
    }
  };
  console.log(data); // Verificar antes de enviar

  fetch(API_URL + "?bloque=usuarios", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
      console.log(response);
       actualizarDiplomado(data.usuarios) ;
  });
}
