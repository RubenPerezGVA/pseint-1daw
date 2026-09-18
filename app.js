const STORAGE_KEY = 'falomir_pseint_2026_27_v1';

const exercises = [
  {id:1, block:'01 · Escribir', level:'Base', title:'Hola mundo', desc:'Crea tu primer algoritmo y muestra exactamente el mensaje “Hola mundo”.', example:'Salida esperada:\nHola mundo', hint:'Necesitas Algoritmo, una instrucción Escribir y FinAlgoritmo.', template:'Algoritmo HolaMundo\n    Escribir "Hola mundo";\nFinAlgoritmo', checks:['structure','writeHello']},
  {id:2, block:'01 · Escribir', level:'Base', title:'Preséntate', desc:'Muestra en tres líneas tu nombre, que estudias DAW y una frase sobre programación.', example:'Ejemplo:\nMe llamo Ana\nEstudio DAW\nEstoy aprendiendo programación', hint:'Utiliza tres instrucciones Escribir.', template:'Algoritmo Presentacion\n    // Escribe aquí tus tres mensajes\nFinAlgoritmo', checks:['structure','threeWrites']},
  {id:3, block:'01 · Escribir', level:'Base', title:'Dibuja con texto', desc:'Muestra un pequeño marco usando asteriscos y dentro el texto PROGRAMACIÓN.', example:'***************\n* PROGRAMACIÓN *\n***************', hint:'Con tres Escribir es suficiente.', template:'Algoritmo Marco\n\nFinAlgoritmo', checks:['structure','threeWrites','hasProgramacion']},
  {id:4, block:'01 · Escribir', level:'Base', title:'Expresiones directas', desc:'Muestra el resultado de 7 + 5 y de 10 * 3 directamente con Escribir.', example:'Salida esperada: dos resultados numéricos.', hint:'Puedes escribir operaciones dentro de Escribir.', template:'Algoritmo OperacionesDirectas\n\nFinAlgoritmo', checks:['structure','twoWrites','hasPlus','hasMultiply']},

  {id:5, block:'02 · Variables y Leer', level:'Base', title:'Saluda por su nombre', desc:'Pide el nombre del usuario y muestra un saludo utilizando una variable de tipo Cadena.', example:'¿Cómo te llamas?\nAna\nHola Ana', hint:'Define nombre Como Cadena, usa Leer nombre y después Escribir.', template:'Algoritmo Saludar\n    Definir nombre Como Cadena;\n\nFinAlgoritmo', checks:['structure','defNombreCadena','readNombre','writeNombre']},
  {id:6, block:'02 · Variables y Leer', level:'Base', title:'Nombre y edad', desc:'Pide nombre y edad y muestra ambos datos en una frase final.', example:'Hola Ana, tienes 18 años.', hint:'Necesitas una Cadena y un Entero, y dos instrucciones Leer.', template:'Algoritmo NombreEdad\n    Definir nombre Como Cadena;\n    Definir edad Como Entero;\n\nFinAlgoritmo', checks:['structure','defNombreCadena','defEdadEntero','readNombre','readEdad','writeNombre','writeEdad']},
  {id:7, block:'02 · Variables y Leer', level:'Base', title:'Suma de dos números', desc:'Lee dos números enteros, calcula su suma en una variable resultado y muéstrala.', example:'4 y 7 → Resultado: 11', hint:'Usa resultado <- a + b.', template:'Algoritmo Suma\n    Definir a, b, resultado Como Entero;\n\nFinAlgoritmo', checks:['structure','readA','readB','assignResultPlus','writeResultado']},
  {id:8, block:'02 · Variables y Leer', level:'Base', title:'Área de un rectángulo', desc:'Pide base y altura, calcula el área y muestra el resultado.', example:'base=5, altura=3 → área=15', hint:'area <- base * altura', template:'Algoritmo AreaRectangulo\n    Definir base, altura, area Como Real;\n\nFinAlgoritmo', checks:['structure','readBase','readAltura','assignAreaMultiply','writeArea']},
  {id:9, block:'02 · Variables y Leer', level:'Medio', title:'Media de tres notas', desc:'Lee tres notas, calcula la media aritmética y muéstrala.', example:'6, 7, 8 → media=7', hint:'Suma las tres notas y divide entre 3.', template:'Algoritmo MediaNotas\n    Definir n1, n2, n3, media Como Real;\n\nFinAlgoritmo', checks:['structure','readsN123','assignMedia','writeMedia']},
  {id:10, block:'02 · Variables y Leer', level:'Medio', title:'Precio con IVA', desc:'Pide un precio sin IVA y calcula el precio final aplicando un 21 %.', example:'100 → 121', hint:'Puedes usar precioFinal <- precio * 1.21.', template:'Algoritmo PrecioIVA\n    Definir precio, precioFinal Como Real;\n\nFinAlgoritmo', checks:['structure','readPrecio','assignIva','writePrecioFinal']},

  {id:11, block:'03 · Condicionales', level:'Base', title:'Mayor de edad', desc:'Pide la edad. Si es 18 o más, muestra “Mayor de edad”. En caso contrario, “Menor de edad”.', example:'20 → Mayor de edad\n16 → Menor de edad', hint:'Si edad >= 18 Entonces ... SiNo ... FinSi', template:'Algoritmo MayorEdad\n    Definir edad Como Entero;\n    Leer edad;\n\nFinAlgoritmo', checks:['structure','hasSi','hasSiNo','hasFinSi','edad18','writeMayorMenor']},
  {id:12, block:'03 · Condicionales', level:'Base', title:'Aprobado o suspenso', desc:'Pide una nota. Si es 5 o superior, muestra “Aprobado”; si no, “Suspenso”.', example:'7 → Aprobado\n4 → Suspenso', hint:'Compara nota >= 5.', template:'Algoritmo ResultadoNota\n    Definir nota Como Real;\n    Leer nota;\n\nFinAlgoritmo', checks:['structure','hasSi','hasSiNo','hasFinSi','nota5','writeAprobadoSuspenso']},
  {id:13, block:'03 · Condicionales', level:'Medio', title:'Par o impar', desc:'Pide un número entero e indica si es par o impar.', example:'8 → Par\n7 → Impar', hint:'Usa MOD: numero MOD 2 = 0.', template:'Algoritmo ParImpar\n    Definir numero Como Entero;\n    Leer numero;\n\nFinAlgoritmo', checks:['structure','hasSi','hasSiNo','hasMod2','writeParImpar']},
  {id:14, block:'03 · Condicionales', level:'Medio', title:'Mayor de dos números', desc:'Lee dos números e indica cuál es mayor. Si son iguales, indícalo también.', example:'5 y 9 → El segundo es mayor', hint:'Puedes anidar un segundo Si dentro del SiNo.', template:'Algoritmo MayorDos\n    Definir a, b Como Real;\n    Leer a;\n    Leer b;\n\nFinAlgoritmo', checks:['structure','twoSis','hasFinSi','compareAB','mentionsIguales']},
  {id:15, block:'03 · Condicionales', level:'Medio', title:'Número positivo, negativo o cero', desc:'Lee un número e indica si es positivo, negativo o cero.', example:'-2 → Negativo\n0 → Cero', hint:'Necesitarás más de una comparación.', template:'Algoritmo SignoNumero\n    Definir numero Como Real;\n    Leer numero;\n\nFinAlgoritmo', checks:['structure','twoSis','compareZero','mentionsPosNegZero']},
  {id:16, block:'03 · Condicionales', level:'Reto', title:'Clasifica una nota', desc:'Clasifica una nota: Suspenso (<5), Aprobado (5-6.99), Notable (7-8.99) o Sobresaliente (9-10).', example:'8.2 → Notable', hint:'Usa condicionales anidados y ordena bien los límites.', template:'Algoritmo ClasificarNota\n    Definir nota Como Real;\n    Leer nota;\n\nFinAlgoritmo', checks:['structure','threeSis','mentionsGradeLabels','gradeThresholds']},

  {id:17, block:'04 · Mientras', level:'Base', title:'Del 1 al 10', desc:'Muestra los números del 1 al 10 usando Mientras.', example:'1 2 3 4 5 6 7 8 9 10', hint:'Inicializa i <- 1, repite Mientras i <= 10 e incrementa i.', template:'Algoritmo UnoADiez\n    Definir i Como Entero;\n    i <- 1;\n\nFinAlgoritmo', checks:['structure','hasMientras','hasFinMientras','whileTo10','incrementI','writeI']},
  {id:18, block:'04 · Mientras', level:'Base', title:'Cuenta atrás', desc:'Muestra una cuenta atrás desde 10 hasta 1 con Mientras.', example:'10 9 8 ... 1', hint:'Empieza en 10 y resta 1 en cada vuelta.', template:'Algoritmo CuentaAtras\n    Definir i Como Entero;\n    i <- 10;\n\nFinAlgoritmo', checks:['structure','hasMientras','hasFinMientras','whileDown','decrementI','writeI']},
  {id:19, block:'04 · Mientras', level:'Medio', title:'Suma del 1 a N', desc:'Pide N y calcula la suma 1 + 2 + ... + N utilizando Mientras.', example:'N=5 → 15', hint:'Usa un acumulador suma y un contador i.', template:'Algoritmo SumaHastaN\n    Definir n, i, suma Como Entero;\n    Leer n;\n    i <- 1;\n    suma <- 0;\n\nFinAlgoritmo', checks:['structure','hasMientras','hasFinMientras','whileToN','sumAccumulator','incrementI','writeSuma']},
  {id:20, block:'04 · Mientras', level:'Reto', title:'Pedir hasta acertar', desc:'Pide números hasta que el usuario escriba 7. Cuando ocurra, muestra “Correcto”.', example:'2, 5, 7 → Correcto', hint:'La condición de Mientras debe mantener el bucle mientras el valor sea distinto de 7.', template:'Algoritmo HastaSiete\n    Definir numero Como Entero;\n    Leer numero;\n\nFinAlgoritmo', checks:['structure','hasMientras','hasFinMientras','whileNot7','readNumeroInsideLoop','mentionsCorrecto']},

  {id:21, block:'05 · Repetir', level:'Base', title:'Repetir hasta positivo', desc:'Pide un número y repite la petición hasta que sea mayor que 0.', example:'-3, 0, 4 → termina', hint:'Usa Repetir ... Hasta Que numero > 0.', template:'Algoritmo HastaPositivo\n    Definir numero Como Real;\n\nFinAlgoritmo', checks:['structure','hasRepetir','hasHastaQue','hastaPositivo','readNumero']},
  {id:22, block:'05 · Repetir', level:'Medio', title:'Clave correcta', desc:'Pide una clave numérica hasta que sea 1234. Al acertar, muestra “Acceso permitido”.', example:'1111, 2222, 1234 → Acceso permitido', hint:'Repetir ... Hasta Que clave = 1234.', template:'Algoritmo Clave\n    Definir clave Como Entero;\n\nFinAlgoritmo', checks:['structure','hasRepetir','hasHastaQue','hastaClave1234','readClave','mentionsAcceso']},
  {id:23, block:'05 · Repetir', level:'Medio', title:'Nota válida', desc:'Pide una nota y repite hasta que esté entre 0 y 10.', example:'12, -1, 7 → termina con 7', hint:'La condición final debe comprobar los dos límites.', template:'Algoritmo NotaValida\n    Definir nota Como Real;\n\nFinAlgoritmo', checks:['structure','hasRepetir','hasHastaQue','notaRange','readNota']},

  {id:24, block:'06 · Para', level:'Base', title:'Del 1 al 10 con Para', desc:'Muestra los números del 1 al 10 utilizando Para.', example:'1 2 3 ... 10', hint:'Para i <- 1 Hasta 10 Con Paso 1 Hacer', template:'Algoritmo ParaUnoADiez\n    Definir i Como Entero;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','para1a10','writeI']},
  {id:25, block:'06 · Para', level:'Base', title:'Tabla de multiplicar', desc:'Pide un número y muestra su tabla de multiplicar del 1 al 10.', example:'n=3 → 3x1=3 ... 3x10=30', hint:'Dentro del Para muestra n * i.', template:'Algoritmo TablaMultiplicar\n    Definir i, n Como Entero;\n    Leer n;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','para1a10','multiplyNI','writeI']},
  {id:26, block:'06 · Para', level:'Medio', title:'Suma de pares del 1 al 100', desc:'Calcula la suma de los números pares entre 1 y 100 usando Para.', example:'Resultado esperado: 2550', hint:'Puedes recorrer de 2 a 100 con Paso 2 y acumular.', template:'Algoritmo SumaPares\n    Definir i, suma Como Entero;\n    suma <- 0;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','paraPares100','sumAccumulator','writeSuma']},
  {id:27, block:'06 · Para', level:'Medio', title:'Factorial', desc:'Pide un número N y calcula N! usando Para.', example:'5! = 120', hint:'Inicializa factorial <- 1 y multiplica por i en cada vuelta.', template:'Algoritmo Factorial\n    Definir n, i, factorial Como Entero;\n    Leer n;\n    factorial <- 1;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','paraToN','factorialAccumulator','writeFactorial']},

  {id:28, block:'07 · Retos finales', level:'Reto', title:'Contar positivos', desc:'Pide 5 números y cuenta cuántos son positivos.', example:'2, -1, 7, 0, 4 → 3 positivos', hint:'Usa Para y un contador que aumente cuando numero > 0.', template:'Algoritmo ContarPositivos\n    Definir i, numero, contador Como Entero;\n    contador <- 0;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','paraFive','hasSi','numeroPositive','counterIncrement','writeContador']},
  {id:29, block:'07 · Retos finales', level:'Reto', title:'Mayor de cinco números', desc:'Pide 5 números y muestra el mayor de todos.', example:'3, 9, 2, 14, 5 → 14', hint:'Guarda un valor en mayor y actualízalo cuando llegue uno superior.', template:'Algoritmo MayorCinco\n    Definir i, numero, mayor Como Real;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','paraFive','hasSi','compareNumeroMayor','assignMayor','writeMayor']},
  {id:30, block:'07 · Retos finales', level:'Reto', title:'Reto integrador', desc:'Pide N. Muestra los números del 1 a N y al final muestra su suma total.', example:'N=4 → 1 2 3 4 · Suma=10', hint:'Usa Para, Escribir y un acumulador suma.', template:'Algoritmo RetoFinal\n    Definir n, i, suma Como Entero;\n    Leer n;\n    suma <- 0;\n\nFinAlgoritmo', checks:['structure','hasPara','hasFinPara','paraToN','sumAccumulator','writeI','writeSuma']}
];

