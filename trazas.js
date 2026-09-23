const STORAGE_KEY = 'falomir_pseint_2026_27_trazas_v1';

function loadState(){
  try{
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {trace:s?.trace||{}, code:s?.code||{}, doneTrace:s?.doneTrace||{}, doneCode:s?.doneCode||{}};
  }catch{
    return {trace:{}, code:{}, doneTrace:{}, doneCode:{}};
  }
}
function saveState(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state))}
const state = loadState();

/* ---------- Normalización y utilidades de validación de código ---------- */
function normalize(code){return code.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/“|”/g,'"').replace(/’/g,"'").replace(/\s+/g,' ')}
function rx(code, pattern){return pattern.test(normalize(code))}
function count(code, word){return (normalize(code).match(new RegExp('\\b'+word+'\\b','g'))||[]).length}

/* =====================================================================
   BLOQUE 1 · TRAZAS: dado un código, el alumnado completa la tabla
   ===================================================================== */
const traceExercises = [
  {
    id:'t1',
    title:'Traza 1 · Suma acumulada con Mientras',
    level:'Base',
    code:`Algoritmo TrazaSuma
    Definir i, suma Como Entero;
    i <- 1;
    suma <- 0;

    Mientras i <= 4 Hacer
        suma <- suma + i;
        i <- i + 1;
    FinMientras

    Escribir suma;
FinAlgoritmo`,
    desc:'Antes de empezar: i vale 1 y suma vale 0. Completa cómo cambian las variables en cada vuelta del bucle y cuándo se deja de cumplir la condición.',
    rows:[
      {label:'Vuelta 1', fields:[
        {key:'cond1', kind:'select', question:'¿i ≤ 4?', answer:'si'},
        {key:'suma1', kind:'number', question:'suma', answer:1},
        {key:'i1', kind:'number', question:'i', answer:2}
      ]},
      {label:'Vuelta 2', fields:[
        {key:'cond2', kind:'select', question:'¿i ≤ 4?', answer:'si'},
        {key:'suma2', kind:'number', question:'suma', answer:3},
        {key:'i2', kind:'number', question:'i', answer:3}
      ]},
      {label:'Vuelta 3', fields:[
        {key:'cond3', kind:'select', question:'¿i ≤ 4?', answer:'si'},
        {key:'suma3', kind:'number', question:'suma', answer:6},
        {key:'i3', kind:'number', question:'i', answer:4}
      ]},
      {label:'Vuelta 4', fields:[
        {key:'cond4', kind:'select', question:'¿i ≤ 4?', answer:'si'},
        {key:'suma4', kind:'number', question:'suma', answer:10},
        {key:'i4', kind:'number', question:'i', answer:5}
      ]},
      {label:'Comprobación final', fields:[
        {key:'cond5', kind:'select', question:'¿i ≤ 4?', answer:'no'}
      ]}
    ],
    output:{key:'salida', question:'¿Qué muestra el Escribir final?', answer:10}
  },
  {
    id:'t2',
    title:'Traza 2 · Contar pares con Para',
    level:'Medio',
    code:`Algoritmo TrazaPares
    Definir i, contador Como Entero;
    contador <- 0;

    Para i <- 1 Hasta 5 Con Paso 1 Hacer
        Si i MOD 2 = 0 Entonces
            contador <- contador + 1;
        FinSi
    FinPara

    Escribir contador;
FinAlgoritmo`,
    desc:'El Para recorre i desde 1 hasta 5. En cada vuelta indica si i es par (i MOD 2 = 0) y cómo queda contador después de esa vuelta.',
    rows:[
      {label:'i = 1', fields:[
        {key:'par1', kind:'select', question:'¿Es par?', answer:'no'},
        {key:'cont1', kind:'number', question:'contador', answer:0}
      ]},
      {label:'i = 2', fields:[
        {key:'par2', kind:'select', question:'¿Es par?', answer:'si'},
        {key:'cont2', kind:'number', question:'contador', answer:1}
      ]},
      {label:'i = 3', fields:[
        {key:'par3', kind:'select', question:'¿Es par?', answer:'no'},
        {key:'cont3', kind:'number', question:'contador', answer:1}
      ]},
      {label:'i = 4', fields:[
        {key:'par4', kind:'select', question:'¿Es par?', answer:'si'},
        {key:'cont4', kind:'number', question:'contador', answer:2}
      ]},
      {label:'i = 5', fields:[
        {key:'par5', kind:'select', question:'¿Es par?', answer:'no'},
        {key:'cont5', kind:'number', question:'contador', answer:2}
      ]}
    ],
    output:{key:'salida', question:'¿Qué muestra el Escribir final?', answer:2}
  }
];

