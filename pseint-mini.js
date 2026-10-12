/* Mini intérprete de PSeInt para autovalidar las actividades opcionales (R/A).
   Admite: Algoritmo/Proceso, Definir, Leer, Escribir (Sin Saltar), asignación (<-),
   Si/SiNo, Mientras, Repetir/Hasta Que, Para (Con Paso), Segun, operadores y funciones habituales.
   No admite vectores ni subprocesos (la UP1 trabaja sin vectores). */
(function(root){
'use strict';
function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}

/* ---------- Preprocesado: comentarios y separación de instrucciones ---------- */
function splitStatements(src){
  const out=[]; const lines=src.replace(/\r/g,'').split('\n');
  lines.forEach((raw,li)=>{
    let cur='', q=null;
    for(let i=0;i<raw.length;i++){
      const c=raw[i];
      if(q){cur+=c; if(c===q)q=null; continue}
      if(c==='"'||c==="'"||c==='“'){q=(c==='“')?'”':c;cur+=c;continue}
      if(c==='/'&&raw[i+1]==='/')break;
      if(c===';'){push();continue}
      cur+=c;
    }
    push();
    function push(){const t=cur.trim();cur='';if(t)out.push({text:t.replace(/[“”]/g,'"'),line:li+1})}
  });
  return out;
}

/* ---------- Léxico y parser de expresiones ---------- */
const ID_RE=/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ_][A-Za-zÁÉÍÓÚÜÑáéíóúüñ_0-9]*/;
function lex(s){
  const toks=[]; let i=0;
  while(i<s.length){
    const c=s[i];
    if(/\s/.test(c)){i++;continue}
    if(c==='"'||c==="'"){const j=s.indexOf(c,i+1);if(j<0)throw new Error('Hay un texto sin cerrar comillas');toks.push({t:'str',v:s.slice(i+1,j)});i=j+1;continue}
    const rest=s.slice(i); let m;
    if((m=/^\d+(\.\d+)?/.exec(rest))){toks.push({t:'num',v:parseFloat(m[0])});i+=m[0].length;continue}
    if((m=ID_RE.exec(rest))){toks.push({t:'id',v:m[0]});i+=m[0].length;continue}
    if((m=/^(<=|>=|<>|!=|==|&&|\|\||[-+*\/^%()<>=&|~!,])/.exec(rest))){toks.push({t:'op',v:m[0]});i+=m[0].length;continue}
    throw new Error('Carácter no válido «'+c+'»');
  }
  return toks;
}
function parseExpr(s){
  const toks=lex(s); let p=0;
  const peek=()=>toks[p], isOp=v=>toks[p]&&toks[p].t==='op'&&toks[p].v===v;
  const isWord=w=>toks[p]&&toks[p].t==='id'&&norm(toks[p].v)===w;
  function fail(){throw new Error('Expresión mal formada: «'+s+'»')}
  function or(){let l=and();while(isWord('o')||isOp('||')||isOp('|')){p++;l={k:'bin',op:'or',l,r:and()}}return l}
  function and(){let l=not();while(isWord('y')||isOp('&&')||isOp('&')){p++;l={k:'bin',op:'and',l,r:not()}}return l}
  function not(){if(isWord('no')||isOp('~')||isOp('!')){p++;return {k:'un',op:'not',e:not()}}return rel()}
  function rel(){
    let l=add();
    while(toks[p]&&toks[p].t==='op'&&['=','==','<>','!=','<','>','<=','>='].includes(toks[p].v)){const op=toks[p++].v;l={k:'bin',op,l,r:add()}}
    return l;
  }
  function add(){let l=mul();while(isOp('+')||isOp('-')){const op=toks[p++].v;l={k:'bin',op,l,r:mul()}}return l}
  function mul(){let l=pow();while(isOp('*')||isOp('/')||isOp('%')||isWord('mod')){const t=toks[p++];const op=t.v==='%'?'mod':norm(t.v);l={k:'bin',op,l,r:pow()}}return l}
  function pow(){const l=unary();if(isOp('^')){p++;return {k:'bin',op:'^',l,r:pow()}}return l}
  function unary(){if(isOp('-')){p++;return {k:'un',op:'neg',e:unary()}}if(isOp('+')){p++;return unary()}return prim()}
  function prim(){
    const t=toks[p]; if(!t)fail();
    if(t.t==='num'){p++;return {k:'lit',v:t.v}}
    if(t.t==='str'){p++;return {k:'lit',v:t.v}}
    if(t.t==='op'&&t.v==='('){p++;const e=or();if(!isOp(')'))fail();p++;return e}
    if(t.t==='id'){
      p++; const n=norm(t.v);
      if(n==='verdadero')return {k:'lit',v:true};
      if(n==='falso')return {k:'lit',v:false};
      if(isOp('(')){p++;const args=[];if(!isOp(')')){args.push(or());while(isOp(',')){p++;args.push(or())}}if(!isOp(')'))fail();p++;return {k:'call',n,args}}
      return {k:'var',n};
    }
    fail();
  }
  const e=or(); if(p<toks.length)fail(); return e;
}
function splitTop(s){ // separa por comas fuera de paréntesis y comillas
  const parts=[]; let d=0,q=null,cur='';
  for(const c of s){
    if(q){cur+=c;if(c===q)q=null;continue}
    if(c==='"'||c==="'"){q=c;cur+=c;continue}
    if(c==='(')d++; if(c===')')d--;
    if(c===','&&d===0){parts.push(cur);cur='';continue}
    cur+=c;
  }
  if(cur.trim()!==''||parts.length)parts.push(cur);
  return parts.map(x=>x.trim());
}

