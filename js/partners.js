/* Список партнёров — просто добавляй новые объекты */
const PARTNERS = [
  {
    name: "Министерство промышленности Кировской области",
    logo: "assets/img/logomiprom.png",
  },
  {
    name: "Банк Хлынов",
    logo: "assets/img/logohlinov.png",
    link: "#"
  },
  {
    name: "Кировский машзавод 1 Мая",
    logo: "assets/img/logomash.png",
    link: "#"
  },
  {
    name: "ООО АПК Дороничи",
    logo: "assets/img/logodoronichi.png",
    link: "#"
  },
  {
    name: "ПАО Т-Плюс",
    logo: "assets/img/logotrgroup.png",
    link: "#"
  }
];

/* ---------- Отрисовка карточек ---------- */
function renderPartners() {
  const grid = document.getElementById('partnersGrid');
  if (!grid) return;

  grid.innerHTML = '';

  PARTNERS.forEach((p, i) => {
    const card = document.createElement(p.link && p.link !== '#' ? 'a' : 'div');
    card.className = 'partner-card';

    if (p.link && p.link !== '#') {
      card.href = p.link;
      card.target = '_blank';
      card.rel = 'noopener';
    }

    // плавное появление с задержкой (каскадная анимация)
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';

    card.innerHTML = `
      <img src="${p.logo}" alt="${p.name}"
           onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 140 100%22><rect width=%22140%22 height=%22100%22 fill=%22%23ede5ff%22/><text x=%2270%22 y=%2255%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22 fill=%22%236a3de8%22>LOGO</text></svg>'">
      <h4>${p.name}</h4>
    `;

    grid.appendChild(card);

    // запускаем анимацию с каскадной задержкой
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

document.addEventListener('DOMContentLoaded', renderPartners);