function renderTraceExercise(e){
  const rowsHtml = e.rows.map((r,ri)=>`
    <tr>
      <td>${r.label}</td>
      ${r.fields.map(f=>{
        const saved = state.trace[e.id]?.[f.key] ?? '';
        if(f.kind==='select'){
          return `<td>
            <label class="cell-label">${f.question}</label>
            <select data-trace="${e.id}" data-key="${f.key}">
              <option value="" ${saved===''?'selected':''}>—</option>
              <option value="si" ${saved==='si'?'selected':''}>Sí</option>
              <option value="no" ${saved==='no'?'selected':''}>No</option>
            </select>
          </td>`;
        }
        return `<td>
          <label class="cell-label">${f.question}</label>
          <input type="number" inputmode="numeric" data-trace="${e.id}" data-key="${f.key}" value="${saved}">
        </td>`;
      }).join('')}
    </tr>`).join('');

  const outSaved = state.trace[e.id]?.[e.output.key] ?? '';

  return `<article class="exercise trace-exercise ${state.doneTrace[e.id]?'done':''}" data-trace-id="${e.id}">
    <div class="exercise-head">
      <div>
        <div class="exercise-num">${e.title} <span class="badge ${e.level==='Medio'?'medium':''}">${e.level}</span></div>
        <p class="exercise-desc">${e.desc}</p>
      </div>
      <span class="status-pill">${state.doneTrace[e.id]?'✓ Superado':'Pendiente'}</span>
    </div>
    <pre>${e.code}</pre>
    <div class="table-wrap">
      <table class="trace-table">
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
    <div class="trace-output">
      <label class="cell-label">${e.output.question}</label>
      <input type="number" inputmode="numeric" data-trace="${e.id}" data-key="${e.output.key}" value="${outSaved}">
    </div>
    <div class="exercise-actions">
      <button class="btn primary" type="button" data-validate-trace="${e.id}">Corregir traza</button>
      <button class="btn ghost" type="button" data-solution-trace="${e.id}">Ver solución</button>
    </div>
    <div class="feedback" data-feedback-trace="${e.id}"></div>
    <div class="hint" data-solutionbox="${e.id}"></div>
  </article>`;
}

