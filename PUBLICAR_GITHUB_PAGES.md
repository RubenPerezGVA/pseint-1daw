# Publicar la web en GitHub Pages

Esta carpeta ya está preparada para publicarse como sitio estático. El archivo principal es `index.html` y se incluye `.nojekyll` para que GitHub Pages sirva los archivos tal cual.

## Opción recomendada: publicar desde la rama `main`

1. En GitHub, crea un repositorio nuevo, por ejemplo `pseint-1daw`.
2. Sube **el contenido de esta carpeta a la raíz del repositorio**. `index.html` debe quedar en la raíz, no dentro de otra carpeta adicional.
3. En el repositorio abre **Settings**.
4. En la barra lateral entra en **Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Selecciona la rama **main** y la carpeta **/(root)**.
7. Pulsa **Save**.
8. Espera al despliegue. GitHub mostrará la URL de la web en la misma sección Pages.

La URL habitual será:

`https://TU-USUARIO.github.io/pseint-1daw/`

## Actualizar la web

Cada vez que cambies un archivo y hagas `commit` + `push` a `main`, GitHub Pages volverá a publicar el sitio.

## Estructura importante

- `index.html` - ejercicios autocorregibles.
- `app.js` - ejercicios, validación, progreso y justificante.
- `styles.css` - diseño de la página de ejercicios.
- `guia.html` - guía web de algoritmos, pseudocódigo y diagramas.
- `guia.css` - diseño de la guía.
- `docs/Guia_Algoritmos_PSeInt_1DAW.pdf` - guía en PDF.
- `.nojekyll` - evita que Jekyll procese el sitio.

## Nota sobre el justificante

El progreso y el justificante se generan en el navegador mediante `localStorage`. GitHub Pages no guarda resultados en un servidor. Si más adelante se quiere que el profesor pueda verificar entregas de forma centralizada, habrá que añadir un servicio externo o backend.
