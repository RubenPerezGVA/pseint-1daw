/* Soluciones de referencia de las actividades opcionales (solo para los tests; no se publican en las páginas). */
module.exports = {
'r11-1':`Algoritmo PerimetroRectangulo
    Definir base, altura, perimetro Como Real;
    Escribir "Base:";
    Leer base;
    Escribir "Altura:";
    Leer altura;
    perimetro <- 2 * (base + altura);
    Escribir "Perimetro: ", perimetro;
FinAlgoritmo`,
'r11-2':`Algoritmo CelsiusAFahrenheit
    Definir celsius, fahrenheit Como Real;
    Escribir "Grados Celsius:";
    Leer celsius;
    fahrenheit <- celsius * 9 / 5 + 32;
    Escribir fahrenheit, " F";
FinAlgoritmo`,
'r11-3':`Algoritmo Intercambio
    Definir a, b, aux Como Entero;
    Leer a;
    Leer b;
    aux <- a;
    a <- b;
    b <- aux;
    Escribir a, " ", b;
FinAlgoritmo`,
'r11-4':`Algoritmo DescuentoCompra
    Definir importe, final Como Real;
    Leer importe;
    final <- importe;
    Si importe >= 100 Entonces
        final <- importe - importe * 10 / 100;
    FinSi
    Escribir "Importe final: ", final;
FinAlgoritmo`,
'r11-5':`Algoritmo DivisionSegura
    Definir a, b Como Real;
    Leer a;
    Leer b;
    Si b = 0 Entonces
        Escribir "No se puede dividir entre cero";
    SiNo
        Escribir a / b;
    FinSi
FinAlgoritmo`,
'r11-6':`Algoritmo Ropa
    Definir temperatura Como Real;
    Leer temperatura;
    Si temperatura >= 30 Entonces
        Escribir "Calor";
    SiNo
        Si temperatura <= 10 Entonces
            Escribir "Frío";
        SiNo
            Escribir "Agradable";
        FinSi
    FinSi
FinAlgoritmo`,
'a11-1':`Algoritmo Reloj
    Definir seg, h, m, s Como Entero;
    Leer seg;
    h <- trunc(seg / 3600);
    m <- trunc((seg MOD 3600) / 60);
    s <- seg MOD 60;
    Escribir h, " h ", m, " min ", s, " s";
FinAlgoritmo`,
'a11-2':`Algoritmo Triangulo
    Definir a, b, c Como Real;
    Leer a, b, c;
    Si a >= b + c O b >= a + c O c >= a + b Entonces
        Escribir "No es un triángulo";
    SiNo
        Si a = b Y b = c Entonces
            Escribir "Equilátero";
        SiNo
            Si a = b O b = c O a = c Entonces
                Escribir "Isósceles";
            SiNo
                Escribir "Escaleno";
            FinSi
        FinSi
    FinSi
FinAlgoritmo`,
'a11-3':`Algoritmo FizzBuzz
    Definir n, i Como Entero;
    Leer n;
    Para i <- 1 Hasta n Hacer
        Si i MOD 15 = 0 Entonces
            Escribir "FizzBuzz";
        SiNo
            Si i MOD 3 = 0 Entonces
                Escribir "Fizz";
            SiNo
                Si i MOD 5 = 0 Entonces
                    Escribir "Buzz";
                SiNo
                    Escribir i;
                FinSi
            FinSi
        FinSi
    FinPara
FinAlgoritmo`,
'a11-4':`Algoritmo Primo
    Definir n, d Como Entero;
    Definir esPrimo Como Logico;
    Leer n;
    Si n < 2 Entonces
        Escribir "No válido";
    SiNo
        esPrimo <- Verdadero;
        d <- 2;
        Mientras esPrimo Y d * d <= n Hacer
            Si n MOD d = 0 Entonces
                esPrimo <- Falso;
            FinSi
            d <- d + 1;
        FinMientras
        Si esPrimo Entonces
            Escribir "Primo";
        SiNo
            Escribir "Compuesto";
        FinSi
    FinSi
FinAlgoritmo`,
'a11-5':`Algoritmo Cambio
    Definir e Como Entero;
    Leer e;
    Escribir trunc(e / 50);
    e <- e MOD 50;
    Escribir trunc(e / 20);
    e <- e MOD 20;
    Escribir trunc(e / 10);
    e <- e MOD 10;
    Escribir trunc(e / 5);
    e <- e MOD 5;
    Escribir trunc(e / 2);
    e <- e MOD 2;
    Escribir e;
FinAlgoritmo`,
'a12-1':`Algoritmo Bisiesto
    Definir anio Como Entero;
    Leer anio;
    Si (anio MOD 4 = 0 Y anio MOD 100 <> 0) O anio MOD 400 = 0 Entonces
        Escribir "Bisiesto";
    SiNo
        Escribir "No bisiesto";
    FinSi
FinAlgoritmo`,
'a12-2':`Algoritmo TarifaEnvio
    Definir peso Como Real;
    Leer peso;
    Si peso <= 0 Entonces
        Escribir "Peso no válido";
    SiNo
        Si peso <= 1 Entonces
            Escribir "Tarifa: 3";
        SiNo
            Si peso <= 5 Entonces
                Escribir "Tarifa: 5";
            SiNo
                Si peso <= 20 Entonces
                    Escribir "Tarifa: 9";
                SiNo
                    Escribir "No admitido";
                FinSi
            FinSi
        FinSi
    FinSi
FinAlgoritmo`,
'a12-3':`Algoritmo DescuentoTramos
    Definir importe, final Como Real;
    Leer importe;
    Si importe <= 0 Entonces
        Escribir "Importe no válido";
    SiNo
        Si importe < 50 Entonces
            final <- importe;
        SiNo
            Si importe < 100 Entonces
                final <- importe - importe * 5 / 100;
            SiNo
                final <- importe - importe * 10 / 100;
            FinSi
        FinSi
        Escribir "Importe final: ", final;
    FinSi
FinAlgoritmo`,
'a12-4':`Algoritmo ContarCifras
    Definir n, cifras Como Entero;
    Leer n;
    Si n = 0 Entonces
        cifras <- 1;
    SiNo
        cifras <- 0;
        Mientras n > 0 Hacer
            n <- trunc(n / 10);
            cifras <- cifras + 1;
        FinMientras
    FinSi
    Escribir "Cifras: ", cifras;
FinAlgoritmo`,
'a12-5':`Algoritmo MediaCentinela
    Definir nota, suma Como Real;
    Definir cuenta Como Entero;
    suma <- 0;
    cuenta <- 0;
    Leer nota;
    Mientras nota <> -1 Hacer
        suma <- suma + nota;
        cuenta <- cuenta + 1;
        Leer nota;
    FinMientras
    Si cuenta = 0 Entonces
        Escribir "Sin notas";
    SiNo
        Escribir "Media: ", suma / cuenta;
    FinSi
FinAlgoritmo`
};
