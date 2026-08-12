function renderDiplomados(){

//FUNCIONgenerar DE RENDERIZADO DONDE SE RENDERIZA TODOS LOS DIPLOMADOS EN BASE A UN FILTRO EN EL CUAL PUEDE O NO EXISTIR
function renderDiplomados1(listaDiplomados, estados = []) {
  return listaDiplomados
    .filter(diplomado =>
      estados.length === 0 || estados.includes(diplomado.estado)
    )
    .map((diplomado, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${diplomado.nombreDiplomado}</td>
        <td><a href="${diplomado.enlaceDrive}" target="_blank">Drive</a></td>
        <td><a href="${diplomado.enlaceClassroom}" target="_blank">Classroom</a></td>
        <td><a href="${diplomado.fichaTecnica}" target="_blank">Ficha Técnica</a></td>
        <td><a href="${diplomado.fichaPrograma}" target="_blank">Programa</a></td>
        <td>${diplomado.estado}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar-telefono"
                  data-id="${diplomado.id}"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditarTelefono">
            Editar
          </button>
        </td>
      </tr>
    `)
    .join("");
}


//DONDE SE LLENARA EL RENDERIZADO ? 
const tabla = document.getElementById("tablaDiplomados");
tabla.innerHTML = renderDiplomados1(diplomados);
}