/* R1.2 · Refuerzo (opcional) de P1.2 · Trazas en tabla de variables de algoritmos resueltos */
const CONF_R2 = 'He ejecutado este algoritmo <b>paso a paso en PSeInt</b> (con los mismos datos), he comparado la evolución de las variables con mi tabla y coincide.';
window.ACTIVITY = {
  code:'R1.2', ce:'1a, 1d',
  storageKey:'falomir_pseint_2026_27_r12_v1', receiptPrefix:'UP1R2', filePrefix:'refuerzo2',
  activity:'UP1 · R1.2 · Refuerzo (opcional) de P1.2 · Trazas con tabla de variables',
  exercises:[
    {id:'r12-1', level:'Base', title:'Traza 1 · Factorial de 4 con Para',
      desc:'Algoritmo ya resuelto. Anota el valor de <b>i</b> y de <b>fact</b> al final de cada vuelta (las casillas con — aún no tienen valor). Después, contrasta tu tabla con la ejecución paso a paso de PSeInt.',
      show:'Algoritmo Factorial\n    Definir i, fact Como Entero;\n    fact <- 1;\n    Para i <- 1 Hasta 4 Hacer\n        fact <- fact * i;\n    FinPara\n    Escribir fact;\nFinAlgoritmo',
      trace:{cols:['i','fact'],rows:[{label:'Antes del bucle',v:[null,1]},{label:'Vuelta 1',v:[1,1]},{label:'Vuelta 2',v:[2,2]},{label:'Vuelta 3',v:[3,6]},{label:'Vuelta 4',v:[4,24]}],out:{q:'¿Qué muestra el Escribir final?',a:24}},
      confirm:[CONF_R2], solution:true, okMsg:'Has seguido bien la ejecución del Para.',
      hints:['En un Para, i toma automáticamente los valores 1, 2, 3 y 4: no hay que incrementarlo.','fact se multiplica por el valor de i de esa vuelta.']},
    {id:'r12-2', level:'Base', title:'Traza 2 · Mayor de tres números',
      desc:'El usuario escribe <b>7</b>, <b>12</b> y <b>9</b> cuando se ejecuta Leer. Anota las variables después de cada instrucción señalada.',
      show:'Algoritmo MayorDeTres\n    Definir a, b, c, mayor Como Entero;\n    Leer a, b, c;\n    mayor <- a;\n    Si b > mayor Entonces\n        mayor <- b;\n    FinSi\n    Si c > mayor Entonces\n        mayor <- c;\n    FinSi\n    Escribir mayor;\nFinAlgoritmo',
      trace:{cols:['a','b','c','mayor'],rows:[{label:'Tras Leer a, b, c',v:[7,12,9,null]},{label:'Tras mayor <- a',v:[7,12,9,7]},{label:'Tras el 1.er Si (b > mayor)',v:[7,12,9,12]},{label:'Tras el 2.º Si (c > mayor)',v:[7,12,9,12]}],out:{q:'¿Qué muestra el Escribir final?',a:12}},
      confirm:[CONF_R2], solution:true, okMsg:'Has seguido bien las dos decisiones.',
      hints:['Un Si cuya condición es falsa no cambia ninguna variable.','En el segundo Si compara 9 con el valor de mayor en ese momento, no con a.']},
    {id:'r12-3', level:'Medio', title:'Traza 3 · Suma de las cifras de 507',
      desc:'Anota <b>n</b> y <b>suma</b> al final de cada vuelta del Mientras. Recuerda: <b>trunc</b> descarta los decimales y <b>MOD</b> da el resto de la división.',
      show:'Algoritmo SumaCifras\n    Definir n, suma Como Entero;\n    n <- 507;\n    suma <- 0;\n    Mientras n > 0 Hacer\n        suma <- suma + n MOD 10;\n        n <- trunc(n / 10);\n    FinMientras\n    Escribir suma;\nFinAlgoritmo',
      trace:{cols:['n','suma'],rows:[{label:'Antes del bucle',v:[507,0]},{label:'Vuelta 1',v:[50,7]},{label:'Vuelta 2',v:[5,7]},{label:'Vuelta 3',v:[0,12]}],out:{q:'¿Qué muestra el Escribir final?',a:12}},
      confirm:[CONF_R2], solution:true, okMsg:'Has seguido bien el bucle con MOD y trunc.',
      hints:['507 MOD 10 = 7 y trunc(507 / 10) = 50.','El bucle termina cuando la condición n > 0 deja de cumplirse (n = 0).']},
    {id:'r12-4', level:'Medio', title:'Traza 4 · Serie de Fibonacci con Repetir',
      desc:'Anota el número que se escribe en cada vuelta y cómo quedan las variables al final de la vuelta (después de incrementar k).',
      show:'Algoritmo Fibonacci\n    Definir a, b, c, k Como Entero;\n    a <- 0;\n    b <- 1;\n    k <- 1;\n    Repetir\n        Escribir a;\n        c <- a + b;\n        a <- b;\n        b <- c;\n        k <- k + 1;\n    Hasta Que k > 6\nFinAlgoritmo',
      trace:{cols:['Escribe','a','b','c','k'],rows:[{label:'Antes del bucle',v:[null,0,1,null,1]},{label:'Vuelta 1',v:[0,1,1,1,2]},{label:'Vuelta 2',v:[1,1,2,2,3]},{label:'Vuelta 3',v:[1,2,3,3,4]},{label:'Vuelta 4',v:[2,3,5,5,5]},{label:'Vuelta 5',v:[3,5,8,8,6]},{label:'Vuelta 6',v:[5,8,13,13,7]}],out:{q:'¿Cuál es el último número que escribe el algoritmo?',a:5}},
      confirm:[CONF_R2], solution:true, okMsg:'Has seguido bien el Repetir ... Hasta Que.',
      hints:['Escribir a se ejecuta con el valor de a <b>antes</b> de actualizarla.','El bucle sale cuando k > 6, es decir, tras la vuelta en la que k pasa a valer 7.']},
    {id:'r12-5', level:'Medio', title:'Traza 5 · Tarifa de aparcamiento',
      desc:'El usuario escribe <b>130</b> minutos. Anota las variables tras cada instrucción señalada.',
      show:'Algoritmo Aparcamiento\n    Definir minutos, horas, precio Como Entero;\n    Leer minutos;\n    horas <- trunc(minutos / 60);\n    Si minutos MOD 60 > 0 Entonces\n        horas <- horas + 1;\n    FinSi\n    Si horas <= 1 Entonces\n        precio <- 2;\n    SiNo\n        precio <- 2 + (horas - 1) * 1;\n    FinSi\n    Escribir precio;\nFinAlgoritmo',
      trace:{cols:['minutos','horas','precio'],rows:[{label:'Tras Leer minutos',v:[130,null,null]},{label:'Tras horas <- trunc(...)',v:[130,2,null]},{label:'Tras el 1.er Si',v:[130,3,null]},{label:'Tras el 2.º Si / SiNo',v:[130,3,4]}],out:{q:'¿Qué muestra el Escribir final?',a:4}},
      confirm:[CONF_R2], solution:true, okMsg:'Has seguido bien las dos decisiones.',
      hints:['130 MOD 60 = 10, que es mayor que 0: se cobra la hora empezada.','Con 3 horas, la condición horas <= 1 es falsa y se ejecuta el SiNo.']}
  ]
};
