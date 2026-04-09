
import { GroupDetailComponent } from "../../components/group-detail/group-detail.js";
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

    getHTML() {
        return `
            <div class="header">
                <div class="container">
                    <h1>Детали группы</h1>
                    <button id="home-button" class="btn btn-home">🏠 Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
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

    goHome() {
        if (this.threeDModel) this.threeDModel.dispose();
        new MainPage(this.parent).render();
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const data = this.getData();
        new GroupDetailComponent(this.groupContainer).render(data);
        document.getElementById('back-button')?.addEventListener('click', () => this.clickBack());
        document.getElementById('home-button')?.addEventListener('click', () => this.goHome());
    }
}
