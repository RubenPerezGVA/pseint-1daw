/* Motor común de las actividades opcionales R/A de la UP1 (refuerzo1, ampliacion1, refuerzo2, ampliacion2).
   Cada página define window.ACTIVITY antes de cargar este fichero. Mismo estilo y dinámica que P1.1 y P1.2:
   autovalidación por criterios + justificante PDF propio + progreso en localStorage propio. */
(function(){
'use strict';
const A = window.ACTIVITY, M = window.PSeIntMini;
const KEY = A.storageKey;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

function load(){
  try{const s=JSON.parse(localStorage.getItem(KEY));return {name:s?.name||'',code:s?.code||{},ans:s?.ans||{},conf:s?.conf||{},done:s?.done||{}}}
  catch{return {name:'',code:{},ans:{},conf:{},done:{}}}
}
const state = load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}

/* ---------- Render ---------- */
function levelClass(l){return l==='Medio'?'medium':l==='Reto'?'challenge':''}
function traceHtml(e){
  const t=e.trace, saved=state.ans[e.id]||{};
  const head=`<tr><th>Paso</th>${t.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr>`;
  const rows=t.rows.map((r,ri)=>`<tr><td>${esc(r.label)}</td>${t.cols.map((c,ci)=>
    r.v[ci]===null?'<td class="na" title="Aún no tiene valor">—</td>':`<td><input type="number" step="any" inputmode="decimal" aria-label="${esc(r.label)} · ${esc(c)}" data-ans="${e.id}" data-key="t${ri}_${ci}" value="${saved['t'+ri+'_'+ci]??''}"></td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table class="trace-table trace-grid"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
    <div class="trace-output"><label class="cell-label">${esc(t.out.q)}</label><input type="${typeof t.out.a==='number'?'number':'text'}" step="any" data-ans="${e.id}" data-key="out" value="${esc(saved.out??'')}"></div>`;
}
function deskHtml(e){
  const d=e.desk, saved=state.ans[e.id]||{};
  const rows=d.cases.map((c,ci)=>{
    const key='d'+ci, v=saved[key]??'';
    const field=c.options
      ? `<select data-ans="${e.id}" data-key="${key}" aria-label="Resultado esperado del caso ${ci+1}"><option value="">—</option>${c.options.map(o=>`<option value="${esc(o)}" ${v===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`
      : `<input type="${typeof c.a==='number'?'number':'text'}" step="any" inputmode="decimal" data-ans="${e.id}" data-key="${key}" aria-label="Resultado esperado del caso ${ci+1}" value="${esc(v)}">`;
    return `<tr><td>${esc(c.label)}</td><td><code>${esc(c.in.join(', '))}</code></td><td>${field}</td></tr>`;
  }).join('');
  return `<h4 class="sub">Prueba de escritorio</h4><p class="exercise-desc">${d.intro}</p>
    <div class="table-wrap"><table class="trace-table"><thead><tr><th>Caso límite</th><th>Entradas (en orden)</th><th>${esc(d.col||'Salida esperada')}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function confirmHtml(e){
  const saved=state.conf[e.id]||{};
  return `<div class="confirm-box">${e.confirm.map((c,ci)=>`<label class="confirm"><input type="checkbox" data-conf="${e.id}" data-key="${ci}" ${saved[ci]?'checked':''}> <span>${c}</span></label>`).join('')}</div>`;
}
function renderExercise(e,idx){
  const saved=(state.code[e.id]??e.template??'');
  const hints=(e.hints&&e.hints.length)?`<div class="hint" data-hintbox="${e.id}"><b>Pistas:</b><ol>${e.hints.map(h=>`<li>${h}</li>`).join('')}</ol></div>`:'';
  return `<article class="exercise ${state.done[e.id]?'done':''}" data-id="${e.id}">
    <div class="exercise-head"><div>
      <div class="exercise-num">Ejercicio ${idx+1} <span class="badge ${levelClass(e.level)}">${e.level}</span></div>
      <h3>${e.title}</h3><p class="exercise-desc">${e.desc}</p></div>
      <span class="status-pill">${state.done[e.id]?'✓ Superado':'Pendiente'}</span></div>
    ${e.example?`<div class="example-box">${e.example}</div>`:''}
    ${e.show?`<pre>${esc(e.show)}</pre>`:''}
    ${e.trace?traceHtml(e):''}
    ${e.template!==undefined?`<div class="editor-wrap"><div class="editor-toolbar"><span>PSeInt</span><button type="button" data-copy="${e.id}">Copiar código</button></div><textarea class="code-editor" spellcheck="false" data-editor="${e.id}" placeholder="${esc(e.placeholder||'')}">${esc(saved)}</textarea></div>`:''}
    ${e.desk?deskHtml(e):''}
    ${e.confirm?confirmHtml(e):''}
    <div class="exercise-actions">
      <button class="btn primary" type="button" data-validate="${e.id}">${e.trace&&e.template===undefined?'Corregir traza':'Validar ejercicio'}</button>
      ${hints?`<button class="btn ghost" type="button" data-hint="${e.id}">Ver pistas</button>`:''}
      ${e.solution?`<button class="btn ghost" type="button" data-solution="${e.id}">Ver solución</button>`:''}
      <a class="btn ghost" href="https://www.pseint-web.app/" target="_blank" rel="noopener">Probar en PSeInt Web ↗</a>
    </div>
    ${hints}
    <div class="hint" data-solbox="${e.id}"></div>
    <div class="feedback" data-feedback="${e.id}"></div>
  </article>`;
}

/* ---------- Validación ---------- */
const close=(a,b)=>a!==''&&a!==undefined&&Math.abs(Number(a)-b)<0.011;
function evaluate(e){
  const problems=[]; const ans=state.ans[e.id]||{};
  if(e.template!==undefined){
    const code=state.code[e.id]??e.template;
    if(!code.trim()){problems.push('El editor está vacío: escribe tu algoritmo.');}
    else{const r=M.checkCode(code,e);r.problems.forEach(p=>problems.push(p))}
  }
  if(e.trace){
    const bad=[];
    e.trace.rows.forEach((r,ri)=>e.trace.cols.forEach((c,ci)=>{
      if(r.v[ci]!==null&&!close(ans['t'+ri+'_'+ci],r.v[ci]))bad.push(r.label+' → '+c);
    }));
    const o=ans.out;
    const okOut=(o!==undefined&&o!=='')&&(typeof e.trace.out.a==='number'?close(o,e.trace.out.a):M.norm(o).trim()===M.norm(e.trace.out.a));
    if(!okOut)bad.push(e.trace.out.q);
    if(bad.length)problems.push('Revisa en la tabla: '+bad.slice(0,5).join(' · ')+(bad.length>5?' …':''));
  }
  if(e.desk){
    const bad=[];
    e.desk.cases.forEach((c,ci)=>{
      const v=ans['d'+ci]; const ok=v!==undefined&&v!==''&&(typeof c.a==='number'?close(v,c.a):M.norm(v)===M.norm(c.a));
      if(!ok)bad.push(c.label);
    });
    if(bad.length)problems.push('Prueba de escritorio incorrecta o incompleta en: '+bad.join(' · ')+'. Simula el algoritmo a mano con esas entradas.');
  }
  if(e.confirm){
    const c=state.conf[e.id]||{};
    if(!e.confirm.every((_,i)=>c[i]))problems.push('Marca todas las casillas de comprobación (organigrama, ejecución en PSeInt…).');
  }
  return problems;
}
function validate(id){
  const e=A.exercises.find(x=>x.id===id); const problems=evaluate(e);
  const fb=document.querySelector(`[data-feedback="${id}"]`); fb.className='feedback show';
  const art=document.querySelector(`.exercise[data-id="${id}"]`);
  if(!problems.length){state.done[id]=true;fb.classList.add('ok');fb.innerHTML='<b>✓ Ejercicio superado.</b> '+(e.okMsg||'Cumple todos los criterios.')}
  else{state.done[id]=false;fb.classList.add('error');fb.innerHTML='<b>Aún no está correcto.</b><br>'+problems.slice(0,4).map(p=>'• '+esc(p)).join('<br>')+(problems.length>4?'<br>• Revisa también el resto de criterios.':'')}
  art.classList.toggle('done',!!state.done[id]);
  art.querySelector('.status-pill').textContent=state.done[id]?'✓ Superado':'Pendiente';
  save(); updateProgress();
}
function solutionHtml(e){
  const t=e.trace; if(!t)return '';
  return '<b>Solución:</b><div class="table-wrap"><table class="trace-table"><thead><tr><th>Paso</th>'+t.cols.map(c=>`<th>${esc(c)}</th>`).join('')+'</tr></thead><tbody>'+
    t.rows.map(r=>`<tr><td>${esc(r.label)}</td>${r.v.map(v=>`<td>${v===null?'—':v}</td>`).join('')}</tr>`).join('')+`</tbody></table></div><p><b>${esc(t.out.q)}</b> ${esc(t.out.a)}</p>`;
}

/* ---------- Progreso y eventos ---------- */
function updateProgress(){
  const total=A.exercises.length, done=A.exercises.filter(e=>state.done[e.id]).length, pct=Math.round(done/total*100);
  $('#progressText').textContent=`${done} / ${total}`;
  $('#progressPercent').textContent=`${pct} % completado`;
  $('#progressBar').style.width=pct+'%';
}
function attach(){
  document.querySelectorAll('[data-editor]').forEach(el=>el.addEventListener('input',()=>{state.code[el.dataset.editor]=el.value;save()}));
  document.querySelectorAll('[data-ans]').forEach(el=>{const h=()=>{const id=el.dataset.ans;state.ans[id]=state.ans[id]||{};state.ans[id][el.dataset.key]=el.value;save()};el.addEventListener('input',h);el.addEventListener('change',h)});
  document.querySelectorAll('[data-conf]').forEach(el=>el.addEventListener('change',()=>{const id=el.dataset.conf;state.conf[id]=state.conf[id]||{};state.conf[id][el.dataset.key]=el.checked;save()}));
  document.querySelectorAll('[data-validate]').forEach(b=>b.addEventListener('click',()=>validate(b.dataset.validate)));
  document.querySelectorAll('[data-hint]').forEach(b=>b.addEventListener('click',()=>document.querySelector(`[data-hintbox="${b.dataset.hint}"]`).classList.toggle('show')));
  document.querySelectorAll('[data-solution]').forEach(b=>b.addEventListener('click',()=>{
    const id=b.dataset.solution, box=document.querySelector(`[data-solbox="${id}"]`);
    box.classList.toggle('show'); if(box.classList.contains('show')&&!box.innerHTML)box.innerHTML=solutionHtml(A.exercises.find(x=>x.id===id));
  }));
  document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
    const ed=document.querySelector(`[data-editor="${b.dataset.copy}"]`);
    try{await navigator.clipboard.writeText(ed.value);b.textContent='Copiado ✓'}catch{b.textContent='No se pudo copiar'}
    setTimeout(()=>b.textContent='Copiar código',1200);
  }));
}

/* ---------- Justificante PDF ---------- */
function simpleHash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16).toUpperCase().padStart(8,'0')}
function safeFileName(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'').toLowerCase()||'alumno'}
function generatePdf(){
  const input=$('#studentNamePdf'), hint=$('#pdfHint'), name=input.value.trim();
  if(!name){input.focus();hint.className='finish-hint error';hint.textContent='Escribe tu nombre y apellidos antes de generar el PDF.';return}
  if(typeof window.jspdf==='undefined'){hint.className='finish-hint error';hint.textContent='No se ha podido cargar el generador de PDF (recarga la página e inténtalo de nuevo).';return}
  const rows=A.exercises.map(e=>({title:e.title,ok:!!state.done[e.id]}));
  const done=rows.filter(r=>r.ok).length, total=rows.length, pct=Math.round(done/total*100), grade=Math.round(done/total*1000)/100;
  const now=new Date(), when=now.toLocaleString('es-ES',{dateStyle:'long',timeStyle:'short'});
  const code=A.receiptPrefix+'-'+simpleHash(`${name}|${now.toISOString()}|${done}|${total}`);
  const {jsPDF}=window.jspdf; const doc=new jsPDF({unit:'mm',format:'a4'}); const mx=20; let y=22;
  doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text('Justificante de finalización',mx,y);y+=7;
  doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(90,100,120);
  doc.text('IES Álvaro Falomir · 1.º DAW · Programación (0485) · Curso 2026/27',mx,y);y+=10;
  doc.setDrawColor(220,228,239);doc.line(mx,y,190,y);y+=10;doc.setTextColor(20,33,61);
  const field=(l,v)=>{doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text(l,mx,y);doc.setFont('helvetica','normal');
    const ls=doc.splitTextToSize(String(v),125);doc.text(ls,mx+45,y);y+=Math.max(8,ls.length*5.5+2.5)};
  field('Alumno/a:',name);
  field('Actividad:',A.activity);
  field('Tipo:','Actividad opcional · RA1 · CE '+A.ce);
  field('Resultado:',`${done} / ${total} (${pct} %)`);
  field('Nota orientativa:',`${grade.toFixed(2)} / 10`);
  field('Fecha y hora:',when);
  field('Código:',code);
  y+=4;doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text('Detalle por ejercicio',mx,y);y+=8;doc.setFontSize(10);
  rows.forEach(r=>{
    doc.setFont('helvetica','normal');doc.setTextColor(20,33,61);
    const ls=doc.splitTextToSize(r.title,120);doc.text(ls,mx,y);
    doc.setFont('helvetica','bold');doc.setTextColor(r.ok?20:200,r.ok?140:60,r.ok?90:70);doc.text(r.ok?'Superado':'Pendiente',155,y);
    y+=Math.max(7,ls.length*5.5);doc.setDrawColor(230,235,242);doc.line(mx,y-3,190,y-3);
  });
  y+=6;doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(100,110,130);
  doc.text(doc.splitTextToSize('Generado por la web de prácticas en el navegador del alumno. No constituye una firma digital ni sustituye al registro del aula virtual.',170),mx,y);
  doc.save(`justificante_${A.filePrefix}_${safeFileName(name)}.pdf`);
  state.name=name;save();
  hint.className='finish-hint ready';hint.textContent='✓ PDF generado y descargado.'+(done<total?` (Aún te faltan ${total-done} ejercicio(s); el PDF los indica como pendientes).`:'');
}

/* ---------- Arranque ---------- */
$('#exerciseList').innerHTML=A.exercises.map(renderExercise).join('');
const nameInput=$('#studentNamePdf'); nameInput.value=state.name||'';
nameInput.addEventListener('input',()=>{state.name=nameInput.value;save()});
$('#generatePdfBtn').addEventListener('click',generatePdf);
attach(); updateProgress();
})();
