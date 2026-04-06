import { GroupDetailComponent } from "../../components/group-detail/group-detail.js";
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
            duration: "-",
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
                    <h1>📖 Детали группы помощи</h1>
                    <button id="home-button" class="btn btn-home">🏠 Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">🎨 3D Превью</h5>
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
            'view-front': 'front', 'view-back': 'back',
            'view-left': 'left', 'view-right': 'right'
        };
        for (const [id, view] of Object.entries(btns)) {
            document.getElementById(id)?.addEventListener('click', () => this.threeDModel?.setView(view));
        }
        document.getElementById('zoom-in')?.addEventListener('click', () => this.threeDModel?.zoomIn());
        document.getElementById('zoom-out')?.addEventListener('click', () => this.threeDModel?.zoomOut());
        document.getElementById('reset-view')?.addEventListener('click', () => this.threeDModel?.resetView());
        window.addEventListener('resize', () => this.threeDModel?.resize());
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
        document.getElementById('back-button')?.addEventListener('click', () => this.clickBack());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