function solutionTable(e){
  const rows = e.rows.map(r=>`<tr><td>${r.label}</td>${r.fields.map(f=>`<td>${f.kind==='select'?(f.answer==='si'?'Sí':'No'):f.answer}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table class="trace-table"><tbody>${rows}</tbody></table></div><p><b>${e.output.question}</b> ${e.output.answer}</p>`;
}

function validateTrace(id){
  const e = traceExercises.find(x=>x.id===id);
  const fields = e.rows.flatMap(r=>r.fields).concat([e.output]);
  const answers = state.trace[id] || {};
  const wrong = [];
  fields.forEach(f=>{
    const given = answers[f.key];
    const ok = f.kind==='select' ? given===f.answer : Number(given)===f.answer;
    if(!ok) wrong.push(f.question);
  });
  const fb = document.querySelector(`[data-feedback-trace="${id}"]`);
  fb.className = 'feedback show';
  const article = document.querySelector(`[data-trace-id="${id}"]`);
  if(wrong.length===0){
    state.doneTrace[id]=true;
    fb.classList.add('ok');
    fb.innerHTML = '<b>✓ Traza correcta.</b> Has seguido bien la ejecución del algoritmo.';
    article.classList.add('done');
  }else{
    state.doneTrace[id]=false;
    fb.classList.add('error');
    fb.innerHTML = '<b>Todavía no está bien.</b><br>Revisa: '+wrong.slice(0,4).join(', ')+(wrong.length>4?'…':'');
    article.classList.remove('done');
  }
  article.querySelector('.status-pill').textContent = state.doneTrace[id] ? '✓ Superado' : 'Pendiente';
  saveState();
  updateProgress();
}

/* =====================================================================
   BLOQUE 2 · ORGANIGRAMAS → CÓDIGO: dado un diagrama, el alumnado escribe
   el pseudocódigo correspondiente
   ===================================================================== */
const flowExercises = [
  {
    id:'f1',
    title:'Organigrama 1 · ¿Múltiplo de 5?',
    level:'Base',
    desc:'Traduce el diagrama a pseudocódigo: lee un número y comprueba si es múltiplo de 5.',
    template:'Algoritmo MultiploDeCinco\n    Definir numero Como Entero;\n\nFinAlgoritmo',
    checks:['structure','readNumero','hasSi','hasSiNo','hasFinSi','mod5','mentionsMultiplo'],
    svg:`<svg class="flow-svg" viewBox="0 0 520 570" role="img" aria-label="Diagrama de flujo: comprobar si un número es múltiplo de 5">
      <defs><marker id="arr1" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#55708f"/></marker></defs>
      <rect x="185" y="20" width="150" height="48" rx="24" fill="#e8f2ff" stroke="#0b6efd" stroke-width="3"/><text x="260" y="50" text-anchor="middle" font-size="18" fill="#14213d">Inicio</text>
      <line x1="260" y1="68" x2="260" y2="105" stroke="#55708f" stroke-width="3" marker-end="url(#arr1)"/>
      <polygon points="160,115 360,115 335,175 135,175" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3"/><text x="248" y="151" text-anchor="middle" font-size="17" fill="#14213d">Leer numero</text>
      <line x1="260" y1="175" x2="260" y2="215" stroke="#55708f" stroke-width="3" marker-end="url(#arr1)"/>
      <polygon points="260,220 375,300 260,380 145,300" fill="#fff8eb" stroke="#b56b00" stroke-width="3"/><text x="260" y="292" text-anchor="middle" font-size="14.5" fill="#14213d">¿numero MOD</text><text x="260" y="310" text-anchor="middle" font-size="14.5" fill="#14213d">5 = 0?</text>
      <line x1="145" y1="300" x2="75" y2="300" stroke="#55708f" stroke-width="3"/><line x1="75" y1="300" x2="75" y2="405" stroke="#55708f" stroke-width="3" marker-end="url(#arr1)"/><text x="108" y="286" font-size="15" fill="#14213d">No</text>
      <line x1="375" y1="300" x2="445" y2="300" stroke="#55708f" stroke-width="3"/><line x1="445" y1="300" x2="445" y2="405" stroke="#55708f" stroke-width="3" marker-end="url(#arr1)"/><text x="404" y="286" font-size="15" fill="#14213d">Sí</text>
      <polygon points="5,415 155,415 135,475 -15,475" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3" transform="translate(15,0)"/><text x="85" y="440" text-anchor="middle" font-size="13" fill="#14213d">Escribir "No es</text><text x="85" y="457" text-anchor="middle" font-size="13" fill="#14213d">múltiplo de 5"</text>
      <polygon points="375,415 525,415 505,475 355,475" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3"/><text x="440" y="440" text-anchor="middle" font-size="13" fill="#14213d">Escribir "Es</text><text x="440" y="457" text-anchor="middle" font-size="13" fill="#14213d">múltiplo de 5"</text>
      <line x1="85" y1="475" x2="85" y2="515" stroke="#55708f" stroke-width="3"/><line x1="440" y1="475" x2="440" y2="515" stroke="#55708f" stroke-width="3"/><line x1="85" y1="515" x2="440" y2="515" stroke="#55708f" stroke-width="3"/><line x1="260" y1="515" x2="260" y2="535" stroke="#55708f" stroke-width="3" marker-end="url(#arr1)"/>
      <rect x="185" y="535" width="150" height="30" rx="15" fill="#e8f2ff" stroke="#0b6efd" stroke-width="3"/><text x="260" y="556" text-anchor="middle" font-size="16" fill="#14213d">Fin</text>
    </svg>`
  },
  {
    id:'f2',
    title:'Organigrama 2 · Contar del 1 al 5',
    level:'Medio',
    desc:'Traduce el diagrama a pseudocódigo: usa un bucle Mientras para mostrar los números del 1 al 5.',
    template:'Algoritmo ContarHastaCinco\n    Definir contador Como Entero;\n\nFinAlgoritmo',
    checks:['structure','hasMientras','hasFinMientras','contadorInicial','whileTo5','incrementContador','writeContador'],
    svg:`<svg class="flow-svg" viewBox="0 0 560 650" role="img" aria-label="Diagrama de flujo: contar del 1 al 5 con un bucle">
      <defs><marker id="arr2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#55708f"/></marker></defs>
      <rect x="205" y="15" width="150" height="46" rx="23" fill="#e8f2ff" stroke="#0b6efd" stroke-width="3"/><text x="280" y="44" text-anchor="middle" font-size="17" fill="#14213d">Inicio</text>
      <line x1="280" y1="61" x2="280" y2="100" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/>
      <rect x="185" y="100" width="190" height="46" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3"/><text x="280" y="128" text-anchor="middle" font-size="15" fill="#14213d">contador &lt;- 1</text>
      <line x1="280" y1="146" x2="280" y2="185" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/>
      <polygon points="280,185 405,270 280,355 155,270" fill="#fff8eb" stroke="#b56b00" stroke-width="3"/><text x="280" y="264" text-anchor="middle" font-size="14" fill="#14213d">¿contador ≤ 5?</text>
      <line x1="405" y1="270" x2="460" y2="270" stroke="#55708f" stroke-width="3"/><line x1="460" y1="270" x2="460" y2="340" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/><text x="424" y="256" font-size="15" fill="#14213d">Sí</text>
      <rect x="375" y="340" width="170" height="44" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3"/><text x="460" y="367" text-anchor="middle" font-size="14" fill="#14213d">Escribir contador</text>
      <line x1="460" y1="384" x2="460" y2="415" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/>
      <rect x="365" y="415" width="190" height="46" fill="#f2f8ff" stroke="#0b6efd" stroke-width="3"/><text x="460" y="443" text-anchor="middle" font-size="13.5" fill="#14213d">contador &lt;- contador + 1</text>
      <path d="M460,461 L460,500 L540,500 L540,270 L405,270" fill="none" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/>
      <line x1="155" y1="270" x2="90" y2="270" stroke="#55708f" stroke-width="3"/><text x="120" y="256" font-size="15" fill="#14213d">No</text>
      <line x1="90" y1="270" x2="90" y2="565" stroke="#55708f" stroke-width="3"/>
      <line x1="90" y1="565" x2="205" y2="565" stroke="#55708f" stroke-width="3" marker-end="url(#arr2)"/>
      <rect x="205" y="588" width="150" height="46" rx="23" fill="#e8f2ff" stroke="#0b6efd" stroke-width="3"/><text x="280" y="617" text-anchor="middle" font-size="17" fill="#14213d">Fin</text>
    </svg>`
  }
];

function renderFlowExercise(e){
  const saved = (state.code[e.id] ?? e.template).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<article class="exercise ${state.doneCode[e.id]?'done':''}" data-flow-id="${e.id}">
    <div class="exercise-head">
      <div>
        <div class="exercise-num">${e.title} <span class="badge ${e.level==='Medio'?'medium':''}">${e.level}</span></div>
        <p class="exercise-desc">${e.desc}</p>
      </div>
      <span class="status-pill">${state.doneCode[e.id]?'✓ Superado':'Pendiente'}</span>
    </div>
    <div class="flow-wrap">${e.svg}</div>
    <div class="editor-wrap"><div class="editor-toolbar"><span>PSeInt</span></div><textarea class="code-editor" spellcheck="false" data-flow-editor="${e.id}">${saved}</textarea></div>
    <div class="exercise-actions">
      <button class="btn primary" type="button" data-validate-flow="${e.id}">Validar código</button>
      <a class="btn ghost" href="https://www.pseint-web.app/" target="_blank" rel="noopener">Probar en PSeInt Web ↗</a>
    </div>
    <div class="feedback" data-feedback-flow="${e.id}"></div>
  </article>`;
}

const flowRules = {
  structure:c=>rx(c,/\balgoritmo\b/)&&rx(c,/\bfinalgoritmo\b/),
  readNumero:c=>rx(c,/leer\s+numero/),
  hasSi:c=>count(c,'si')>=1, hasSiNo:c=>count(c,'sino')>=1, hasFinSi:c=>count(c,'finsi')>=1,
  mod5:c=>rx(c,/numero\s*mod\s*5\s*=\s*0/),
  mentionsMultiplo:c=>normalize(c).includes('multiplo de 5'),
  hasMientras:c=>count(c,'mientras')>=1, hasFinMientras:c=>count(c,'finmientras')>=1,
  contadorInicial:c=>rx(c,/contador\s*<-\s*1\b/),
  whileTo5:c=>rx(c,/mientras\s+contador\s*<=\s*5/),
  incrementContador:c=>rx(c,/contador\s*<-\s*contador\s*\+\s*1/),
  writeContador:c=>rx(c,/escribir[^;\n]*contador/)
};
const flowRuleMessages = {
  structure:'Incluye Algoritmo ... FinAlgoritmo.',
  readNumero:'Falta Leer numero.',
  hasSi:'Falta una estructura Si.', hasSiNo:'Falta SiNo.', hasFinSi:'Falta FinSi.',
  mod5:'Comprueba numero MOD 5 = 0.',
  mentionsMultiplo:'Incluye el texto "múltiplo de 5" en algún Escribir.',
  hasMientras:'Falta Mientras.', hasFinMientras:'Falta FinMientras.',
  contadorInicial:'Inicializa contador <- 1 antes del bucle.',
  whileTo5:'La condición del Mientras debe ser contador <= 5.',
  incrementContador:'Incrementa contador <- contador + 1 dentro del bucle.',
  writeContador:'Muestra contador con Escribir.'
};

function validateFlow(id){
  const e = flowExercises.find(x=>x.id===id);
  const ed = document.querySelector(`[data-flow-editor="${id}"]`);
  const code = ed.value; state.code[id]=code;
  const missing = e.checks.filter(k=>!flowRules[k](code));
  const fb = document.querySelector(`[data-feedback-flow="${id}"]`);
  fb.className = 'feedback show';
  const article = document.querySelector(`[data-flow-id="${id}"]`);
  if(missing.length===0){
    state.doneCode[id]=true;
    fb.classList.add('ok');
    fb.innerHTML = '<b>✓ Código correcto.</b> Representa fielmente el organigrama.';
    article.classList.add('done');
  }else{
    state.doneCode[id]=false;
    fb.classList.add('error');
    fb.innerHTML = '<b>Aún no está correcto.</b><br>'+missing.slice(0,4).map(k=>'• '+(flowRuleMessages[k]||k)).join('<br>');
    article.classList.remove('done');
  }
  article.querySelector('.status-pill').textContent = state.doneCode[id] ? '✓ Superado' : 'Pendiente';
  saveState();
  updateProgress();
}

/* ---------- Progreso general y render ---------- */
function updateProgress(){
  const doneTrace = traceExercises.filter(e=>state.doneTrace[e.id]).length;
  const doneFlow = flowExercises.filter(e=>state.doneCode[e.id]).length;
  const done = doneTrace + doneFlow;
  const total = traceExercises.length + flowExercises.length;
  const pct = Math.round(done/total*100);
  document.querySelector('#progressText').textContent = `${done} / ${total}`;
  document.querySelector('#progressPercent').textContent = `${pct} % completado`;
  document.querySelector('#progressBar').style.width = pct+'%';
}

function attachEvents(){
  document.querySelectorAll('[data-trace]').forEach(el=>el.addEventListener('input',()=>{
    const id = el.dataset.trace, key = el.dataset.key;
    state.trace[id] = state.trace[id] || {};
    state.trace[id][key] = el.value;
    saveState();
  }));
  document.querySelectorAll('[data-validate-trace]').forEach(b=>b.addEventListener('click',()=>validateTrace(b.dataset.validateTrace)));
  document.querySelectorAll('[data-solution-trace]').forEach(b=>b.addEventListener('click',()=>{
    const id = b.dataset.solutionTrace;
    const e = traceExercises.find(x=>x.id===id);
    const box = document.querySelector(`[data-solutionbox="${id}"]`);
    box.classList.toggle('show');
    if(box.classList.contains('show') && !box.innerHTML) box.innerHTML = '<b>Solución:</b>'+solutionTable(e);
  }));
  document.querySelectorAll('[data-flow-editor]').forEach(el=>el.addEventListener('input',()=>{state.code[el.dataset.flowEditor]=el.value;saveState()}));
  document.querySelectorAll('[data-validate-flow]').forEach(b=>b.addEventListener('click',()=>validateFlow(b.dataset.validateFlow)));
}

function render(){
  document.querySelector('#traceList').innerHTML = traceExercises.map(renderTraceExercise).join('');
  document.querySelector('#flowList').innerHTML = flowExercises.map(renderFlowExercise).join('');
  attachEvents();
  updateProgress();
}

render();
