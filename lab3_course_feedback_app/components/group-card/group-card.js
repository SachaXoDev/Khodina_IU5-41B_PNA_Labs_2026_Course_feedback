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

        const mergeSection = `
            <div class="merge-section mt-3 pt-2 border-top" id="merge-section-${data.id}" style="display: none;">
                <div class="merge-input-group">
                    <label class="compare-label">Объединить с другой группой:</label>
                    <select id="merge-select-${data.id}" class="compare-select form-select form-select-sm">
                        <option value="">Выберите группу...</option>
                    </select>
                    <div class="form-check mt-2">
                        <input type="checkbox" class="form-check-input" id="merge-overwrite-${data.id}" checked>
                        <label class="form-check-label small" for="merge-overwrite-${data.id}">
                            Перезаписать текущую группу (иначе создаст новую)
                        </label>
                    </div>
                    <button class="btn btn-success btn-sm mt-2 w-100" id="merge-btn-${data.id}">
                        🔄 Выполнить merge
                    </button>
                </div>
                <div id="merge-result-${data.id}" class="merge-result mt-2"></div>
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
                                    <small class="text-muted d-block">${data.students} студентов</small>
                                </div>
                                <div class="card-actions">
                                    <button class="btn btn-outline-info btn-sm compare-toggle-btn" data-id="${data.id}">
                                        Сравнить
                                    </button>
                                    <button class="btn btn-outline-success btn-sm merge-toggle-btn" data-id="${data.id}">
                                        Merge
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
                            ${mergeSection}
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

    populateMergeSelect(selectId, currentId) {
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
            if (groupData1.groupName !== groupData2.groupName) differences.push(`Название: ${groupData1.groupName} ≠ ${groupData2.groupName}`);
            if (groupData1.specialty !== groupData2.specialty) differences.push(`Специализация: ${groupData1.specialty} ≠ ${groupData2.specialty}`);
            if (groupData1.price !== groupData2.price) differences.push(`Цена: ${groupData1.price}₽ ≠ ${groupData2.price}₽`);
            if (groupData1.rating !== groupData2.rating) differences.push(`Рейтинг: ${groupData1.rating} ≠ ${groupData2.rating}`);
            if (groupData1.format !== groupData2.format) differences.push(`Формат: ${groupData1.format} ≠ ${groupData2.format}`);
            if (groupData1.students !== groupData2.students) differences.push(`Студентов: ${groupData1.students} ≠ ${groupData2.students}`);

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

    performMerge(groupId, mergeGroupId, overwrite, onUpdate) {
        const currentGroup = store.getGroups().find(g => g.id === parseInt(groupId));
        const mergeGroup = store.getGroups().find(g => g.id === parseInt(mergeGroupId));

        if (!currentGroup || !mergeGroup) return;

        // Создаем объекты для merge
        const obj1 = {
            groupName: currentGroup.groupName,
            specialty: currentGroup.specialty,
            description: currentGroup.description,
            services: currentGroup.services,
            price: currentGroup.price,
            format: currentGroup.format,
            rating: currentGroup.rating,
            students: currentGroup.students,
            teacher: currentGroup.teacher,
            contact: currentGroup.contact,
            experience: currentGroup.experience,
            startDate: currentGroup.startDate,
            src: currentGroup.src
        };

        const obj2 = {
            groupName: mergeGroup.groupName,
            specialty: mergeGroup.specialty,
            description: mergeGroup.description,
            services: mergeGroup.services,
            price: mergeGroup.price,
            format: mergeGroup.format,
            rating: mergeGroup.rating,
            students: mergeGroup.students,
            teacher: mergeGroup.teacher,
            contact: mergeGroup.contact,
            experience: mergeGroup.experience,
            startDate: mergeGroup.startDate,
            src: mergeGroup.src
        };

        // Выполняем merge (приоритет у текущей группы)
        const mergedResult = store.merge(obj1, obj2);

        if (overwrite) {
            // Обновляем текущую группу
            const updatedGroup = { ...currentGroup, ...mergedResult };
            const index = store.getGroups().findIndex(g => g.id === parseInt(groupId));
            if (index !== -1) {
                store.getGroups()[index] = updatedGroup;
                onUpdate(); // Обновляем отображение
                this.showNotification(`✅ Группа "${currentGroup.groupName}" объединена с "${mergeGroup.groupName}"`);
            }
        } else {
            // Создаем новую группу
            const groups = store.getGroups();
            const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;

            const newGroup = {
                id: newId,
                ...mergedResult,
                groupName: `${currentGroup.groupName} + ${mergeGroup.groupName}`,
                description: `Объединение групп "${currentGroup.groupName}" и "${mergeGroup.groupName}"\n\n${mergedResult.description || ''}`
            };

            store.addGroup(newGroup);
            onUpdate(); // Обновляем отображение
            this.showNotification(`✨ Создана новая группа: "${newGroup.groupName}"`);
        }

        const resultDiv = document.getElementById(`merge-result-${groupId}`);
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="alert alert-success mb-0 mt-2">
                    <strong>Merge выполнен успешно!</strong><br>
                    <small>Результат: ${JSON.stringify(mergedResult, null, 2)}</small>
                </div>
            `;
            setTimeout(() => {
                if (resultDiv.innerHTML) resultDiv.innerHTML = '';
            }, 3000);
        }
    }

    toggleCompareSection(groupId) {
        const compareSection = document.getElementById(`compare-section-${groupId}`);
        const mergeSection = document.getElementById(`merge-section-${groupId}`);
        const toggleBtn = document.querySelector(`.compare-toggle-btn[data-id="${groupId}"]`);
        const mergeToggleBtn = document.querySelector(`.merge-toggle-btn[data-id="${groupId}"]`);

        if (compareSection && toggleBtn) {
            const isVisible = compareSection.style.display !== 'none';

            if (isVisible) {
                compareSection.style.display = 'none';
                toggleBtn.innerHTML = 'Сравнить';
                toggleBtn.classList.remove('btn-info');
                toggleBtn.classList.add('btn-outline-info');

                const resultDiv = document.getElementById(`compare-result-${groupId}`);
                if (resultDiv) resultDiv.innerHTML = '';

                const select = document.getElementById(`compare-select-${groupId}`);
                if (select) select.value = '';
            } else {
                // Закрываем merge секцию если она открыта
                if (mergeSection && mergeSection.style.display !== 'none') {
                    mergeSection.style.display = 'none';
                    if (mergeToggleBtn) {
                        mergeToggleBtn.innerHTML = 'Merge';
                        mergeToggleBtn.classList.remove('btn-success');
                        mergeToggleBtn.classList.add('btn-outline-success');
                    }
                }

                compareSection.style.display = 'block';
                toggleBtn.innerHTML = 'Закрыть сравнение';
                toggleBtn.classList.remove('btn-outline-info');
                toggleBtn.classList.add('btn-info');

                this.populateCompareSelect(`compare-select-${groupId}`, groupId);
            }
        }
    }

    toggleMergeSection(groupId, onUpdate) {
        const mergeSection = document.getElementById(`merge-section-${groupId}`);
        const compareSection = document.getElementById(`compare-section-${groupId}`);
        const toggleBtn = document.querySelector(`.merge-toggle-btn[data-id="${groupId}"]`);
        const compareToggleBtn = document.querySelector(`.compare-toggle-btn[data-id="${groupId}"]`);

        if (mergeSection && toggleBtn) {
            const isVisible = mergeSection.style.display !== 'none';

            if (isVisible) {
                mergeSection.style.display = 'none';
                toggleBtn.innerHTML = 'Merge';
                toggleBtn.classList.remove('btn-success');
                toggleBtn.classList.add('btn-outline-success');

                const resultDiv = document.getElementById(`merge-result-${groupId}`);
                if (resultDiv) resultDiv.innerHTML = '';

                const select = document.getElementById(`merge-select-${groupId}`);
                if (select) select.value = '';
            } else {
                // Закрываем compare секцию если она открыта
                if (compareSection && compareSection.style.display !== 'none') {
                    compareSection.style.display = 'none';
                    if (compareToggleBtn) {
                        compareToggleBtn.innerHTML = 'Сравнить';
                        compareToggleBtn.classList.remove('btn-info');
                        compareToggleBtn.classList.add('btn-outline-info');
                    }
                }

                mergeSection.style.display = 'block';
                toggleBtn.innerHTML = 'Закрыть merge';
                toggleBtn.classList.remove('btn-outline-success');
                toggleBtn.classList.add('btn-success');

                this.populateMergeSelect(`merge-select-${groupId}`, groupId);
            }
        }
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
            border-left: 4px solid #28a745;
        `;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    addListeners(data, onView, onDelete, onUpdate) {
        const viewBtn = document.querySelector(`.view-btn[data-id="${data.id}"]`);
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);
        const toggleBtn = document.querySelector(`.compare-toggle-btn[data-id="${data.id}"]`);
        const mergeToggleBtn = document.querySelector(`.merge-toggle-btn[data-id="${data.id}"]`);
        const compareBtn = document.getElementById(`compare-btn-${data.id}`);
        const mergeBtn = document.getElementById(`merge-btn-${data.id}`);
        const select = document.getElementById(`compare-select-${data.id}`);
        const mergeSelect = document.getElementById(`merge-select-${data.id}`);

        if (viewBtn) {
            viewBtn.addEventListener("click", () => onView(data.id));
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => onDelete(data.id));
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => this.toggleCompareSection(data.id));
        }

        if (mergeToggleBtn) {
            mergeToggleBtn.addEventListener("click", () => this.toggleMergeSection(data.id, onUpdate));
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

        if (mergeBtn && mergeSelect) {
            mergeBtn.addEventListener("click", () => {
                const mergeId = mergeSelect.value;
                if (mergeId) {
                    const overwriteCheckbox = document.getElementById(`merge-overwrite-${data.id}`);
                    const overwrite = overwriteCheckbox ? overwriteCheckbox.checked : true;
                    this.performMerge(data.id, mergeId, overwrite, onUpdate);
                } else {
                    const resultDiv = document.getElementById(`merge-result-${data.id}`);
                    if (resultDiv) {
                        resultDiv.innerHTML = '<div class="alert alert-warning mb-0 mt-2">⚠️ Выберите группу для объединения!</div>';
                    }
                }
            });
        }
    }

    render(data, onView, onDelete, onUpdate) {
        const html = this.getHTML(data, true);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onView, onDelete, onUpdate);
    }
}
