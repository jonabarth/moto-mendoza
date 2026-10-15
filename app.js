(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const KEY = 'en-dos-ruedas-v1';
  const bank = new Map(QUESTIONS.map(q => [q.id, q]));
  const scopes = {mendoza:'Mendoza',national:'Nación',common:'Tema común'};
  const modes = {practice:'PRÁCTICA LIBRE',exam:'SIMULACRO DE ENTRENAMIENTO',errors:'REPASO DE ERRORES',bookmarks:'PREGUNTAS GUARDADAS'};
  let state = {errors:[],bookmarks:[],session:null};
  let storageOK = true;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if(raw && Array.isArray(raw.errors) && Array.isArray(raw.bookmarks)) {
      state.errors = raw.errors.filter(id => bank.has(id));
      state.bookmarks = raw.bookmarks.filter(id => bank.has(id));
      const s = raw.session;
      if(s && modes[s.mode] && Array.isArray(s.items) && s.items.length && Number.isInteger(s.index) && s.index>=0 && s.index<s.items.length && s.items.every(item => {
        const q=bank.get(item.id);
        return q && Array.isArray(item.order) && item.order.length===q.options.length && new Set(item.order).size===q.options.length && item.order.every(id=>q.options.some(o=>o.id===id)) && (item.answer===null || q.options.some(o=>o.id===item.answer));
      })) state.session=s;
    }
  } catch { storageOK=false; }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;} showStorage();}
  function showStorage(){if(!storageOK){$('#storage-note').textContent='No se pudo guardar el progreso. La práctica funciona durante esta visita.';$('#storage-note').classList.add('warning');}}
  // Fisher–Yates con aleatoriedad del navegador; IDs independientes del orden.
  function shuffle(array){const a=[...array];for(let i=a.length-1;i>0;i--){let n;if(window.crypto?.getRandomValues){const u=new Uint32Array(1);const limit=Math.floor(4294967296/(i+1))*(i+1);do{crypto.getRandomValues(u);}while(u[0]>=limit);n=u[0]%(i+1);}else{n=Math.floor(Math.random()*(i+1));}[a[i],a[n]]=[a[n],a[i]];}return a;}
  function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function start({onlyIds,forcePractice=false}={}){
    const mode=forcePractice?'practice':$('#mode').value;
    const scope=$('#scope').value,topic=$('#topic').value;
    let pool=QUESTIONS.filter(q=>(scope==='all'||q.scope==='common'||q.scope===scope)&&(topic==='all'||q.topic===topic));
    if(onlyIds) pool=pool.filter(q=>onlyIds.includes(q.id));
    if(mode==='errors')pool=pool.filter(q=>state.errors.includes(q.id));
    if(mode==='bookmarks')pool=pool.filter(q=>state.bookmarks.includes(q.id));
    let chosen=shuffle(pool);
    if(mode==='exam') {
      // Reparto de entrenamiento propio: incluir temas distintos sin cupos oficiales.
      const groups=shuffle([...new Set(pool.map(q=>q.topic))]).map(t=>shuffle(pool.filter(q=>q.topic===t)));
      chosen=[];
      while(chosen.length<40 && groups.some(g=>g.length))for(const g of groups){if(g.length&&chosen.length<40)chosen.push(g.pop());}
      chosen=shuffle(chosen);
    }
    state.session=chosen.length?{mode,scope,topic,index:0,finished:false,items:chosen.map(q=>({id:q.id,order:shuffle(q.options.map(o=>o.id)),answer:null}))}:null;
    save();render();
  }
  function current(){return state.session?.items[state.session.index];}
  function stats(){const items=state.session?.items||[];const answered=items.filter(i=>i.answer!==null);const good=answered.filter(i=>i.answer===bank.get(i.id).correct).length;$('#answered-stat').textContent=answered.length;$('#accuracy-stat').textContent=answered.length?Math.round(good/answered.length*100)+'%':'—';$('#errors-stat').textContent=state.errors.length;}
  function render(){
    stats();
    const s=state.session;
    $('#question-navigation').classList.toggle('hidden',!s||s.finished);
    $('.question-map').classList.toggle('hidden',!s);
    $('#session-label').textContent=s?modes[s.mode]:modes[$('#mode').value];
    if(!s){$('#position').textContent='0 preguntas';$('#progress-fill').style.width='0%';$('#question-card').innerHTML='<div class="empty"><p class="eyebrow">TODO LISTO PARA PRACTICAR</p><h2>No hay preguntas con estos filtros.</h2><p>Si elegiste errores o guardadas, primero respondé o guardá preguntas. También podés cambiar el tema o la jurisdicción.</p><button class="primary" id="empty-start">Ir a práctica libre</button></div>';$('#empty-start').onclick=()=>{$('#mode').value='practice';$('#topic').value='all';start();};return;}
    const answered=s.items.filter(i=>i.answer!==null).length;
    $('#position').textContent=`${s.index+1} / ${s.items.length}`;
    $('#progress-fill').style.width=(answered/s.items.length*100)+'%';
    renderMap();
    if(s.finished){results();return;}
    const item=current(),q=bank.get(item.id),isAnswered=item.answer!==null;
    const sign=SIGNS.find(x=>x.id===q.sign);
    $('#question-card').innerHTML=`<div class="question-meta"><span class="tag">${escape(q.topic)}</span><span class="scope-tag">${scopes[q.scope]}</span><button class="bookmark ${state.bookmarks.includes(q.id)?'saved':''}" aria-pressed="${state.bookmarks.includes(q.id)}" id="bookmark">${state.bookmarks.includes(q.id)?'★ Guardada':'☆ Guardar'}</button></div><h2 tabindex="-1" id="question-heading">${escape(q.prompt)}</h2>${sign?`<div class="question-image" role="img" aria-label="Señal de tránsito para identificar. El significado se informa después de responder.">${sign.svg}</div>`:''}<div class="options" role="group" aria-labelledby="question-heading">${item.order.map((id,i)=>{
      const option=q.options.find(o=>o.id===id);
      const good=isAnswered&&id===q.correct,bad=isAnswered&&item.answer===id&&!good;
      return `<button class="option ${good?'correct':''} ${bad?'wrong':''}" data-option="${id}" ${isAnswered?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escape(option.text)}</span>${good?'<span class="answer-mark" aria-label="Respuesta correcta">✓</span>':bad?'<span class="answer-mark" aria-label="Respuesta incorrecta">✕</span>':''}</button>`;
    }).join('')}</div><div id="feedback" aria-live="polite" aria-atomic="true">${isAnswered?feedback(q,item):''}</div>`;
    $('#bookmark').onclick=()=>{state.bookmarks=state.bookmarks.includes(q.id)?state.bookmarks.filter(x=>x!==q.id):[...state.bookmarks,q.id];save();render();$('#bookmark').focus();};
    document.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>answer(b.dataset.option));
    $('#previous').disabled=s.index===0;
    $('#next').textContent=s.index===s.items.length-1?'Ver resultado →':'Siguiente →';
  }
  function feedback(q,item){const good=item.answer===q.correct;return `<div class="feedback ${good?'':'wrong'}" role="status"><strong>${good?'✓ ¡Correcto!':'✕ Esta no era la respuesta.'}</strong>${!good?`<p><strong>Respuesta correcta:</strong> ${escape(q.options.find(o=>o.id===q.correct).text)}</p>`:''}<p>${escape(q.explanation)}</p><a href="${SOURCES[q.source].url}" target="_blank" rel="noopener noreferrer">${escape(SOURCES[q.source].title)} · ${escape(q.ref)} ↗</a></div>`;}
  function answer(id){const item=current();if(!item||item.answer!==null||state.session.finished)return;const q=bank.get(item.id);if(!q.options.some(o=>o.id===id))return;item.answer=id;if(id===q.correct)state.errors=state.errors.filter(x=>x!==q.id);else if(!state.errors.includes(q.id))state.errors.push(q.id);save();render();$('#next').focus();}
  function renderMap(){const s=state.session;$('#map-count').textContent=`· ${s.items.filter(i=>i.answer!==null).length} de ${s.items.length} respondidas`;$('#question-grid').innerHTML=s.items.map((item,i)=>`<button class="q-jump ${i===s.index?'current':''} ${item.answer===null?'':item.answer===bank.get(item.id).correct?'good':'bad'} ${state.bookmarks.includes(item.id)?'marked':''}" data-jump="${i}" aria-label="Pregunta ${i+1}, ${item.answer===null?'sin responder':item.answer===bank.get(item.id).correct?'correcta':'incorrecta'}" ${i===s.index?'aria-current="step"':''}>${i+1}</button>`).join('');document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{s.index=Number(b.dataset.jump);s.finished=false;save();render();focusQuestion();});}
  function focusQuestion(){$('#question-heading')?.focus({preventScroll:true});if(window.innerWidth<651)$('#quiz-area').scrollIntoView({behavior:'auto',block:'start'});}
  function finish(){if(!state.session)return;state.session.finished=true;save();render();$('#results-heading')?.focus();}
  function results(){const s=state.session;const answered=s.items.filter(i=>i.answer!==null),good=answered.filter(i=>i.answer===bank.get(i.id).correct).length;const wrong=answered.length-good;$('#position').textContent='INTENTO FINALIZADO';const topics=[...new Set(s.items.map(i=>bank.get(i.id).topic))];$('#question-card').innerHTML=`<div class="results"><p class="eyebrow">CADA INTENTO SUMA</p><h2 id="results-heading" tabindex="-1">Tu práctica, en perspectiva.</h2><div class="score">${Math.round(good/s.items.length*100)}<small style="font-size:28px">%</small></div><p><strong>${good} correctas</strong> · ${wrong} incorrectas · ${s.items.length-answered.length} sin responder</p><p class="micro">Porcentaje sobre todas las preguntas del intento. Es una referencia de estudio; no certifica aprobación del examen oficial.</p><div class="result-breakdown">${topics.map(t=>{const group=s.items.filter(i=>bank.get(i.id).topic===t);return `<p><span>${escape(t)}</span><strong>${group.filter(i=>i.answer===bank.get(i.id).correct).length} / ${group.length}</strong></p>`;}).join('')}</div><div class="result-actions"><button class="primary" id="retry">Repetir y mezclar ↻</button><button class="secondary" id="review-errors" ${wrong?'':'disabled'}>Practicar estos errores</button><button class="text-button" id="review-attempt">Revisar el intento</button></div></div>`;$('#retry').onclick=()=>start({onlyIds:s.items.map(i=>i.id),forcePractice:s.mode==='errors'||s.mode==='bookmarks'});$('#review-errors').onclick=()=>{const ids=answered.filter(i=>i.answer!==bank.get(i.id).correct).map(i=>i.id);$('#mode').value='practice';start({onlyIds:ids,forcePractice:true});};$('#review-attempt').onclick=()=>{s.finished=false;s.index=0;save();render();focusQuestion();};}
  function view(name){for(const v of ['practice','signs','method','sources'])$(`#${v}-view`).classList.toggle('hidden',name!==v);document.querySelectorAll('.tab').forEach(b=>{const active=b.dataset.view===name;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
  const topics=[...new Set(QUESTIONS.map(q=>q.topic))].sort((a,b)=>a.localeCompare(b,'es'));
  for(const t of topics){const o=document.createElement('option');o.value=t;o.textContent=t;$('#topic').append(o);}
  $('#start').onclick=()=>{start();focusQuestion();};
  $('#previous').onclick=()=>{if(state.session.index>0){state.session.index--;save();render();focusQuestion();}};
  $('#next').onclick=()=>{if(state.session.index<state.session.items.length-1){state.session.index++;save();render();focusQuestion();}else finish();};
  $('#finish').onclick=finish;
  $('#reset').onclick=()=>$('#reset-dialog').showModal();
  $('#cancel-reset').onclick=()=>$('#reset-dialog').close();
  $('#confirm-reset').onclick=()=>{state={errors:[],bookmarks:[],session:null};$('#mode').value='practice';$('#topic').value='all';$('#scope').value='mendoza';$('#reset-dialog').close();start();focusQuestion();};
  function gallery(){const query=$('#sign-search').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const found=SIGNS.filter(s=>(s.name+' '+s.category).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query));$('#sign-gallery').innerHTML=found.length?found.map(s=>`<button class="sign-tile" data-sign="${s.id}"><span role="img" aria-label="${escape(s.name)}">${s.svg}</span><span class="tag">${s.category}</span><strong>${escape(s.name)}</strong><p>${escape(s.meaning)}</p><span class="micro">Practicar esta señal ↗</span></button>`).join(''):'<p>No se encontraron señales.</p>';document.querySelectorAll('[data-sign]').forEach(b=>b.onclick=()=>{const q=QUESTIONS.find(q=>q.sign===b.dataset.sign);$('#mode').value='practice';$('#topic').value='all';start({onlyIds:[q.id],forcePractice:true});view('practice');focusQuestion();});}
  $('#sign-search').oninput=gallery;
  $('#sources-list').innerHTML=[...['sanrafael','sanrafaelpractico','sanrafaelpista','senalesansv','estrella','metodologia','curso'].map(k=>SOURCES[k]),...Object.entries(SOURCES).filter(([k])=>!['sanrafael','sanrafaelpractico','sanrafaelpista','senalesansv','estrella','metodologia','curso'].includes(k)).map(([,v])=>v)].map(s=>`<article class="source-item"><h3><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a></h3><p>${escape(s.note)}</p></article>`).join('');
  if(state.session){$('#mode').value=state.session.mode;$('#topic').value=state.session.topic;$('#scope').value=state.session.scope;render();}else start();
  gallery();showStorage();view('practice');
})();
