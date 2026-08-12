/*MODALS DEL SISTEMA*/

/* =========================================================
   HELPERS REUTILIZABLES
   ========================================================= */
 
/**
 * Genera las <option> de un <select> a partir de una lista de items.
 * @param {Array}  items          Lista de objetos disponibles.
 * @param {string} valorKey       Propiedad a usar como value del option.
 * @param {string} textoKey       Propiedad a usar como texto visible.
 * @param {string} textoVacio     Texto de la opción por defecto (value="").
 */
function generarOpcionesSelect(items, valorKey, textoKey, textoVacio) {
  const opcionVacia = `<option value="">${textoVacio}</option>`;
  const opciones = items
    .map(item => `<option value="${item[valorKey]}">${item[textoKey]}</option>`)
    .join("");
 
  return opcionVacia + opciones;
}
 
/**
 * Genera las filas de la tabla de "docentes disponibles" (correos con tipo DOC).
 * Se reutiliza tanto al crear un diplomado como al agregar un módulo.
 * @param {Array} listaCorreos
 */
function generarFilasDocentesDisponibles(listaCorreos) {
  return listaCorreos
    .filter(correo => correo.tipo === "DOC")
    .map(correo => `
      <tr>
        <td>${correo.nombreCorreo}</td>
        <td class="text-center">
          <button type="button" class="btn btn-sm btn-success"
            onclick="agregarDocente('${correo.nombreCorreo}')">
            +
          </button>
        </td>
      </tr>
    `)
    .join("");
}
 
/**
 * Genera las filas de la tabla de diplomados para el buscador del formulario de módulo.
 * @param {Array} listaDiplomados
 */
function generarFilasDiplomados(listaDiplomados, estados = [] ) {
  return listaDiplomados
    .filter(diplomado =>
      estados.length === 0 || estados.includes(diplomado.estado)
    )
    .map(diplomado => `
      <tr>
        <td>${diplomado.nombreDiplomado}</td>
        <td class="text-center">
          <button type="button" class="btn btn-sm btn-success"
            onclick="seleccionarDiplomado(
              '${diplomado.id}',
              '${diplomado.codigoClassroom}',
              '${diplomado.codigoDrive}',
              '${diplomado.nombreDiplomado}',
              '${diplomado.fichaTecnica}',
              '${diplomado.enlaceDrive}',
              '${diplomado.enlaceClassroom}',
              '${diplomado.fichaPrograma}'
            )">
            Seleccionar
          </button>
        </td>
      </tr>
    `)
    .join("");
}
 
/* =========================================================
   PREPARACIÓN DEL MODAL PRINCIPAL
   ========================================================= */
 
function prepararModalAgregar() {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
 
  contenedor.innerHTML = "";
 
  if (seccionActiva === "gestores") {
    renderFormularioGestor(contenedor);
  } else if (seccionActiva === "telefonos") {
    renderFormularioTelefono(contenedor, titulo);
  } else if (seccionActiva === "correos") {
    renderFormularioCorreo(contenedor, titulo);
  } else if (seccionActiva === "diplomados") {
    renderMenuDiplomados(contenedor, titulo);
  }
}
 
/**
 * Formulario para agregar un gestor (docente/administrativo).
 * Nota: se mantiene el comportamiento original, que no asigna
 * texto al título del modal en esta sección.
 */
