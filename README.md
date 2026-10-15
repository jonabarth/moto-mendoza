# En dos ruedas · Mendoza

Sitio estático para practicar el teórico de moto, con 383 preguntas y 221 fichas de señales, símbolos o demarcaciones (376 preguntas con el filtro inicial de Mendoza y temas comunes). Sin instalación, backend, claves ni compilación. Incluye corrección inmediata con explicación y fuente, preguntas de Mendoza y Nación diferenciadas, imágenes locales, temas, simulacro de hasta 40 preguntas, repaso de errores y favoritos.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub (o usá uno existente).
2. Subí **el contenido de esta carpeta** a la raíz: `index.html`, `styles.css`, `questions.js`, `official-signs.js`, `course-questions.js`, `course-guide.js`, `question-review.js`, `app.js`, la carpeta `assets/`, `favicon.svg`, `.nojekyll` y este README. El archivo `index.html` tiene que quedar en la raíz de la carpeta que publiques.
3. En el repositorio abrí **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**.
5. Elegí la rama `main` y la carpeta **/ (root)**, y guardá.
6. Esperá a que GitHub publique el sitio. La dirección aparece en esa misma sección; suele ser `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Si elegís publicar desde `/docs`, colocá todos estos archivos juntos dentro de `docs/`. Todos los enlaces de recursos son relativos para funcionar también en repositorios con subruta. No necesitás configurar un dominio.

## Usar y reiniciar

- Al abrir se prepara un intento con todas las preguntas de Mendoza y temas comunes.
- **Nueva práctica** aplica los filtros y reinicia el intento, sin borrar los errores ni las guardadas.
- **Repetir y mezclar** vuelve a practicar el conjunto del intento terminado.
- Se mezclan independientemente las preguntas y las opciones mediante Fisher–Yates y `crypto.getRandomValues`. La corrección usa IDs estables: nunca depende de la posición A/B/C. Una opción puede coincidir de posición por azar.
- El botón **Borrar todo mi progreso** pide confirmación y elimina respuestas, errores y guardadas. Inicia otra práctica.
- Podés navegar libremente con anterior/siguiente o con el mapa de preguntas. Las no respondidas cuentan como pendientes en el resultado.
- Una respuesta ya elegida queda bloqueada en ese intento. Para volver a contestarla, empezá uno nuevo.
- Errores y guardadas se conservan en `localStorage` en este navegador, sin enviar datos a un servidor. Al responder bien en otro intento, esa pregunta sale de errores.
- Un intento en curso se retoma con el mismo orden al recargar. El orden vuelve a sortearse al iniciar otro.
- Si el navegador bloquea el almacenamiento, funciona durante la visita y muestra un aviso.

## Abrir localmente

Podés abrir `index.html` directamente. Para que el guardado sea más consistente, usá un servidor estático, por ejemplo `python -m http.server 8000`, y visitá `http://localhost:8000`. La aplicación no descarga fuentes, imágenes ni bibliotecas externas. Los enlaces a las fuentes sí requieren internet.

## Contenido y fuentes

Fuentes consultadas el **15/10/2026**. La pestaña **Fuentes y reglas locales** enlaza el compendio municipal solicitado, el cuestionario de GBA, Test de Conducir, las leyes y referencias oficiales adicionales, con prioridad para el material de San Rafael. Cada corrección tiene una fuente y un artículo o apartado para revisar.

Es material educativo independiente, de redacción propia: **no es un banco oficial ni garantiza aprobar**. El simulacro de hasta 40 preguntas y su porcentaje son decisiones de entrenamiento, no una descripción del examen del municipio. El cuestionario de Buenos Aires sirve como referencia de temas y señales; no se importan sus reglas locales a Mendoza. Test de Conducir se consultó como referencia de formato, sin copiar su banco.

Las preguntas provinciales de velocidad se basan en el art. 60 de la Ley 9024 enlazada: motos 80 rural / 100 semiautopista / 120 autopista; en Nación se usa el art. 51 de la Ley 24.449: 110 / 120 / 130. Ambas contemplan condiciones y señalización. No usar los valores provinciales como regla para cualquier ruta nacional.

