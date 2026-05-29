/* ============================================================
   АРХИВНЫЕ СРАВНЕНИЯ
   Слайдер сравнивает два изображения одного объекта:
   старое и современное.
   ============================================================ */

const sel      = document.getElementById('cmpSelect');
const nowImg   = document.getElementById('nowImg');
const oldImg   = document.getElementById('oldImg');
const oldWrap  = document.getElementById('oldWrap');
const slider   = document.getElementById('slider');

/* ---------- Заполняем dropdown списком объектов ---------- */
function buildSelect() {
  SITES.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = s.title;
    sel.appendChild(opt);
  });
}

/* ---------- Загрузка пары изображений ---------- */
function loadCompare(i) {
  const s = SITES[i];
  if (!s.archive) return;

  // плавная смена
  nowImg.style.opacity = 0;
  oldImg.style.opacity = 0;

  setTimeout(() => {
    nowImg.src = s.archive.now;
    oldImg.src = s.archive.old;
    nowImg.style.opacity = 1;
    oldImg.style.opacity = 1;
  }, 200);

  // выравниваем ширину старого фото под ширину нового
  // (важно для корректного отображения внутри overflow:hidden)
  nowImg.onload = () => {
    oldImg.style.width = nowImg.offsetWidth + 'px';
  };
}

/* ---------- Реакция на смену объекта ---------- */
sel.addEventListener('change', e => loadCompare(+e.target.value));

/* ---------- Реакция на ползунок ---------- */
slider.addEventListener('input', e => {
  oldWrap.style.width = e.target.value + '%';
});

/* ---------- Дополнительно: перетаскивание мышью по самой картинке ---------- */
let dragging = false;
const cmp = document.getElementById('cmp');

function setByEvent(clientX) {
  const rect = cmp.getBoundingClientRect();
  let pct = ((clientX - rect.left) / rect.width) * 100;
  pct = Math.max(0, Math.min(100, pct));
  oldWrap.style.width = pct + '%';
  slider.value = pct;
}

cmp.addEventListener('mousedown',  e => { dragging = true;  setByEvent(e.clientX); });
window.addEventListener('mousemove', e => { if (dragging) setByEvent(e.clientX); });
window.addEventListener('mouseup',   () => dragging = false);

// поддержка тач-экранов
cmp.addEventListener('touchstart', e => setByEvent(e.touches[0].clientX), {passive:true});
cmp.addEventListener('touchmove',  e => setByEvent(e.touches[0].clientX), {passive:true});

/* ---------- Пересчёт при изменении окна ---------- */
window.addEventListener('resize', () => {
  oldImg.style.width = nowImg.offsetWidth + 'px';
});

/* ---------- Старт ---------- */
buildSelect();
loadCompare(0);