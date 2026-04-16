// pages/group-form/group-form.js

import { MainPage } from "../main/main.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class GroupFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id; // Если id есть - режим редактирования
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
                                        <input type="text" class="form-control" id="groupName" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="specialty" class="form-label">Специальность *</label>
                                        <input type="text" class="form-control" id="specialty" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">Описание</label>
                                        <textarea class="form-control" id="description" rows="3"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="price" class="form-label">Цена (₽/час) *</label>
                                        <input type="number" class="form-control" id="price" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="format" class="form-label">Формат *</label>
                                        <select class="form-control" id="format">
                                            <option value="Онлайн">Онлайн</option>
                                            <option value="Офлайн">Офлайн</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="rating" class="form-label">Рейтинг</label>
                                        <input type="number" step="0.1" min="0" max="5" class="form-control" id="rating">
                                    </div>

                                    <div class="mb-3">
                                        <label for="students" class="form-label">Количество студентов</label>
                                        <input type="number" class="form-control" id="students">
                                    </div>

                                    <div class="mb-3">
                                        <label for="teacher" class="form-label">Преподаватель</label>
                                        <input type="text" class="form-control" id="teacher">
                                    </div>

                                    <div class="mb-3">
                                        <label for="contact" class="form-label">Контакт (Telegram)</label>
                                        <input type="text" class="form-control" id="contact">
                                    </div>

                                    <div class="mb-3">
                                        <label for="experience" class="form-label">Опыт работы</label>
                                        <input type="text" class="form-control" id="experience">
                                    </div>

                                    <div class="mb-3">
                                        <label for="services" class="form-label">Услуги (через запятую)</label>
                                        <input type="text" class="form-control" id="services" placeholder="Например: JavaScript, React, Node.js">
                                    </div>

                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-primary flex-grow-1">
                                            ${isEdit ? 'Сохранить изменения' : 'Создать группу'}
                                        </button>
                                        <button type="button" id="cancel-button" class="btn btn-secondary">❌ Отмена</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Загрузка данных для редактирования
    loadGroupData() {
        if (!this.id) return;

        ajax.get(stockUrls.getGroupById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.groupData = data;
                this.fillForm(data);
            } else {
                this.showNotification('❌ Ошибка загрузки данных группы', 'error');
            }
        });
    }

    // Заполнение формы данными
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

    // Сбор данных из формы
    getFormData() {
        const servicesStr = document.getElementById('services').value;
        const services = servicesStr ? servicesStr.split(',').map(s => s.trim()) : [];

        return {
            groupName: document.getElementById('groupName').value,
            specialty: document.getElementById('specialty').value,
            description: document.getElementById('description').value,
            price: parseInt(document.getElementById('price').value) || 0,
            format: document.getElementById('format').value,
            rating: parseFloat(document.getElementById('rating').value) || 5,
            students: parseInt(document.getElementById('students').value) || 0,
            teacher: document.getElementById('teacher').value,
            contact: document.getElementById('contact').value,
            experience: document.getElementById('experience').value,
            services: services,
            src: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        };
    }

    // Валидация формы
    validateForm(data) {
        if (!data.groupName) {
            this.showNotification('❌ Введите название группы', 'error');
            return false;
        }
        if (!data.specialty) {
            this.showNotification('❌ Введите специальность', 'error');
            return false;
        }
        if (!data.price || data.price <= 0) {
            this.showNotification('❌ Введите корректную цену', 'error');
            return false;
        }
        return true;
    }

    // Создание новой группы
    updateGroup(formData) {
        ajax.patch(stockUrls.updateGroup(this.id), formData, (data, status) => {
            if (status === 200) {
                this.showNotification('✅ Группа успешно обновлена!');
                setTimeout(() => {
                    new MainPage(this.parent).render();
                }, 1500);
            } else {
                this.showNotification('❌ Ошибка при обновлении группы', 'error');
            }
        });
    }

    // Обновление группы
    updateGroup(formData) {
        ajax.patch(stockUrls.getGroupById(this.id), formData, (data, status) => {
            if (status === 200) {
                this.showNotification('✅ Группа успешно обновлена!');
                setTimeout(() => {
                    new MainPage(this.parent).render();
                }, 1500);
            } else {
                this.showNotification('❌ Ошибка при обновлении группы', 'error');
            }
        });
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
        const form = document.getElementById('group-form');
        const cancelBtn = document.getElementById('cancel-button');
        const homeBtn = document.getElementById('home-button');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = this.getFormData();

            if (this.validateForm(formData)) {
                if (this.id) {
                    this.updateGroup(formData);
                } else {
                    this.createGroup(formData);
                }
            }
        });

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