/* ---------- Parser de instrucciones ---------- */
function parseProgram(src){
  const st=splitStatements(src); let i=0;
  const at=()=>st[i];
  const err=(s,m)=>{const e=new Error(m);e.line=s?s.line:null;throw e};
  function ex(s,text){try{return parseExpr(text)}catch(e){e.line=s.line;throw e}}
  const isCase=s=>/^((?:[^:"']|"[^"]*"|'[^']*')+):(.*)$/.test(s.text)&&!/^(si|sino|mientras|repetir|para|escribir|leer|definir)\b/i.test(norm(s.text));
  function block(stop){
    const body=[];
    while(i<st.length){
      const s=st[i], tl=norm(s.text);
      if(stop(tl,s))return body;
      body.push(stmt());
    }
    return body;
  }
  function expectEnd(re,what,start){
    if(i>=st.length)err(start,'Falta «'+what+'» para cerrar la estructura abierta en la línea '+start.line);
    if(!re.test(norm(st[i].text)))err(st[i],'Se esperaba «'+what+'»');
    i++;
  }
  function stmt(){
    const s=st[i], t=s.text, tl=norm(t); let m;
    i++;
    if((m=/^definir\s+(.+?)\s+como\s+(\w+)$/.exec(tl))){return {k:'def',names:m[1].split(',').map(x=>x.trim()),type:m[2],line:s.line}}
    if((m=/^leer\s+(.+)$/.exec(tl))){return {k:'read',names:m[1].split(',').map(x=>x.trim()),line:s.line}}
    if((m=/^(escribir|imprimir|mostrar)\s+(.*)$/i.exec(t))){
      let rest=m[2], nl=true;
      const sm=/\s+sin\s+(saltar|bajar)\s*$/i.exec(rest); if(sm){nl=false;rest=rest.slice(0,sm.index)}
      return {k:'write',args:splitTop(rest).map(a=>ex(s,a)),nl,line:s.line};
    }
    if((m=/^si\s+(.+?)\s+entonces$/i.exec(norm(t)===tl?t:t))){
      const cond=ex(s,/^si\s+(.+?)\s+entonces$/i.exec(t)[1]);
      const yes=block(x=>x==='sino'||x==='finsi'); let no=[];
      if(i<st.length&&norm(st[i].text)==='sino'){i++;no=block(x=>x==='finsi')}
      expectEnd(/^finsi$/,'FinSi',s); return {k:'if',cond,yes,no,line:s.line};
    }
    if((m=/^mientras\s+(.+?)(?:\s+hacer)?$/i.exec(t))){
      const body=block(x=>x==='finmientras'); expectEnd(/^finmientras$/,'FinMientras',s);
      return {k:'while',cond:ex(s,m[1]),body,line:s.line};
    }
    if(tl==='repetir'){
      const body=block(x=>/^hasta que\b/.test(x)||/^mientras que\b/.test(x));
      if(i>=st.length)err(s,'Falta «Hasta Que» para cerrar el Repetir de la línea '+s.line);
      const e=st[i++]; const mm=/^(hasta que|mientras que)\s+(.+)$/i.exec(norm(e.text)===e.text.toLowerCase()?e.text:e.text);
      const until=/^hasta/.test(norm(e.text));
      return {k:'repeat',body,cond:ex(e,mm[2]),until,line:s.line};
    }
    if((m=/^para\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_]\w*)\s*(?:<-|=|:=)\s*(.+?)\s+hasta\s+(.+?)(?:\s+con\s+paso\s+(.+?))?(?:\s+hacer)?$/i.exec(t))){
      const body=block(x=>x==='finpara'); expectEnd(/^finpara$/,'FinPara',s);
      return {k:'for',v:norm(m[1]),from:ex(s,m[2]),to:ex(s,m[3]),step:m[4]?ex(s,m[4]):null,body,line:s.line};
    }
    if((m=/^segun\s+(.+?)(?:\s+hacer)?$/i.exec(t))){
      const sel=ex(s,m[1]); const cases=[]; let other=null;
      while(i<st.length&&norm(st[i].text)!=='finsegun'){
        const c=st[i];
        const om=/^de otro modo\s*:?(.*)$/i.exec(norm(c.text));
        if(om){i++; if(om[1].trim()){i--;st[i]={text:c.text.replace(/^[^:]*:?/,'').trim(),line:c.line}; }
          other=block(x=>x==='finsegun'); continue}
        if(!isCase(c))err(c,'Dentro de Segun se esperaba un valor seguido de «:»');
        const cm=/^((?:[^:"']|"[^"]*"|'[^']*')+):(.*)$/.exec(c.text);
        const vals=splitTop(cm[1]).map(v=>ex(c,v)); const after=cm[2].trim();
        if(after){st[i]={text:after,line:c.line}}else i++;
        const body=block((x,ss)=>x==='finsegun'||isCase(ss)||/^de otro modo/.test(x));
        cases.push({vals,body});
      }
      expectEnd(/^finsegun$/,'FinSegun',s); return {k:'switch',sel,cases,other,line:s.line};
    }
    if(/^(esperar|borrar|limpiar)\b/.test(tl))return {k:'nop'};
    if((m=/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_]\w*)\s*(?:<-|:=)\s*(.+)$/.exec(t))||(m=/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_]\w*)\s*=\s*([^=].*)$/.exec(t))){
      return {k:'set',n:norm(m[1]),e:ex(s,m[2]),line:s.line};
    }
    err(s,'No reconozco la instrucción «'+t+'»');
  }
  // cabecera
  if(!st.length)throw Object.assign(new Error('El algoritmo está vacío'),{line:null});
  const h=st[0];
  if(!/^(algoritmo|proceso)\b/.test(norm(h.text)))err(h,'Debe empezar por «Algoritmo Nombre»');
  i=1;
  const prog=block(x=>x==='finalgoritmo'||x==='finproceso');
  if(i>=st.length)err(h,'Falta «FinAlgoritmo»');
  return prog;
}

