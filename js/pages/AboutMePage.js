import { BasePage } from './BasePage.js';
import { BIOGRAPHY_POINTS } from '../data/constants.js';
export class AboutMePage extends BasePage {
    constructor() {
        super("Автобиография — Обо мне");
        this.scrollPosition = 0;
    }
    init() {
        super.init(); 
        this.renderBiography();
        this.initModal();
    }
    renderBiography() {
        const stepsContainer = document.getElementById('biography-steps');
        if (!stepsContainer) return;
        const imageTriggers = [
            { 
                keyword: 'Ханымей', 
                image: 'static/images/Yamal.png', 
                alt: 'Ямал' 
            },
            { 
                keyword: 'компьютеры', 
                image: 'static/images/Comp_science.jpg', 
                alt: 'Компьютеры' 
            },
            { 
                keyword: 'Adobe', 
                image: 'static/images/Design.jpg', 
                alt: 'Продукты Adobe' 
            }
        ];
        const wrapKeywords = (text) => {
            let result = text;
            imageTriggers.forEach(trigger => {
                const regex = new RegExp(`(${trigger.keyword})`, 'g');
                result = result.replace(regex, 
                    `<span class="hover-image-trigger" data-image="${trigger.image}" data-alt="${trigger.alt}">$1<span class="hover-image-popup"><img src="${trigger.image}" alt="${trigger.alt}"></span></span>`
                );
            });
            return result;
        };
        stepsContainer.innerHTML = BIOGRAPHY_POINTS
            .map(point => `<li>${wrapKeywords(point)}</li><br>`)
            .join('');
        this.initHoverImages();
    }
    initHoverImages() {
        const triggers = document.querySelectorAll('.hover-image-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                triggers.forEach(t => {
                    if (t !== trigger) t.classList.remove('active');
                });
                trigger.classList.toggle('active');
                e.stopPropagation();
            });
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hover-image-trigger')) {
                triggers.forEach(t => t.classList.remove('active'));
            }
        });
    }
    initModal() {
        const modal = document.getElementById('modalWindow');
        const openBtn = document.getElementById('openButton');
        const closeBtn = document.getElementById('closeButton');
        if (!modal || !openBtn || !closeBtn) return;
        const lockScroll = () => {
            this.scrollPosition = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.style.width = '100%';
        };
        const unlockScroll = () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, this.scrollPosition);
        };
        openBtn.addEventListener('click', () => {
            modal.showModal();
            lockScroll();
        });
        closeBtn.addEventListener('click', () => {
            modal.close();
            unlockScroll();
        });
        modal.addEventListener('close', () => {
            unlockScroll();
        });
    }
}