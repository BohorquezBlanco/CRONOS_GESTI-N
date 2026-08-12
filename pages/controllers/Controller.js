/*
DESPLIEGUE DE APP
*/

async function iniciarApp(){
  document.getElementById("loader").classList.remove("hidden");

  await cargarDatos();
  loadNavbar() ;
  renderUsuarios();
  renderTelefonos();
  renderCorreos();
  renderDiplomados();
  prepararModalAgregar();
    document.getElementById("loader").classList.add("hidden");

}

iniciarApp();



async function refrescarDatos() {

  if (bloqueado) {
    console.log("⏸️ Render bloqueado");
    return; // 🚫 no hace nada
  }

  await cargarDatos();

  renderUsuarios();
  renderTelefonos();
  renderCorreos();
  renderDiplomados();
}


//funcion para agregar celularcorporativo 

//funcion para agregar correocorporativo

//funcion para agregar diplomado

//funciona para eliminar celularcorporativo

//funcion para eliminar diplomado

//funcion para editar datos del usuario - ci, nombre, celular personal, tipo 
