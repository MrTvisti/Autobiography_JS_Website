import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
export class BasePage {
    constructor(title) {
        this.title = title;
        this.header = new Header();
        this.footer = new Footer();
    }
    init() {
        document.title = this.title;
        this.renderCommonElements();
        this.initStatistics();
        document.body.classList.add('page-ready');
        document.body.removeAttribute('hidden');
    }
    renderCommonElements() {
        const headerLayout = document.getElementById('header-layout');
        if (headerLayout) {
            headerLayout.innerHTML = this.header.render();
        }
        const footerLayout = document.getElementById('footer-layout');
        if (footerLayout) {
            footerLayout.innerHTML = this.footer.render();
        }
    }
    initStatistics() {
        let visits = parseInt(localStorage.getItem('visits')) || 0;
        this.sessionStartTime = Date.now();
        if (!sessionStorage.getItem('session_active')) {
            visits++;
            localStorage.setItem('visits', visits);
            sessionStorage.setItem('session_active', 'true');
        }
        this.displayStats(visits);
        window.addEventListener('beforeunload', () => {
            let totalTime = parseInt(localStorage.getItem('totalTime')) || 0;
            let sessionDuration = Math.floor((Date.now() - this.sessionStartTime) / 1000);
            localStorage.setItem('totalTime', totalTime + sessionDuration);
        });
        const resetButton = document.getElementById('reset-stats');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                localStorage.removeItem('visits');
                localStorage.removeItem('totalTime');
                sessionStorage.removeItem('session_active');
                visits = 0;
                this.sessionStartTime = Date.now();
                localStorage.setItem('totalTime', 0);
                this.displayStats(visits);
                alert("Статистика успешно сброшена!");
            });
        }
    }
    displayStats(visits) {
        const visitCounter = document.getElementById('visit-count');
        const avgCounter = document.getElementById('avg-time');
        let totalTime = parseInt(localStorage.getItem('totalTime')) || 0;
        if (visitCounter && avgCounter) {
            visitCounter.innerText = visits;
            let averageTime = visits > 0 ? (totalTime / visits).toFixed(1) : 0;
            avgCounter.innerText = averageTime;
        }
    }
}