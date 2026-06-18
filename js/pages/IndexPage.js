import { BasePage } from './BasePage.js';
import { SKILLS, HOBBIES } from '../data/constants.js';
import { simpleGreeting } from '../utils/date.js';
export class IndexPage extends BasePage {
    constructor() {
        super("Автобиография — Главная");
    }
    init() {
        super.init(); 
        simpleGreeting(); 
        this.renderContent();
    }
    renderContent() {
        const listLayout = document.getElementById('dynamic-lists-layout');
        if (!listLayout) return;
        const skillsHTML = SKILLS.map(skill => `<li>${skill}</li>`).join('');
        const hobbiesHTML = HOBBIES.map(hobby => `<li>${hobby}</li>`).join('');
        listLayout.innerHTML = `
        <div class="text t_2">
            <div class="row">
                <div class="el_t_2 url">
                    <a href="about_me.html">Узнать больше обо мне</a>
                </div>
            </div>
            <div class="row">
                <div class="el_t_2 url"> 
                    <a href="skills.html">Навыки</a>
                </div>
                <ul class="el_t_2">
                    ${skillsHTML}
                </ul>
            </div>
            <div class="row">
                <div class="el_t_2 url">
                    <a href="#">Хобби</a>
                </div>
                <ul class="el_t_2">
                    ${hobbiesHTML}
                </ul>
            </div>
        </div>
        `;
    }
}