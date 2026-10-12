/* A1.2 · Ampliación (opcional) de P1.2 · Organigrama propio + prueba de escritorio con casos límite */
const CONF_A2 = [
  'He dibujado el <b>organigrama</b> de mi algoritmo (inicio, entradas, decisiones, bucles, salidas y fin) y lo adjunto en la tarea de Aules.',
  'He ejecutado mi código en PSeInt con los casos límite de la tabla y el resultado coincide con mi prueba de escritorio.'
];
const TPL_A2 = nombre => `Algoritmo ${nombre}\n    // 1) Dibuja primero el organigrama (papel o diagrams.net).\n    // 2) Traduce cada símbolo a una instrucción de PSeInt.\n\nFinAlgoritmo`;
window.ACTIVITY = {
  code:'A1.2', ce:'1a, 1g',
  storageKey:'falomir_pseint_2026_27_a12_v1', receiptPrefix:'UP1A2', filePrefix:'ampliacion2',
  activity:'UP1 · A1.2 · Ampliación (opcional) de P1.2 · Organigrama propio y prueba de escritorio',
  exercises:[
    {id:'a12-1', level:'Medio', title:'Año bisiesto',
      desc:'Diseña el organigrama y el algoritmo que lea un año y muestre <b>Bisiesto</b> o <b>No bisiesto</b>. Un año es bisiesto si es divisible entre 4, salvo los divisibles entre 100 que no lo sean también entre 400. Después completa la prueba de escritorio de los casos límite.',
      template:TPL_A2('Bisiesto'),
      needs:[{re:/mod\s*4\b/,msg:'Comprueba la divisibilidad entre 4 con MOD.'},{re:/mod\s*100\b/,msg:'Comprueba la divisibilidad entre 100 con MOD.'},{re:/mod\s*400\b/,msg:'Comprueba la divisibilidad entre 400 con MOD.'}],
      tests:[{in:[1900],has:['no bisiesto']},{in:[2000],has:['bisiesto'],not:['no bisiesto']},{in:[2024],has:['bisiesto'],not:['no bisiesto']},{in:[2023],has:['no bisiesto']},{in:[1600],has:['bisiesto'],not:['no bisiesto']},{in:[2100],has:['no bisiesto']}],
      desk:{intro:'Simula tu algoritmo a mano con cada año y elige el resultado.',cases:[
        {label:'Divisible entre 100 pero no entre 400',in:[1900],a:'No bisiesto',options:['Bisiesto','No bisiesto']},
        {label:'Divisible entre 400',in:[2000],a:'Bisiesto',options:['Bisiesto','No bisiesto']},
        {label:'Divisible entre 4, no entre 100',in:[2024],a:'Bisiesto',options:['Bisiesto','No bisiesto']},
        {label:'No divisible entre 4',in:[2023],a:'No bisiesto',options:['Bisiesto','No bisiesto']}]},
      confirm:CONF_A2},
    {id:'a12-2', level:'Medio', title:'Tarifa de envío por peso',
      desc:'Lee el peso de un paquete en kg y muestra su tarifa: hasta 1 kg incluido, <b>3</b> €; más de 1 y hasta 5 kg, <b>5</b> €; más de 5 y hasta 20 kg, <b>9</b> €; más de 20 kg, <b>No admitido</b>. Si el peso es 0 o negativo, muestra <b>Peso no válido</b>. Cuidado con los límites exactos 1, 5 y 20.',
      template:TPL_A2('TarifaEnvio'),
      needs:[{re:/sino/,msg:'Falta SiNo.'},{re:{test:n=>(n.match(/\bsi\b[^\n]*entonces/g)||[]).length>=3},msg:'Necesitas varias condiciones encadenadas.'}],
      tests:[{in:[0],has:['peso no valido'],not:['no admitido']},{in:[-3],has:['peso no valido']},{in:[1],seq:[3],not:['no valido','no admitido']},{in:[1.5],seq:[5]},{in:[5],seq:[5],not:['no admitido']},{in:[5.5],seq:[9]},{in:[20],seq:[9],not:['no admitido']},{in:[20.5],has:['no admitido']},{in:[21],has:['no admitido'],not:['no valido']}],
      desk:{intro:'Elige la salida que produce tu algoritmo con cada peso.',cases:[
        {label:'Peso nulo',in:[0],a:'Peso no válido',options:['3 €','5 €','9 €','Peso no válido','No admitido']},
        {label:'Límite del primer tramo',in:[1],a:'3 €',options:['3 €','5 €','9 €','Peso no válido','No admitido']},
        {label:'Límite del segundo tramo',in:[5],a:'5 €',options:['3 €','5 €','9 €','Peso no válido','No admitido']},
        {label:'Límite del tercer tramo',in:[20],a:'9 €',options:['3 €','5 €','9 €','Peso no válido','No admitido']},
        {label:'Justo por encima del máximo',in:[21],a:'No admitido',options:['3 €','5 €','9 €','Peso no válido','No admitido']}]},
      confirm:CONF_A2},
    {id:'a12-3', level:'Medio', title:'Descuento por tramos',
      desc:'Lee el importe de una compra y muestra el importe final: menos de 50 €, sin descuento; de 50 € a menos de 100 €, 5 % de descuento; 100 € o más, 10 %. Si el importe es 0 o negativo, muestra <b>Importe no válido</b>. Completa la prueba de escritorio con los límites de cada tramo.',
      template:TPL_A2('DescuentoTramos'),
      needs:[{re:/sino/,msg:'Falta SiNo.'},{re:{test:n=>(n.match(/\bsi\b[^\n]*entonces/g)||[]).length>=3},msg:'Necesitas varias condiciones encadenadas.'}],
      tests:[{in:[0],has:['importe no valido']},{in:[-5],has:['importe no valido']},{in:[49],seq:[49]},{in:[50],seq:[47.5]},{in:[99],seq:[94.05]},{in:[100],seq:[90]},{in:[200],seq:[180]}],
      desk:{intro:'Escribe el importe final (en €) que produce tu algoritmo con cada importe.',col:'Importe final',cases:[
        {label:'Último importe sin descuento',in:[49],a:49},
        {label:'Primer importe con el 5 %',in:[50],a:47.5},
        {label:'Último importe con el 5 %',in:[99],a:94.05},
        {label:'Primer importe con el 10 %',in:[100],a:90}]},
      confirm:CONF_A2},
    {id:'a12-4', level:'Reto', title:'Contar las cifras de un número',
      desc:'Lee un entero N ≥ 0 y muestra cuántas cifras tiene, dividiendo entre 10 dentro de un bucle. Caso límite: el 0 tiene <b>1</b> cifra (¡el bucle por sí solo daría 0!). Diseña el organigrama con su bucle y su caso especial.',
      template:TPL_A2('ContarCifras'),
      needs:[{re:/mientras|repetir|\bpara\b/,msg:'Necesitas un bucle.'},{re:/trunc|redon|\/\s*10/,msg:'Divide entre 10 (con trunc) dentro del bucle.'}],
      tests:[{in:[0],seq:[1]},{in:[7],seq:[1]},{in:[9],seq:[1]},{in:[10],seq:[2]},{in:[100],seq:[3]},{in:[12345],seq:[5]},{in:[99999],seq:[5]}],
      desk:{intro:'Escribe cuántas cifras muestra tu algoritmo.',col:'Cifras mostradas',cases:[
        {label:'Caso límite: cero',in:[0],a:1},
        {label:'Última con una cifra',in:[9],a:1},
        {label:'Primera con dos cifras',in:[10],a:2},
        {label:'Mayor de cinco cifras',in:[99999],a:5}]},
      confirm:CONF_A2},
    {id:'a12-5', level:'Reto', title:'Media con centinela',
      desc:'Lee notas (0 a 10) hasta que el usuario escriba <b>-1</b> (el -1 no cuenta como nota). Muestra la media. Si la primera entrada ya es -1, muestra <b>Sin notas</b> en lugar de dividir entre cero. Dibuja el organigrama con el bucle de lectura y la decisión final.',
      template:TPL_A2('MediaCentinela'),
      needs:[{re:/mientras|repetir/,msg:'Necesitas un bucle Mientras o Repetir.'},{re:/sino|\bsi\b/,msg:'Necesitas una decisión para el caso sin notas.'}],
      tests:[{in:[-1],has:['sin notas'],reads:1},{in:[10,-1],seq:[10],not:['sin notas']},{in:[0,10,-1],seq:[5]},{in:[7,8,9,-1],seq:[8]},{in:[4,6,9,-1],seq:[6.33]},{in:[0,-1],seq:[0],not:['sin notas']}],
      desk:{intro:'Entradas en el orden en que se escriben. Escribe lo que muestra tu algoritmo (un número o el texto Sin notas).',col:'Salida',cases:[
        {label:'Sin ninguna nota',in:[-1],a:'Sin notas'},
        {label:'Una sola nota',in:[10,-1],a:10},
        {label:'Dos notas extremas',in:[0,10,-1],a:5},
        {label:'Tres notas',in:[4,6,9,-1],a:6.33}]},
      confirm:CONF_A2}
  ]
};
