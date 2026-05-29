/* ============================================================
   ВРЕМЕННАЯ ШКАЛА
   Показывает, как менялся выбранный объект в разные годы.
   Список годов берётся из TIMELINE_YEARS (data.js).
   ============================================================ */

const tlSelect  = document.getElementById('tlSelect');
const tlTitle   = document.getElementById('tlTitle');
const tlPhoto   = document.getElementById('tlPhoto');
const tlCaption = document.getElementById('tlCaption');
const yearsBar  = document.getElementById('yearsBar');

let currentSite = 0;
let currentYear = TIMELINE_YEARS[0];

/* ---------- Заполняем dropdown списком объектов ---------- */
function buildSelect() {
  SITES.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = s.title;
    tlSelect.appendChild(opt);
  });
}

/* ---------- Создаём кнопки годов ---------- */
function buildYears() {
  yearsBar.innerHTML = '';
  TIMELINE_YEARS.forEach(year => {
    const btn = document.createElement('button');
    btn.textContent = year;
    btn.dataset.year = year;
    btn.addEventListener('click', () => showYear(year));
    yearsBar.appendChild(btn);
  });
}

/* ---------- Показ конкретного года ---------- */
function showYear(year) {
  const site = SITES[currentSite];
  const src  = site.timeline[year];

  if (!src) {
    tlCaption.textContent = `Нет фотографии для ${year} года`;
    return;
  }

  currentYear = year;

  // плавная смена
  tlPhoto.style.opacity = 0;
  setTimeout(() => {
    tlPhoto.src = src;
    tlPhoto.alt = `${site.title}, ${year} год`;
    tlPhoto.style.opacity = 1;
  }, 300);

  tlCaption.textContent = `${site.title} — ${year} год`;

  // подсветка активной кнопки
  document.querySelectorAll('.years button').forEach(b =>
    b.classList.toggle('active', +b.dataset.year === year)
  );
}

/* ---------- Загрузка объекта ---------- */
function loadSite(i) {
  currentSite = i;
  tlTitle.textContent = SITES[i].title;
  // показать первый год, для которого есть фото
  const firstYear = TIMELINE_YEARS.find(y => SITES[i].timeline[y]) || TIMELINE_YEARS[0];
  showYear(firstYear);
}

/* ---------- Реакция на смену объекта ---------- */
tlSelect.addEventListener('change', e => loadSite(+e.target.value));

/* ---------- Клавиатура: стрелки переключают годы ---------- */
document.addEventListener('keydown', e => {
  const idx = TIMELINE_YEARS.indexOf(currentYear);
  if (e.key === 'ArrowLeft'  && idx > 0)
    showYear(TIMELINE_YEARS[idx - 1]);
  if (e.key === 'ArrowRight' && idx < TIMELINE_YEARS.length - 1)
    showYear(TIMELINE_YEARS[idx + 1]);
});

/* ---------- Старт ---------- */
buildSelect();
buildYears();
loadSite(0);