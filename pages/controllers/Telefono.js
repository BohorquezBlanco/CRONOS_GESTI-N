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


