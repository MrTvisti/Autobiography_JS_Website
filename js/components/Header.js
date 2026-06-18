export class Header {
    render() {
        const currentPath = window.location.pathname;
        const getActiveClasses = (pageName) => {
            const isActive = (pageName === 'index.html' && (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/'))) || currentPath.includes(pageName);
            return isActive 
                ? { btn: 'button_active', link: 'link_active' } 
                : { btn: '', link: '' };
        };
        const getLeftPanelClasses = (pageName) => {
            const isActive = (pageName === 'index.html' && (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/'))) || currentPath.includes(pageName);
            return isActive 
                ? { btn: 'lp_button_active', link: 'lp_link_active' } 
                : { btn: '', link: '' };
        };
        const idx = getActiveClasses('index.html');
        const abt = getActiveClasses('about_me.html');
        const skl = getActiveClasses('skills.html');
        const prt = getActiveClasses('portfolio.html');
        const cnt = getActiveClasses('contacts.html');
        const lpIdx = getLeftPanelClasses('index.html');
        const lpAbt = getLeftPanelClasses('about_me.html');
        const lpSkl = getLeftPanelClasses('skills.html');
        const lpPrt = getLeftPanelClasses('portfolio.html');
        const lpCnt = getLeftPanelClasses('contacts.html');
        return `
        <input type="checkbox" id="menu-toggle" class="menu-toggle">
        <label for="menu-toggle" class="burger_img">
            <img class="burger_img" src="static/images/burger_lines.png" alt="Меню">
        </label>
        <header>
            <nav>
                <h1>Автобиография</h1>
                <div class="header_button ${idx.btn}"><a href="index.html" class="header_link ${idx.link}">Главная</a></div>
                <div class="header_button ${abt.btn}"><a href="about_me.html" class="header_link ${abt.link}">Обо мне</a></div>
                <div class="header_button ${skl.btn}"><a href="skills.html" class="header_link ${skl.link}">Навыки</a></div>
                <div class="header_button ${prt.btn}"><a href="portfolio.html" class="header_link ${prt.link}">Портфолио</a></div>
                <div class="header_button ${cnt.btn}"><a href="contacts.html" class="header_link ${cnt.link}">Контакты</a></div>
            </nav>
        </header>
        <label for="menu-toggle" class="left_panel">
            <img src="static/images/back_arrow.png" alt="Закрыть меню" class="lp_img">
            <p class="lp_caption">Автобиография</p>
            <a href="index.html" class="header_button lp_button ${lpIdx.btn}">
                <span class="header_link lp_link ${lpIdx.link}">Главная</span>
            </a>
            <a href="about_me.html" class="header_button lp_button ${lpAbt.btn}">
                <span class="header_link lp_link ${lpAbt.link}">Обо мне</span>
            </a>
            <a href="skills.html" class="header_button lp_button ${lpSkl.btn}">
                <span class="header_link lp_link ${lpSkl.link}">Навыки</span>
            </a>
            <a href="portfolio.html" class="header_button lp_button ${lpPrt.btn}">
                <span class="header_link lp_link ${lpPrt.link}">Портфолио</span>
            </a>
            <a href="contacts.html" class="header_button lp_button ${lpCnt.btn}">
                <span class="header_link lp_link ${lpCnt.link}">Контакты</span>
            </a>
        </label>
        `;
    }
}