var headers=[], data=[];
function $(id){return document.getElementById(id)}

function parseTSV(t){
  var rows=[],row=[],c='',q=false,i,ch;
  for(i=0;i<t.length;i++){
    ch=t[i];
    if(q){
      if(ch==='"'){ if(t[i+1]==='"'){c+='"';i++} else q=false }
      else c+=ch;
    } else if(ch==='"' && c===''){ q=true }
    else if(ch==='\t'){ row.push(c);c='' }
    else if(ch==='\n'||ch==='\r'){
      if(ch==='\r'&&t[i+1]==='\n')i++;
      row.push(c);c='';rows.push(row);row=[];
    } else c+=ch;
  }
  if(c!==''||row.length){row.push(c);rows.push(row)}
  return rows;
}
var NUM=/^-?\d+([.,]\d+)?$/;
function esDato(r){
  if(r.length<2||!r[0].trim())return false;
  var rest=r.slice(1).filter(function(x){return x.trim()!==''});
  return rest.length>0 && rest.every(function(x){return NUM.test(x.trim())});
}

$('btnLeer').onclick=function(){
  var rows=parseTSV($('entrada').value).filter(function(r){return r.some(function(x){return x.trim()})});
  data=[];headers=[];
  var hdr=null;
  rows.forEach(function(r){
    if(esDato(r)) data.push({n:r[0].replace(/\s+/g,' ').trim(), v:r.slice(1).map(function(x){return x.trim().replace(',','.')})});
    else if(!hdr&&data.length===0) hdr=r;
  });
  if(!data.length){$('info').textContent='No se encontraron filas válidas.';return}
  var nc=Math.max.apply(null,data.map(function(d){return d.v.length}));
  // quitar columnas vacías al final por tabs extra
  data.forEach(function(d){while(d.v.length<nc)d.v.push('')});
  for(var k=0;k<nc;k++){
    var h=hdr&&hdr[k+1]?hdr[k+1].replace(/\s+/g,' ').trim():'Columna '+(k+1);
    headers.push(h||'Columna '+(k+1));
  }
  $('info').innerHTML='<span class="ok">'+data.length+' alumnos</span> y '+nc+' columnas de notas detectadas.';
  var box=$('cols');box.innerHTML='';
  headers.forEach(function(h,k){
    var l=document.createElement('label');
    var on=k<5;
    var opts='';for(var j=1;j<=8;j++)opts+='<option value="'+j+'"'+(j===k+1?' selected':'')+'>.campo'+j+'</option>';
    l.innerHTML='<input type="checkbox" data-k="'+k+'"'+(on?' checked':'')+'> '+h.replace(/</g,'&lt;')+' → <select data-s="'+k+'">'+opts+'</select>';
    box.appendChild(l);
  });
  $('sCols').hidden=false;
  $('sOut').hidden=true;
  var t='<tr><th>Nombre</th>'+headers.map(function(h){return '<th>'+h.replace(/</g,'&lt;')+'</th>'}).join('')+'</tr>';
  data.forEach(function(d){t+='<tr><td>'+d.n.replace(/</g,'&lt;')+'</td>'+d.v.map(function(x){return '<td>'+x+'</td>'}).join('')+'</tr>'});
  $('tabla').innerHTML=t;$('sPrev').hidden=false;
};

$('btnGen').onclick=function(){
  var sel=[];
  document.querySelectorAll('#cols input[type=checkbox]').forEach(function(cb){
    if(cb.checked){
      var k=+cb.dataset.k;
      sel.push({k:k,sel:'.campo'+document.querySelector('select[data-s="'+k+'"]').value});
    }
  });
  if(!sel.length){alert('Marca al menos una columna.');return}
  var norm=function(s){return s.replace(/\s+/g,' ').trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')};
  var mapa={};
  data.forEach(function(d){mapa[norm(d.n)]=sel.map(function(s){return d.v[s.k]===''?'0':d.v[s.k]})});
  var selectores=sel.map(function(s){return s.sel});
  var L=[];
  L.push('// Script generado: '+data.length+' alumnos. Columnas: '+sel.map(function(s){return headers[s.k]+' -> '+s.sel}).join(' | ').replace(/\n/g,' '));
  L.push('(function(){');
  L.push('const mapaNotas = '+JSON.stringify(mapa)+';');
  L.push('const selectoresCampos = '+JSON.stringify(selectores)+';');
  L.push('const ponerCeros = '+($('ceros').checked?'true':'false')+';');
  L.push('function normalizarNombre(n){return n.replace(/\\s+/g," ").trim().toUpperCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");}');
  L.push('function asignarValor(input, valor){');
  L.push('  input.focus(); input.value = valor;');
  L.push('  input.dispatchEvent(new Event("input",{bubbles:true}));');
  L.push('  input.dispatchEvent(new Event("change",{bubbles:true}));');
  L.push('  input.dispatchEvent(new Event("blur",{bubbles:true}));');
  L.push('}');
  L.push('const filas = Array.from(document.querySelectorAll("tr")).filter(tr => tr.querySelector(".campo1"));');
  L.push('let encontrados = 0, puestosEnCero = 0; const noEncontrados = [];');
  L.push('filas.forEach(tr => {');
  L.push('  const td = tr.querySelector("td"); if(!td) return;');
  L.push('  const nombre = normalizarNombre(td.innerText);');
  L.push('  const notas = mapaNotas[nombre];');
  L.push('  if(notas){');
  L.push('    selectoresCampos.forEach((s,i) => { const inp = tr.querySelector(s); if(inp) asignarValor(inp, notas[i]); });');
  L.push('    encontrados++;');
  L.push('  } else {');
  L.push('    if(ponerCeros) selectoresCampos.forEach(s => { const inp = tr.querySelector(s); if(inp) asignarValor(inp, "0"); });');
  L.push('    noEncontrados.push(nombre); puestosEnCero++;');
  L.push('  }');
  L.push('});');
  L.push('console.log("ALUMNOS ENCONTRADOS:", encontrados, "| SIN COINCIDENCIA:", puestosEnCero);');
  L.push('if(noEncontrados.length){ console.log("NO ENCONTRADOS:"); console.table(noEncontrados); }');
  L.push('alert("Proceso finalizado\\n\\nEncontrados: "+encontrados+"\\nSin coincidencia: "+puestosEnCero);');
  L.push('})();');
  $('salida').value=L.join('\n');
  $('sOut').hidden=false;$('okc').textContent='';
  $('sOut').scrollIntoView({behavior:'smooth'});
};

$('btnCopy').onclick=function(){
  var ta=$('salida');ta.select();
  var done=function(){$('okc').textContent='¡Copiado!'};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(ta.value).then(done,function(){document.execCommand('copy');done()})}
  else{document.execCommand('copy');done()}
};
