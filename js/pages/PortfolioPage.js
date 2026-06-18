import { BasePage } from './BasePage.js';
import { PROJECTS } from '../data/constants.js';
export class PortfolioPage extends BasePage {
    constructor() {
        super("Автобиография — Портфолио");
        this.usersData = [];
        this.originalUsersData = [];
        this.sortStates = {
            id: 'none',
            name: 'none',
            username: 'none',
            email: 'none',
            company: 'none'
        };
    }
    init() {
        super.init();
        this.initProjectFilters();
        this.renderProjects(PROJECTS);
        this.loadTableData();
        this.initTableControls();
        this.initResetButton();
    }
    initProjectFilters() {
        const searchInput = document.getElementById('project-search');
        const techSelect = document.getElementById('tech-filter');
        const handleFilter = () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const selectedTech = techSelect.value;
            const filtered = PROJECTS.filter(project => {
                const matchesSearch = project.title.toLowerCase().includes(searchText) || 
                                     project.description.toLowerCase().includes(searchText) ||
                                     project.technologies.some(t => t.toLowerCase().includes(searchText));
                const matchesTech = selectedTech === "" || project.technologies.includes(selectedTech);
                return matchesSearch && matchesTech;
            });
            this.renderProjects(filtered);
        };
        if (searchInput) searchInput.addEventListener('input', handleFilter);
        if (techSelect) techSelect.addEventListener('change', handleFilter);
    }
    renderProjects(projectsList) {
        const container = document.getElementById('projects-layout');
        if (!container) return;
        if (projectsList.length === 0) {
            container.innerHTML = `<p style="color: #6A66AF; text-align: center; width: 100%;">Проекты не найдены...</p>`;
            return;
        }
        container.innerHTML = projectsList.map(project => {
            const techHTML = project.technologies.map(t => `<li>${t}</li>`).join('');
            const linksHTML = project.links.map(l => `<li><a href="${l.url}" target="_blank">${l.text}</a></li>`).join('');
            return `
                <div class="card">
                    <div class="card_top">
                        <h2 class="project_caption">${project.title}</h2>
                        <p><img class="project_image" src="${project.image}" alt="${project.title}"></p>
                    </div>
                    <div class="text11">
                        <div class="card_text">
                            <p class="p1">${project.description}</p>
                            <br>
                            <p class="p1 point">
                                Список использованных технологий:
                                <ul class="points">${techHTML}</ul>
                            </p>
                            <br>
                            <p class="p1 point">
                                Ссылки:
                                <ul class="points">${linksHTML}</ul>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    async loadTableData() {
        const tableLayout = document.getElementById('table-layout');
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Ошибка при загрузке таблицы данных');
            this.usersData = await response.json();
            this.originalUsersData = [...this.usersData];
            this.renderTable(this.usersData);
        } catch (error) {
            if (tableLayout) {
                tableLayout.innerHTML = `<p style="color: red; text-align: center;">Не удалось загрузить данные таблицы: ${error.message}</p>`;
            }
        }
    }
    initTableControls() {
        const tableSearch = document.getElementById('table-search');
        if (tableSearch) {
            tableSearch.addEventListener('input', (e) => {
                const text = e.target.value.toLowerCase().trim();
                const filtered = this.usersData.filter(user => 
                    user.id.toString().includes(text) ||
                    user.name.toLowerCase().includes(text) ||
                    user.username.toLowerCase().includes(text) ||
                    user.email.toLowerCase().includes(text) ||
                    user.company.name.toLowerCase().includes(text)
                );                
                this.renderTable(filtered);
            });
        }
    }
    initResetButton() {
        const resetBtn = document.getElementById('reset-table-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.usersData = [...this.originalUsersData];
                Object.keys(this.sortStates).forEach(key => {
                    this.sortStates[key] = 'none';
                });
                const tableSearch = document.getElementById('table-search');
                if (tableSearch) tableSearch.value = '';
                this.renderTable(this.usersData);
            });
        }
    }
    sortByField(field) {Ы
        const currentState = this.sortStates[field];
        let newState;
        if (currentState === 'none') newState = 'asc';
        else if (currentState === 'asc') newState = 'desc';
        else newState = 'none';
        this.sortStates[field] = newState;
        if (newState === 'none') {
            this.usersData = [...this.originalUsersData];
        } else {
            this.usersData.sort((a, b) => {
                let valA, valB;
                if (field === 'company') {
                    valA = a.company.name;
                    valB = b.company.name;
                } else {
                    valA = a[field];
                    valB = b[field];
                }
                let comparison = 0;
                if (typeof valA === 'number') {
                    comparison = valA - valB;
                } else {
                    comparison = String(valA).localeCompare(String(valB), 'ru');
                }
                return newState === 'asc' ? comparison : -comparison;
            });
        }
        this.renderTable(this.usersData);
    }
    getSortIcon(field) {
        const state = this.sortStates[field];
        if (state === 'asc') return '&#9650;';   
        if (state === 'desc') return '&#9660;';   
        return '&#8645;';                         
    }
    renderMobileSortControls() {
        const mobileSortContainer = document.getElementById('mobile-sort-controls');
        if (!mobileSortContainer) return;
        const fields = [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Имя' },
            { key: 'username', label: 'Username' },
            { key: 'email', label: 'Email' },
            { key: 'company', label: 'Компания' }
        ];
        mobileSortContainer.innerHTML = fields.map(field => `
            <button class="mobile-sort-btn" data-field="${field.key}">
                ${field.label} ${this.getSortIcon(field.key)}
            </button>
        `).join('');
        document.querySelectorAll('.mobile-sort-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sortByField(btn.dataset.field);
            });
        });
    }
    renderTable(usersList) {
        const tableLayout = document.getElementById('table-layout');
        if (!tableLayout) return;
        if (usersList.length === 0) {
            tableLayout.innerHTML = `<p style="color: #e6b448; text-align: center;">Сотрудники не найдены...</p>`;
            return;
        }
        const rowsHTML = usersList.map(user => `
            <tr>
                <td data-label="ID">${user.id}</td>
                <td data-label="Имя">${user.name}</td>
                <td data-label="Username">${user.username}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="Компания">${user.company.name}</td>
            </tr>
        `).join('');
        tableLayout.innerHTML = `
            <div id="mobile-sort-controls" class="mobile-sort-controls"></div>
            <table class="modern-table">
                <thead>
                    <tr>
                        <th><span class="th-content">ID <button class="sort-btn" data-field="id" title="Сортировать по ID">${this.getSortIcon('id')}</button></span></th>
                        <th><span class="th-content">Имя <button class="sort-btn" data-field="name" title="Сортировать по имени">${this.getSortIcon('name')}</button></span></th>
                        <th><span class="th-content">Username <button class="sort-btn" data-field="username" title="Сортировать по Username">${this.getSortIcon('username')}</button></span></th>
                        <th><span class="th-content">Email <button class="sort-btn" data-field="email" title="Сортировать по Email">${this.getSortIcon('email')}</button></span></th>
                        <th><span class="th-content">Компания <button class="sort-btn" data-field="company" title="Сортировать по компании">${this.getSortIcon('company')}</button></span></th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
        `;
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.sortByField(btn.dataset.field);
            });
        });
        this.renderMobileSortControls();
    }
}