const state = loadState();
const studentName = document.querySelector('#studentName');
const list = document.querySelector('#exerciseList');
const nav = document.querySelector('#blockNav');
studentName.value = state.name || '';
studentName.addEventListener('input', () => { state.name = studentName.value; saveState(); });

function normalize(code){return code.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/“|”/g,'"').replace(/’/g,"'").replace(/\s+/g,' ')}
function rx(code, pattern){return pattern.test(normalize(code))}
function count(code, word){return (normalize(code).match(new RegExp('\\b'+word+'\\b','g'))||[]).length}

const rules = {
  structure:c=>rx(c,/\balgoritmo\b/)&&rx(c,/\bfinalgoritmo\b/),
  writeHello:c=>rx(c,/escribir[^\n;]*["']?hola mundo/i),
  threeWrites:c=>count(c,'escribir')>=3, twoWrites:c=>count(c,'escribir')>=2,
  hasProgramacion:c=>normalize(c).includes('programacion'), hasPlus:c=>c.includes('+'), hasMultiply:c=>c.includes('*'),
  defNombreCadena:c=>rx(c,/definir\s+nombre\s+como\s+cadena/), defEdadEntero:c=>rx(c,/definir[^;\n]*edad[^;\n]*como\s+entero/),
  readNombre:c=>rx(c,/leer\s+nombre/), readEdad:c=>rx(c,/leer\s+edad/), writeNombre:c=>rx(c,/escribir[^;\n]*nombre/), writeEdad:c=>rx(c,/escribir[^;\n]*edad/),
  readA:c=>rx(c,/leer\s+a\b/), readB:c=>rx(c,/leer\s+b\b/), assignResultPlus:c=>rx(c,/resultado\s*<-\s*a\s*\+\s*b/), writeResultado:c=>rx(c,/escribir[^;\n]*resultado/),
  readBase:c=>rx(c,/leer\s+base/), readAltura:c=>rx(c,/leer\s+altura/), assignAreaMultiply:c=>rx(c,/area\s*<-\s*base\s*\*\s*altura/), writeArea:c=>rx(c,/escribir[^;\n]*area/),
  readsN123:c=>['n1','n2','n3'].every(v=>rx(c,new RegExp('leer\\s+'+v+'\\b'))), assignMedia:c=>rx(c,/media\s*<-\s*\(?\s*n1\s*\+\s*n2\s*\+\s*n3\s*\)?\s*\/\s*3/), writeMedia:c=>rx(c,/escribir[^;\n]*media/),
  readPrecio:c=>rx(c,/leer\s+precio\b/), assignIva:c=>rx(c,/preciofinal\s*<-\s*precio\s*\*\s*(1[\.,]21|121\s*\/\s*100)/), writePrecioFinal:c=>rx(c,/escribir[^;\n]*preciofinal/),
  hasSi:c=>count(c,'si')>=1, twoSis:c=>count(c,'si')>=2, threeSis:c=>count(c,'si')>=3, hasSiNo:c=>count(c,'sino')>=1, hasFinSi:c=>count(c,'finsi')>=1,
  edad18:c=>rx(c,/edad\s*>?=\s*18|edad\s*>\s*17/), writeMayorMenor:c=>normalize(c).includes('mayor de edad')&&normalize(c).includes('menor de edad'),
  nota5:c=>rx(c,/nota\s*>?=\s*5/), writeAprobadoSuspenso:c=>normalize(c).includes('aprobado')&&normalize(c).includes('suspenso'),
  hasMod2:c=>rx(c,/(mod\s*\(?\s*2|%\s*2)/), writeParImpar:c=>normalize(c).includes('par')&&normalize(c).includes('impar'), compareAB:c=>rx(c,/a\s*>\s*b|b\s*>\s*a/), mentionsIguales:c=>/igual/.test(normalize(c)),
  compareZero:c=>rx(c,/numero\s*>\s*0|numero\s*<\s*0/), mentionsPosNegZero:c=>['positivo','negativo','cero'].every(x=>normalize(c).includes(x)),
  mentionsGradeLabels:c=>['suspenso','aprobado','notable','sobresaliente'].every(x=>normalize(c).includes(x)), gradeThresholds:c=>['5','7','9'].every(x=>normalize(c).includes(x)),
  hasMientras:c=>count(c,'mientras')>=1, hasFinMientras:c=>count(c,'finmientras')>=1, whileTo10:c=>rx(c,/mientras\s+i\s*<=\s*10/), incrementI:c=>rx(c,/i\s*<-\s*i\s*\+\s*1|i\s*<-\s*1\s*\+\s*i/), writeI:c=>rx(c,/escribir[^;\n]*\bi\b/),
  whileDown:c=>rx(c,/mientras\s+i\s*>?=\s*1|mientras\s+i\s*>\s*0/), decrementI:c=>rx(c,/i\s*<-\s*i\s*-\s*1/), whileToN:c=>rx(c,/mientras\s+i\s*<=\s*n/), sumAccumulator:c=>rx(c,/suma\s*<-\s*suma\s*\+\s*i|suma\s*<-\s*i\s*\+\s*suma/), writeSuma:c=>rx(c,/escribir[^;\n]*suma/),
  whileNot7:c=>rx(c,/mientras\s+numero\s*<>\s*7|mientras\s+numero\s*!=\s*7/), readNumeroInsideLoop:c=>count(c,'leer')>=2, mentionsCorrecto:c=>normalize(c).includes('correcto'),
  hasRepetir:c=>count(c,'repetir')>=1, hasHastaQue:c=>normalize(c).includes('hasta que'), hastaPositivo:c=>rx(c,/hasta que\s+numero\s*>\s*0/), readNumero:c=>rx(c,/leer\s+numero/), hastaClave1234:c=>rx(c,/hasta que\s+clave\s*=\s*1234/), readClave:c=>rx(c,/leer\s+clave/), mentionsAcceso:c=>normalize(c).includes('acceso permitido'),
  notaRange:c=>rx(c,/hasta que[^\n;]*(nota\s*>?=\s*0[^\n;]*(y|and)[^\n;]*nota\s*<=\s*10|nota\s*<=\s*10[^\n;]*(y|and)[^\n;]*nota\s*>?=\s*0)/), readNota:c=>rx(c,/leer\s+nota/),
  hasPara:c=>count(c,'para')>=1, hasFinPara:c=>count(c,'finpara')>=1, para1a10:c=>rx(c,/para\s+i\s*<-\s*1\s+hasta\s+10/), multiplyNI:c=>rx(c,/n\s*\*\s*i|i\s*\*\s*n/), paraPares100:c=>rx(c,/para\s+i\s*<-\s*2\s+hasta\s+100[^\n;]*paso\s+2/), paraToN:c=>rx(c,/para\s+i\s*<-\s*1\s+hasta\s+n/),
  factorialAccumulator:c=>rx(c,/factorial\s*<-\s*factorial\s*\*\s*i|factorial\s*<-\s*i\s*\*\s*factorial/), writeFactorial:c=>rx(c,/escribir[^;\n]*factorial/),
  paraFive:c=>rx(c,/para\s+i\s*<-\s*1\s+hasta\s+5/), numeroPositive:c=>rx(c,/numero\s*>\s*0/), counterIncrement:c=>rx(c,/contador\s*<-\s*contador\s*\+\s*1|contador\s*<-\s*1\s*\+\s*contador/), writeContador:c=>rx(c,/escribir[^;\n]*contador/),
  compareNumeroMayor:c=>rx(c,/numero\s*>\s*mayor/), assignMayor:c=>rx(c,/mayor\s*<-\s*numero/), writeMayor:c=>rx(c,/escribir[^;\n]*mayor/)
};

const ruleMessages = {
  structure:'Incluye Algoritmo ... FinAlgoritmo.', writeHello:'Debe mostrarse “Hola mundo”.', threeWrites:'Necesitas al menos 3 instrucciones Escribir.', twoWrites:'Necesitas al menos 2 instrucciones Escribir.', hasProgramacion:'Debe aparecer el texto PROGRAMACIÓN.', hasPlus:'Falta una suma (+).', hasMultiply:'Falta una multiplicación (*).',
  defNombreCadena:'Define nombre Como Cadena.', defEdadEntero:'Define edad Como Entero.', readNombre:'Falta Leer nombre.', readEdad:'Falta Leer edad.', writeNombre:'Usa nombre en un Escribir.', writeEdad:'Usa edad en un Escribir.', readA:'Falta Leer a.', readB:'Falta Leer b.', assignResultPlus:'Calcula resultado <- a + b.', writeResultado:'Muestra resultado.',
  readBase:'Falta Leer base.', readAltura:'Falta Leer altura.', assignAreaMultiply:'Calcula area <- base * altura.', writeArea:'Muestra area.', readsN123:'Lee n1, n2 y n3.', assignMedia:'Calcula media = (n1+n2+n3)/3.', writeMedia:'Muestra media.', readPrecio:'Lee precio.', assignIva:'Calcula precioFinal aplicando 21 % de IVA.', writePrecioFinal:'Muestra precioFinal.',
  hasSi:'Falta una estructura Si.', twoSis:'Necesitas al menos dos Si.', threeSis:'Necesitas varios Si anidados.', hasSiNo:'Falta SiNo.', hasFinSi:'Falta FinSi.', edad18:'Compara la edad con 18.', writeMayorMenor:'Muestra los mensajes Mayor de edad y Menor de edad.', nota5:'Compara nota con 5.', writeAprobadoSuspenso:'Incluye Aprobado y Suspenso.', hasMod2:'Usa MOD 2 para comprobar paridad.', writeParImpar:'Incluye Par e Impar.', compareAB:'Compara a y b.', mentionsIguales:'Contempla el caso de igualdad.', compareZero:'Compara el número con 0.', mentionsPosNegZero:'Contempla positivo, negativo y cero.', mentionsGradeLabels:'Incluye las cuatro clasificaciones.', gradeThresholds:'Usa los límites 5, 7 y 9.',
  hasMientras:'Falta Mientras.', hasFinMientras:'Falta FinMientras.', whileTo10:'Haz que Mientras llegue hasta 10.', incrementI:'Incrementa i en 1.', writeI:'Muestra i.', whileDown:'La condición debe permitir bajar de 10 a 1.', decrementI:'Decrementa i en 1.', whileToN:'Haz que el bucle llegue hasta N.', sumAccumulator:'Acumula con suma <- suma + i.', writeSuma:'Muestra suma.', whileNot7:'Repite mientras numero sea distinto de 7.', readNumeroInsideLoop:'Debes volver a Leer numero dentro del bucle.', mentionsCorrecto:'Muestra Correcto al terminar.',
  hasRepetir:'Falta Repetir.', hasHastaQue:'Falta Hasta Que.', hastaPositivo:'Termina cuando numero > 0.', readNumero:'Falta Leer numero.', hastaClave1234:'Termina cuando clave = 1234.', readClave:'Falta Leer clave.', mentionsAcceso:'Muestra Acceso permitido.', notaRange:'La condición final debe exigir nota entre 0 y 10.', readNota:'Falta Leer nota.',
  hasPara:'Falta Para.', hasFinPara:'Falta FinPara.', para1a10:'Configura Para desde 1 hasta 10.', multiplyNI:'Multiplica n * i.', paraPares100:'Recorre los pares hasta 100 (idealmente con Paso 2).', paraToN:'Configura Para desde 1 hasta N.', factorialAccumulator:'Multiplica factorial por i.', writeFactorial:'Muestra factorial.', paraFive:'Repite exactamente 5 veces con Para.', numeroPositive:'Comprueba numero > 0.', counterIncrement:'Incrementa contador.', writeContador:'Muestra contador.', compareNumeroMayor:'Compara numero > mayor.', assignMayor:'Actualiza mayor <- numero.', writeMayor:'Muestra mayor.'
};

function levelClass(level){return level==='Medio'?'medium':level==='Reto'?'challenge':''}
function blockDescription(block){
  const d={
    '01 · Escribir':'Primer contacto: algoritmo, salida y expresiones simples.',
    '02 · Variables y Leer':'Entrada de datos, variables, operaciones y resultados.',
    '03 · Condicionales':'Tomar decisiones con Si, SiNo y condiciones anidadas.',
    '04 · Mientras':'Repetir mientras se cumpla una condición.',
    '05 · Repetir':'Repetir al menos una vez y controlar la condición final.',
    '06 · Para':'Repeticiones con contador conocido.',
    '07 · Retos finales':'Combinar entrada, decisiones, bucles y acumuladores.'
  };return d[block]||'';
}

function render(){
  const blocks=[...new Set(exercises.map(e=>e.block))];
  nav.innerHTML=blocks.map(b=>{const total=exercises.filter(e=>e.block===b).length;const done=exercises.filter(e=>e.block===b&&state.done[e.id]).length;return `<button type="button" data-target="block-${slug(b)}">${b}<span class="count">${done}/${total}</span></button>`}).join('');
  list.innerHTML=blocks.map(b=>`<section class="block-section" id="block-${slug(b)}"><div class="block-heading"><div><h2>${b}</h2><p>${blockDescription(b)}</p></div></div>${exercises.filter(e=>e.block===b).map(renderExercise).join('')}</section>`).join('');
  attachEvents(); updateProgress();
}
function renderExercise(e){
  const saved=(state.code[e.id]??e.template).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<article class="exercise ${state.done[e.id]?'done':''}" data-id="${e.id}">
    <div class="exercise-head"><div><div class="exercise-num">Ejercicio ${String(e.id).padStart(2,'0')} <span class="badge ${levelClass(e.level)}">${e.level}</span></div><h3>${e.title}</h3><p class="exercise-desc">${e.desc}</p></div><span class="status-pill">${state.done[e.id]?'✓ Superado':'Pendiente'}</span></div>
    <div class="example-box">${e.example}</div>
    <div class="editor-wrap"><div class="editor-toolbar"><span>PSeInt</span><button type="button" data-copy="${e.id}">Copiar código</button></div><textarea class="code-editor" spellcheck="false" data-editor="${e.id}">${saved}</textarea></div>
    <div class="exercise-actions"><button class="btn primary" type="button" data-validate="${e.id}">Validar ejercicio</button><button class="btn ghost" type="button" data-hint="${e.id}">Ver pista</button><a class="btn ghost" href="https://www.pseint-web.app/" target="_blank" rel="noopener">Probar en PSeInt Web ↗</a></div>
    <div class="hint" data-hintbox="${e.id}"><b>Pista:</b> ${e.hint}</div><div class="feedback" data-feedback="${e.id}"></div>
  </article>`
}
function attachEvents(){
  document.querySelectorAll('[data-editor]').forEach(el=>el.addEventListener('input',()=>{state.code[el.dataset.editor]=el.value;saveState()}));
  document.querySelectorAll('[data-validate]').forEach(b=>b.addEventListener('click',()=>validateExercise(Number(b.dataset.validate))));
  document.querySelectorAll('[data-hint]').forEach(b=>b.addEventListener('click',()=>{document.querySelector(`[data-hintbox="${b.dataset.hint}"]`).classList.toggle('show')}));
  document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const ed=document.querySelector(`[data-editor="${b.dataset.copy}"]`);await navigator.clipboard.writeText(ed.value);b.textContent='Copiado ✓';setTimeout(()=>b.textContent='Copiar código',1200)}));
  nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.target).scrollIntoView({behavior:'smooth',block:'start'})));
}
function validateExercise(id){
  const e=exercises.find(x=>x.id===id); const ed=document.querySelector(`[data-editor="${id}"]`); const code=ed.value; state.code[id]=code;
  const missing=e.checks.filter(k=>!rules[k](code)); const fb=document.querySelector(`[data-feedback="${id}"]`); fb.className='feedback show';
  if(missing.length===0){state.done[id]=true;fb.classList.add('ok');fb.innerHTML='<b>✓ Ejercicio superado.</b> La solución contiene los elementos necesarios.'}
  else{state.done[id]=false;fb.classList.add('error');fb.innerHTML='<b>Aún no está correcto.</b><br>'+missing.slice(0,4).map(k=>'• '+(ruleMessages[k]||k)).join('<br>')+(missing.length>4?'<br>• Revisa también el resto de requisitos.':'')}
  saveState(); const article=document.querySelector(`.exercise[data-id="${id}"]`);article.classList.toggle('done',!!state.done[id]);article.querySelector('.status-pill').textContent=state.done[id]?'✓ Superado':'Pendiente'; updateProgress(); renderNavCounts();
}
function renderNavCounts(){
  const blocks=[...new Set(exercises.map(e=>e.block))]; nav.querySelectorAll('button').forEach((btn,i)=>{const b=blocks[i];const total=exercises.filter(e=>e.block===b).length;const done=exercises.filter(e=>e.block===b&&state.done[e.id]).length;btn.querySelector('.count').textContent=`${done}/${total}`})
}
function updateProgress(){
  const done=exercises.filter(e=>state.done[e.id]).length, total=exercises.length, pct=Math.round(done/total*100);
  document.querySelector('#progressText').textContent=`${done} / ${total}`; document.querySelector('#progressPercent').textContent=`${pct} % completado`; document.querySelector('#progressBar').style.width=pct+'%';
  const hint=document.querySelector('#finishHint'); if(done===total){hint.textContent='✓ Todos los ejercicios están validados. Ya puedes generar el justificante.';hint.classList.add('ready')}else{hint.textContent=`Te faltan ${total-done} ejercicio${total-done===1?'':'s'} por validar.`;hint.classList.remove('ready')}
}
function slug(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
function loadState(){try{const s=JSON.parse(localStorage.getItem(STORAGE_KEY));return {name:s?.name||'',done:s?.done||{},code:s?.code||{}}}catch{return {name:'',done:{},code:{}}}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function simpleHash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16).toUpperCase().padStart(8,'0')}

function computeGrade(done,total){return Math.round((done/total*10)*100)/100}
function exerciseBreakdown(){
  return exercises.map(e=>({id:e.id,block:e.block,title:e.title,ok:!!state.done[e.id]}))
}
function renderExerciseRows(list){
  return list.map(e=>`<tr><td>${e.id}</td><td>${escapeHtml(e.block)}</td><td>${escapeHtml(e.title)}</td><td class="${e.ok?'state-ok':'state-bad'}">${e.ok?'✓ Superado':'✗ Pendiente'}</td></tr>`).join('')
}
function finalize(){
  const name = studentName.value.trim();
  const done = exercises.filter(e => state.done[e.id]).length;
  const total = exercises.length;
  const pct = Math.round(done / total * 100);
  const grade = computeGrade(done,total);
  const breakdown = exerciseBreakdown();

  if(!name){
    studentName.focus();
    alert('Escribe tu nombre y apellidos antes de finalizar.');
    return;
  }

  const now = new Date();

  const when = now.toLocaleString('es-ES',{
    dateStyle:'long',
    timeStyle:'short'
  });

  const code = 'FAL-' + simpleHash(
    `${name}|${now.toISOString()}|${done}|${total}`
  );

  document.querySelector('#rName').textContent = name;

  document.querySelector('#rScore').textContent =
    `${done} / ${total} (${pct} %)`;

  document.querySelector('#rGrade').textContent = `${grade.toFixed(2)} / 10`;

  document.querySelector('#rDate').textContent = when;

  document.querySelector('#rCode').textContent = code;

  document.querySelector('#rExerciseList').innerHTML = renderExerciseRows(breakdown);

  state.lastReceipt = {
    name,
    when,
    code,
    iso: now.toISOString(),
    done,
    total,
    pct,
    grade,
    breakdown
  };

  saveState();

  document.querySelector('#receiptModal').hidden = false;
}
function downloadReceipt(){
  const r=state.lastReceipt;if(!r)return;
  const rows=renderExerciseRows(r.breakdown||[]);
  const html=`<!doctype html><meta charset="utf-8"><title>Justificante PSeInt</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;color:#14213d}section{border:2px solid #dbe5f2;border-radius:16px;padding:28px}h1{margin-top:0}.g{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g div{background:#f6f8fb;padding:14px;border-radius:10px}.g span,.g strong{display:block}.g span{color:#66758c;font-size:12px;margin-bottom:4px}.code{letter-spacing:2px;font-family:monospace}.note{font-size:12px;color:#66758c;margin-top:22px}table{width:100%;border-collapse:collapse;margin-top:20px;font-size:13px}th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #e5eaf2}th{color:#66758c;font-size:11px;text-transform:uppercase}td.ok{color:#148a5b;font-weight:700}td.bad{color:#c83f49;font-weight:700}@media print{body{margin:0;max-width:none}}</style><section><h1>Justificante de finalización</h1><p>IES Álvaro Falomir · 1.º DAW · Curso 2026/27</p><div class="g"><div><span>Alumno/a</span><strong>${escapeHtml(r.name)}</strong></div><div><span>Actividad</span><strong>PSeInt · Fundamentos</strong></div><div><span>Ejercicios superados</span><strong>${r.done} / ${r.total} (${r.pct} %)</strong></div><div><span>Nota</span><strong>${r.grade.toFixed(2)} / 10</strong></div><div><span>Fecha y hora</span><strong>${escapeHtml(r.when)}</strong></div><div style="grid-column:1/-1"><span>Código de verificación</span><strong class="code">${r.code}</strong></div></div><table><thead><tr><th>Nº</th><th>Bloque</th><th>Ejercicio</th><th>Estado</th></tr></thead><tbody>${rows.replace(/class="state-ok"/g,'class="ok"').replace(/class="state-bad"/g,'class="bad"')}</tbody></table><p class="note">Generado por la web de prácticas en el navegador del alumno. No constituye firma digital ni sustituye al registro del aula virtual.</p></section>`;
  const blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`justificante_pseint_${safeFileName(r.name)}.html`;a.click();URL.revokeObjectURL(url)
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function safeFileName(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'').toLowerCase()||'alumno'}

document.querySelector('#finishBtn').addEventListener('click',finalize);document.querySelector('#printReceiptBtn').addEventListener('click',()=>window.print());document.querySelector('#downloadReceiptBtn').addEventListener('click',downloadReceipt);
document.querySelectorAll('[data-close-modal]').forEach(x=>x.addEventListener('click',()=>document.querySelector('#receiptModal').hidden=true));
document.querySelector('#resetBtn').addEventListener('click',()=>{if(confirm('¿Seguro que quieres borrar todo el progreso y el código guardado en este navegador?')){localStorage.removeItem(STORAGE_KEY);location.reload()}});

render();
