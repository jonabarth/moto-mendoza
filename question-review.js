/* Revisión de calidad 2. Conserva IDs; renueva intentos que usaban otra redacción.
   La equivalencia de señales se comprobó con las láminas del PDF del aula.
   Variantes del catálogo pueden tener otro dibujo del mismo concepto. */
(() => {
  const byId=new Map(QUESTIONS.map(q=>[q.id,q]));
  const bySign=new Map(SIGNS.filter(s=>s.officialId).map(s=>[s.officialId,s]));
  const courseSigns={};
  function mapPage(catalog,page,count,except=[]){for(let i=1;i<=count;i++)if(!except.includes(i))courseSigns[`oficial-p${String(catalog).padStart(2,'0')}-${String(i).padStart(2,'0')}`]=page;}
  mapPage(2,71,20);mapPage(3,72,12,[5]);mapPage(4,72,15,[8,15]);
  mapPage(5,73,4);courseSigns['oficial-p05-05']=74;courseSigns['oficial-p05-06']=74;
  mapPage(6,75,10);mapPage(7,77,11);mapPage(8,76,11);mapPage(9,76,16);
  mapPage(10,78,5);courseSigns['oficial-p10-06']=79;courseSigns['oficial-p10-07']=79;
  mapPage(11,80,12);mapPage(12,81,8);mapPage(13,81,9);mapPage(14,82,25);
  mapPage(15,66,6,[4]);mapPage(16,83,8,[1,2,5,7]);mapPage(17,84,8);mapPage(18,84,7);
  mapPage(20,85,8);mapPage(21,86,6);courseSigns['oficial-p21-01']=85;
  mapPage(22,86,4,[4]);
  for(const [id,page] of Object.entries(courseSigns)){
    const sign=bySign.get(id);if(!sign)throw Error('Señal sin correspondencia: '+id);
    const q=QUESTIONS.find(q=>q.sign===sign.id);if(!q)throw Error('Señal sin pregunta: '+id);
    q.courseModule=7;q.coursePage=page;
    if(!q.materials.includes('course'))q.materials.push('course');
  }
  window.COURSE_SIGN_CROSSWALK=courseSigns;

  // ID, dos distractores plausibles. No se modifica la respuesta correcta.
  const distractors={
    q001:['Me detengo solo si el agente coincide con el semáforo.','Espero la luz amarilla antes de obedecer al agente.'],
    q002:['El que llega primero, aunque venga por la izquierda.','El que circula más rápido y está más cerca del cruce.'],
    q003:['Continuar si el peatón todavía no llegó a mi carril.','Continuar si puedo pasar detrás sin cambiar de trayectoria.'],
    q004:['A quien intenta ingresar desde mi derecha.','A quien ingresa, si anunció antes su maniobra.'],
    q005:['A la derecha, como el borde de la calzada.','A la izquierda o a la derecha, según la salida elegida.'],
    q006:['Se conserva por venir desde la derecha, aunque sea un camino de tierra.','Se conserva si el vehículo que sale de tierra llegó primero.'],
    q007:['Conservo la trayectoria y espero que la ambulancia encuentre un espacio.','Cedo únicamente si la ambulancia llega desde mi derecha.'],
    q008:['El que asciende, porque puede reiniciar la marcha en primera.','El que esté más cerca del inicio de la cuesta, sin importar el sentido.'],
    q009:['Reducir la velocidad y pasar si llego desde la derecha.','Ceder solo si el vehículo de la vía principal llegó antes.'],
    q010:['Por la derecha, cuando el vehículo anterior mantiene su carril.','Por cualquiera de los dos lados, si hay suficiente espacio lateral.'],
    q011:['Sí, si la línea central es discontinua aunque falte visibilidad.','Sí, si antes de comenzar no se observa un vehículo de frente.'],
    q012:['Mantengo mi velocidad aunque el otro necesite espacio para volver.','Me acerco al vehículo de adelante para acortar el sobrepaso.'],
    q013:['Con la luz de giro, cuando empiezo a desplazar la moto.','Con la luz de freno, porque también comunica que voy a girar.'],
    q014:['Señalizar y comenzar el cambio: el giro me da prioridad sobre ese carril.','Comprobar los espejos: señalizar solo si hay otro vehículo cerca.'],
    q015:['Para circular al límite máximo cuando los demás van más despacio.','Para continuar un viaje largo y evitar los ingresos por la derecha.'],
    q016:['Sí, si circula por el carril derecho sin utilizar la banquina.','Sí, si su conductor posee una licencia que también habilita motocicletas.'],
    q017:['Ingresar mientras siga verde y esperar a que se libere la salida.','Ingresar si calculo que la salida se liberará antes de la luz roja.'],
    q018:['Sí, a baja velocidad para llevar la moto hasta un taller.','Sí, si ambos conductores coordinan la maniobra y mantienen sus carriles.'],
    q019:['Sí, cuando los vehículos mantienen una separación lateral suficiente.','Sí, a baja velocidad y anunciando cada desplazamiento con el giro.'],
    q020:['Sí, si la congestión está detenida y no se utiliza para adelantar en marcha.','Sí, si puedo reincorporarme sin obligar a frenar al tránsito.'],
    q021:['Para anunciar mi llegada a cualquier intersección, aunque no exista peligro.','Para avisar que voy a superar a otro vehículo en cualquier circunstancia.'],
    q022:['Sí, si no se activaron las señales ferroviarias.','Sí, si comienzo a cruzar antes de que baje la barrera.'],
    q024:['80 km/h.','40 km/h.'],q027:['130 km/h.','110 km/h.'],q028:['30 km/h.','40 km/h.'],
    q029:['Hasta 30 km/h, después de mirar y escuchar en ambos sentidos.','Hasta 20 km/h, sin verificar las vías si no se activa una señal.'],
    q030:['30 km/h.','40 km/h.'],
    q031:['Conservar 60 km/h mientras no exista una señal de menor velocidad.','Reducir solo si el agua impide distinguir las marcas de la calzada.'],
    q033:['100 km/h.','110 km/h.'],q034:['120 km/h.','110 km/h.'],q035:['20 km/h.','40 km/h.'],
    q036:['El conductor siempre; el acompañante únicamente fuera de zona urbana.','Ambos en rutas; en ciudad depende de la cilindrada.'],
    q037:['Sí, si tiene sujeción y cubre la misma zona que un casco abierto.','Sí, si cumple una norma de seguridad industrial y ajusta a la cabeza.'],
    q038:['Ajustado a la cabeza; la correa puede quedar holgada para evitar presión.','Abrochado bajo el mentón; la talla puede ser mayor si la correa lo retiene.'],
    q039:['Dos como máximo, aunque el modelo no tenga asiento ni estribos para pasajero.','Las que puedan sentarse sin sobrepasar el ancho del manillar.'],
    q040:['Usar el freno que funciona y reducir la velocidad hasta el próximo servicio.','Verificarla después del recorrido si todavía queda capacidad de frenado.'],
    q041:['Sí, si los indicadores tapados pueden verse parcialmente desde los costados.','Sí, si coloco un elemento reflectivo sobre la carga que los tapa.'],
    q042:['Circular junto a la cabina de un camión para estar cerca de su conductor.','Conservar una posición lateral fija, aunque no aparezca en los espejos ajenos.'],
    q043:['Asfalto mojado, arena y tapas metálicas, pero no las manchas de aceite.','Arena y aceite, pero las tapas metálicas mojadas tienen el agarre del asfalto.'],
    q044:['Evitar la fatiga muscular y mejorar la adherencia de los neumáticos.','Reducir las lesiones mediante una inmovilización rígida de brazos y piernas.'],
    q045:['Desde el atardecer; durante el día bastan las luces de posición.','De día en rutas; dentro de la ciudad solo con visibilidad reducida.'],
    q046:['Junto al semáforo, aunque la senda peatonal quede detrás de la moto.','Antes del centro del cruce, aunque se supere la línea de detención.'],
    q047:['Continuar si ingresé antes de que se encendiera la luz roja.','Continuar si no hay tránsito transversal y mantengo la velocidad.'],
    q048:['Detenerse y avanzar únicamente después de una detención completa.','Avanzar sin detenerse porque reemplaza a la luz verde.'],
    q049:['Solo cuando la maniobra modifique el carril por el que circulo.','Solo cuando otro usuario pueda verse afectado de manera inmediata.'],
    q050:['Mantener la luz alta hasta que el otro conductor también la reduzca.','Cambiar a luces de posición mientras pasa el vehículo de frente.'],
    q051:['Sí, si la luz verde permite avanzar y el sentido opuesto está libre.','Sí, después de ceder al tránsito de frente, aunque no haya señal habilitante.'],
    q052:['Sí, cuando el tránsito avanza a paso de peatón.','Sí, cuando sujeto el teléfono en un soporte y lo opero con una mano.'],
    q053:['Sí, si el volumen permite oír las bocinas.','Sí, si se utilizan únicamente para seguir indicaciones de navegación.'],
    q054:['Sí, si la dosis fue indicada por un profesional.','Sí, si el tratamiento se toma desde hace tiempo, aunque altere la atención.'],
    q055:['Según la velocidad, manteniendo la misma separación aunque cambie la adherencia.','Según el tamaño del vehículo anterior, sin considerar mi velocidad.'],
    q056:['Continuar a menor velocidad con la visera abierta hasta la próxima parada prevista.','Tomar una bebida estimulante y continuar sin descansar si me siento más alerta.'],
    q059:['Sí, si la cilindrada está cerca del máximo de mi categoría.','Sí, si poseo licencia para un vehículo de mayor tamaño o peso.'],
    q060:['Sí, hasta la fecha del próximo control técnico obligatorio.','Sí, si el titular asume por escrito los daños que pudiera causar.'],
    q061:['Sí, si la numeración también figura en la documentación que porto.','Sí, si se conserva legible al observarla de cerca con la moto detenida.'],
    q062:['El título de propiedad, en reemplazo de la identificación para circular.','La constancia del seguro, en reemplazo de la identificación del vehículo.'],
    q063:['Para certificar que el conductor posee la categoría adecuada.','Para certificar que el vehículo conserva todas las condiciones de fábrica sin cambios.'],
    q085:['En el puño derecho del manillar.','En el pedal izquierdo, junto al cambio.'],
    q086:['Aplicando toda la presión inicial y reduciéndola cuando el peso se transfiera.','Aplicando solo el freno trasero para evitar cargar la rueda delantera.'],
    q087:['La misma distancia si la moto tiene ABS, aunque disminuya la adherencia.','La misma anticipación si reduzco la presión sobre la maneta.'],
    q088:['Brazos extendidos y rígidos para impedir movimientos de la dirección.','Brazos relajados y pies separados de los estribos para anticipar una detención.'],
    q089:['Usarla con la visera levantada, sin otra protección ocular, para evitar las rayas.','Mantenerla si las rayas quedan fuera del centro de la visión, sin evaluar los reflejos.'],
    q090:['Reducir las consecuencias de un impacto que ya se produjo.','Facilitar la asistencia de los ocupantes después de un impacto.'],
    q091:['Evitar la pérdida de adherencia antes de una colisión.','Alertar al conductor para que corrija una trayectoria peligrosa.'],
    q092:['Repartir automáticamente toda la frenada entre ambas ruedas en cualquier moto.','Garantizar la misma distancia de frenado en todas las superficies.'],
    q093:['Casco, guantes y campera con protecciones.','Casco, frenos y campera con protecciones.'],
    q094:['Las condiciones de la moto; el equipo personal solo se revisa en viajes largos.','El equipo de protección; las fallas mecánicas se revisan al alcanzar el kilometraje de servicio.'],
    q095:['La luz trasera de posición, sin variar de intensidad.','La luz de freno únicamente cuando se acciona el freno trasero.'],
    q096:['Al cono que se está dejando atrás, hasta terminar cada giro.','Al siguiente cono, manteniendo la vista fija sobre su base.'],
    q097:['El uso exclusivo del trasero para mantener descargada la rueda delantera.','El uso exclusivo del delantero porque concentra la mayor capacidad de frenado.'],
    q098:['Hasta 50 cc, sin un límite de velocidad constructiva.','Hasta 125 cc y que no pueda exceder 50 km/h.'],
    q099:['Sí, si su velocidad de circulación no supera 50 km/h.','Sí, si tiene transmisión automática y no lleva acompañante.'],
    q100:['Un cruce entre caminos a distinta altura.','Un cruce peatonal elevado sobre una avenida.'],
    q101:['Sí, conservando una distancia que permita frenar si se detiene.','Sí, una vez que el vehículo de emergencia ya abrió el paso.'],
    q102:['Sí, si dejo espacio para una persona, aunque obstruya el recorrido accesible.','Sí, si la detención es breve y permanezco junto a la moto.'],
    q103:['Sí, si el garaje no tiene un vehículo entrando o saliendo en ese momento.','Sí, si permanezco en condiciones de mover la moto cuando lo soliciten.'],
    q104:['Sí, si no se ocasiona daño y el otro vehículo puede seguir saliendo.','Sí, si se desplaza a mano y no se pone en marcha su motor.'],
    q105:['Sí, con calzada seca y una velocidad inferior a la máxima permitida.','Sí, si la falla no produjo todavía una pérdida de presión.'],
    q106:['Sí, hasta llegar al taller, si la pérdida no afecta la autonomía.','Sí, si se mantiene alejada de los neumáticos aunque alcance partes calientes.'],
    q107:['Sí, si el ruido ayuda a que otros conductores detecten la moto.','Sí, si el resto del sistema de escape no tiene pérdidas.'],
    q108:['Sí, si el titular habilitado viaja como acompañante.','Sí, si quien la conduce tiene experiencia y no sale a una ruta.'],
    q109:['Ámbar.','Blanco.'],q110:['Ámbar.','Blanco.'],
    q111:['Sí, si la numeración se reproduce de forma visible en la carga.','Sí, si la patente sigue visible con la iluminación del alumbrado público.'],
    q112:['Sí, si se realiza dentro de los límites máximos de velocidad.','Sí, si no hay tránsito ajeno a los participantes.'],
    q113:['En dos carriles cuando la moto cabe sobre la línea sin tocar otros vehículos.','En el carril libre más cercano, alternándolo sin señalizar si hay espacio.'],
    q114:['Después de iniciar el giro, aprovechando la inclinación de la moto.','Únicamente con el freno delantero cuando ya se alcanzó la esquina.'],
    q115:['Únicamente la detención de mi vehículo, aunque el obstáculo quede sin advertir.','El obstáculo después de resolver la avería, para evitar detener el tránsito.'],
    q116:['Conservarlo mientras se respeten las velocidades máximas, sin considerar otras condiciones.','Conservarlo principalmente cuando el pavimento o el clima sean desfavorables.']
  };
  for(const [id,wrong] of Object.entries(distractors)){
    const q=byId.get(id);if(!q)throw Error(id);
    q.options.find(o=>o.id==='b').text=wrong[0];q.options.find(o=>o.id==='c').text=wrong[1];q.revision='2';
  }
  // Algunas consignas necesitan un caso o una distinción, no solo otros distractores.
  const scenarios={
    q002:'Llegás desde la izquierda a un cruce sin señales de vías de igual jerarquía. El otro vehículo llega desde tu derecha. Si no hay excepciones a la regla general, ¿quién tiene prioridad?',
    q038:'El casco es de tu talla y no se mueve al girar la cabeza. ¿Qué condición falta comprobar antes de circular?',
    q044:'En una caída, la moto desliza y las manos entran en contacto con el pavimento. ¿Qué función cumplen los guantes y la ropa con protecciones?',
    q090:'Los frenos, la suspensión y los neumáticos pertenecen a la seguridad activa. ¿Cuál es su finalidad principal?',
    q091:'El casco y la indumentaria con protecciones se consideran elementos de seguridad pasiva. ¿Cuál es su finalidad principal?',
    q092:'La moto tiene ABS en la rueda delantera. Si durante una frenada esa rueda tiende a bloquearse, ¿qué función cumple el sistema?'
  };
  for(const [id,prompt] of Object.entries(scenarios))byId.get(id).prompt=prompt;
  // La respuesta a q038 debe responder a la nueva consigna sin repetir el dato inicial.
  byId.get('q038').options.find(o=>o.id==='a').text='Que la correa quede correctamente abrochada y ajustada bajo el mentón.';

  // Revisión de las 67 preguntas incorporadas desde el material del curso y complementos.
  const courseWrong=[
    ['Conductores y peatones; los pasajeros no intervienen en la convivencia vial.','Conductores y pasajeros; las obligaciones de tránsito no alcanzan a los peatones.'],
    ['Porque su cumplimiento depende de la presencia de una autoridad de control.','Porque permiten resolver cada conflicto según la experiencia del conductor.'],
    ['Permite determinar qué grupo debe tener prioridad en cualquier situación.','Permite sustituir las reglas por acuerdos personales entre los involucrados.'],
    ['Es la pieza que une la rueda trasera con la suspensión y permite su movimiento.','Es el conjunto delantero que vincula la dirección con la rueda.'],
    ['La pipa de dirección, que aloja los rodamientos del giro.','El basculante, que articula la rueda con la suspensión.'],
    ['Vincular el manillar con la rueda delantera y absorber sus irregularidades.','Alojar los rodamientos que permiten girar la dirección.'],
    ['Mantener la presión del aceite independientemente de la temperatura.','Regular la cantidad de combustible de acuerdo con la velocidad de marcha.'],
    ['Con el derecho, que comparte el mando con el freno.','Con cualquiera de los dos, según la marcha seleccionada.'],
    ['El embrague, mediante la maneta de ese lado.','El freno trasero, independientemente del tipo de transmisión.'],
    ['El delantero, por ser el principal durante una frenada.','Ambos, porque toda moto convencional tiene frenado combinado.'],
    ['Sí: lubricación regular y tensado hasta eliminar toda holgura.','Sí: ajuste regular, pero la lubricación se limita a cadenas nuevas.'],
    ['Con los neumáticos calientes, usando sin corrección el valor indicado para frío.','Con los neumáticos fríos, usando la presión máxima grabada en el flanco como valor de uso.'],
    ['Sí, si se controlan todos los niveles y no se perciben fallas en marcha.','Sí, si las piezas desgastadas se reemplazan cuando dejan de funcionar.'],
    ['Reajustarlos después del viaje si la rueda todavía gira libremente.','Corregirlos solo si ya se perdió la alineación de ambas ruedas.'],
    ['Con holgura lateral, siempre que la correa impida que caiga.','Con presión dolorosa, para que se comprima el acolchado durante el uso.'],
    ['Sí, si reducen el brillo de los faros que vienen de frente.','Sí, si el faro propio permite compensar la menor entrada de luz.'],
    ['Solo el pie, dejando libre el tobillo para mover los mandos.','Solo la suela, dejando la protección del tobillo a la ropa.'],
    ['Conservar la prioridad sin anticipar conductas ajenas, porque esas conductas no dependen de mí.','Preparar una reacción después de que el peligro se manifieste, sin modificar antes el margen de seguridad.'],
    ['Hacia la rueda trasera, porque allí se ubica la transmisión.','Se conserva en las mismas proporciones que al circular a velocidad constante.'],
    ['Desacoplar la transmisión con el embrague para disminuir la velocidad.','Reducir la velocidad usando únicamente la resistencia de rodadura con el motor en punto muerto.'],
    ['Durante la inclinación, una vez que puedo ver la salida.','Al alcanzar el punto más cerrado, cuando conozco el radio completo.'],
    ['Al borde exterior de la curva para calcular cuánto queda de calzada.','Al punto más cercano de la rueda delantera para verificar su adherencia.'],
    ['Reduce la aceleración, pero conserva la capacidad de frenar y girar.','Reduce la capacidad de girar, pero no afecta el frenado en línea recta.'],
    ['Soltando primero el embrague y ajustando después el acelerador al tirón que se produzca.','Accionando el cambio antes de completar el recorrido necesario del embrague.'],
    ['Solo la aceleración; el frenado y la estabilidad conservan el comportamiento previo.','Solo la altura del asiento; la distribución de peso permanece igual.'],
    ['En el suelo durante las detenciones y las curvas lentas.','En una parte fija del chasis si los estribos le resultan incómodos.'],
    ['Mantener el torso vertical, independientemente de la inclinación de la moto.','Anticipar cada curva inclinándose antes de que lo haga el conductor.'],
    ['Concentrando el peso en la alforja opuesta al escape, sin considerar el equilibrio.','Repartiendo el volumen por igual, aunque el peso quede concentrado de un lado.'],
    ['Solo puede afectar la pintura; su peso no cambia la conducción si es liviana.','Solo puede afectar el consumo; no interfiere si cuelga por debajo del asiento.'],
    ['Una zona que se ve por el espejo pero no a través de la visera.','Una zona trasera que queda visible al ajustar correctamente ambos espejos.'],
    ['Observar otra vez el espejo, dando por cubiertas las zonas que no refleja.','Accionar el giro y comenzar a desplazarme para comprobar si alguien me advierte.'],
    ['Buscar peligros, ejecutar la maniobra y evaluar después su resultado.','Evaluar mi prioridad, buscar una trayectoria y ejecutarla sin considerar errores ajenos.'],
    ['La lluvia enfría el neumático y aumenta automáticamente su presión.','Las primeras gotas eliminan de inmediato los residuos y dejan el asfalto limpio.'],
    ['Conservar la velocidad diurna si se mantiene encendido el faro delantero.','Usar luz alta permanentemente para compensar cualquier pérdida de visibilidad.'],
    ['Apreciar con precisión la distancia trasera sin utilizar los espejos.','Distinguir los detalles laterales sin dirigir nunca la mirada hacia ellos.'],
    ['La conserva mientras la alcoholemia no supere un límite legal.','Solo la altera cuando aparecen signos visibles de pérdida de equilibrio.'],
    ['Omitir un control necesario por falta de atención o descuido.','Realizar incorrectamente una maniobra por falta de conocimientos o práctica.'],
    ['Omitir una precaución conocida por descuido en el mantenimiento.','Asumir un riesgo de manera temeraria aunque se domine la técnica.'],
    ['Intentar una maniobra que no se sabe realizar por falta de entrenamiento.','Realizar una maniobra peligrosa pese a conocer y dominar la técnica.'],
    ['Memoria, Prevención, Seguridad, Responsabilidad y Educación.','Memoria, Solidaridad, Ley, Justicia y Respeto.'],
    ['Señalar exclusivamente el sitio para una investigación del hecho.','Indicar una prioridad especial de circulación frente al lugar recordado.'],
    ['Usándolos como orientación para anticipar la pericia de otro conductor.','Evaluando la capacidad individual, pero manteniendo distintas exigencias según el género.'],
    ['Reclamar mi prioridad acercándome para que la otra persona reconozca el error.','Mantenerme a su lado para indicarle la infracción mientras ambos seguimos circulando.'],
    ['Regular la tensión de la batería cuando el motor cambia de régimen.','Mantener alimentadas las luces aunque exista una sobrecarga en el cableado.'],
    ['El filtro de aire, que regula el sonido en la admisión.','El sistema de refrigeración, que reduce la resonancia del motor.'],
    ['Aumentar la superficie de goma en contacto con el asfalto eliminando las ranuras.','Conservar la misma adherencia que en seco al mantener la presión correcta.'],
    ['Mantenerlo mientras el dibujo conserve profundidad, aunque la goma esté deteriorada.','Compensar el deterioro aumentando la presión de inflado.'],
    ['Completar el depósito y controlar la causa en el próximo servicio, sin revisar antes.','Ajustar el recorrido de la maneta para compensar el nivel bajo.'],
    ['Sí: la medición correcta siempre se realiza con el aceite caliente y la moto inclinada.','Sí: cualquier posición sirve si la varilla o el visor muestran aceite.'],
    ['Retener el casco mediante tensión, como lo hace la correa.','Distribuir el impacto como única función, sin deformarse para absorber energía.'],
    ['Porque un ajuste firme de la correa deja de ser posible después del primer uso.','Porque el desgaste de la pintura determina por sí solo la capacidad de protección.'],
    ['Mejorar el tacto de los mandos, sin intervenir en la protección frente a una caída.','Evitar la sudoración, sin que importe su resistencia al roce.'],
    ['Una posición rígida, con hombros elevados para estabilizar el manillar.','Una posición relajada, con los pies fuera de los estribos para reaccionar antes.'],
    ['Sí, si el carril contrario está libre al comenzar la curva.','Sí, si solo lo invade el cuerpo y las ruedas se mantienen cerca de la línea.'],
    ['Sí, si su carrocería permite ver por encima el tránsito que lo precede.','Sí, si mantengo una distancia que evite tocarlo, aunque no pueda ver la calzada.'],
    ['El aire siempre presiona la moto hacia el camión, sin cambiar durante el sobrepaso.','El camión produce una zona estable de aire que elimina el desplazamiento lateral.'],
    ['No: los espejos laterales cubren el espacio pegado al frente de la cabina.','No: la altura del puesto de conducción elimina los ángulos ciegos delanteros.'],
    ['Sí, si la visibilidad del camino es buena y no necesito leer señales pequeñas.','Sí, si reduzco la velocidad para compensar la falta de corrección visual.'],
    ['Sí, porque la nitidez determina por sí sola la percepción del movimiento.','Sí, mientras se mire de frente; los espejos resuelven cualquier dificultad restante.'],
    ['Para reemplazar las comprobaciones visuales antes de cambiar de carril.','Para estimar con precisión la distancia de otro vehículo sin observarlo.'],
    ['El estado de la víctima antes de considerar el tránsito o posibles derrames.','La posibilidad de despejar la calzada antes de observar otros riesgos.'],
    ['El lugar aproximado y la patente, dejando la descripción de las víctimas para después.','El domicilio del conductor y la aseguradora, aunque no se informe dónde ocurrió.'],
    ['Únicamente las heridas visibles, porque la respiración corresponde solo al personal sanitario.','Si puede ponerse de pie, pidiéndole caminar para comprobarlo.'],
    ['Sí, trasladarlas a la banquina aunque no exista un peligro inmediato.','Sí, sentarlas primero para que puedan describir mejor sus lesiones.'],
    ['Sí, si previamente tomo fotografías y no parece haber personas heridas.','Sí, si la otra parte ya dispone de la patente para identificarme.'],
    ['Únicamente la patente y un teléfono para que las aseguradoras se comuniquen.','Únicamente la identificación del vehículo, aunque no entregue los datos del seguro.'],
    ['Solo las fotografías: no conviene registrar contactos de personas que vieron el hecho.','Solo los datos del vehículo: la identificación del conductor nunca es relevante.']
  ];
  if(courseWrong.length!==67)throw Error('Revisión incompleta del curso');
  courseWrong.forEach((wrong,i)=>{const q=byId.get('q'+String(317+i).padStart(3,'0'));q.options.find(o=>o.id==='b').text=wrong[0];q.options.find(o=>o.id==='c').text=wrong[1];q.revision='2';});

  // Casos que exigen aplicar el concepto del curso.
  const courseScenarios={
    q327:'Revisás una transmisión por cadena. ¿Qué pauta de mantenimiento corresponde?',
    q328:'Vas a controlar la presión antes de un viaje. ¿Qué procedimiento corresponde?',
    q331:'Un casco parece de tu talla. Al girar la cabeza se desplaza y puede salir con facilidad. ¿Cómo debería quedar uno correctamente elegido?',
    q334:'Tenés prioridad, pero otro vehículo parece dispuesto a cruzarse en tu trayectoria. ¿Qué criterio define una conducción defensiva?',
    q336:'Al acercarte a un semáforo reducís marchas de manera coordinada y aprovechás la retención. ¿Qué describe utilizar el freno motor?',
    q337:'Te aproximás a una curva cuya salida todavía no ves. ¿Cuándo conviene ajustar la velocidad para entrar?',
    q341:'Vas a llevar acompañante en una moto apta para dos personas. ¿Qué cambio exige adaptar la conducción?',
    q348:'En una calle urbana detectás un vehículo que puede abrir una puerta. Según BEE, ¿qué secuencia corresponde?',
    q350:'La misma ruta que recorriste de día ahora tiene poca iluminación. ¿Qué combinación mejora la seguridad?',
    q352:'Un conductor cree que todavía reacciona normalmente después de beber. ¿Cómo afecta el alcohol a la reacción?',
    q366:'En un casco distinguís la calota, la capa de poliestireno expandido y el acolchado de confort. ¿Qué función específica cumple el poliestireno expandido?',
    q367:'Te ofrecen un casco usado que parece intacto, pero no conocés su historial. ¿Por qué no conviene comprarlo?',
    q374:'En tu habilitación figura el uso de lentes. Vas a hacer solo unas cuadras conocidas. ¿Podés prescindir de ellos?',
    q377:'Llegás a un siniestro y querés ayudar. ¿Qué debés evaluar antes de acercarte a las personas afectadas?'
  };
  for(const [id,prompt] of Object.entries(courseScenarios))byId.get(id).prompt=prompt;
  byId.get('q327').options.forEach(o=>o.text=o.text.replace(/^Sí: /,''));

  // Alternativas de identificación con conceptos cercanos. Evitar opciones al azar
  // de familias sin relación (por ejemplo, hotel frente a un límite de velocidad).
  const groups=[
    '02:01 02:02 02:08 02:20',
    '02:03 02:04 02:05 02:06 02:07 02:09 02:10 02:11 02:12',
    '02:13 02:14 02:15 04:03 04:04 13:02 13:03',
    '02:16 05:05 05:06 10:06 10:07',
    '02:17 06:10 13:01',
    '02:18 02:19 03:08 13:01 14:15',
    '03:01 03:02 03:03 03:04 03:05',
    '03:06 03:07 05:05 05:06',
    '03:09 03:10 03:11 03:12 04:01',
    '04:02 09:12 09:13',
    '04:05 04:06 04:07 04:08 04:09 04:10 04:14',
    '04:11 04:12 04:13 04:15',
    '05:01 05:02 05:03 10:03 10:04',
    '05:04 06:01 06:06 06:07 18:02 19:09',
    '06:02 06:03 06:04 06:05 10:01',
    '06:08 09:01 09:02 09:03 09:04',
    '06:09 07:01 07:02 07:03',
    '07:04 07:05 07:06 07:07 07:08 07:09 07:10 07:11',
    '08:01 08:02 08:03 09:16',
    '08:04 08:05 08:06 08:07',
    '08:08 08:09 08:10 08:11',
    '09:05 09:06 09:09 09:10 09:11',
    '09:07 09:08 09:16 20:04',
    '09:12 09:13 09:14 09:15',
    '10:02 10:03 10:04 10:05',
    '11:01 11:02 11:03 11:12',
    '11:04 11:05 11:06 11:07 11:08 11:09 11:10 11:11',
    '12:01 12:02 12:03 12:04 12:05 12:06 12:07 12:08',
    '13:04 13:05 13:06 13:07 13:08 13:09',
    '14:01 14:05 14:14 14:21',
    '14:02 14:03 14:18',
    '14:04 14:13 14:22 14:23 14:24 14:25',
    '14:06 14:07 14:08 14:16 14:17 14:20',
    '14:09 14:10 14:11 14:12 14:15 14:19',
    '15:01 15:02 15:03 15:04 15:05 15:06',
    '16:01 16:02 16:03 16:04',
    '16:05 16:06 16:07 16:08',
    '17:01 17:02 18:06 18:07',
    '17:03 17:04 17:05',
    '17:06 17:07 17:08 18:01',
    '18:02 18:03 18:04 18:05',
    '19:01 19:02 19:03 19:04',
    '19:05 19:06 19:07 19:08 19:09 19:10',
    '20:01 20:02 20:03 20:04 20:08',
    '20:05 20:06 20:07 21:01',
    '21:02 21:03 21:04 21:05 21:06',
    '22:01 22:02 22:03 22:04'
  ].map(g=>g.split(' ').map(code=>'oficial-p'+code.replace(':','-')));
  for(const q of QUESTIONS.filter(q=>q.sign)){
    const sign=SIGNS.find(s=>s.id===q.sign);if(!sign?.officialId)continue;
    const group=groups.find(g=>g.includes(sign.officialId));if(!group)throw Error('Falta grupo de señal: '+sign.officialId);
    const candidates=[...new Set(group.map(id=>bySign.get(id)?.name).filter(name=>name&&name!==sign.name))];
    if(candidates.length<2)throw Error('Distractores insuficientes: '+sign.officialId);
    q.prompt='¿A qué corresponde esta señal, marca o dispositivo?';
    q.options.find(o=>o.id==='a').text=sign.name;
    q.options.find(o=>o.id==='b').text=candidates[0];q.options.find(o=>o.id==='c').text=candidates[1];
    q.revision='2';
  }
  // Mantener preguntas de interpretación: no reducir todas a recordar un nombre.
  const signalCases=[
    ['q064','Llegás a esta señal y no ves otros vehículos. ¿Qué conducta exige?','Detener completamente la marcha antes de continuar.','Reducir la velocidad y continuar si no viene nadie.','Detenerse solo si se aproxima alguien con prioridad.'],
    ['q065','¿Qué diferencia esta señal de una obligación de detenerse siempre?','Debo ceder la prioridad y detenerme si hace falta para hacerlo.','Debo detenerme siempre, aunque no exista tránsito al que ceder.','Solo debo reducir la velocidad; la prioridad se conserva si sigo avanzando.'],
    ['q066','La calle parece libre, pero encontrás esta señal al intentar ingresar. ¿Qué indica?','No ingresar: el sentido de circulación es contrario.','Se permite ingresar si puedo mantenerme junto al borde derecho.','Se permite ingresar después de ceder a los vehículos que salgan.'],
    ['q067','¿Qué obligación impone esta señal en el acceso donde está colocada?','No avanzar más allá del punto indicado.','Ceder el paso y avanzar una vez que el acceso quede libre.','Ingresar únicamente por el carril situado a la derecha.'],
    ['q068','¿Cómo se interpreta el número que aparece en esta señal?','Es la velocidad máxima que no debo superar.','Es la velocidad mínima por debajo de la cual no debo circular.','Es una velocidad recomendada que puedo superar si la calzada está libre.'],
    ['q069','¿Qué indica el número sobre el fondo de esta señal?','La velocidad mínima indicada para circular.','La velocidad máxima indicada para circular.','La velocidad aconsejada, sin carácter obligatorio.'],
    ['q070','Por su significado específico, ¿qué prohíbe esta señal?','Estacionar en el sector indicado.','Estacionar y toda detención, con el mismo alcance que la señal con dos diagonales.','Estacionar únicamente cuando el conductor abandona el vehículo.'],
    ['q071','¿Qué alcance tiene la prohibición representada por esta señal?','Prohíbe tanto estacionar como detenerse.','Prohíbe estacionar, pero autoriza detenerse para ascenso de pasajeros.','Prohíbe estacionar solo si el conductor deja su puesto.'],
    ['q072','¿Qué maniobra está específicamente prohibida por esta señal?','Realizar un giro en U para invertir el sentido de marcha.','Girar a la izquierda en cualquier intersección posterior.','Tomar una curva que continúe hacia la izquierda.'],
    ['q073','Al llegar a esta señal, ¿qué trayectoria indica?','Girar obligatoriamente a la derecha.','Se permite girar a la derecha o continuar recto.','Se anuncia una curva a la derecha, sin imponer un giro.'],
    ['q074','¿Qué diferencia esta señal de un giro obligatorio?','Advierte una curva de la vía; no ordena doblar en una intersección.','Ordena doblar a la derecha en la siguiente intersección.','Permite elegir entre continuar recto o ingresar a la derecha.'],
    ['q075','¿Qué característica del trazado anuncia esta señal?','Un tramo de camino sinuoso con curvas sucesivas.','Una única curva seguida de una recta.','Un giro obligatorio en la siguiente intersección.'],
    ['q076','Según el dibujo, ¿cómo cambia el ancho de la calzada?','Se estrecha a ambos lados.','Se estrecha únicamente del lado derecho.','Se estrecha únicamente del lado izquierdo.'],
    ['q077','¿Qué cambio de circulación advierte esta señal?','Inicio de circulación en ambos sentidos.','Dos carriles que continúan en un mismo sentido.','Prioridad del vehículo que circula en sentido opuesto.'],
    ['q078','¿Qué tipo de encuentro de vías representa este dibujo?','Una encrucijada con cruce de vías.','Una bifurcación del camino.','Un empalme lateral en T.'],
    ['q079','¿Qué riesgo advierte esta señal, a diferencia de la proyección de piedras?','Derrumbes o caída de material desde el lateral elevado.','Piedras que pueden ser proyectadas por los neumáticos sobre la calzada.','Una calzada con adherencia reducida por agua o aceite.'],
    ['q080','¿Qué situación anuncia esta señal transitoria?','Presencia de trabajos y personas trabajando en la vía.','Cierre total de la vía, aunque no haya otra indicación.','Paso regulado por un banderillero, aunque no se vea uno.'],
    ['q081','¿Qué servicio identifica esta señal?','Un puesto de asistencia sanitaria.','Un puesto de control policial.','Un servicio de asistencia mecánica.'],
    ['q082','¿Qué indica esta señal sobre el uso del lugar?','Estacionamiento permitido, sujeto a las indicaciones del sector.','Estacionamiento reservado exclusivamente al transporte público.','Prohibición de estacionar y detenerse en el sector.'],
    ['q083','La mano contraria parece libre. ¿Puedo cruzar esta demarcación para adelantar?','No: la doble línea continua no habilita el cruce para adelantar.','Sí, si regreso a mi carril antes de que aparezca otro vehículo.','Sí, si anuncio la maniobra y no supero la velocidad máxima.'],
    ['q084','¿A qué uso está destinada la superficie marcada?','Al cruce de peatones.','A la detención de vehículos mientras esperan el semáforo.','Al cruce exclusivo de bicicletas.'],
    ['q117','¿Qué recuerda esta marca en el lugar donde está pintada?','Una o más muertes por un siniestro vial.','Una zona escolar con prioridad peatonal especial.','Un sector de detención reservado a servicios de emergencia.'],
    ['q118','¿Qué advierte la Cruz de San Andrés que aparece en la imagen?','Un cruce ferroviario a nivel.','La proximidad de un cruce de caminos de igual jerarquía.','Un desvío por una vía ferroviaria fuera de servicio.'],
    ['q119','¿Qué efecto tiene esta señal sobre una motocicleta que pretende ingresar?','Prohíbe su circulación por el sector indicado.','Reserva el sector para la circulación exclusiva de motocicletas.','Prohíbe estacionar motocicletas, pero permite circular.'],
    ['q120','¿Qué información anticipa esta señal preventiva?','La proximidad de un semáforo.','La obligación de detenerse en el punto donde está la señal.','La existencia de una onda verde que asegura el paso sin detenerse.']
  ];
  for(const [id,prompt,correct,w1,w2] of signalCases){const q=byId.get(id);q.prompt=prompt;q.options=[{id:'a',text:correct},{id:'b',text:w1},{id:'c',text:w2}];q.revision='2';}
  window.QUESTION_REVIEW={version:'2',date:'2026-10-15',reworded:QUESTIONS.filter(q=>q.revision==='2').length,courseSigns:Object.keys(courseSigns).length};
})();
