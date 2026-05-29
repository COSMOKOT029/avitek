/* ============================================================
   ГАЛЕРЕЯ — главная страница
   ============================================================ */

const sidebarList = document.getElementById('siteList');
const mainPhoto   = document.getElementById('mainPhoto');
const objTitle    = document.getElementById('objTitle');
const objText     = document.getElementById('objText');
const narration   = document.getElementById('narration');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
const playBtn     = document.getElementById('playBtn');

let current = 0;

/* ---------- Построение бокового списка ---------- */
function buildSidebar() {
  sidebarList.innerHTML = '';
  SITES.forEach((site, i) => {
    const li = document.createElement('li');
    li.textContent = site.title;
    li.dataset.index = i;
    li.addEventListener('click', () => render(i));
    sidebarList.appendChild(li);
  });
}

/* ---------- Отрисовка выбранного объекта ---------- */
function render(i) {
  current = i;
  const site = SITES[i];

  // плавная смена фото
  mainPhoto.style.opacity = 0;
  setTimeout(() => {
    mainPhoto.src = site.photo;
    mainPhoto.alt = site.title;
    mainPhoto.style.opacity = 1;
  }, 200);

  objTitle.textContent = site.title;
  objText.textContent  = site.text;

  // озвучка
  narration.pause();
  narration.src = site.audio || '';
  playBtn.textContent = '▶';

  // подсветка активного пункта
  document.querySelectorAll('.sidebar li').forEach((li, idx) =>
    li.classList.toggle('active', idx === i)
  );
}

/* ---------- Кнопки навигации ---------- */
prevBtn.addEventListener('click', () => {
  render((current - 1 + SITES.length) % SITES.length);
});

nextBtn.addEventListener('click', () => {
  render((current + 1) % SITES.length);
});

playBtn.addEventListener('click', () => {
  if (!narration.src) return;
  if (narration.paused) {
    narration.play();
    playBtn.textContent = '⏸';
  } else {
    narration.pause();
    playBtn.textContent = '▶';
  }
});

narration.addEventListener('ended', () => {
  playBtn.textContent = '▶';
});

/* ---------- Управление с клавиатуры ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === ' ')          { e.preventDefault(); playBtn.click(); }
});

/* ---------- Стартовая инициализация ---------- */
function init() {
  if (typeof SITES === 'undefined' || !SITES.length) {
    console.error('❌ SITES не загружен!');
    return;
  }
  console.log('✅ Загружено объектов:', SITES.length);

  buildSidebar();

  const hash = location.hash.replace('#', '');
  const idx = hash ? SITES.findIndex(s => s.id === hash) : -1;
  render(idx >= 0 ? idx : 0);
}

window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '');
  const idx = SITES.findIndex(s => s.id === hash);
  if (idx >= 0) render(idx);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}