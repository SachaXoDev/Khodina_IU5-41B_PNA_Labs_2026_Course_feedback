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
        const isPalindrome = store.isPalindrome(data.groupName);

        const palindromeBadge = isPalindrome
            ? '<span class="badge bg-success ms-2">🔁 Палиндром</span>'
            : '<span class="badge bg-secondary ms-2">❌ Не палиндром</span>';

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
                                <h5 class="card-title mb-0">
                                    ${data.groupName}
                                    ${palindromeBadge}
                                </h5>
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
                                <small class="text-muted d-block">👥 ${data.students} студентов</small>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-primary btn-sm view-btn" data-id="${data.id}">
                                    🔍 Подробнее
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

    addListeners(data, onView, onDelete) {
        const viewBtn = document.querySelector(`.view-btn[data-id="${data.id}"]`);
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);

        if (viewBtn) {
            viewBtn.addEventListener("click", () => onView(data.id));
        }
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => onDelete(data.id));
        }
    }

    render(data, onView, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onView, onDelete);
    }
}
