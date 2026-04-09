import { store } from "../../store.js";

export class GroupCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        for (let i = 1; i <= 5; i++) {
            stars += i <= fullStars ? '⭐' : '☆';
        }
        return stars;
    }

    getHTML(data) {
        const stars = this.getStars(data.rating);
        const servicesList = data.services.map(s =>
            `<span class="service-tag">${s}</span>`
        ).join('');

        return `
            <div class="col-md-4 mb-4" data-group-id="${data.id}">
                <div class="card group-card h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${data.src}" width="50" height="50" alt="${data.groupName}">
                            <div class="ms-3">
                                <h5 class="card-title mb-0">${data.groupName}</h5>
                                <small class="text-muted">${data.specialty}</small>
                            </div>
                        </div>
                        <p class="card-text">${data.description}</p>
                        <div class="services-tags mb-2">
                            ${servicesList}
                        </div>
                        <div class="rating mb-2">
                            ${stars}
                            <small class="text-muted ms-2">${data.rating}/5</small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="price">${data.price} ₽/час</span>
                                <small class="text-muted d-block">${data.students} студентов</small>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-outline-primary btn-sm copy-btn" data-id="${data.id}">
                                    📋 Копировать
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${data.id}">
                                    🗑️ Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    copyGroup(id, onUpdate) {
        const groups = store.getGroups();
        const originalGroup = groups.find(g => g.id === parseInt(id));

        if (originalGroup) {
            const newId = Math.max(...groups.map(g => g.id)) + 1;
            const copiedGroup = {
                ...originalGroup,
                id: newId,
                groupName: `${originalGroup.groupName} (копия)`
            };
            store.addGroup(copiedGroup);
            onUpdate();
            this.showNotification(`✅ Группа "${originalGroup.groupName}" скопирована`);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    addListeners(data, onDelete, onUpdate) {
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);
        const copyBtn = document.querySelector(`.copy-btn[data-id="${data.id}"]`);

        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => onDelete(data.id));
        }

        if (copyBtn) {
            copyBtn.addEventListener("click", () => this.copyGroup(data.id, onUpdate));
        }
    }

    render(data, onDelete, onUpdate) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onDelete, onUpdate);
    }
}