function renderFormularioGestor(contenedor) {
 
  const telefonosDisponibles = obtenerDisponiblesGlobal(
    telefonos,
    relacionesTelefonos,
    "idTelefono"
  );
 
  const correosDisponibles = obtenerDisponiblesGlobal(
    correos,
    relacionesCorreos,
    "idCorreo"
  );
 
  const diplomadosDisponibles = obtenerDisponiblesGlobal(
    diplomados,
    relacionesDiplomados,
    "idDiplomado"
  );
 
  const opcionesTelefonos = generarOpcionesSelect(
    telefonosDisponibles, "id", "nombreTelefono", "Sin teléfono"
  );
 
  const opcionesCorreos = generarOpcionesSelect(
    correosDisponibles, "id", "nombreCorreo", "Sin correo"
  );
 
  const opcionesDiplomados = generarOpcionesSelect(
    diplomadosDisponibles, "id", "nombreDiplomado", "Sin diplomado"
  );
 
  contenedor.innerHTML = `
    <div class="row">
 
      <div class="col-md-6 mb-3">
        <label class="form-label">CI</label>
        <input type="text" class="form-control" name="ci" required>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Nombres</label>
        <input type="text" class="form-control" name="nombres" required>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Apellidos</label>
        <input type="text" class="form-control" name="apellidos" required>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Celular Personal</label>
        <input type="text" class="form-control" name="celularPersonal">
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Tipo</label>
        <select class="form-control" name="tipo">
          <option value="DOC">DOCENTE</option>
          <option value="ADM">ADMINISTRATIVO</option>
        </select>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Teléfonos disponibles</label>
        <select class="form-control" name="telefonos">
          ${opcionesTelefonos}
        </select>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Correos disponibles</label>
        <select class="form-control" name="correos">
          ${opcionesCorreos}
        </select>
      </div>
 
      <div class="col-md-6 mb-3">
        <label class="form-label">Diplomados disponibles</label>
        <select class="form-control" name="diplomados">
          <option value="">Sin diplomados</option>
          ${opcionesDiplomados}
        </select>
      </div>
 
      <div class="col-12">
        <button type="button" class="btn btn-success w-100" onclick="guardarUsuario()">
          Guardar
        </button>
      </div>
 
    </div>
  `;
}
 
function renderFormularioTelefono(contenedor, titulo) {
  titulo.textContent = "Agregar Teléfono";
 
  contenedor.innerHTML = `
    <div class="mb-3">
      <label class="form-label">Nombre Teléfono</label>
      <input type="text" class="form-control" name="nombreTelefono" required>
    </div>
  `;
}
 
function renderFormularioCorreo(contenedor, titulo) {
  titulo.textContent = "Agregar Correo";
 
  contenedor.innerHTML = `
    <div class="mb-3">
      <label class="form-label">Nombre Correo</label>
      <input type="email" class="form-control" name="nombreCorreo" required>
    </div>
  `;
}
 
function renderMenuDiplomados(contenedor, titulo) {
  titulo.textContent = "Diplomados";
 
  contenedor.innerHTML = `
    <div class="text-center">
 
      <button class="btn btn-success w-100 mb-3" onclick="mostrarFormularioNuevoDiplomado()">
        ➕ Crear Diplomado Nuevo
      </button>
 
      <button class="btn btn-primary w-100" onclick="mostrarFormularioModulo()">
        📚 Agregar Módulo a Diplomado
      </button>
 
    </div>
  `;
}
 
/* =========================================================
   FORMULARIO: CREAR DIPLOMADO
   ========================================================= */
 
