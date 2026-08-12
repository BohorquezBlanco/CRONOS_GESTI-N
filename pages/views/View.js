function renderUsuarios() {


  const tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  
  estudiantes.sort((a, b) => Number(b.id) - Number(a.id));
  estudiantes.forEach((e, index) => {

    /* ===== CORREOS ===== */

    const misCorreos = relacionesCorreos
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => correos.find(c => String(c.id) === String(r.idCorreo)))
      .filter(Boolean);

    let correosHTML = misCorreos.length
      ? misCorreos.map(c => `
          <div>
            <div>${c.nombreCorreo}</div><br>
            <small>Contraseña: ${c.password || 'Sin contraseña'}</small>
          </div>
        `).join('')
      : 'Sin correos';

    /* ===== TELEFONOS ===== */

    const misTelefonos = relacionesTelefonos
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => telefonos.find(t => String(t.id) === String(r.idTelefono)))
      .filter(t => t && t.estado === "ACTIVO");

console.log(misTelefonos);

    let telefonosHTML = misTelefonos.length
      ? misTelefonos.map(t => `
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span>${t.nombreTelefono}</span>
            <button 
              class="btn btn-danger btn-sm btn-eliminar-telefono"
              data-id="${t.id}">
              ❌
            </button>
          </div>
        `).join('')
      : 'Sin teléfonos';

    /* ===== BTN AGREGAR CELULAR CORPORATIVO ===== */
    const botonAgregarTelefono = `
        <button 
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalGeneral"
          onclick="modalTelefonoUser(${e.id})">
          ➕ Agregar
        </button>
    `;
    /* ===== BTN AGREGAR CORREO CORPORATIVO ===== */
    const botonAgregarCorreo = `
        <button 
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalGeneral"
          onclick="modalCorreoUser(${e.id})">
          ➕ Agregar
        </button>
    `;

    /* ===== BTN AGREGAR DIPLOMADO ===== */
    const botonAgregarDiplomado = `
        <button 
          class="btn btn-success btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalGeneral"
          onclick="modalDiplomadoUser(${e.id})">
          ➕ Agregar
        </button>
    `;

    const misDiplomados = relacionesDiplomados
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => diplomados.find(d => String(d.id) === String(r.idDiplomado)))
      .filter(Boolean);

    let diplomadosHTML = misDiplomados.length
      ? misDiplomados.map(d => `<div>${d.nombreDiplomado}</div>`).join('')
      : 'Sin diplomados';

    tabla.innerHTML += `
      <tr>
        <td>${index +1}</td>
        <td>${e.ci || 'S/R'}</td>
        <td>${e.nombres+' '}${e.apellidos}</td>
        <td>${e.celularPersonal}</td>
        <td>${telefonosHTML}${botonAgregarTelefono}</td>
        <td>${correosHTML}${botonAgregarCorreo}</td>
        <td>${diplomadosHTML}${botonAgregarDiplomado}</td>
        <td>${e.tipo}</td> 
        <td>
          <button
              class="btn btn-warning btn-sm btn-editar"
              data-id="${e.id}"
              data-bs-toggle="modal"
              data-bs-target="#modalGeneral">
              Editar Usuario
          </button>
        <td>

      </tr>
    `;
  });
}

function renderTelefonos(){

  
  const telefonosDisponibles = obtenerDisponiblesGlobal(
    telefonos,
    relacionesTelefonos,
    "idTelefono"
  );

  const tabla = document.getElementById('tablaTelefonos');
  tabla.innerHTML = '';

  telefonosDisponibles.map((telefono, index) =>
    tabla.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${telefono.nombreTelefono}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar-telefono"
                  data-id="${telefono.id}"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditarTelefono">
            Editar
          </button>
        </td>
      </tr>
    `
  );
}

function renderCorreos(){
  
  const correosDisponibles = obtenerDisponiblesGlobal(
    correos,
    relacionesCorreos,
    "idCorreo"
  );

  const tabla = document.getElementById('tablaCorreos');
  tabla.innerHTML = '';

  correosDisponibles.map((correo, index) =>
    tabla.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${correo.nombreCorreo}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar-telefono"
                  data-id="${correo.id}"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditarTelefono">
            Editar
          </button>
        </td>
      </tr>
    `
  );

}


