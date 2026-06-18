export const SKILLS = [
    "Основы Python", 
    "Основы HTML/CSS", 
    "Основы C#"
];
export const HOBBIES = [
    "Баскетбол (более 7 лет)", 
    "Тренажёрный зал", 
    "Монтаж видео"
];
export const BIOGRAPHY_POINTS = [
    "Родился и вырос на севере в маленьком посёлке Ханымей",
    "С детства ходил на всякие кружки, секции: рисование, пение, роботоконструирование, баскетбол",
    "С ранних лет меня увлекали <strong>компьютеры,</strong> поэтому в школе мне нравилась информатика",
    "Как раз информатику и выбрал как основной экзамен. В ходе подготовки изучил основы Python, познакомился с Figma",
    "Успешно сдал экзамены и поступил в <em>ТюмГУ,</em> где продолжаю учиться и набираться опыта",
    "Изучил C#, HTML/CSS, PostgreSQL",
    "В универе познакомился с продуктами Adobe: Photoshop, Animate, Illustrator, AfterEffects и с InkScape"
];
export const PROJECTS = [
    {
        id: 1,
        title: "Проект 1",
        image: "static/images/project.jpg",
        description: "Website, имеющий возможность выгружать данные в csv файл с помощью python-функции",
        technologies: ["Python", "HTML", "CSS"],
        links: [
            { text: "Посмотреть проект", url: "https://google.com/" },
            { text: "Исходный код на GitHub", url: "https://github.com/" }
        ]
    },
    {
        id: 2,
        title: "Проект 2",
        image: "static/images/project.jpg",
        description: "Приложение в Windows Forms для учёта объектов недвижимости для агентства недвижимости",
        technologies: ["C#", "PostgreSQL"],
        links: [
            { text: "Посмотреть проект", url: "https://google.com/" },
            { text: "Исходный код на GitHub", url: "https://github.com/" }
        ]
    },
    {
        id: 3,
        title: "Проект 3",
        image: "static/images/project.jpg",
        description: "Динамический Website с использованием JavaScript",
        technologies: ["JavaScript", "HTML", "CSS"],
        links: [
            { text: "Посмотреть проект", url: "https://google.com/" },
            { text: "Исходный код на GitHub", url: "https://github.com/" }
        ]
    },
    {
        id: 4,
        title: "Проект 4",
        image: "static/images/project.jpg",
        description: "Блог-платформа с системой аутентификации, админ-панелью для управления статьями и комментариями пользователей",
        technologies: ["Python", "Django"],
        links: [
            { text: "Посмотреть проект", url: "https://google.com/" },
            { text: "Исходный код на GitHub", url: "https://github.com/" }
        ]
    }
];