function mostrarFormularioNuevoDiplomado() {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
  const filasDocentes = generarFilasDocentesDisponibles(correos);
 
  titulo.textContent = "Crear Diplomado";
 
  contenedor.innerHTML = `
    <div class="container-fluid">
 
      <!-- DATOS DEL DIPLOMADO -->
      <div class="card mb-3">
        <div class="card-header bg-success text-white">
          Datos del Diplomado
        </div>
 
        <div class="card-body">
          <div class="row">
 
            <div class="col-md-6 mb-3">
              <label class="form-label">Nombre del Diplomado</label>
              <input type="text" class="form-control" id="nombreDiplomado">
            </div>
 
            <div class="col-md-3 mb-3">
              <label class="form-label">Cantidad de módulos</label>
              <input type="number" class="form-control" id="cantModulo">
            </div>
 
            <div class="col-md-3 mb-3">
              <label class="form-label">Clase</label>
              <input type="text" id="clase" class="form-control">
            </div>
 
            <div class="col-md-6 mb-3">
              <label class="form-label">Ficha Técnica</label>
              <input type="text" class="form-control" id="fichaTecnica">
            </div>
 
            <div class="col-md-6 mb-3">
              <label class="form-label">Ficha Programa</label>
              <input type="text" class="form-control" id="fichaPrograma">
            </div>
 
          </div>
        </div>
      </div>
 
      <!-- DATOS DEL MODULO -->
      <div class="card mb-3">
        <div class="card-header bg-success text-white">
          Datos del Módulo
        </div>
 
        <div class="card-body">
          <div class="row">
 
            <div class="col-md-6">
              <label>Nombre del Módulo</label>
              <input type="text" id="modulo" class="form-control">
            </div>
 
            <div class="col-md-3">
              <label>Número de módulo</label>
              <input type="number" id="numero" class="form-control" value="1">
            </div>
 
          </div>
        </div>
      </div>
 
      <!-- DOCENTES -->
      <div class="card">
        <div class="card-header bg-success text-white">
          Docentes
        </div>
 
        <div class="card-body">
          <div class="row">
 
            <!-- DOCENTES DISPONIBLES -->
            <div class="col-md-6">
              <label class="fw-bold">Docentes disponibles</label>
 
              <input type="text" class="form-control buscador-global mb-2" placeholder="Buscar docente...">
 
              <table class="table tabla-filtrable table-sm">
                <thead>
                  <tr>
                    <th>Correo</th>
                    <th width="60"></th>
                  </tr>
                </thead>
                <tbody>
                  ${filasDocentes}
                </tbody>
              </table>
            </div>
 
            <!-- DOCENTES SELECCIONADOS -->
            <div class="col-md-6">
              <label class="fw-bold">Docentes seleccionados</label>
 
              <textarea id="docentes" rows="10" class="form-control"
                placeholder="Los docentes aparecerán aquí"></textarea>
 
              <small class="text-muted">
                Cada docente agregado aparecerá aquí
              </small>
            </div>
 
          </div>
        </div>
      </div>
 
      <button type="button" class="btn btn-success w-100 mt-3" onclick="crearDiplomado()">
        Guardar Diplomado
      </button>
 
    </div>
  `;
}
 
/* =========================================================
   FORMULARIO: AGREGAR MÓDULO A DIPLOMADO
   ========================================================= */
 
function mostrarFormularioModulo() {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
  const filasDocentes = generarFilasDocentesDisponibles(correos);
  const filasDiplomados = generarFilasDiplomados(diplomados);
 
  titulo.textContent = "Agregar Módulo";
 
  contenedor.innerHTML = `
    <div class="mb-3">
      <label class="form-label fw-bold">Buscar Diplomado</label>
 
      <input type="text" class="form-control buscador-global mb-2" placeholder="Buscar diplomado...">
 
      <div class="border rounded" style="max-height:250px; overflow-y:auto;">
        <table class="table tabla-filtrable table-sm table-hover mb-0">
          <thead class="table-light sticky-top">
            <tr>
              <th>Diplomado</th>
              <th width="120"></th>
            </tr>
          </thead>
          <tbody>
            ${filasDiplomados}
          </tbody>
        </table>
      </div>
    </div>
 
    <div class="mb-3">
      <label class="form-label">Diplomado seleccionado</label>
      <input type="text" id="nombreDiplomadoSeleccionado" class="form-control" readonly>
    </div>
 
    <input type="text" id="idDiplomado">
    <input type="text" id="codigoClassroom">
    <input type="text" id="codigoDrive">
 
    <a id="linkFichaTecnica" target="_blank">Ver ficha técnica</a>
    <a id="linkClassroom" target="_blank">Ir a Classroom</a>
    <a id="linkDrive" target="_blank">Ir a Drive</a>
    <a id="linkPrograma" target="_blank">Ver programa</a>
 
    <div class="mb-3">
      <label class="form-label">Nombre del módulo</label>
      <input type="text" class="form-control" name="modulo" id="modulo">
    </div>
 
    <div class="mb-3">
      <label class="form-label">Número de módulo</label>
      <input type="text" class="form-control" name="numero" id="numero">
    </div>
 
    <!-- DOCENTES -->
    <div class="card">
      <div class="card-header bg-success text-white">
        Docentes
      </div>
 
      <div class="card-body">
        <div class="row">
 
          <!-- DOCENTES DISPONIBLES -->
          <div class="col-md-6">
            <label class="fw-bold">Docentes disponibles</label>
 
            <input type="text" class="form-control buscador-global mb-2" placeholder="Buscar docente...">
 
            <table class="table tabla-filtrable table-sm">
              <thead>
                <tr>
                  <th>Correo</th>
                  <th width="60"></th>
                </tr>
              </thead>
              <tbody>
                ${filasDocentes}
              </tbody>
            </table>
          </div>
 
          <!-- DOCENTES SELECCIONADOS -->
          <div class="col-md-6">
            <label class="fw-bold">Docentes seleccionados</label>
 
            <textarea id="docentes" rows="10" class="form-control"
              placeholder="Los docentes aparecerán aquí"></textarea>
 
            <small class="text-muted">
              Cada docente agregado aparecerá aquí
            </small>
          </div>
 
        </div>
      </div>
    </div>
 
    <button type="button" class="btn btn-success w-100 mt-3" onclick="crearDiplomado()">
      Guardar Diplomado
    </button>
  `;
}
 
