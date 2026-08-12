function mostrarSeccion(tipo){

  seccionActiva = tipo;

  const gestores = document.getElementById("seccion-gestores");
  const telefonos = document.getElementById("seccion-telefonos");
  const correos = document.getElementById("seccion-correos");
  const diplomados = document.getElementById("seccion-diplomados");

  gestores.style.display = "none";
  telefonos.style.display = "none";
  correos.style.display = "none";
  diplomados.style.display = "none";

  if(tipo === "gestores"){
    gestores.style.display = "block";

    const boton = document.getElementById("botonAgregar");
    boton.textContent = "Agregar Usuario";

    const titulo = document.getElementById("tituloSeccion");
    titulo.textContent = "Usuarios de Postgrado"

    const descripcion = document.getElementById("descripcionSeccion");
    descripcion.textContent = "Administración de cuentas corporativas de la Escuela de Postgrado"

  }

  if(tipo === "telefonos"){
    telefonos.style.display = "block";
    const boton = document.getElementById("botonAgregar");
    boton.textContent = "Agregar Telefonos";

    const titulo = document.getElementById("tituloSeccion");
    titulo.textContent = "Telefonos Corporativos"

    
    const descripcion = document.getElementById("descripcionSeccion");
    descripcion.textContent = "Administración de teléfonos corporativos"

  }

  if(tipo === "correos"){
    correos.style.display = "block";
    const boton = document.getElementById("botonAgregar");
    boton.textContent = "Agregar Correos";

    const titulo = document.getElementById("tituloSeccion");
    titulo.textContent = "Correos Corporativos Disponibles"

    const descripcion = document.getElementById("descripcionSeccion");
    descripcion.textContent = "Administración de correos corporativos"
  }

  if(tipo === "diplomados"){
    diplomados.style.display = "block";

    const boton = document.getElementById("botonAgregar");
    boton.textContent = "Agregar Diplomados";

    const titulo = document.getElementById("tituloSeccion");
    titulo.textContent = "Diplomados"

    const descripcion = document.getElementById("descripcionSeccion");
    descripcion.textContent = "Administración de diplomados"
  }

  prepararModalAgregar();

}
