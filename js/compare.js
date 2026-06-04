/* ============================================================
   АРХИВНЫЕ СРАВНЕНИЯ
   Слайдер сравнивает два изображения одного объекта:
   старое (архив) и современное.
   ============================================================ */

const sel     = document.getElementById('cmpSelect');
const nowImg  = document.getElementById('nowImg');
const oldImg  = document.getElementById('oldImg');
const oldWrap = document.getElementById('oldWrap');
const slider  = document.getElementById('slider');
const handle  = document.getElementById('handle');
const cmp     = document.getElementById('cmp');

/* ---------- Заполняем dropdown (только объекты с архивом) ---------- */
function buildSelect() {
  SITES.forEach((s, i) => {
    if (!s.archive) return;            // пропускаем объекты без пары «было/стало»
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = s.title;
    sel.appendChild(opt);
  });
}

/* ---------- Установить положение шторки (в процентах) ---------- */
function setPosition(pct) {
  pct = Math.max(0, Math.min(100, pct));
  oldWrap.style.width = pct + '%';
  handle.style.left   = pct + '%';
  slider.value = pct;
}

/* ---------- Подгоняем ширину старого фото под контейнер ---------- */
function syncWidth() {
  const w = cmp.clientWidth;
  if (w) cmp.style.setProperty('--cmp-w', w + 'px');
}

/* ---------- Загрузка пары изображений ---------- */
function loadCompare(i) {
  const s = SITES[i];
  if (!s || !s.archive) return;

  // плавная смена
  nowImg.style.opacity = 0;
  oldImg.style.opacity = 0;

  setTimeout(() => {
    nowImg.src = s.archive.now;
    oldImg.src = s.archive.old;
    nowImg.style.opacity = 1;
    oldImg.style.opacity = 1;
  }, 200);

  // когда новое фото загрузилось — пересчитываем ширину и сбрасываем шторку на центр
  nowImg.onload = () => {
    syncWidth();
    setPosition(50);
  };
}

/* ---------- Реакция на смену объекта ---------- */
sel.addEventListener('change', e => loadCompare(+e.target.value));

/* ---------- Реакция на ползунок ---------- */
slider.addEventListener('input', e => setPosition(+e.target.value));

/* ---------- Перетаскивание мышью прямо по картинке ---------- */
let dragging = false;

function setByEvent(clientX) {
  const rect = cmp.getBoundingClientRect();
  const pct = ((clientX - rect.left) / rect.width) * 100;
  setPosition(pct);
}

cmp.addEventListener('mousedown', e => { dragging = true; setByEvent(e.clientX); });
window.addEventListener('mousemove', e => { if (dragging) setByEvent(e.clientX); });
window.addEventListener('mouseup',   () => dragging = false);

/* ---------- Поддержка тач-экранов ---------- */
cmp.addEventListener('touchstart', e => setByEvent(e.touches[0].clientX), { passive: true });
cmp.addEventListener('touchmove',  e => setByEvent(e.touches[0].clientX), { passive: true });

/* ---------- Пересчёт при изменении окна ---------- */
window.addEventListener('resize', () => {
  syncWidth();
  setPosition(slider.value);
});

/* ---------- Старт ---------- */
function setSplit(val) {
  // прилипание к краям
  if (val <= 2)  val = 0;
  if (val >= 98) val = 100;

  const fullW = cmp.clientWidth;       // ширина всего контейнера
  oldWrap.style.width = val + '%';     // двигаем шторку
  oldImg.style.width  = fullW + 'px';  // фото = вся ширина, не сжимается
  handle.style.left   = val + '%';
}

slider.addEventListener('input', () => setSplit(Number(slider.value)));
window.addEventListener('resize', () => setSplit(Number(slider.value)));
setSplit(Number(slider.value)); // инициализация

buildSelect();
// выбираем первый объект, у которого есть архив
const firstIdx = SITES.findIndex(s => s.archive);
if (firstIdx >= 0) {
  sel.value = firstIdx;
  loadCompare(firstIdx);
}