/* =========================================================
   ACCIONES SOBRE EL FORMULARIO DE DIPLOMADO / MÓDULO
   ========================================================= */
 
function seleccionarDiplomado(
  id, classroom, drive, nombre, fichaTecnica, enlaceDrive, enlaceClassroom, fichaPrograma
) {
  document.getElementById("idDiplomado").value = id;
  document.getElementById("codigoClassroom").value = classroom;
  document.getElementById("codigoDrive").value = drive;
  document.getElementById("nombreDiplomadoSeleccionado").value = nombre;
 
  // Convertir los datos del diplomado en enlaces clicables
  document.getElementById("linkFichaTecnica").href = fichaTecnica;
  document.getElementById("linkClassroom").href = enlaceClassroom;
  document.getElementById("linkDrive").href = enlaceDrive;
  document.getElementById("linkPrograma").href = fichaPrograma;
}
 
function agregarDocente(correo) {
  const textarea = document.getElementById("docentes");
  const correosActuales = textarea.value
    .split("\n")
    .map(c => c.trim())
    .filter(c => c !== "");
 
  if (!correosActuales.includes(correo)) {
    correosActuales.push(correo);
  }
 
  textarea.value = correosActuales.join("\n");
}
 
/* =========================================================
   RESET DEL MODAL AL CERRARSE
   ========================================================= */
 
const modalAgregar = document.getElementById("modalGeneral");
 
if (modalAgregar) {
  modalAgregar.addEventListener("hidden.bs.modal", function () {
    prepararModalAgregar(); // vuelve al inicio
  });
}
 
/* =========================================================
   MODAL: AGREGAR TELÉFONO A UN USUARIO EXISTENTE
   ========================================================= */
 
function modalTelefonoUser(idUsuario) {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
 
  titulo.textContent = "Agregar Teléfono";
 
  // Guardamos el ID del usuario en un input oculto
  contenedor.innerHTML = `<input type="text" id="idUsuarioSeleccionado" value="${idUsuario}">`;
 
  const telefonosDisponibles = obtenerDisponiblesGlobal(
    telefonos,
    relacionesTelefonos,
    "idTelefono",
    idUsuario
  );
 
  const opcionesTelefonos = generarOpcionesSelect(
    telefonosDisponibles, "id", "nombreTelefono", "Seleccione"
  );
 
  contenedor.innerHTML += `
    <div class="mb-3">
      <label class="form-label">Teléfono</label>
      <select class="form-control" id="idTelefono">
        ${opcionesTelefonos}
      </select>
    </div>
 
    <div class="mb-3">
      <button data-bs-dismiss="modal" type="button" class="btn btn-success w-100" onclick="agregarTelefonoUsuario()">
        Agregar Teléfono
      </button>
    </div>
  `;
}



