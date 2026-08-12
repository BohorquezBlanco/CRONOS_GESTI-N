function obtenerDisponiblesGlobal(maestros, relaciones, campoRelacion){

  // 1️⃣ Obtener todos los IDs que están ACTIVO
  const idsOcupados = relaciones
    .filter(r => String(r.estado).trim().toUpperCase() === "ACTIVO")
    .map(r => String(r[campoRelacion]));

  // 2️⃣ Devolver solo los que NO estén ocupados
  return maestros.filter(item =>
    !idsOcupados.includes(String(item.id))
  );

}