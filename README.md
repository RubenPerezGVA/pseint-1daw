# Programación · 1.º DAW · PSeInt

Material para el IES Álvaro Falomir, curso 2026/27.

## Unidad de programación

**UP1 · Introducción a la programación: PSeInt, algoritmos, trazas y organigramas** · 16 h · 09/09/2026 – 24/09/2026 · 1.ª evaluación · RA1.

| Práctica | Página | Contenido | CE (RA1) |
|---|---|---|---|
| P1.1 | `index.html` | Batería de 30 ejercicios autocorregibles de PSeInt (web autovalidada + justificante) | a, d, e, g, i |
| P1.2 | `trazas-organigramas.html` | Trazas y organigramas / diagramas de flujo (web autovalidada + justificante) | a, d, g |

Evaluación (según la programación didáctica): las prácticas se califican **Apto / No apto** y pesan un **10 %** de la nota de la evaluación; el examen de la 1.ª evaluación pesa un **90 %**. Los justificantes de las webs no son una calificación. Refuerzo y ampliación son opcionales y no tienen nota.

## Contenido

- 30 ejercicios progresivos de PSeInt, sin vectores.
- Bloques de salida, entrada, variables, operaciones, condicionales, `Mientras`, `Repetir`, `Para` y retos combinados.
- Autovalidación didáctica del pseudocódigo.
- Guardado de código y progreso en `localStorage`.
- Nombre y apellidos del alumnado.
- Justificante final imprimible / guardable como PDF.
- Guía web de algoritmos, pseudocódigo, trazas y diagramas de flujo.
- Guía didáctica en PDF.
- Enlace directo a PSeInt Web.

## Autor del material didáctico

Rubén Pérez Ibáñez.

## Publicación en GitHub Pages

Consulta `PUBLICAR_GITHUB_PAGES.md`. La opción más sencilla es publicar desde la rama `main`, carpeta `/(root)`.

## Importante sobre la autovalidación

La validación analiza la estructura del pseudocódigo y los elementos que requiere cada ejercicio. No integra un intérprete completo de PSeInt y, por tanto, está pensada como feedback didáctico inmediato, no como sistema antifraude ni como calificación oficial.

## Justificante

El justificante se genera localmente en el navegador. Su código permite identificar una generación concreta, pero no constituye una firma digital ni un registro remoto de entrega.

## Refuerzo y ampliación (opcionales)

Cuatro actividades **opcionales y sin nota**, independientes de las prácticas, que trabajan el mismo RA1 («Reconoce la estructura de un programa informático, identificando y relacionando los elementos propios del lenguaje de programación utilizado»). Portada: `refuerzo-ampliacion.html` (enlazada desde `index.html` y `trazas-organigramas.html`). Cada una tiene su propia página, su autovalidación, su progreso en `localStorage` (claves propias) y su justificante en PDF.

| Código | Página | Práctica | Contenido | CE |
|---|---|---|---|---|
| R1.1 | `refuerzo1.html` | P1.1 | 6 ejercicios guiados con pistas (secuenciales y condicionales sencillos) | 1a, 1d, 1e |
| A1.1 | `ampliacion1.html` | P1.1 | 5 retos de algoritmos sin plantilla | 1a, 1e, 1g |
| R1.2 | `refuerzo2.html` | P1.2 | 5 trazas en tabla de variables, contrastadas con PSeInt paso a paso | 1a, 1d |
| A1.2 | `ampliacion2.html` | P1.2 | 5 organigramas propios con prueba de escritorio de casos límite | 1a, 1g |

Ficheros: `pseint-mini.js` (mini intérprete de PSeInt que ejecuta el algoritmo del alumno con casos de prueba), `extras-core.js` (motor común: render, validación, progreso y PDF), `extras.css` y un fichero de datos por actividad (`refuerzo1.js`, `ampliacion1.js`, `refuerzo2.js`, `ampliacion2.js`). Las prácticas P1.1 y P1.2 (`app.js`, `trazas.js`) no se han modificado.

Pruebas: `node tests/extras.test.js` comprueba que la solución de referencia (`tests/solutions.js`, no publicada en las páginas) completa cada ejercicio y que las plantillas vacías no.
