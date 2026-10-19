/* =========================================================
   HELPERS
   ========================================================= */
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function iniciales(nombres = '', apellidos = '') {
  const a = String(nombres).trim().charAt(0);
  const b = String(apellidos).trim().charAt(0);
  return (a + b).toUpperCase() || '?';
}

// Color de avatar estable por persona
function hueDesde(texto = '') {
  let h = 0;
  for (const ch of String(texto)) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

function filaVacia(colspan, texto) {
  return `<tr><td colspan="${colspan}" class="empty-text text-center py-4">${texto}</td></tr>`;
}

/* =========================================================
   USUARIOS
   (cada <td> lleva data-label: tu CSS móvil lo usa para las tarjetas)
   ========================================================= */
function renderUsuarios() {
  const tabla = document.getElementById('tabla');

  estudiantes.sort((a, b) => Number(b.id) - Number(a.id));

  if (!estudiantes.length) {
    tabla.innerHTML = filaVacia(9, 'No hay usuarios registrados');
    return;
  }

  const filas = estudiantes.map((e, index) => {

    /* ===== CORREOS ===== */
    const misCorreos = relacionesCorreos
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => correos.find(c => String(c.id) === String(r.idCorreo)))
      .filter(Boolean);

    const correosHTML = misCorreos.length
      ? misCorreos.map(c => `
          <div class="correo-card">
            <div class="correo-mail">${esc(c.nombreCorreo)}</div>
            ${c.password
              ? `<div class="correo-pass">
                   <span class="pass-text" data-pass="${esc(c.password)}">••••••••</span>
                   <button type="button" class="btn-ver-pass">Ver</button>
                 </div>`
              : `<div class="correo-pass">Sin contraseña</div>`}
          </div>`).join('')
      : `<span class="empty-text">Sin correos</span>`;

    /* ===== TELEFONOS ===== */
    const misTelefonos = relacionesTelefonos
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => telefonos.find(t => String(t.id) === String(r.idTelefono)))
      .filter(t => t && t.estado === 'ACTIVO');

    const telefonosHTML = misTelefonos.length
      ? misTelefonos.map(t => `
          <span class="chip chip-phone">
            📱 ${esc(t.nombreTelefono)}
            <button type="button"
                    class="chip-close btn-eliminar-telefono"
                    title="Quitar teléfono"
                    data-id="${esc(t.id)}">✕</button>
          </span>`).join('')
      : `<span class="empty-text">Sin teléfonos</span>`;

    /* ===== DIPLOMADOS ===== */
    const misDiplomados = relacionesDiplomados
      .filter(r => String(r.idUsuario) === String(e.id))
      .map(r => diplomados.find(d => String(d.id) === String(r.idDiplomado)))
      .filter(Boolean);

    const diplomadosHTML = misDiplomados.length
      ? misDiplomados.map(d => `<span class="chip chip-dip">🎓 ${esc(d.nombreDiplomado)}</span>`).join('')
      : `<span class="empty-text">Sin diplomados</span>`;

    /* ===== BOTONES AGREGAR ===== */
    const btnAgregar = (fn) => `
      <button type="button"
              class="btn btn-sm btn-add"
              data-bs-toggle="modal"
              data-bs-target="#modalGeneral"
              onclick="${fn}(${Number(e.id)})">＋ Agregar</button>`;

    const nombreCompleto = `${e.nombres ?? ''} ${e.apellidos ?? ''}`.trim();

    return `
      <tr>
        <td class="col-index" data-label="N°">${index + 1}</td>
        <td data-label="CI">${e.ci ? esc(e.ci) : '<span class="empty-text">S/R</span>'}</td>
        <td data-label="Nombre">
          <div class="user-cell">
            <span class="avatar" style="--h:${hueDesde(nombreCompleto)}">${esc(iniciales(e.nombres, e.apellidos))}</span>
            <span class="user-name">${esc(nombreCompleto)}</span>
          </div>
        </td>
        <td data-label="Celular personal">${e.celularPersonal ? esc(e.celularPersonal) : '<span class="empty-text">—</span>'}</td>
        <td data-label="Celulares corporativos"><div class="cell-stack">${telefonosHTML}${btnAgregar('modalTelefonoUser')}</div></td>
        <td data-label="Correos corporativos"><div class="cell-stack">${correosHTML}${btnAgregar('modalCorreoUser')}</div></td>
        <td data-label="Diplomados"><div class="cell-stack">${diplomadosHTML}${btnAgregar('modalDiplomadoUser')}</div></td>
        <td data-label="Tipo"><span class="tipo-badge">${esc(e.tipo)}</span></td>
        <td data-label="Acciones">
          <button type="button"
                  class="btn btn-warning btn-sm btn-editar"
                  data-id="${esc(e.id)}"
                  data-bs-toggle="modal"
                  data-bs-target="#modalGeneral">
            ✏️ Editar Usuario
          </button>
        </td>
      </tr>`;
  });

  tabla.innerHTML = filas.join('');
}

/* =========================================================
   TELEFONOS
   ========================================================= */
function renderTelefonos() {
  const telefonosDisponibles = obtenerDisponiblesGlobal(
    telefonos,
    relacionesTelefonos,
    'idTelefono'
  );

  const tabla = document.getElementById('tablaTelefonos');

  if (!telefonosDisponibles.length) {
    tabla.innerHTML = filaVacia(3, 'No hay teléfonos disponibles');
    return;
  }

  tabla.innerHTML = telefonosDisponibles.map((telefono, index) => `
    <tr>
      <td class="col-index" data-label="N°">${index + 1}</td>
      <td data-label="Teléfono"><span class="chip chip-phone">📱 ${esc(telefono.nombreTelefono)}</span></td>
      <td data-label="Acciones">
        <button type="button"
                class="btn btn-warning btn-sm btn-editar-telefono"
                data-id="${esc(telefono.id)}"
                data-bs-toggle="modal"
                data-bs-target="#modalEditarTelefono">
          ✏️ Editar
        </button>
      </td>
    </tr>`).join('');
}

/* =========================================================
   CORREOS
   ========================================================= */
function renderCorreos() {
  const correosDisponibles = obtenerDisponiblesGlobal(
    correos,
    relacionesCorreos,
    'idCorreo'
  );

  const tabla = document.getElementById('tablaCorreos');

  if (!correosDisponibles.length) {
    tabla.innerHTML = filaVacia(3, 'No hay correos disponibles');
    return;
  }

  // OJO: conservo btn-editar-telefono / #modalEditarTelefono como en tu código original.
  // Si tienes un modal/handler propio para correos, cámbialos aquí.
  tabla.innerHTML = correosDisponibles.map((correo, index) => `
    <tr>
      <td class="col-index" data-label="N°">${index + 1}</td>
      <td data-label="Correo">${esc(correo.nombreCorreo)}</td>
      <td data-label="Acciones">
        <button type="button"
                class="btn btn-warning btn-sm btn-editar-telefono"
                data-id="${esc(correo.id)}"
                data-bs-toggle="modal"
                data-bs-target="#modalEditarTelefono">
          ✏️ Editar
        </button>
      </td>
    </tr>`).join('');
}

/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA (delegado, se registra una vez)
   ========================================================= */
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.btn-ver-pass');
  if (!btn) return;
  const span = btn.parentElement.querySelector('.pass-text');
  const visible = btn.dataset.visible === '1';
  span.textContent = visible ? '••••••••' : span.dataset.pass;
  btn.textContent = visible ? 'Ver' : 'Ocultar';
  btn.dataset.visible = visible ? '0' : '1';
});