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

    demoMerge() {
        const modalHtml = `
            <div class="modal fade" id="mergeModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Функция merge</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-muted">Объединяет объекты. Если поля повторяются - берется значение из первого объекта</p>

                            <div class="mb-3">
                                <label class="form-label">Объект 1 (высший приоритет)</label>
                                <textarea id="obj1" class="form-control" rows="4" placeholder='{"name": "Группа А", "price": 1000}'></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Объект 2</label>
                                <textarea id="obj2" class="form-control" rows="4" placeholder='{"price": 1500, "rating": 5}'></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Объект 3 (низший приоритет)</label>
                                <textarea id="obj3" class="form-control" rows="4" placeholder='{"rating": 4, "students": 20}'></textarea>
                            </div>

                            <div class="alert alert-info">
                                <strong>💡 Примеры для вставки:</strong><br>
                                <button class="btn btn-sm btn-outline-secondary mt-1" id="example1">Пример 1</button>
                                <button class="btn btn-sm btn-outline-secondary mt-1" id="example2">Пример 2</button>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="addAsGroup" checked>
                                <label class="form-check-label" for="addAsGroup">
                                    Добавить результат как новую группу
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Результат:</label>
                                <pre id="mergeResult" class="bg-light p-3 rounded" style="min-height: 100px;">{} // Здесь будет результат</pre>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="executeMerge">Выполнить merge</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (!document.getElementById('mergeModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        const addGroupFromMerge = (result) => {
            if (!result || Object.keys(result).length === 0) {
                this.showNotification('Нет данных для создания группы!');
                return false;
            }

            const groups = store.getGroups();
            const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;

            const newGroup = {
                id: newId,
                src: result.src || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                groupName: result.groupName || result.name || `Группа из merge ${newId}`,
                specialty: result.specialty || "Помощь с учебой",
                description: result.description || "Создано через функцию merge",
                services: result.services || ["Помощь с лабами", "Консультации"],
                price: result.price || 1000,
                format: result.format || "Онлайн",
                rating: result.rating || 4.5,
                students: result.students || 0,
                teacher: result.teacher || "Создано автоматически",
                contact: result.contact || "@merge_group",
                experience: result.experience || "1 год",
                startDate: new Date().toISOString().split('T')[0]
            };

            store.addGroup(newGroup);
            this.renderGroups();
            this.showNotification(`Новая группа создана через merge: "${newGroup.groupName}"`);
            return true;
        };

        const executeBtn = document.getElementById('executeMerge');
        if (executeBtn) {
            const newBtn = executeBtn.cloneNode(true);
            executeBtn.parentNode.replaceChild(newBtn, executeBtn);

            newBtn.onclick = () => {
                try {
                    const text1 = document.getElementById('obj1').value.trim();
                    const text2 = document.getElementById('obj2').value.trim();
                    const text3 = document.getElementById('obj3').value.trim();

                    const obj1 = text1 ? JSON.parse(text1) : {};
                    const obj2 = text2 ? JSON.parse(text2) : {};
                    const obj3 = text3 ? JSON.parse(text3) : {};

                    const result = store.merge(obj1, obj2, obj3);
                    document.getElementById('mergeResult').innerHTML = JSON.stringify(result, null, 2);

                    const addAsGroup = document.getElementById('addAsGroup').checked;
                    if (addAsGroup) {
                        addGroupFromMerge(result);
                    }

                } catch (error) {
                    document.getElementById('mergeResult').innerHTML = `❌ Ошибка: ${error.message}`;
                }
            };
        }

        const example1Btn = document.getElementById('example1');
        if (example1Btn) {
            example1Btn.onclick = () => {
                document.getElementById('obj1').value = '{"groupName": "IU5-31B", "price": 1500, "format": "Онлайн", "rating": 4.9}';
                document.getElementById('obj2').value = '{"price": 2000, "students": 24, "rating": 4.8, "teacher": "Анна Иванова"}';
                document.getElementById('obj3').value = '{"students": 30, "contact": "@iu5_31b", "description": "Лучшая группа"}';
            };
        }

        const example2Btn = document.getElementById('example2');
        if (example2Btn) {
            example2Btn.onclick = () => {
                document.getElementById('obj1').value = '{"groupName": "WebDev Pro", "price": 1000, "format": "Онлайн", "specialty": "Веб-разработка"}';
                document.getElementById('obj2').value = '{"price": 1200, "rating": 5, "students": 15, "teacher": "Дмитрий Петров"}';
                document.getElementById('obj3').value = '{"rating": 4.5, "description": "Помощь с HTML/CSS/JS", "contact": "@webdev_pro"}';
            };
        }

        const modal = new bootstrap.Modal(document.getElementById('mergeModal'));
        modal.show();
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
                                   placeholder="🔍 Поиск по названию группы..." autocomplete="off">
                        </div>
                        <div class="col-md-4">
                            <select id="format-filter" class="filter-input">
                                ${formatOptions}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <button id="add-button" class="btn btn-success w-100">+ Добавить группу</button>
                        </div>
                    </div>
                </div>
                <div id="groups-container" class="groups-grid">
                    <!-- Карточки групп будут здесь -->
                </div>
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
                    <div class="alert alert-info">Групп не найдено. Добавьте первую группу!</div>
                </div>
            `;
            return;
        }

        let i = 0;
        do {
            const group = filteredGroups[i];
            const groupCard = new GroupCardComponent(container);
            groupCard.render(
                group,
                this.clickCard.bind(this),
                this.deleteGroup.bind(this),
                this.renderGroups.bind(this)
            );
            i++;
        } while (i < filteredGroups.length);
    }

    addGroup() {
        const groups = store.getGroups();
        const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
        const newGroup = {
            id: newId,
            src: "https://cdn-icons-png.flaticon.com/512/1995/1995571.png",
                groupName: "IU5-31B(копия)",
                specialty: "Веб-разработка",
                description: "Помощь с дз по веб-разработке. Консультации по HTML, CSS, JavaScript",
                services: ["Веб-разработка", "HTML/CSS", "JavaScript"],
                price: 1500,
                format: "Онлайн",
                rating: 4.9,
                students: 24,
                teacher: "Анна Иванова",
                contact: "@iu5_31b_help",
                experience: "3 года",
                startDate: "2026-04-15"
        };
        store.addGroup(newGroup);
        this.renderGroups();
        this.showNotification(`Добавлена группа: "${newGroup.groupName}"`);
    }

    deleteGroup(id) {
        const group = store.getGroups().find(g => g.id === parseInt(id));
        store.deleteGroup(parseInt(id));
        this.renderGroups();
        this.showNotification(`Удалена группа: "${group?.groupName || id}"`);
    }

    filterGroups() {
        const filterInput = document.getElementById('filter-input');
        const formatSelect = document.getElementById('format-filter');
        if (filterInput) this.filterText = filterInput.value;
        if (formatSelect) this.formatFilter = formatSelect.value;
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

        document.getElementById('merge-demo-button')?.addEventListener('click', () => this.demoMerge());
        document.getElementById('add-button')?.addEventListener('click', () => this.addGroup());
        document.getElementById('filter-input')?.addEventListener('input', () => this.filterGroups());
        document.getElementById('format-filter')?.addEventListener('change', () => this.filterGroups());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
