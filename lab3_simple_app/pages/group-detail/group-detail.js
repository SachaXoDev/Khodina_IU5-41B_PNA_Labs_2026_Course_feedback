import { store } from "../../store.js";

export class GroupDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get groupContainer() {
        return document.getElementById('group-container');
    }

    getData() {
        const groups = store.getGroups();
        return groups.find(g => g.id === this.id) || null;
    }

    getStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        for (let i = 1; i <= 5; i++) {
            stars += i <= fullStars ? '⭐' : '☆';
        }
        return stars;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    getHTML(data) {
        if (!data) {
            return `
                <div class="container mt-4">
                    <div class="alert alert-danger">
                        <h4>Группа не найдена</h4>
                        <p>Запрошенная группа не существует или была удалена.</p>
                    </div>
                </div>
            `;
        }

        const stars = this.getStars(data.rating);
        const startDate = this.formatDate(data.startDate);
        const servicesList = data.services.map(s =>
            `<span class="service-tag">${s}</span>`
        ).join('');

        return `
            <div class="header">
                <div class="container">
                    <h1>Детали группы</h1>
                    <button id="home-button" class="btn btn-home">Домой</button>
                </div>
            </div>
            <div class="container mt-4">

                <div class="detail-card">
                    <div class="detail-header">
                        <img src="${data.src}" width="80" height="80" alt="${data.groupName}">
                        <div class="detail-title">
                            <h2>${data.groupName}</h2>
                            <p class="specialty">${data.specialty}</p>
                        </div>
                    </div>

                    <div class="detail-content">
                        <div class="detail-section">
                            <h3>Описание услуг</h3>
                            <p>${data.description}</p>
                        </div>

                        <div class="detail-section">
                            <h3>Доступные услуги</h3>
                            <div class="services-tags">
                                ${servicesList}
                            </div>
                        </div>

                        <div class="detail-grid">
                            <div class="detail-info">
                                <h3>Стоимость</h3>
                                <p class="price">${data.price} ₽/час</p>
                            </div>
                            <div class="detail-info">
                                <h3>Рейтинг</h3>
                                <p>${stars} (${data.rating}/5)</p>
                            </div>
                            <div class="detail-info">
                                <h3>Формат</h3>
                                <p>${data.format}</p>
                            </div>
                            <div class="detail-info">
                                <h3>Студентов</h3>
                                <p>${data.students} человек</p>
                            </div>
                        </div>

                        <div class="detail-section">
                            <h3>👨‍🏫 Преподаватель</h3>
                            <p>${data.teacher}</p>
                        </div>

                        <div class="detail-section">
                            <h3>📞 Контакты</h3>
                            <p><code>${data.contact}</code></p>
                        </div>

                        <div class="detail-section">
                            <h3>💼 Опыт работы</h3>
                            <p>${data.experience}</p>
                        </div>

                        <div class="detail-section">
                            <h3>📅 Начало сотрудничества</h3>
                            <p>${startDate}</p>
                        </div>
                        <button id="back-button" class="btn btn-outline-primary mb-4">
                    ← Назад к списку
                </button>
                    </div>
                </div>
            </div>
        `;
    }

    copyGroup() {
        const originalGroup = this.getData();
        if (originalGroup) {
            const groups = store.getGroups();
            const newId = Math.max(...groups.map(g => g.id)) + 1;
            const copiedGroup = {
                ...originalGroup,
                id: newId,
                groupName: `${originalGroup.groupName} (копия)`
            };
            store.addGroup(copiedGroup);
            this.showNotification(`✅ Группа "${originalGroup.groupName}" скопирована`);
            setTimeout(() => {
                this.goBack();
            }, 1500);
        }
    }

    deleteGroup() {
        if (confirm('Вы уверены, что хотите удалить эту группу?')) {
            const group = this.getData();
            store.deleteGroup(this.id);
            this.showNotification(`🗑️ Удалена группа: "${group?.groupName}"`);
            setTimeout(() => {
                this.goBack();
            }, 1500);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    goBack() {
        import("../main/index.js").then(module => {
            const MainPage = module.MainPage;
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }

    goHome() {
        import("../main/index.js").then(module => {
            const MainPage = module.MainPage;
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }

    render() {
        const data = this.getData();
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        document.getElementById('back-button')?.addEventListener('click', () => this.goBack());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
        document.getElementById('copy-group-btn')?.addEventListener('click', () => this.copyGroup());
        document.getElementById('delete-group-btn')?.addEventListener('click', () => this.deleteGroup());
    }
}
