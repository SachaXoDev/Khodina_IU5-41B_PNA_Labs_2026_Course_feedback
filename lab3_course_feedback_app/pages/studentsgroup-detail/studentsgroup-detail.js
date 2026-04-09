import { GroupDetailComponent } from "../../components/studentsgroup-detail/studentsgroup-detail.js";
import { ThreeDModelComponent } from "../../components/3d-model/3d-model.js";
import { MainPage } from "../main/main.js";
import { store } from "../../store.js";

export class GroupDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.threeDModel = null;
    }

    get groupContainer() {
        return document.getElementById('group-container');
    }

    get modelContainer() {
        return document.getElementById('model-container');
    }

    getData() {
        const groups = store.getGroups();
        return groups.find(g => g.id === this.id) || {
            id: this.id,
            src: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            groupName: "Группа не найдена",
            description: "Информация не найдена",
            price: 0,
            format: "-",
            rating: 0,
            students: 0,
            teacher: "-",
            contact: "-",
            experience: "-",
            startDate: new Date().toISOString().split('T')[0]
        };
    }

    getModelUrl(groupName) {
        const models = {
            'IU5-31B': 'https://threejs.org/examples/models/gltf/Horse.glb',
            'IU5-42B': 'https://threejs.org/examples/models/gltf/Duck.glb',
            'IU5-53B': 'https://threejs.org/examples/models/gltf/Flamingo.gltf',
            'IU5-64B': 'https://threejs.org/examples/models/gltf/Parrot.glb',
            'IU5-75B': 'https://threejs.org/examples/models/gltf/Stork.glb'
        };
        return models[groupName] || null;
    }

    getHTML() {
        return `
            <div class="header">
                <div class="container">
                    <h1>📖 Детали группы</h1>
                    <button id="home-button" class="btn btn-home">🏠 Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">🎮 3D Превью модели</h5>
                            </div>
                            <div class="card-body p-0">
                                <div id="model-container" style="height: 400px; background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ec 100%); border-radius: 12px;"></div>
                            </div>
                            <div class="card-footer bg-white">
                                <div class="d-flex justify-content-between flex-wrap gap-2">
                                    <div class="btn-group">
                                        <button class="btn btn-outline-primary btn-sm" id="view-front">👁️ Вид спереди</button>
                                        <button class="btn btn-outline-primary btn-sm" id="view-left">👈 Слева</button>
                                        <button class="btn btn-outline-primary btn-sm" id="view-right">👉 Справа</button>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-outline-success btn-sm" id="zoom-in">➕ Приблизить</button>
                                        <button class="btn btn-outline-success btn-sm" id="zoom-out">➖ Отдалить</button>
                                        <button class="btn btn-outline-secondary btn-sm" id="reset-view">⟳ Сброс</button>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <small class="text-muted">🖱️ Мышь - вращение | ПКМ - панорама | Колесико - зум</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="group-container"></div>
                    </div>
                </div>

                <!-- БЛОК СРАВНЕНИЯ -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">🔍 Сравнение с другой группой</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <select id="compare-group-select" class="form-control">
                                            <option value="">Выберите группу для сравнения...</option>
                                            ${store.getGroups().filter(g => g.id !== this.id).map(g =>
                                                `<option value="${g.id}">${g.groupName} (${g.specialty})</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <button id="compare-btn" class="btn btn-primary w-100">🔍 Сравнить</button>
                                    </div>
                                </div>
                                <div id="compare-result" class="mt-3" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12 text-center">
                        <button id="back-button" class="btn btn-secondary btn-lg">← Назад к группам</button>
                    </div>
                </div>
            </div>
        `;
    }

    async init3DModel() {
        if (this.modelContainer) {
            const data = this.getData();
            const modelUrl = this.getModelUrl(data.groupName);
            this.threeDModel = new ThreeDModelComponent(this.modelContainer, modelUrl, data.groupName);
            await this.threeDModel.init();
            this.setup3DControls();
        }
    }

    setup3DControls() {
        const btns = {
            'view-front': 'front',
            'view-left': 'left',
            'view-right': 'right'
        };
        for (const [id, view] of Object.entries(btns)) {
            document.getElementById(id)?.addEventListener('click', () => this.threeDModel?.setView(view));
        }
        document.getElementById('zoom-in')?.addEventListener('click', () => this.threeDModel?.zoomIn());
        document.getElementById('zoom-out')?.addEventListener('click', () => this.threeDModel?.zoomOut());
        document.getElementById('reset-view')?.addEventListener('click', () => this.threeDModel?.resetView());
        window.addEventListener('resize', () => this.threeDModel?.resize());
    }

    setupComparison() {
        const compareBtn = document.getElementById('compare-btn');
        const compareSelect = document.getElementById('compare-group-select');
        const compareResult = document.getElementById('compare-result');

        if (compareBtn && compareSelect) {
            compareBtn.addEventListener('click', () => {
                const selectedId = compareSelect.value;
                if (!selectedId) {
                    compareResult.style.display = 'block';
                    compareResult.innerHTML = '<div class="alert alert-warning">⚠️ Выберите группу для сравнения!</div>';
                    return;
                }

                const currentGroup = this.getData();
                const compareGroup = store.getGroups().find(g => g.id === parseInt(selectedId));

                if (!currentGroup || !compareGroup) {
                    compareResult.style.display = 'block';
                    compareResult.innerHTML = '<div class="alert alert-danger">❌ Ошибка получения данных групп</div>';
                    return;
                }

                // Сравниваем группы
                const differences = [];

                if (currentGroup.groupName !== compareGroup.groupName)
                    differences.push({ field: 'Название', current: currentGroup.groupName, compare: compareGroup.groupName });
                if (currentGroup.specialty !== compareGroup.specialty)
                    differences.push({ field: 'Специализация', current: currentGroup.specialty, compare: compareGroup.specialty });
                if (currentGroup.price !== compareGroup.price)
                    differences.push({ field: 'Цена (₽/час)', current: currentGroup.price, compare: compareGroup.price });
                if (currentGroup.rating !== compareGroup.rating)
                    differences.push({ field: 'Рейтинг', current: `${currentGroup.rating}/5`, compare: `${compareGroup.rating}/5` });
                if (currentGroup.format !== compareGroup.format)
                    differences.push({ field: 'Формат', current: currentGroup.format, compare: compareGroup.format });
                if (currentGroup.students !== compareGroup.students)
                    differences.push({ field: 'Студентов', current: currentGroup.students, compare: compareGroup.students });
                if (currentGroup.teacher !== compareGroup.teacher)
                    differences.push({ field: 'Преподаватель', current: currentGroup.teacher, compare: compareGroup.teacher });
                if (currentGroup.contact !== compareGroup.contact)
                    differences.push({ field: 'Контакты', current: currentGroup.contact, compare: compareGroup.contact });
                if (currentGroup.experience !== compareGroup.experience)
                    differences.push({ field: 'Опыт', current: currentGroup.experience, compare: compareGroup.experience });

                let resultHtml = '';

                if (differences.length === 0) {
                    resultHtml = `
                        <div class="alert alert-success">
                            <strong>✅ ГРУППЫ ИДЕНТИЧНЫ!</strong><br>
                            Все характеристики "${currentGroup.groupName}" и "${compareGroup.groupName}" совпадают.
                        </div>
                    `;
                } else {
                    resultHtml = `
                        <div class="alert alert-info">
                            <strong>❌ НАЙДЕНЫ РАЗЛИЧИЯ:</strong>
                            <table class="table table-sm mt-2 mb-0">
                                <thead>
                                    <tr>
                                        <th>Характеристика</th>
                                        <th>${currentGroup.groupName}</th>
                                        <th>${compareGroup.groupName}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${differences.map(d => `
                                        <tr>
                                            <td><strong>${d.field}</strong></td>
                                            <td>${d.current}</td>
                                            <td>${d.compare}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                }

                compareResult.style.display = 'block';
                compareResult.innerHTML = resultHtml;

                // Прокрутка к результату
                compareResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    clickBack() {
        if (this.threeDModel) this.threeDModel.dispose();
        new MainPage(this.parent).render();
    }

    goHome() {
        if (this.threeDModel) this.threeDModel.dispose();
        new MainPage(this.parent).render();
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const data = this.getData();
        new GroupDetailComponent(this.groupContainer).render(data);
        await this.init3DModel();
        this.setupComparison(); // Добавляем сравнение
        document.getElementById('back-button')?.addEventListener('click', () => this.clickBack());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