function modalCorreoUser(idUsuario) {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
 
  titulo.textContent = "Agregar Correo";
 
  // Guardamos el ID del usuario en un input oculto
  contenedor.innerHTML = `<input type="text" id="idUsuarioSeleccionado" value="${idUsuario}">`;
 
  const telefonosDisponibles = obtenerDisponiblesGlobal(
    correos,
    relacionesCorreos,
    "idCorreo",
    idUsuario
  );
 
  const opcionesCorreos = generarOpcionesSelect(
    telefonosDisponibles, "id", "nombreCorreo", "Sin Correo"
  );
 
  contenedor.innerHTML += `
    <div class="mb-3">
      <label class="form-label">Correo</label>
      <select class="form-control" id="idCorreo">
        ${opcionesCorreos}
      </select>
    </div>
 
    <div class="mb-3">
      <button data-bs-dismiss="modal" type="button" class="btn btn-success w-100" onclick="agregarCorreoUsuario()">
        Agregar Correo
      </button>
    </div>
  `;
}



function modalDiplomadoUser(idUsuario) {
  const contenedor = document.getElementById("modalCampos");
  const titulo = document.getElementById("modalTitulo");
 
  titulo.textContent = "Agregar Diplomado";
 
  // Guardamos el ID del usuario en un input oculto
  contenedor.innerHTML = `<input type="text" id="idUsuarioSeleccionado" value="${idUsuario}">`;
 
  const diplomadosDisponibles = obtenerDisponiblesGlobal(
    diplomados,
    relacionesDiplomados,
    "idDiplomado",
    idUsuario
  );
 
  const opcionesDiplomados = generarOpcionesSelect(
    diplomadosDisponibles, "id", "nombreDiplomado", "Sin teléfono"
  );
 
  contenedor.innerHTML += `
    <div class="mb-3">
      <label class="form-label">Correo</label>
      <select class="form-control" id="idDiplomado">
        ${opcionesDiplomados}
      </select>
    </div>
 
    <div class="mb-3">
      <button data-bs-dismiss="modal" type="button" class="btn btn-success w-100" onclick="agregarDiplomadoUsuario()">
        Agregar Diplomado
      </button>
    </div>
  `;
}







/*RENDERIZACION DEL FORMULARIO PARA EDITAR USUARIO*/

document.addEventListener("click", function(e){

    if(e.target.classList.contains("btn-editar")){

        const idUsuario = e.target.dataset.id;
    
        renderFormularioEditarUsuario(idUsuario);

    }

});


function renderFormularioEditarUsuario(idUsuario){

    const usuario = estudiantes.find(u => u.id == idUsuario);

    if(!usuario){
        alert("Usuario no encontrado");
        return;
    }

    document.getElementById("modalTitulo").textContent = "Editar Usuario";

    document.getElementById("modalCampos").innerHTML = `
        <input type="hidden" id="idUsuario" value="${usuario.id}">

        <div class="row">

            <div class="col-md-6 mb-3">
                <label class="form-label">CI</label>
                <input
                    type="text"
                    class="form-control"
                    id="ci"
                    value="${usuario.ci ?? ''}">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Nombres</label>
                <input
                    type="text"
                    class="form-control"
                    id="nombres"
                    value="${usuario.nombres ?? ''}">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Apellidos</label>
                <input
                    type="text"
                    class="form-control"
                    id="apellidos"
                    value="${usuario.apellidos ?? ''}">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Celular</label>
                <input
                    type="text"
                    class="form-control"
                    id="celularPersonal"
                    value="${usuario.celularPersonal ?? ''}">
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Estado</label>
                <select id="estado" class="form-select">
                    <option value="ACTIVO" ${usuario.estado === "ACTIVO" ? "selected" : ""}>ACTIVO</option>
                    <option value="INACTIVO" ${usuario.estado === "INACTIVO" ? "selected" : ""}>INACTIVO</option>
                </select>
            </div>

            <div class="col-md-6 mb-3">
                <label class="form-label">Tipo</label>
                <select id="tipo" class="form-select">
                    <option value="DOC" ${usuario.tipo === "DOC" ? "selected" : ""}>DOCENTE</option>
                    <option value="ADM" ${usuario.tipo === "ADM" ? "selected" : ""}>ADMINISTRATIVO</option>
                </select>
            </div>

            <div class="col-12">
              <button
                  type="button"
                  class="btn btn-warning w-100"
                  onclick="editarUsuarioAPI()"
                  data-bs-dismiss="modal">
                  Guardar cambios
              </button>
            </div>

        </div>
    `;
}




