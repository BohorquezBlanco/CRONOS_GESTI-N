const API_URL = 'https://script.google.com/macros/s/AKfycbwjOcEP4Rxr6InoCPylLxRXwFIQzyj8UEiUkc3w7Uq6NBZAzs5mD4WzdkiywtpSjJo7/exec';

let estudiantes = [];
let correos = [];
let relacionesCorreos = [];
let diplomados = [];
let relacionesDiplomados = [];

let telefonos = [];
let relacionesTelefonos = [];

let seccionActiva = "gestores";


async function cargarDatos() {

  const [
    resUsers,
    resEmails,
    resRelCorreos,
    resTelefonos,
    resRelTelefonos,
    resDiplomados,
    resRelDiplomados
  ] = await Promise.all([
    fetch(`${API_URL}?bloque=usuarios`),
    fetch(`${API_URL}?bloque=correos`),
    fetch(`${API_URL}?bloque=relacionCorreoUsuario`),
    fetch(`${API_URL}?bloque=telefonos`),
    fetch(`${API_URL}?bloque=relacionTelefonoUsuario`),
    fetch(`${API_URL}?bloque=diplomados`),
    fetch(`${API_URL}?bloque=relacionDiplomadoUsuario`)
  ]);

  estudiantes = await resUsers.json();
  correos = await resEmails.json();
  relacionesCorreos = await resRelCorreos.json();

  telefonos = await resTelefonos.json();
  relacionesTelefonos = await resRelTelefonos.json();

  diplomados = await resDiplomados.json();
  relacionesDiplomados = await resRelDiplomados.json();

}




function crearDiplomado() {
  bloqueado = true; // 🔒 bloquear render

  // 👉 Mostrar loader
  document.getElementById("loader").classList.remove("hidden");

  var listaDocentes = document.getElementById("docentes").value
    .split(/\r?\n/)
    .map(correo => correo.trim())
    .filter(correo => correo
     !== "");

  var data = {
    nombreDiplomado: document.getElementById("nombreDiplomado")?.value || "",
    cantModulo: document.getElementById("cantModulo")?.value || "",
    clase: document.getElementById("clase")?.value || "",
    fichaTecnica: document.getElementById("fichaTecnica")?.value || "",
    fichaPrograma: document.getElementById("fichaPrograma")?.value || "",

    modulo: document.getElementById("modulo").value,
    numero: document.getElementById("numero").value,
    courseId: document.getElementById("codigoClassroom")?.value || "",
    codigoDrive: document.getElementById("codigoDrive")?.value || "",

    docentes: listaDocentes
  };

  console.log(data);


  //Crear Classroom
  fetch("https://script.google.com/macros/s/AKfycbzbQDwQQ_rKbSKnEPv1rSDuz8Zc_DN1S3-hEK7stwqDGOJwbg6ZnmcgeDFqFPch6Ncy/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {

    // 👉 Ocultar loader
    document.getElementById("loader").classList.add("hidden");

    alert("Curso creado 🚀");
  })
  .catch(error => {

    document.getElementById("loader").classList.add("hidden");

    alert("Error");
  })
  .finally(() => {
      loader.classList.add("hidden");

      bloqueado = false; // 🔓 liberar render
    });;


console.log(data);



}