El compendio corresponde a 2020 aunque esté alojado en una carpeta de 2024. No se afirma que todos sus contenidos sigan vigentes. Para alcohol se distingue el texto provincial consultado (art. 52 inc. 7) del nacional actualizado (art. 48 inc. a). La opción segura es no beber si vas a conducir. No se incluyen montos de multas ni requisitos detallados de licencias potencialmente desactualizados. Verificá los cambios normativos y requisitos con el centro emisor antes de rendir.

Las fichas usan imágenes del catálogo oficial enlazado por San Rafael y dos ejemplos vectoriales adicionales. Todo se guarda como recurso local para evitar enlaces de imágenes rotos. La atribución y el alcance están descritos en la sección del catálogo íntegro.

## Editar el banco

`questions.js` contiene `SOURCES`, `QUESTIONS` y `SIGNS`. Se carga primero, seguido por `official-signs.js`, `course-questions.js`, `course-guide.js`, `question-review.js` y finalmente `app.js`. Conservá ese orden para mantener los IDs publicados. La función `add` recibe tema, ámbito (`mendoza`, `national` o `common`), pregunta, respuesta correcta, dos distractores, explicación, clave de fuente, referencia y señal opcional. La correcta tiene ID `a` en los datos; la interfaz mezcla su posición independientemente. Conservá los IDs al editar un banco ya publicado para no asociar progreso viejo a preguntas diferentes. Si cambiás IDs o estructura, cambiá también la clave de almacenamiento de `app.js`.

## Complemento del curso

Se prepararon 67 preguntas nuevas en total (q317–q383): 43 del trabajo previo y 24 de la revisión del aula. Se descargó el PDF del aula (105 páginas) y se revisaron transcripciones automáticas de sus once videos: introducción más diez módulos. No se reprodujeron sus evaluaciones ni se revisó cada fotograma. Ver [REVISION-CURSO.md](REVISION-CURSO.md).

El filtro **Material de estudio** distingue todo, curso ANSV, material de San Rafael y la unión de ambos. El curso reúne 263 preguntas: 63 de texto y 200 de señales vinculadas al módulo 7 (261 al combinar con Mendoza + temas comunes). La correspondencia de cada señal con el PDF del aula se indica tras responder; el catálogo puede mostrar variantes del mismo concepto. San Rafael reúne 224 preguntas del catálogo enlazado, guía práctica y Estrellas Amarillas; no todo ese contenido es exclusivo de ese municipio. La unión tiene 287 (285 con el filtro inicial de jurisdicción). Las preguntas de género basadas solo en una descripción pública no se etiquetan como contenido del aula revisada.

La clasificación por origen es independiente del tema. Las preguntas del curso sobre siniestros se contrastaron con fuentes sanitarias y normativas actuales. Práctica libre, simulacro, errores y guardadas respetan el origen seleccionado. La guía por módulos ofrece videos, páginas del PDF y ejercicios del módulo. Si no hay preguntas propias, las relacionadas de otras fuentes se identifican expresamente.

La segunda revisión renueva automáticamente los intentos de la redacción anterior, conserva sus filtros, errores y guardadas e informa del cambio. La publicación de la primera revisión fue aprobada el 15/10/2026; la publicación de esta segunda revisión fue aprobada el 15/10/2026.

## Validación

Se revisaron integridad de IDs/opciones/fuentes, carga sin dependencias, corrección después de mezclar, bloqueo de respuestas repetidas, reinicio, persistencia, filtros, resultados y funcionamiento en pantalla móvil. Las limitaciones de revisión de contenido están descritas arriba.

## Ampliación para San Rafael (15/10/2026)

Se incorporaron 36 preguntas, cuatro símbolos ilustrados y once fuentes adicionales (20 en total). Se conservaron los IDs originales para respetar el progreso guardado. La pregunta q016 ahora define ciclomotor expresamente. Si retomás un intento de la versión anterior, conserva sus preguntas; pulsá **Nueva práctica** para incluir el banco ampliado.

