import { MainPage } from "../main/main.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class GroupFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.groupData = null;
    }

    getHTML() {
        const isEdit = !!this.id;
        return `
            <div class="header">
                <div class="container">
                    <h1>${isEdit ? '✏️ Редактирование группы' : 'Добавление новой группы'}</h1>
                    <button id="home-button" class="btn btn-home">Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <form id="group-form">
                                    <div class="mb-3">
                                        <label for="groupName" class="form-label">Название группы *</label>
                                        <input type="text" class="form-control" id="groupName" ${isEdit ? '' : 'value="Новая группа"'}>
                                    </div>

                                    <div class="mb-3">
                                        <label for="specialty" class="form-label">Специальность *</label>
                                        <input type="text" class="form-control" id="specialty" ${isEdit ? '' : 'value="Помощь с учебой"'}>
                                    </div>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">Описание</label>
                                        <textarea class="form-control" id="description" rows="3">${isEdit ? '' : 'Помощь с лабораторными работами и домашними заданиями'}</textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="price" class="form-label">Цена (₽/час) *</label>
                                        <input type="number" class="form-control" id="price" ${isEdit ? '' : 'value="1000"'}>
                                    </div>

                                    <div class="mb-3">
                                        <label for="format" class="form-label">Формат</label>
                                        <select class="form-control" id="format">
                                            <option value="Онлайн" selected>Онлайн</option>
                                            <option value="Офлайн">Офлайн</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="rating" class="form-label">Рейтинг (0-5)</label>
                                        <input type="number" step="0.1" min="0" max="5" class="form-control" id="rating" value="4.5">
                                    </div>

                                    <div class="mb-3">
                                        <label for="students" class="form-label">Количество студентов</label>
                                        <input type="number" class="form-control" id="students" value="0">
                                    </div>

                                    <div class="mb-3">
                                        <label for="teacher" class="form-label">Преподаватель</label>
                                        <input type="text" class="form-control" id="teacher" value="Новый куратор">
                                    </div>

                                    <div class="mb-3">
                                        <label for="contact" class="form-label">Контакт (Telegram)</label>
                                        <input type="text" class="form-control" id="contact" value="@new_group">
                                    </div>

                                    <div class="mb-3">
                                        <label for="experience" class="form-label">Опыт работы</label>
                                        <input type="text" class="form-control" id="experience" value="1 год">
                                    </div>

                                    <div class="mb-3">
                                        <label for="services" class="form-label">Услуги (через запятую)</label>
                                        <input type="text" class="form-control" id="services" placeholder="Например: JavaScript, React, Node.js" value="Помощь с лабами, Консультации">
                                    </div>

                                    <div class="alert alert-warning mt-3">
                                        <small>Функция сохранения будет доступна в Лабораторной работе №6.</small>
                                    </div>

                                    <div class="d-flex gap-2">
                                        <button type="button" id="cancel-button" class="btn btn-secondary flex-grow-1">Назад</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadGroupData() {
        if (!this.id) return;

        ajax.get(stockUrls.getGroupById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.groupData = data;
                this.fillForm(data);

            } else {
                this.showNotification('Ошибка загрузки данных группы', 'error');
            }
        });
    }

    fillForm(data) {
        document.getElementById('groupName').value = data.groupName || '';
        document.getElementById('specialty').value = data.specialty || '';
        document.getElementById('description').value = data.description || '';
        document.getElementById('price').value = data.price || '';
        document.getElementById('format').value = data.format || 'Онлайн';
        document.getElementById('rating').value = data.rating || 5;
        document.getElementById('students').value = data.students || 0;
        document.getElementById('teacher').value = data.teacher || '';
        document.getElementById('contact').value = data.contact || '';
        document.getElementById('experience').value = data.experience || '';
        document.getElementById('services').value = (data.services || []).join(', ');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            color: ${type === 'error' ? '#721c24' : '#155724'};
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 1000;
            border-left: 4px solid ${type === 'error' ? '#dc3545' : '#28a745'};
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    setupEventListeners() {
        const cancelBtn = document.getElementById('cancel-button');
        const homeBtn = document.getElementById('home-button');

        cancelBtn?.addEventListener('click', () => {
            new MainPage(this.parent).render();
        });

        homeBtn?.addEventListener('click', () => {
            new MainPage(this.parent).render();
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.setupEventListeners();

        if (this.id) {
            this.loadGroupData();
        }
    }
}
