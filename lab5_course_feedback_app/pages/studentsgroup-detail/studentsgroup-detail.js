import { GroupDetailComponent } from "../../components/studentsgroup-detail/studentsgroup-detail.js";
import { ThreeDModelComponent } from "../../components/3d-model/3d-model.js";
import { MainPage } from "../main/main.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class GroupDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.threeDModel = null;
        this.groupData = null;
    }

    get groupContainer() {
        return document.getElementById('group-container');
    }

    get modelContainer() {
        return document.getElementById('model-container');
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
                    <button id="home-button" class="btn btn-home">Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">3D Превью модели</h5>
                            </div>
                            <div class="card-body p-0">
                                <div id="model-container" style="height: 400px; background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ec 100%); border-radius: 12px;">
                                    <div class="text-center p-5">Загрузка 3D модели...</div>
                                </div>
                            </div>
                            <div class="card-footer bg-white">
                                <div class="d-flex justify-content-between flex-wrap gap-2">
                                    <div class="btn-group">
                                        <button class="btn btn-outline-primary btn-sm" id="view-front">Вид спереди</button>
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
                        <div id="group-container">
                            <div class="text-center p-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Загрузка...</span>
                                </div>
                                <p class="mt-2">Загрузка данных группы...</p>
                            </div>
                        </div>
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

    getData() {
        console.log('1. getData started, id:', this.id);
        ajax.get(stockUrls.getGroupById(this.id), (data, status) => {
            console.log('2. ajax callback:', { status, data, hasData: !!data });
            if (status === 200 && data) {
                console.log('3. Условие выполнено, сохраняем данные');
                this.groupData = data;
                console.log('4. Вызываем renderData()');
                this.renderData();
                console.log('5. Вызываем init3DModel()');
                this.init3DModel();
                this.setupComparison();
            } else {
                console.error('Ошибка: статус не 200 или нет данных', status);
                this.groupContainer.innerHTML = `
                    <div class="alert alert-danger">
                        ❌ Ошибка загрузки данных группы. Возможно, группа была удалена.
                    </div>
                `;
            }
        });
        console.log('6. getData завершил выполнение (асинхронно)');
    }

    // Отрисовка данных
    renderData() {
        console.log('>>> renderData: НАЧАЛО функции');
        console.log('>>> renderData: this.groupData =', this.groupData);
        console.log('>>> renderData: this.groupContainer =', this.groupContainer);

        if (this.groupData && this.groupContainer) {
            console.log('>>> renderData: УСЛОВИЕ ВЫПОЛНЕНО, создаем компонент');
            try {
                const component = new GroupDetailComponent(this.groupContainer);
                console.log('>>> renderData: компонент создан', component);
                component.render(this.groupData);
                console.log('>>> renderData: render вызван успешно');
            } catch (error) {
                console.error('>>> renderData: ОШИБКА!', error);
            }
        } else {
            console.error('>>> renderData: УСЛОВИЕ НЕ ВЫПОЛНЕНО');
            console.error('groupData:', this.groupData);
            console.error('groupContainer:', this.groupContainer);
        }
        console.log('>>> renderData: КОНЕЦ функции');
    }

    async init3DModel() {
        if (this.modelContainer && this.groupData) {
            const modelUrl = this.getModelUrl(this.groupData.groupName);
            this.threeDModel = new ThreeDModelComponent(this.modelContainer, modelUrl, this.groupData.groupName);
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

        // Загружаем список групп для сравнения
        ajax.get(stockUrls.getGroups(), (data, status) => {
            if (status === 200 && data && Array.isArray(data)) {
                const groups = data.filter(g => g.id !== this.id);
                compareSelect.innerHTML = '<option value="">Выберите группу для сравнения...</option>' +
                    groups.map(g => `<option value="${g.id}">${g.groupName} (${g.specialty})</option>`).join('');
            }
        });

        if (compareBtn && compareSelect) {
            compareBtn.addEventListener('click', () => {
                const selectedId = compareSelect.value;
                if (!selectedId) {
                    compareResult.style.display = 'block';
                    compareResult.innerHTML = '<div class="alert alert-warning">⚠️ Выберите группу для сравнения!</div>';
                    return;
                }

                // Загружаем данные выбранной группы для сравнения
                ajax.get(stockUrls.getGroupById(selectedId), (compareData, compareStatus) => {
                    if (compareStatus === 200 && compareData && this.groupData) {
                        const compareGroup = compareData;
                        const differences = [];

                        if (this.groupData.groupName !== compareGroup.groupName)
                            differences.push({ field: 'Название', current: this.groupData.groupName, compare: compareGroup.groupName });
                        if (this.groupData.specialty !== compareGroup.specialty)
                            differences.push({ field: 'Специализация', current: this.groupData.specialty, compare: compareGroup.specialty });
                        if (this.groupData.price !== compareGroup.price)
                            differences.push({ field: 'Цена (₽/час)', current: this.groupData.price, compare: compareGroup.price });
                        if (this.groupData.rating !== compareGroup.rating)
                            differences.push({ field: 'Рейтинг', current: `${this.groupData.rating}/5`, compare: `${compareGroup.rating}/5` });
                        if (this.groupData.format !== compareGroup.format)
                            differences.push({ field: 'Формат', current: this.groupData.format, compare: compareGroup.format });
                        if (this.groupData.students !== compareGroup.students)
                            differences.push({ field: 'Студентов', current: this.groupData.students, compare: compareGroup.students });
                        if (this.groupData.teacher !== compareGroup.teacher)
                            differences.push({ field: 'Преподаватель', current: this.groupData.teacher, compare: compareGroup.teacher });

                        let resultHtml = '';

                        if (differences.length === 0) {
                            resultHtml = `
                                <div class="alert alert-success">
                                    <strong>✅ ГРУППЫ ИДЕНТИЧНЫ!</strong><br>
                                    Все характеристики "${this.groupData.groupName}" и "${compareGroup.groupName}" совпадают.
                                </div>
                            `;
                        } else {
                            resultHtml = `
                                <div class="alert alert-info">
                                    <strong>❌ НАЙДЕНЫ РАЗЛИЧИЯ:</strong>
                                    <table class="table table-sm mt-2 mb-0">
                                        <thead>
                                            <tr><th>Характеристика</th><th>${this.groupData.groupName}</th><th>${compareGroup.groupName}</th></tr>
                                        </thead>
                                        <tbody>
                                            ${differences.map(d => `<tr><td><strong>${d.field}</strong></td><td>${d.current}</td><td>${d.compare}</td></tr>`).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            `;
                        }

                        compareResult.style.display = 'block';
                        compareResult.innerHTML = resultHtml;
                        compareResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
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

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.getData();

        document.getElementById('back-button')?.addEventListener('click', () => this.clickBack());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
