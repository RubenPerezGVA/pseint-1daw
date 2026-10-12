/* Tests de las actividades opcionales R/A: node tests/extras.test.js */
const assert=require('assert'); const path=require('path');
const P=require('../pseint-mini.js'); const SOL=require('./solutions.js');
const root=path.join(__dirname,'..'); let n=0;
const ok=(c,m)=>{assert(c,m);n++};
for(const f of ['refuerzo1','ampliacion1','refuerzo2','ampliacion2']){
  global.window={}; delete require.cache[require.resolve(path.join(root,f+'.js'))]; require(path.join(root,f+'.js'));
  const A=window.ACTIVITY; if(f==='refuerzo1')global.E1=A.exercises;
  ok(A.exercises.length>=4&&A.exercises.length<=6,f+': entre 4 y 6 ejercicios');
  ok(/^falomir_pseint_2026_27_/.test(A.storageKey)&&!['falomir_pseint_2026_27_v1','falomir_pseint_2026_27_trazas_v1'].includes(A.storageKey),f+': storage key propia');
  for(const e of A.exercises){
    if(e.template!==undefined){
      const sol=SOL[e.id]; ok(sol,e.id+': hay solución de referencia');
      const r=P.checkCode(sol,e); ok(r.ok,e.id+': la solución correcta debe validar → '+r.problems.join(' | '));
      ok(!P.checkCode(e.template,e).ok,e.id+': la plantilla/vacío no debe validar');
      ok(!P.checkCode('Algoritmo X\n    Escribir "hola";\nFinAlgoritmo',e).ok,e.id+': un programa trivial no valida');
      ok(!P.checkCode(sol.replace(/Leer[^\n]*/g,'// leer'),e).ok,e.id+': sin Leer no valida');
      // desk: las respuestas coinciden con la ejecución de la solución
      if(e.desk)for(const c of e.desk.cases){
        const out=P.run(sol,c.in).out;
        if(typeof c.a==='number')ok(P.checkCase(sol,{in:c.in,seq:[c.a]})===null,e.id+' desk '+c.label+' → '+out);
        else{ const exp=P.norm(c.a); const o=P.norm(out);
          const txt=/€/.test(c.a)?o.includes(c.a.replace(/[^\d]/g,'')):(o.includes(exp)&&(exp!=='bisiesto'||!o.includes('no bisiesto')));
          ok(txt,e.id+' desk '+c.label+': esperado '+c.a+' y sale '+out)}
      }
    }
    if(e.trace){ // la salida final de la traza coincide con la ejecución real
      const inputs={'r12-2':[7,12,9],'r12-5':[130]}[e.id]||[];
      const out=P.run(e.show,inputs); ok(!out.error,e.id+': '+out.error);
      const toks=out.out.trim().split(/\s+/);
      ok(Number(toks[toks.length-1])===e.trace.out.a,e.id+': salida de la traza '+out.out);
      e.trace.rows.forEach(r=>ok(r.v.length===e.trace.cols.length,e.id+': columnas de '+r.label));
    }
  }
}
// negativos concretos
const E1=global.E1;
ok(!P.checkCode(SOL['r11-4'].replace('>= 100','> 100'),E1[3]).ok,'límite 100 mal');
ok(!P.checkCode(SOL['r11-1'].replace('2 * (base + altura)','2 * base + altura'),E1[0]).ok,'perímetro sin paréntesis');
ok(!P.checkCode(SOL['r11-5'].replace('b = 0','b > 0'),E1[4]).ok,'condición invertida');
ok(!P.checkCode('Algoritmo X\n Mientras Verdadero Hacer\n x <- 1;\n FinMientras\nFinAlgoritmo',E1[0]).ok,'bucle infinito controlado');
ok(!P.checkCode('Algoritmo X\n Leer a\n Si a >\nFinAlgoritmo',E1[0]).ok,'error de sintaxis');
console.log('✓ '+n+' comprobaciones correctas');
