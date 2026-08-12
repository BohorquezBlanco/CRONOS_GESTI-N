document.addEventListener("keyup", function(e){

if(e.target.classList.contains("buscador-global")){

const contenedor = e.target.parentElement;
const tablas = contenedor.querySelectorAll(".tabla-filtrable");

const texto = e.target.value.toLowerCase();

tablas.forEach(tabla => {

tabla.querySelectorAll("tbody tr").forEach(fila => {

fila.style.display = fila.innerText.toLowerCase().includes(texto)
? ""
: "none";

});

});

}

});


