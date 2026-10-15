# En dos ruedas · Mendoza

Sitio estático para practicar el teórico de moto, con 120 preguntas y 25 señales o demarcaciones ilustradas (115 preguntas con el filtro inicial de Mendoza y temas comunes). Sin instalación, backend, claves ni compilación. Incluye corrección inmediata con explicación y fuente, preguntas de Mendoza y Nación diferenciadas, señales SVG locales, temas, simulacro de hasta 40 preguntas, repaso de errores y favoritos.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub (o usá uno existente).
2. Subí **el contenido de esta carpeta** a la raíz: `index.html`, `styles.css`, `questions.js`, `app.js`, `favicon.svg`, `.nojekyll` y este README. El archivo `index.html` tiene que quedar en la raíz de la carpeta que publiques.
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

Las señales son ilustraciones vectoriales propias para estudio; no son láminas oficiales para imprimir como señalización vial. Los nombres y significados se contrastaron con el material enlazado. No hay recursos visuales externos que puedan dejar de cargar.

## Editar el banco

`questions.js` contiene `SOURCES`, `QUESTIONS` y `SIGNS`. La función `add` recibe tema, ámbito (`mendoza`, `national` o `common`), pregunta, respuesta correcta, dos distractores, explicación, clave de fuente, referencia y señal opcional. La correcta tiene ID `a` en los datos; la interfaz mezcla su posición independientemente. Conservá los IDs al editar un banco ya publicado para no asociar progreso viejo a preguntas diferentes. Si cambiás IDs o estructura, cambiá también la clave de almacenamiento de `app.js`.

## Validación

Se revisaron integridad de IDs/opciones/fuentes, carga sin dependencias, corrección después de mezclar, bloqueo de respuestas repetidas, reinicio, persistencia, filtros, resultados y funcionamiento en pantalla móvil. Las limitaciones de revisión de contenido están descritas arriba.

## Ampliación para San Rafael (15/10/2026)

Se incorporaron 36 preguntas, cuatro símbolos ilustrados y once fuentes adicionales (20 en total). Se conservaron los IDs originales para respetar el progreso guardado. La pregunta q016 ahora define ciclomotor expresamente. Si retomás un intento de la versión anterior, conserva sus preguntas; pulsá **Nueva práctica** para incluir el banco ampliado.

La pestaña **Rendir en San Rafael** distingue cursos y fuentes municipales de la referencia nacional: Disposición ANSV 219/2025, anexo I, título III (40 preguntas, mínimo 36 correctas, posibles eliminatorias, máximo 75 minutos fijado por el evaluador). Esta disposición reemplaza el anexo de la 54/2025. No se encontró confirmación municipal pública de esos números operativos para el teórico de moto de San Rafael. Las publicaciones municipales y sus materiales se enlazan en la página para consultar el turno y el circuito efectivamente asignado.

El simulacro selecciona hasta 40 preguntas con un reparto propio para incluir temas variados. Mantiene corrección inmediata. No reproduce cupos oficiales, casos a desarrollar ni un listado oficial de eliminatorias, ni incorpora cronómetro. Si el filtro tiene menos de 40, utiliza las disponibles. La meta de 90% se presenta como orientación, sin certificar aprobación.

Se incorporaron técnicas y equipamiento del manual de Rivadavia, sin importar sus tablas de velocidad ni sus requisitos de licencias. El material de San Rafael sobre pista es una guía alojada por el municipio, no una confirmación del trazado vigente en cada turno.