/* ---------- Ejecución ---------- */
function fmt(v){
  if(typeof v==='boolean')return v?'VERDADERO':'FALSO';
  if(typeof v==='number'){return Number.isInteger(v)?String(v):String(parseFloat(v.toPrecision(12)))}
  return String(v);
}
const FN={
  abs:a=>Math.abs(a[0]),trunc:a=>Math.trunc(a[0]),redon:a=>Math.round(a[0]),raiz:a=>Math.sqrt(a[0]),rc:a=>Math.sqrt(a[0]),
  longitud:a=>String(a[0]).length,mayusculas:a=>String(a[0]).toUpperCase(),minusculas:a=>String(a[0]).toLowerCase(),
  convertiranumero:a=>Number(a[0]),convertiratexto:a=>fmt(a[0]),subcadena:a=>String(a[0]).substring(a[1],a[2]+1),
  sen:a=>Math.sin(a[0]),cos:a=>Math.cos(a[0]),ln:a=>Math.log(a[0]),exp:a=>Math.exp(a[0])
};
function run(code,inputs,opts){
  const maxSteps=(opts&&opts.maxSteps)||200000;
  const res={out:'',error:null,line:null,reads:0};
  let prog;
  try{prog=parseProgram(code)}catch(e){res.error='Error de sintaxis'+(e.line?' (línea '+e.line+')':'')+': '+e.message;res.syntax=true;return res}
  const vars=new Map(), types=new Map(); const q=(inputs||[]).slice(); let steps=0;
  function err(m,line){const e=new Error(m);e.line=line;throw e}
  function ev(n,line){
    switch(n.k){
      case 'lit':return n.v;
      case 'var':if(!vars.has(n.n))err('La variable «'+n.n+'» se usa antes de darle un valor',line);return vars.get(n.n);
      case 'un':{const v=ev(n.e,line);return n.op==='neg'?-v:!v}
      case 'call':{const f=FN[n.n];if(!f)err('Función desconocida «'+n.n+'»',line);return f(n.args.map(a=>ev(a,line)))}
      case 'bin':{
        if(n.op==='and')return !!ev(n.l,line)&&!!ev(n.r,line);
        if(n.op==='or')return !!ev(n.l,line)||!!ev(n.r,line);
        const a=ev(n.l,line), b=ev(n.r,line);
        switch(n.op){
          case '+':return (typeof a==='string'||typeof b==='string')?fmt(a)+fmt(b):a+b;
          case '-':return a-b; case '*':return a*b;
          case '/':if(b===0)err('División entre cero',line);return a/b;
          case 'mod':if(b===0)err('MOD entre cero',line);return a%b;
          case '^':return Math.pow(a,b);
          case '=':case '==':return a===b; case '<>':case '!=':return a!==b;
          case '<':return a<b; case '>':return a>b; case '<=':return a<=b; case '>=':return a>=b;
        }
      }
    }
    err('Expresión no válida',line);
  }
  function tick(line){if(++steps>maxSteps)err('El algoritmo no termina (posible bucle infinito)',line)}
  function exec(b){for(const s of b){tick(s.line);one(s)}}
  function one(s){
    switch(s.k){
      case 'nop':case undefined:return;
      case 'def':s.names.forEach(n=>types.set(n,norm(s.type)));return;
      case 'read':for(const n of s.names){
        if(!q.length)err('Leer pide más datos de los previstos (revisa el bucle o los Leer)',s.line);
        const raw=String(q.shift()); res.reads++;
        vars.set(n,(types.get(n)==='cadena'||!/^-?\d+(\.\d+)?$/.test(raw.trim()))?raw:parseFloat(raw));
      }return;
      case 'write':res.out+=s.args.map(a=>fmt(ev(a,s.line))).join('')+(s.nl?'\n':'');return;
      case 'set':vars.set(s.n,ev(s.e,s.line));return;
      case 'if':exec(ev(s.cond,s.line)?s.yes:s.no);return;
      case 'while':while(ev(s.cond,s.line)){tick(s.line);exec(s.body)}return;
      case 'repeat':do{tick(s.line);exec(s.body)}while(s.until?!ev(s.cond,s.line):ev(s.cond,s.line));return;
      case 'for':{
        const to=ev(s.to,s.line), step=s.step?ev(s.step,s.line):1;
        if(step===0)err('El paso del Para no puede ser 0',s.line);
        for(let v=ev(s.from,s.line);step>0?v<=to:v>=to;v+=step){vars.set(s.v,v);tick(s.line);exec(s.body)}
        return;
      }
      case 'switch':{
        const v=ev(s.sel,s.line); const c=s.cases.find(c=>c.vals.some(x=>ev(x,s.line)===v));
        if(c)exec(c.body); else if(s.other)exec(s.other); return;
      }
    }
  }
  try{exec(prog)}catch(e){res.error=e.message;res.line=e.line||null}
  return res;
}

