import { store } from "../../store.js";

export class GroupDetailComponent {
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

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    getHTML(data) {
        const stars = this.getStars(data.rating);
        const isPalindrome = store.isPalindrome(data.groupName);
        const startDate = this.formatDate(data.startDate);

        const palindromeBadge = isPalindrome
            ? '<span class="badge bg-success">🔁 Название-палиндром</span>'
            : '<span class="badge bg-secondary">❌ Не палиндром</span>';

        const servicesList = data.services.map(s =>
            `<li><strong>${s}</strong> - помощь с лабораторными и проектами</li>`
        ).join('');

        return (
            `
                <div class="card group-detail-card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex align-items-center mb-4">
                                    <img src="${data.src}" width="80" height="80" alt="${data.groupName}">
                                    <div class="ms-3">
                                        <h2 class="mb-2">${data.groupName}</h2>
                                        <p class="mb-1"><strong>${data.specialty}</strong></p>
                                        ${palindromeBadge}
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-6">
                                        <h5>📋 Информация о группе</h5>
                                        <table class="table table-borderless">
                                            <tr>
                                                <td><strong>Описание услуг:</strong></td>
                                                <td>${data.description}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Услуги:</strong></td>
                                                <td><ul class="mb-0">${servicesList}</ul></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Стоимость:</strong></td>
                                                <td class="price">${data.price} ₽/час</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Формат:</strong></td>
                                                <td>${data.format}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>⭐ Рейтинг и контакты</h5>
                                        <table class="table table-borderless">
                                            <tr>
                                                <td><strong>Рейтинг:</strong></td>
                                                <td>${stars} (${data.rating}/5)</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Студентов в группе:</strong></td>
                                                <td>${data.students}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Контакты:</strong></td>
                                                <td><code>${data.contact}</code></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Преподаватель-куратор:</strong></td>
                                                <td>${data.teacher}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Опыт помощи:</strong></td>
                                                <td>${data.experience}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Начало сотрудничества:</strong></td>
                                                <td>${startDate}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="alert alert-info mt-3">
                                    <strong>Как связаться:</strong> Напишите в Telegram: ${data.contact} для получения консультации!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
