import { store } from "../../store.js";

export class GroupCardComponent {
    constructor(parent) {
        this.parent = parent;
        this.compareStates = new Map();
    }

    getStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);

        for (let i = 1; i <= 5; i++) {
            stars += i <= fullStars ? '⭐' : '☆';
        }
        return stars;
    }

    getHTML(data, isCompareMode = false) {
        const stars = this.getStars(data.rating);
        const isPalindrome = store.isPalindrome(data.groupName);

        const palindromeBadge = isPalindrome
            ? '<span class="badge bg-success ms-2">🔁 Палиндром</span>'
            : '<span class="badge bg-secondary ms-2">❌ Не палиндром</span>';

        const servicesList = data.services.map(s =>
            `<span class="service-tag">${s}</span>`
        ).join('');

        const compareSection = `
            <div class="compare-section mt-3 pt-2 border-top" id="compare-section-${data.id}" style="display: none;">
                <div class="compare-input-group">
                    <label class="compare-label">Сравнить с другой группой:</label>
                    <select id="compare-select-${data.id}" class="compare-select form-select form-select-sm">
                        <option value="">Выберите группу...</option>
                    </select>
                    <button class="btn btn-primary btn-sm mt-2 w-100" id="compare-btn-${data.id}">
                        🔍 Сравнить
                    </button>
                </div>
                <div id="compare-result-${data.id}" class="compare-result mt-2"></div>
            </div>
        `;

        return (
            `
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
                                    <button class="btn btn-outline-info btn-sm compare-toggle-btn" data-id="${data.id}">
                                        📊 Сравнить
                                    </button>
                                    <button class="btn btn-primary btn-sm view-btn" data-id="${data.id}">
                                        Подробнее
                                    </button>
                                    <button class="btn btn-danger btn-sm delete-btn" data-id="${data.id}">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                            ${compareSection}
                        </div>
                    </div>
                </div>
            `
        );
    }

    populateCompareSelect(selectId, currentId) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const groups = store.getGroups();
        select.innerHTML = '<option value="">Выберите группу...</option>';

        groups.forEach(group => {
            if (group.id !== currentId) {
                const option = document.createElement('option');
                option.value = group.id;
                option.textContent = `${group.groupName} (${group.specialty})`;
                select.appendChild(option);
            }
        });
    }

    performCompare(groupId, compareGroupId) {
        const currentGroup = store.getGroups().find(g => g.id === parseInt(groupId));
        const compareGroup = store.getGroups().find(g => g.id === parseInt(compareGroupId));

        if (!currentGroup || !compareGroup) return;

        const groupData1 = {
            id: currentGroup.id,
            groupName: currentGroup.groupName,
            specialty: currentGroup.specialty,
            price: currentGroup.price,
            rating: currentGroup.rating,
            format: currentGroup.format,
            students: currentGroup.students,
            services: currentGroup.services
        };

        const groupData2 = {
            id: compareGroup.id,
            groupName: compareGroup.groupName,
            specialty: compareGroup.specialty,
            price: compareGroup.price,
            rating: compareGroup.rating,
            format: compareGroup.format,
            students: compareGroup.students,
            services: compareGroup.services
        };

        const isEqualResult = store.isEqual(groupData1, groupData2);

        let resultHtml = '';
        if (isEqualResult) {
            resultHtml = `
                <div class="alert alert-success mb-0 mt-2">
                    <strong>✅ Группы идентичны!</strong><br>
                    ${currentGroup.groupName} и ${compareGroup.groupName} имеют одинаковые характеристики.
                </div>
            `;
        } else {
            const differences = [];
            if (groupData1.groupName !== groupData2.groupName) differences.push(`📛 Название: ${groupData1.groupName} ≠ ${groupData2.groupName}`);
            if (groupData1.specialty !== groupData2.specialty) differences.push(`🎓 Специализация: ${groupData1.specialty} ≠ ${groupData2.specialty}`);
            if (groupData1.price !== groupData2.price) differences.push(`💰 Цена: ${groupData1.price}₽ ≠ ${groupData2.price}₽`);
            if (groupData1.rating !== groupData2.rating) differences.push(`⭐ Рейтинг: ${groupData1.rating} ≠ ${groupData2.rating}`);
            if (groupData1.format !== groupData2.format) differences.push(`💻 Формат: ${groupData1.format} ≠ ${groupData2.format}`);
            if (groupData1.students !== groupData2.students) differences.push(`👥 Студентов: ${groupData1.students} ≠ ${groupData2.students}`);

            resultHtml = `
                <div class="alert alert-info mb-0 mt-2">
                    <strong>❌ Группы отличаются!</strong><br>
                    <ul class="mb-0 mt-1">
                        ${differences.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        const resultDiv = document.getElementById(`compare-result-${groupId}`);
        if (resultDiv) {
            resultDiv.innerHTML = resultHtml;
        }
    }

    toggleCompareSection(groupId) {
        const compareSection = document.getElementById(`compare-section-${groupId}`);
        const toggleBtn = document.querySelector(`.compare-toggle-btn[data-id="${groupId}"]`);

        if (compareSection && toggleBtn) {
            const isVisible = compareSection.style.display !== 'none';

            if (isVisible) {
                compareSection.style.display = 'none';
                toggleBtn.innerHTML = '📊 Сравнить';
                toggleBtn.classList.remove('btn-info');
                toggleBtn.classList.add('btn-outline-info');

                const resultDiv = document.getElementById(`compare-result-${groupId}`);
                if (resultDiv) resultDiv.innerHTML = '';

                const select = document.getElementById(`compare-select-${groupId}`);
                if (select) select.value = '';
            } else {
                compareSection.style.display = 'block';
                toggleBtn.innerHTML = '❌ Закрыть сравнение';
                toggleBtn.classList.remove('btn-outline-info');
                toggleBtn.classList.add('btn-info');

                this.populateCompareSelect(`compare-select-${groupId}`, groupId);
            }
        }
    }

    addListeners(data, onView, onDelete) {
        const viewBtn = document.querySelector(`.view-btn[data-id="${data.id}"]`);
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);
        const toggleBtn = document.querySelector(`.compare-toggle-btn[data-id="${data.id}"]`);
        const compareBtn = document.getElementById(`compare-btn-${data.id}`);
        const select = document.getElementById(`compare-select-${data.id}`);

        if (viewBtn) {
            viewBtn.addEventListener("click", () => onView(data.id));
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => onDelete(data.id));
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => this.toggleCompareSection(data.id));
        }

        if (compareBtn && select) {
            compareBtn.addEventListener("click", () => {
                const compareId = select.value;
                if (compareId) {
                    this.performCompare(data.id, compareId);
                } else {
                    const resultDiv = document.getElementById(`compare-result-${data.id}`);
                    if (resultDiv) {
                        resultDiv.innerHTML = '<div class="alert alert-warning mb-0 mt-2">⚠️ Выберите группу для сравнения!</div>';
                    }
                }
            });
        }
    }

    render(data, onView, onDelete) {
        const html = this.getHTML(data, true);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onView, onDelete);
    }
}
