/* ============================================================
   ВРЕМЕННАЯ ШКАЛА
   Показывает один объект в разные годы.
   В data.js timeline — это ОБЪЕКТ вида { год: 'путь/к/фото' }.
   ============================================================ */

const tlSel     = document.getElementById('tlSelect');
const tlTitle   = document.getElementById('tlTitle');
const tlPhoto   = document.getElementById('tlPhoto');
const tlCaption = document.getElementById('tlCaption');
const yearsBar  = document.getElementById('yearsBar');

let currentSite = null;   // текущий объект

/* Есть ли у объекта непустая шкала */
function hasTimeline(s) {
  return s.timeline && Object.keys(s.timeline).length > 0;
}

/* ---------- Заполняем dropdown (только объекты со шкалой) ---------- */
function buildSelect() {
  SITES.forEach((s, i) => {
    if (!hasTimeline(s)) return;       // пропускаем объекты без годов
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = s.title;
    tlSel.appendChild(opt);
  });
}

/* ---------- Показать конкретный год ---------- */
function showYear(year, img, btn) {
  // плавная смена фото
  tlPhoto.style.opacity = 0;
  setTimeout(() => {
    tlPhoto.src = img;
    tlPhoto.style.opacity = 1;
  }, 200);

  tlCaption.textContent = `${currentSite.title} — ${year} год`;

  // подсветка активной кнопки
  yearsBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ---------- Построить кнопки годов для объекта ---------- */
function buildYears(site) {
  yearsBar.innerHTML = '';

  // годы из ключей объекта, отсортированные по возрастанию
  const years = Object.keys(site.timeline)
    .map(Number)
    .sort((a, b) => a - b);

  years.forEach((year, idx) => {
    const img = site.timeline[year];
    const btn = document.createElement('button');
    btn.textContent = year;
    btn.addEventListener('click', () => showYear(year, img, btn));
    yearsBar.appendChild(btn);

    // первый (самый ранний) год показываем сразу
    if (idx === 0) showYear(year, img, btn);
  });
}

/* ---------- Загрузка объекта ---------- */
function loadSite(i) {
  const s = SITES[i];
  if (!s || !hasTimeline(s)) return;

  currentSite = s;
  tlTitle.textContent = s.title;
  buildYears(s);
}

/* ---------- Реакция на смену объекта ---------- */
tlSel.addEventListener('change', e => loadSite(+e.target.value));

/* ---------- Старт ---------- */
buildSelect();
const firstIdx = SITES.findIndex(hasTimeline);
if (firstIdx >= 0) {
  tlSel.value = firstIdx;
  loadSite(firstIdx);
}