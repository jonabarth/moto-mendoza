# Corrección de señales y dificultad

15/10/2026. Segunda revisión, publicación aprobada por el usuario. Responde a los problemas reportados por el usuario y Emi.

## Causa y corrección de las señales

El selector del curso etiquetaba solo 63 preguntas de texto (61 con Mendoza + temas comunes). No incluía las imágenes del módulo 7. Se revisaron las láminas del PDF del aula (páginas 66–86) y se registró una correspondencia explícita de 200 entradas del catálogo. Las imágenes reutilizadas pueden mostrar otra variante gráfica del mismo concepto; se informa después de responder y se enlaza la página del aula. No se etiquetan como curso las entradas del catálogo sin correspondencia revisada, como la limitación de largo o ciertos tipos de semáforos. Esas entradas siguen disponibles en el catálogo y en sus materiales correspondientes: no se eliminaron por supuesta relevancia para el examen.

La correspondencia se conserva en `COURSE_SIGN_CROSSWALK`, en `question-review.js`. Cada pregunta sigue enlazando su fuente de imagen original, además de su referencia en el curso.

| Origen | Total | Con imagen | Mendoza + comunes |
| --- | ---: | ---: | ---: |
| Todo | 383 | 221 | 376 |
| Curso ANSV | 263 | 200 | 261 |
| San Rafael | 224 | 220 | 224 |
| Curso + San Rafael | 287 | 220 | 285 |

La unión no aumenta porque las señales también pertenecen a San Rafael. No hay preguntas duplicadas dentro de un intento por tener ambos orígenes.

## Exigencia de las preguntas

Se modificaron enunciados u opciones de 377 preguntas. Se conservaron los IDs, las claves de respuesta y las fuentes. Cambios de redacción no equivalen a 377 conceptos nuevos ni a una dificultad calibrada con el examen oficial.

- Se reemplazan opciones absurdas por confusiones plausibles: función de componentes próximos, reglamentaria frente a preventiva, velocidad mínima frente a máxima, detención frente a estacionamiento, secuencias y condiciones incompletas.
- Se incorporan casos para aplicar principios de conducción, mantenimiento y actuación inicial ante siniestros, sin introducir nuevas técnicas clínicas.
- Se conservan 25 preguntas de interpretación de símbolos y señales; el resto de los reconocimientos usa alternativas de familias cercanas.
- No se importan las leyes provinciales de Buenos Aires como reglas de Mendoza. No se cambian los límites legales por motivos de dificultad.

Las respuestas correctas y las explicaciones siguen basadas en las fuentes ya identificadas. La comparación textual y las verificaciones de datos no certifican equivalencia con un banco oficial ni una auditoría jurídica completa de cada norma vigente.

## Intentos anteriores y visibilidad

Se usa versión 2 del banco para los intentos. Un intento anterior se reemplaza por uno nuevo conservando sus filtros y mostrando un aviso; sus errores y favoritas se mantienen por ID. Esto evita conservar la sesión de 61 preguntas sin señales o respuestas guardadas asociadas a otras opciones. Los intentos nuevos conservan su orden y respuestas al recargar.

El filtro muestra cuántas preguntas e imágenes son elegibles antes de iniciar. Cada intento muestra su cantidad efectiva de preguntas con imagen; el simulacro sigue seleccionando hasta 40 con variedad de temas, sin atribuirle cupos oficiales.

## Preguntas del Gobierno de Buenos Aires

Ninguna opción reproduce su cuestionario oficial. El material de Buenos Aires se consultó como referencia al elaborar preguntas propias. Se agregó «¿Preguntas oficiales de Buenos Aires?» con un enlace directo al PDF original. «Nación» designa una jurisdicción, no ese cuestionario. El enlace abre material de estudio, no un nuevo modo interactivo.

Fuente: https://www.gba.gob.ar/static/seguridadvial/docs/cuestionario.pdf

## Verificación

Se verificaron IDs, fuentes, tres opciones únicas por pregunta, claves de respuesta, archivos de imagen, conservación de las 221 fichas, inclusión de 200 señales y representación de cinco familias en el filtro del curso. El orden de scripts fue comprobado para que la revisión se aplique antes de la interfaz.

En navegador se comprobó la migración de un intento anterior (aviso visible, filtros conservados y error anterior retenido), el filtro curso con Todas (263, de ellas 200 con imagen), práctica solo de señales (200) y simulacro (40, con 7 imágenes en el intento observado). Se probó una respuesta incorrecta con corrección y referencia a la página 72 del curso, su persistencia al recargar, repaso de ese error, guardado y retirada de la favorita de prueba. Los intentos de versión 2 no se renuevan al recargar. Se verificó el enlace del cuestionario de Buenos Aires y se guardó una captura de la vista local.
