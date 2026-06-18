import { IndexPage } from './pages/IndexPage.js';
import { AboutMePage } from './pages/AboutMePage.js';
import { SkillsPage } from './pages/SkillsPage.js';
import { PortfolioPage } from './pages/PortfolioPage.js';
import { ContactsPage } from './pages/ContactsPage.js';
function router() {
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        const indexPage = new IndexPage();
        indexPage.init();
    } 
    else if (path.includes('about_me.html')) {
        const aboutPage = new AboutMePage();
        aboutPage.init();
    } 
    else if (path.includes('skills.html')) {
        const skillsPage = new SkillsPage();
        skillsPage.init();
    } 
    else if (path.includes('portfolio.html')) {
        const portfolioPage = new PortfolioPage();
        portfolioPage.init();
    } 
    else if (path.includes('contacts.html')) {
        const contactsPage = new ContactsPage();
        contactsPage.init();
    } 
    else {
        console.warn(`Роутер: Для пути "${path}" не найдено совпадений.`);
        document.body.classList.add('page-ready');
    }
}
window.addEventListener('DOMContentLoaded', router);
setTimeout(() => {
    if (!document.body.classList.contains('page-ready')) {
        document.body.classList.add('page-ready');
    }
}, 3000);
