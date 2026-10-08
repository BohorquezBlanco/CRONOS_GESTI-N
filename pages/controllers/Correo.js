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


