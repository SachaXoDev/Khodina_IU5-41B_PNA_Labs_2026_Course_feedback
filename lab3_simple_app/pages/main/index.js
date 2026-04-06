import { GroupCardComponent } from "../../components/group-card/group-card.js";
import { GroupDetailPage } from "../group-detail/group-detail.js";
import { store } from "../../store.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = '';
        this.formatFilter = '';
    }

    get groupsContainer() {
        return document.getElementById('groups-container');
    }

    getGroups() {
        return store.getGroups();
    }

    getFormats() {
        const formats = [...new Set(this.getGroups().map(g => g.format))];
        return formats;
    }

    showNotification(message) {
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
            border-left: 4px solid #3d3bff;
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
        const formats = this.getFormats();
        const formatOptions = formats.map(format =>
            `<option value="${format}">${format}</option>`
        ).join('');

        return `
            <div class="header">
                <div class="container">
                    <h1>👥 Обратная связь по курсу</h1>
                    <div class="header-buttons">
                        <button id="home-button" class="btn btn-home">🏠 Домой</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="filters">
                    <div class="row">
                        <div class="col-md-5">
                            <input type="text" id="filter-input" class="filter-input"
                                   placeholder="🔍 Поиск по названию группы..." autocomplete="off">
                        </div>
                        <div class="col-md-4">
                            <select id="format-filter" class="filter-input">
                                <option value="">Все форматы</option>
                                ${formatOptions}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <button id="add-button" class="btn btn-success w-100">+ Добавить группу</button>
                        </div>
                    </div>
                </div>
                <div id="groups-container" class="groups-grid">
                    <!-- Здесь будут карточки групп -->
                </div>
            </div>
        `;
    }

    getFilteredGroups() {
        let filtered = this.getGroups();

        if (this.filterText && this.filterText.trim() !== '') {
            filtered = filtered.filter(group =>
                group.groupName.toLowerCase().includes(this.filterText.toLowerCase())
            );
        }

        if (this.formatFilter && this.formatFilter !== '') {
            filtered = filtered.filter(group =>
                group.format === this.formatFilter
            );
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
                    <div class="alert alert-info" style="border-radius: 20px;">
                        😊 Групп не найдено. Добавьте первую группу!
                    </div>
                </div>
            `;
            return;
        }

        filteredGroups.forEach((item) => {
            const groupCard = new GroupCardComponent(container);
            groupCard.render(
                item,
                this.clickCard.bind(this),
                this.deleteGroup.bind(this)
            );
        });
    }

    addGroup() {
        const groups = this.getGroups();
        const newId = groups.length > 0
            ? Math.max(...groups.map(g => g.id)) + 1
            : 1;

        const newGroup = {
            id: newId,
            src: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            groupName: `Новая группа ${newId}`,
            specialty: "Помощь с учебой",
            description: "Оказываем помощь с лабораторными и домашними заданиями",
            services: ["Помощь с лабами", "Консультации"],
            price: 1000,
            format: "Онлайн",
            rating: 5.0,
            students: 0,
            teacher: "Новый куратор",
            contact: "@new_group",
            experience: "1 год",
            startDate: new Date().toISOString().split('T')[0]
        };

        store.addGroup(newGroup);
        this.renderGroups();
        this.showNotification(`✅ Добавлена группа: "${newGroup.groupName}"`);
    }

    deleteGroup(id) {
        const group = this.getGroups().find(g => g.id === parseInt(id));
        store.deleteGroup(parseInt(id));
        this.renderGroups();
        this.showNotification(`🗑️ Удалена группа: "${group?.groupName || id}"`);
    }

    filterGroups() {
        const filterInput = document.getElementById('filter-input');
        const formatSelect = document.getElementById('format-filter');

        if (filterInput) {
            this.filterText = filterInput.value;
        }
        if (formatSelect) {
            this.formatFilter = formatSelect.value;
        }

        this.renderGroups();
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

        this.renderGroups();

        const addButton = document.getElementById('add-button');
        if (addButton) {
            const newAddButton = addButton.cloneNode(true);
            addButton.parentNode.replaceChild(newAddButton, addButton);
            newAddButton.addEventListener('click', () => this.addGroup());
        }

        const filterInput = document.getElementById('filter-input');
        if (filterInput) {
            filterInput.value = this.filterText;
            filterInput.addEventListener('input', () => this.filterGroups());
        }

        const formatFilter = document.getElementById('format-filter');
        if (formatFilter) {
            formatFilter.value = this.formatFilter;
            formatFilter.addEventListener('change', () => this.filterGroups());
        }

        const homeButton = document.getElementById('home-button');
        if (homeButton) {
            const newHomeButton = homeButton.cloneNode(true);
            homeButton.parentNode.replaceChild(newHomeButton, homeButton);
            newHomeButton.addEventListener('click', () => this.goHome());
        }
    }
}
