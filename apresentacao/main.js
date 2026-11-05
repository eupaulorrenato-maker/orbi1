import './style.css';
import deck from './slides.json';
const mapImage = '/images/presentation-brazil.svg';

const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lines = text => escape(text).replaceAll('\n', '<br>');
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
  next: '<path d="m9 5 7 7-7 7"/>', previous: '<path d="m15 5-7 7 7 7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  full: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  notes: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
}[name]}</svg>`;
const mark = `<svg class="orbit" viewBox="0 0 56 42" fill="none" aria-hidden="true"><ellipse cx="27" cy="23" rx="24" ry="11" transform="rotate(-27 27 23)" stroke="currentColor" stroke-width="2"/><circle cx="47" cy="11" r="4" fill="currentColor"/></svg>`;
const brand = `${mark}<span>orbi<span class="word-travel">travel.</span></span>`;

function renderSlide(slide, index) {
  const dark = ['cover', 'ask', 'closing'].includes(slide.layout);
  const cards = (slide.cards || []).map((card, n) => `<article class="card card-${n + 1}"><div class="card-label">${escape(card.label)}</div>${card.number ? `<div class="card-number">${escape(card.number)}</div>` : ''}<h3>${escape(card.title)}</h3><p>${escape(card.text)}</p></article>`).join('');
  const content = slide.layout === 'cover' ? `<div class="cover-copy"><div class="slide-eyebrow">${escape(slide.eyebrow)}</div><h1>${lines(slide.title)}</h1><p class="cover-lead">${escape(slide.lead)}</p><div class="cover-statement">${escape(slide.statement)}</div><div class="cover-people">Paulo Renato <span>Estratégia e comunicação</span><br>Andersonn Gonçalves <span>Produto e desenvolvimento</span></div></div><div class="cover-map"><img src="${mapImage}" alt=""/><div class="cover-map-label"><span>O PRIMEIRO RECORTE</span><strong>Sergipe</strong><p>Proximidade no início.<br>Aprendizado antes da escala.</p></div></div>` : `<div class="slide-eyebrow">${escape(slide.eyebrow)}</div><h2>${lines(slide.title)}</h2><p class="slide-lead">${escape(slide.lead)}</p><div class="slide-main">${slide.layout === 'hub' ? `<div class="hub-label">${mark}<span>${escape(slide.statement)}</span></div>` : ''}<div class="cards cards-${(slide.cards || []).length}">${cards}</div>${slide.statement && slide.layout !== 'hub' ? `<div class="slide-statement">${escape(slide.statement)}</div>` : ''}</div>`;
  return `<section class="slide layout-${slide.layout} ${dark ? 'dark' : ''}" id="slide-${slide.id}" data-index="${index}" aria-label="Slide ${index + 1}: ${escape(slide.title.replaceAll('\n', ' '))}" ${index ? 'hidden' : ''}><div class="slide-top"><span class="slide-brand">${brand}</span><span class="slide-chapter">${escape(slide.chapter)}<span>APRESENTAÇÃO COMERCIAL</span></span></div><div class="slide-content">${content}</div><footer class="slide-footer"><p>${escape(slide.footer)}</p><span>${String(index + 1).padStart(2, '0')} <i>/ ${deck.slides.length}</i></span></footer></section>`;
}

const chapterStarts = [...new Set(deck.slides.map(s => s.chapter))].map(chapter => ({ chapter, index: deck.slides.findIndex(s => s.chapter === chapter) }));
document.querySelector('#presentation').innerHTML = `
<header class="toolbar"><a class="toolbar-brand" href="/" aria-label="Ir à landing page Orbi Travel">${brand}</a><span class="toolbar-title">Apresentação comercial</span><div class="toolbar-actions"><button id="index-button" aria-label="Abrir índice" aria-haspopup="dialog">${icon('grid')}<span>Índice</span></button><button id="notes-button" aria-label="Mostrar roteiro de fala" aria-expanded="false" aria-controls="presenter-notes">${icon('notes')}<span>Roteiro</span></button><a href="/apresentacao/orbi-travel-apresentacao.pdf" download>${icon('download')}<span>PDF</span></a><a href="/apresentacao/orbi-travel-apresentacao.pptx" download>${icon('download')}<span>PowerPoint</span></a><button id="fullscreen-button" aria-label="Ativar tela cheia">${icon('full')}</button></div></header>
<nav class="chapters" aria-label="Capítulos da apresentação">${chapterStarts.map(({ chapter, index }) => `<button data-go="${index}">${escape(chapter)}</button>`).join('')}</nav>
<main class="workspace"><div class="stage-host"><div id="slide-stage" class="slide-stage" tabindex="-1"><div class="slide-stack">${deck.slides.map(renderSlide).join('')}</div></div></div><aside class="presenter-notes" id="presenter-notes" aria-label="Roteiro do apresentador" hidden><div class="notes-heading"><h2>Roteiro de fala</h2><button id="close-notes" aria-label="Fechar roteiro">${icon('close')}</button></div><div id="notes-content"></div><a class="script-download" href="/apresentacao/roteiro-comercial.md" download>Baixar roteiro completo ↓</a></aside></main>
<footer class="controls"><span class="keyboard-hint">← → avançar · F tela cheia · N roteiro</span><div class="page-controls"><button id="previous" aria-label="Slide anterior">${icon('previous')}</button><span id="slide-counter" role="status" aria-live="polite"></span><button id="next" aria-label="Próximo slide">${icon('next')}</button></div><span id="chapter-label"></span></footer><div class="progress-track" aria-hidden="true"><span id="slide-progress"></span></div>
<dialog id="index-dialog" aria-labelledby="index-title"><div class="index-heading"><div><p>ORBI TRAVEL</p><h2 id="index-title">Escolha um slide</h2></div><button id="close-index" aria-label="Fechar índice">${icon('close')}</button></div><div class="index-grid">${deck.slides.map((s, i) => `<button data-go="${i}"><span>${String(i + 1).padStart(2, '0')} · ${escape(s.chapter)}</span><strong>${escape(s.title.replaceAll('\n', ' '))}</strong></button>`).join('')}</div></dialog>`;

const slides = [...document.querySelectorAll('.slide')];
let current = 0;
const indexDialog = document.querySelector('#index-dialog');
const notesPanel = document.querySelector('#presenter-notes');
function renderNotes() {
  const s = deck.slides[current];
  document.querySelector('#notes-content').innerHTML = `<div class="notes-meta"><span>${escape(s.owner)}</span><span>~${s.seconds} segundos</span></div><h3>${escape(s.title.replaceAll('\n', ' '))}</h3><p>${escape(s.notes)}</p><div class="notes-transition"><strong>Ponte ao próximo slide</strong><p>${escape(s.transition)}</p></div>`;
  notesPanel.scrollTop = 0;
}
function go(index, updateHash = true) {
  current = Math.max(0, Math.min(deck.slides.length - 1, index));
  slides.forEach((s, i) => { s.hidden = i !== current; });
  document.querySelector('#slide-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${deck.slides.length}`;
  document.querySelector('#previous').disabled = current === 0;
  document.querySelector('#next').disabled = current === deck.slides.length - 1;
  document.querySelector('#slide-progress').style.width = `${(current + 1) / deck.slides.length * 100}%`;
  document.querySelector('#chapter-label').textContent = deck.slides[current].chapter;
  document.querySelectorAll('.chapters button').forEach(button => {
    const active = deck.slides[Number(button.dataset.go)].chapter === deck.slides[current].chapter;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current');
  });
  document.querySelectorAll('.index-grid button').forEach(button => { button.setAttribute('aria-current', String(Number(button.dataset.go) === current)); });
  if (updateHash) history.replaceState(null, '', '#' + deck.slides[current].id);
  renderNotes();
  document.title = `${current + 1}. ${deck.slides[current].title.replaceAll('\n', ' ')} — Orbi Travel`;
  if (window.innerWidth <= 800) window.scrollTo({ top: 0, behavior: 'instant' });
}
function fromHash() {
  const index = deck.slides.findIndex(s => s.id === location.hash.slice(1));
  go(index === -1 ? 0 : index, false);
}
function resize() {
  const host = document.querySelector('.stage-host');
  const availableHeight = Math.max(240, innerHeight - document.querySelector('.toolbar').offsetHeight - document.querySelector('.chapters').offsetHeight - 98);
  const scale = Math.max(.1, Math.min((host.clientWidth - 32) / 1600, availableHeight / 900, 1.4));
  document.documentElement.style.setProperty('--deck-scale', scale);
}
function toggleNotes() {
  const open = notesPanel.hidden;
  notesPanel.hidden = !open;
  document.querySelector('.workspace').classList.toggle('with-notes', open);
  document.querySelector('#notes-button').setAttribute('aria-expanded', open);
  resize();
}
async function fullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();
  } catch {
    document.querySelector('.keyboard-hint').textContent = 'Tela cheia indisponível neste navegador. Use o modo de apresentação normalmente.';
  }
}
document.querySelector('#previous').addEventListener('click', () => go(current - 1));
document.querySelector('#next').addEventListener('click', () => go(current + 1));
document.querySelector('#notes-button').addEventListener('click', toggleNotes);
document.querySelector('#close-notes').addEventListener('click', toggleNotes);
document.querySelector('#index-button').addEventListener('click', () => indexDialog.showModal());
document.querySelector('#close-index').addEventListener('click', () => indexDialog.close());
document.querySelector('#fullscreen-button').addEventListener('click', fullscreen);
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => { go(Number(button.dataset.go)); if (indexDialog.open) indexDialog.close(); }));
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || indexDialog.open || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && event.target === document.body)) { event.preventDefault(); go(current + 1); }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(current - 1); }
  if (event.key === 'Home') { event.preventDefault(); go(0); }
  if (event.key === 'End') { event.preventDefault(); go(deck.slides.length - 1); }
  if (event.key.toLowerCase() === 'n') { event.preventDefault(); toggleNotes(); }
  if (event.key.toLowerCase() === 'f') { event.preventDefault(); fullscreen(); }
});
document.addEventListener('fullscreenchange', () => {
  const full = Boolean(document.fullscreenElement);
  document.querySelector('#fullscreen-button').setAttribute('aria-label', full ? 'Sair da tela cheia' : 'Ativar tela cheia');
  resize();
});
window.addEventListener('hashchange', fromHash);
window.addEventListener('resize', resize);
new ResizeObserver(resize).observe(document.querySelector('.stage-host'));
document.fonts.ready.then(resize);
fromHash();
resize();