/* ---------- Comparación de salidas ---------- */
function tokens(out){return norm(out).split(/[\s,;:|()¿?¡!]+/).filter(Boolean)}
function sameTok(a,e){
  if(typeof e==='number'){const n=Number(a);return a!==''&&!isNaN(n)&&Math.abs(n-e)<0.011}
  return a===norm(e);
}
function matchSeq(out,seq,exact){
  const t=tokens(out);
  if(exact)return t.length===seq.length&&seq.every((e,k)=>sameTok(t[k],e));
  let k=0; for(const x of t){if(k<seq.length&&sameTok(x,seq[k]))k++} return k===seq.length;
}
function describe(e){return typeof e==='number'?String(e):e}
/* Evalúa un caso de prueba. Devuelve null si pasa, o un mensaje. */
function checkCase(code,tc){
  const r=run(code,tc.in||[]);
  const entrada=(tc.in&&tc.in.length)?'Con las entradas '+tc.in.join(', '):'Sin entradas';
  if(r.error)return entrada+' el algoritmo falla: '+r.error+(r.line&&!r.syntax?' (línea '+r.line+')':'');
  const o=norm(r.out);
  const shown=r.out.trim().replace(/\s*\n\s*/g,' / ')||'(nada)';
  if(tc.has)for(const h of tc.has)if(!o.includes(norm(h)))return entrada+' debería mostrarse «'+h+'», pero se muestra: '+shown;
  if(tc.not)for(const h of tc.not)if(o.includes(norm(h)))return entrada+' no debería mostrarse «'+h+'». Se muestra: '+shown;
  if(tc.seq&&!matchSeq(r.out,tc.seq,tc.exact))return entrada+' se esperaba '+(tc.exact?'exactamente ':'')+tc.seq.map(describe).join(', ')+(tc.exact?'':' (en ese orden)')+'. Se muestra: '+shown;
  if(tc.reads!==undefined&&r.reads!==tc.reads)return entrada+' el algoritmo debía leer '+tc.reads+' dato(s) y lee '+r.reads;
  return null;
}
/* Valida un código frente a un ejercicio {needs:[{re,msg}], tests:[...]} */
function checkCode(code,ex){
  const problems=[]; const n=norm(code);
  if(!/\b(algoritmo|proceso)\b/.test(n)||!/\b(finalgoritmo|finproceso)\b/.test(n)){problems.push('Incluye Algoritmo ... FinAlgoritmo.');return {ok:false,problems}}
  const probe=run(code,[]); if(probe.syntax){problems.push(probe.error);return {ok:false,problems}}
  (ex.needs||[]).forEach(nd=>{if(!nd.re.test(n))problems.push(nd.msg)});
  (ex.tests||[]).forEach(tc=>{const m=checkCase(code,tc);if(m)problems.push(m)});
  return {ok:problems.length===0,problems};
}
const API={run,parseProgram,checkCode,checkCase,norm,fmt};
if(typeof module!=='undefined'&&module.exports)module.exports=API;
root.PSeIntMini=API;
})(typeof window!=='undefined'?window:globalThis);