La pestaña **Rendir en San Rafael** distingue cursos y fuentes municipales de la referencia nacional: Disposición ANSV 219/2025, anexo I, título III (40 preguntas, mínimo 36 correctas, posibles eliminatorias, máximo 75 minutos fijado por el evaluador). Esta disposición reemplaza el anexo de la 54/2025. No se encontró confirmación municipal pública de esos números operativos para el teórico de moto de San Rafael. Las publicaciones municipales y sus materiales se enlazan en la página para consultar el turno y el circuito efectivamente asignado.

El simulacro selecciona hasta 40 preguntas con un reparto propio para incluir temas variados. Mantiene corrección inmediata. No reproduce cupos oficiales, casos a desarrollar ni un listado oficial de eliminatorias, ni incorpora cronómetro. Si el filtro tiene menos de 40, utiliza las disponibles. La meta de 90% se presenta como orientación, sin certificar aprobación.

Se incorporaron técnicas y equipamiento del manual de Rivadavia, sin importar sus tablas de velocidad ni sus requisitos de licencias. El material de San Rafael sobre pista es una guía alojada por el municipio, no una confirmación del trazado vigente en cada turno.

## Catálogo íntegro de señales (15/10/2026)

Se incorporan las **219 entradas visuales** de las páginas 2 a 22 del Sistema de Señalización Vial Uniforme enlazado por San Rafael, sin excluir señales por su categoría, tipo de vehículo o supuesta probabilidad de aparecer en el examen. Se mantienen dos ejemplos adicionales (Estrella Amarilla y una curva ilustrada): **221 fichas y 316 preguntas** en total.

Las categorías sirven para organizar. Al abrir la pestaña se muestran todas las fichas; el buscador y la selección de categoría son opcionales y **Mostrar todas** restablece la vista completa. Cada ficha permite ampliar su imagen, practicarla y abrir su lámina de origen. Se conserva el PDF original y sus **27 páginas completas**, incluidas portada, recomendaciones y cierre, para poder comprobar el contexto y la cobertura.

Las imágenes oficiales se extrajeron del PDF, sin redibujar su simbología. Se reemplazaron 23 ilustraciones coincidentes conservando sus IDs; se agregaron las otras 196 entradas como preguntas nuevas al final. Los valores de las preguntas visuales de velocidad se ajustaron a las imágenes oficiales (90 máxima y 35 mínima). Las láminas contienen variantes o ejemplos compuestos; el número de entradas no implica 219 significados únicos ni cubre toda futura modificación normativa. El alcance exacto es el catálogo municipal enlazado.

`official-signs.js` amplía el banco y carga las referencias de imágenes. Los recursos son locales: al subir o descargar el sitio, conservá la carpeta `assets/` con sus subcarpetas y el PDF. El PDF y sus imágenes proceden de https://www.sanrafael.gov.ar/archivos-muni/licencias-de-conducir/sistema-de-senalizacion-vial-uniforme-ansv.pdf (ANSV, Anexo L). Se incluyen como material de estudio y no como señalización para instalar en la vía pública.

Para incorporar el banco completo a un nuevo intento, pulsá **Nueva práctica** o **Practicar todas las señales**. El intento guardado anteriormente conserva su conjunto de preguntas.

## Corrección de señales y dificultad · segunda revisión

`question-review.js` cruza 200 señales del catálogo con las páginas del módulo 7 y revisa la redacción u opciones de 377 preguntas sin cambiar los 383 IDs. Se conservan las 221 fichas y todas sus preguntas. Los distractores de reconocimiento se agrupan por conceptos cercanos y se conservan casos de interpretación (PARE frente a CEDA EL PASO, prohibiciones, máximas/mínimas, demarcaciones). Las preguntas de texto usan confusiones sobre componentes, controles, secuencias y condiciones, en lugar de alternativas decorativas o absurdas. No se afirma que la dificultad sea equivalente al examen oficial; no se cambió la normativa por el solo hecho de aumentar la exigencia.

El recuento junto al filtro indica preguntas e imágenes elegibles; el intento indica cuántas de sus preguntas tienen imagen de señal. El selector no reproduce el cuestionario de Buenos Aires: se agregó un acceso directo al PDF oficial. Elegir Nación no selecciona preguntas de ese gobierno.

Ver [REVISION-CALIDAD.md](REVISION-CALIDAD.md) para cifras, límites y validación.
