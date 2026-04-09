import { GroupCardComponent } from "../../components/group-card/group-card.js";
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

    getHTML() {
        return `
            <div class="header">
                <div class="container">
                    <h1>👥 Образовательные услуги</h1>
                    <button id="home-button" class="btn btn-home">🏠 Домой</button>
                </div>
            </div>
            <div class="container">
                <div class="filters">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" id="filter-input" class="filter-input"
                                   placeholder="🔍 Поиск по названию группы..." autocomplete="off">
                        </div>
                        <div class="col-md-6">
                            <select id="format-filter" class="filter-input">
                                <option value="">Все форматы</option>
                                <option value="Онлайн">Онлайн</option>
                                <option value="Офлайн">Офлайн</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="groups-container" class="groups-grid"></div>
            </div>
        `;
    }

    getFilteredGroups() {
        let filtered = store.getGroups();

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
                    <div class="alert alert-info">Групп не найдено</div>
                </div>
            `;
            return;
        }

        filteredGroups.forEach(group => {
            const groupCard = new GroupCardComponent(container);
            groupCard.render(
                group,
                this.deleteGroup.bind(this),
                this.renderGroups.bind(this)
            );
        });
    }

    deleteGroup(id) {
        const group = store.getGroups().find(g => g.id === parseInt(id));
        store.deleteGroup(parseInt(id));
        this.renderGroups();

        // Показать уведомление
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = `🗑️ Удалена группа: "${group?.groupName || id}"`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    filterGroups() {
        const filterInput = document.getElementById('filter-input');
        const formatSelect = document.getElementById('format-filter');

        if (filterInput) this.filterText = filterInput.value;
        if (formatSelect) this.formatFilter = formatSelect.value;

        this.renderGroups();
    }

    goHome() {
        this.filterText = '';
        this.formatFilter = '';
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.renderGroups();

        document.getElementById('filter-input')?.addEventListener('input', () => this.filterGroups());
        document.getElementById('format-filter')?.addEventListener('change', () => this.filterGroups());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
