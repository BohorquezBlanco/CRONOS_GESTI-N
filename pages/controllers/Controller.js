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





