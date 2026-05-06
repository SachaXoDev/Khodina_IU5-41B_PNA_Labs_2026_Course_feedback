import { GroupCardComponent } from "../../components/studentsgroup-card/studentsgroup-card.js";
import { GroupDetailPage } from "../studentsgroup-detail/studentsgroup-detail.js";
import { GroupFormPage } from "../group-form/group-form.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = '';
        this.formatFilter = '';
        this.allGroups = [];
    }

    get groupsContainer() {
        return document.getElementById('groups-container');
    }

    showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 400px;
            white-space: pre-line;
            font-family: monospace;
            font-size: 14px;
            border-left: 4px solid ${isError ? '#dc3545' : '#3d3bff'};
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getHTML() {
        const formats = [
            { value: '', label: 'Все форматы' },
            { value: 'Онлайн', label: 'Онлайн' },
            { value: 'Офлайн', label: 'Офлайн' }
        ];
        const formatOptions = formats.map(f =>
            `<option value="${f.value}">${f.label}</option>`
        ).join('');

        return `
            <div class="header">
                <div class="container">
                    <h1>👥 Обратная связь по курсу</h1>
                    <div class="header-buttons">
                        <button id="home-button" class="btn btn-home">Домой</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="filters">
                    <div class="row">
                        <div class="col-md-5">
                            <input type="text" id="filter-input" class="filter-input"
                                   placeholder="Поиск по названию группы..." autocomplete="off">
                        </div>
                        <div class="col-md-3">
                            <select id="format-filter" class="filter-input">
                                ${formatOptions}
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button id="search-button" class="btn btn-primary w-100">Найти</button>
                        </div>
                        <div class="col-md-2">
                            <button id="add-button" class="btn btn-success w-100">+ Добавить</button>
                        </div>
                    </div>
                </div>
                <div id="groups-container" class="groups-grid">
                    <div class="text-center p-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Загрузка...</span>
                        </div>
                        <p class="mt-2">Загрузка групп...</p>
                    </div>
                </div>
            </div>
        `;
    }

    getData() {
        ajax.get(stockUrls.getGroups(), (data, status) => {
            if (status === 200 && data && Array.isArray(data)) {
                this.allGroups = data;
                this.renderGroups();
            } else {
                this.showNotification('Ошибка загрузки групп!', true);
                this.groupsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">Ошибка загрузки данных с сервера</div>
                    </div>
                `;
            }
        });
    }

    getFilteredGroups() {
        let filtered = [...this.allGroups];

        if (this.filterText && this.filterText.trim() !== '') {
            filtered = filtered.filter(group =>
                group.groupName.toLowerCase().includes(this.filterText.toLowerCase())
            );
        }

        if (this.formatFilter && this.formatFilter !== '') {
            filtered = filtered.filter(group => group.format === this.formatFilter);
        }

        return filtered;
    }

    renderGroups() {
        const container = this.groupsContainer;
        if (!container) return;
        container.innerHTML = '';
        const filteredGroups = this.getFilteredGroups();

        if (filteredGroups.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">Групп не найдено. Добавьте первую группу!</div>
                </div>
            `;
            return;
        }

        filteredGroups.forEach(group => {
            const groupCard = new GroupCardComponent(container);
            groupCard.render(
                group,
                this.clickCard.bind(this),
                this.deleteGroup.bind(this),
                this.editGroup.bind(this)
            );
        });
    }

    addGroupPage() {
        const groupForm = new GroupFormPage(this.parent, null);
        groupForm.render();
    }

    editGroup(id) {
        const groupForm = new GroupFormPage(this.parent, id);
        groupForm.render();
    }

    performSearch() {
        const filterInput = document.getElementById('filter-input');
        const formatSelect = document.getElementById('format-filter');

        if (filterInput) this.filterText = filterInput.value;
        if (formatSelect) this.formatFilter = formatSelect.value;

        this.renderGroups();
    }

    resetFilters() {
        this.filterText = '';
        this.formatFilter = '';

        const filterInput = document.getElementById('filter-input');
        const formatSelect = document.getElementById('format-filter');

        if (filterInput) filterInput.value = '';
        if (formatSelect) formatSelect.value = '';

        this.renderGroups();
    }

    deleteGroup(id) {
        if (confirm('Вы уверены, что хотите удалить эту группу?')) {
            ajax.delete(stockUrls.deleteGroup(id), (data, status) => {
                if (status === 200 || status === 204) {
                    this.showNotification('✅ Группа удалена');
                    this.getData();
                } else {
                    this.showNotification('❌ Ошибка при удалении группы', true);
                }
            });
        }
    }

    clickCard(id) {
        const groupPage = new GroupDetailPage(this.parent, id);
        groupPage.render();
    }

    goHome() {
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.getData();

        document.getElementById('add-button')?.addEventListener('click', () => this.addGroupPage());

        document.getElementById('search-button')?.addEventListener('click', () => this.performSearch());

        document.getElementById('filter-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
