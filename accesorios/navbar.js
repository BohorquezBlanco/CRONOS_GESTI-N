// navbar.js
function loadNavbar() {
  const navbarHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark shadow">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">SISTEMA SAMUS</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">

          <li class="nav-item"><a class="nav-link" href="index.html">Panel de Control</a></li>
          <li class="nav-item"><a class="nav-link" target="_blank"  href="utilidades.html">Utilidades</a></li>
          <li class="nav-item"><a class="nav-link" target="_blank"  href="nexos.html">Anexos</a></li>

        </ul>
      </div>
    </div>
  </nav>
  `;

  document.getElementById('navbar').innerHTML = navbarHTML;
}


async function ordenarDrive(){

  const URL_WEBAPP =
  "https://script.google.com/macros/s/AKfycby5jZ41N-5KpFaUVtlY7Q7fRcIMMPh9Q-8MHQcYUqgcZOOlyCpxc3LrBpZpY8k2EIH2Zw/exec";

  try{

    const respuesta = await fetch(URL_WEBAPP,{
      method:"POST",
      body:new URLSearchParams({
        accion:"ordenar"
      })
    });

    const data = await respuesta.json();

    alert(data.mensaje);

  }catch(error){

    alert("❌ Error al ordenar archivos");
    console.error(error);

  }
}


/*          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown">Utilidades</a>
            <ul class="dropdown-menu">
              <li><a href="seguimiento.html" class="dropdown-item" type="button" target="_blank">Diplomados</a></li>
            </ul>
          </li>


          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Utilidades
            </a>

            <ul class="dropdown-menu" style="width: 260px;">
              <li>
                <a href="classroom.html" 
                  class="dropdown-item" 
                  target="_blank">
                  Crear Inicio de Diplomado
                </a>
              </li>

              <li>
                <button 
                  class="dropdown-item text-wrap"
                  onclick="ordenarDrive()">
                  📂 CARGAR DATOS DE LA REUNIÓN MEET
                </button>
              </li>
            </ul>
          </li> */