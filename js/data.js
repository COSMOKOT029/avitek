/* ============================================================
   Данные о памятниках. Один объект = одна достопримечательность.
   Поля:
   - id        : уникальный идентификатор (латиница)
   - title     : название
   - text      : краткое описание (для блока «Информация»)
   - photo     : главное фото
   - audio     : файл озвучки (mp3)
   - coords    : координаты точки на плане {x,y} в процентах
   - archive   : пара «было/стало» для страницы сравнений
   - timeline  : объект {год: фото} для временной шкалы
   ============================================================ */

const SITES = [
  {
    id: 'gostiny',
    title: 'Проходная',
    text: 'Описание проходной',
    photo: 'assets/img/21.jpg',
    audio: 'assets/audio/gostiny.mp3',
    coords: { x: 28, y: 42 },
    archive: {
      old: 'assets/img/21.jpg',
      now: 'assets/img/23.jpg'
    },
    timeline: {
      1935: 'assets/img/21.jpg',
      1970: 'assets/img/3.jpg',
      2026: 'assets/img/23.jpg'
    }
  },
  {
    id: 'cathedral',
    title: 'Цех',
    text: 'Описание цеха',
    photo: 'assets/img/6.jpg',
    audio: 'assets/audio/cathedral.mp3',
    coords: { x: 55, y: 30 },
    archive: {
      old: 'assets/img/cathedral_old.jpg',
      now: 'assets/img/cathedral_now.jpg'
    },
    timeline: {
      1935: 'assets/img/6.jpg',
      1945: 'assets/img/23.jpg',
      1970: 'assets/img/23.jpg',
      2026: 'assets/img/23.jpg'
    }
  },
  {
    id: 'townhall',
    title: 'Экспонаты',
    text: 'Описание экспонатов',
    photo: 'assets/img/12.jpg',
    audio: 'assets/audio/townhall.mp3',
    coords: { x: 70, y: 55 },
    archive: {
      old: 'assets/img/12.jpg',
      now: 'assets/img/13.jpg'
    },
    timeline: {
      1935: 'assets/img/12.jpg',
      1970: 'assets/img/13.jpg',
      2026: 'assets/img/15.jpg'
    }
  },
  {
    id: 'theatre',
    title: 'Документы завода',
    text: 'Описание документов завода',
    photo: 'assets/img/9.jpg',
    audio: 'assets/audio/theatre.mp3',
    coords: { x: 45, y: 70 },
    archive: {
      old: 'assets/img/9.jpg',
      now: 'assets/img/8.jpg'
    },
    timeline: {
      1935: 'assets/img/9.jpg',
      1970: 'assets/img/8.jpg'
    }
  },
  {
    id: 'zavod1',
    title: 'Завод тест',
    text: 'Описание тест',
    photo: 'assets/img/23.jpg',
    audio: 'assets/audio/gostiny.mp3',
    coords: { x: 28, y: 42 },
  }
];

/* Список годов для временной шкалы (можно менять) */
const TIMELINE_YEARS = [1935, 1970, 2026];