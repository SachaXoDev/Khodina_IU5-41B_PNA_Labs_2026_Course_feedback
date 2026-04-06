import { GroupDetailComponent } from "../../components/group-detail/group-detail.js";
import { MainPage } from "../main/index.js";
import { store } from "../../store.js";

export class GroupDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get groupContainer() {
        return document.getElementById('group-container');
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
                    <div class="col-12">
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

    clickBack() {
        new MainPage(this.parent).render();
    }

    goHome() {
        new MainPage(this.parent).render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        new GroupDetailComponent(this.groupContainer).render(data);

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.clickBack());
        }

        const homeButton = document.getElementById('home-button');
        if (homeButton) {
            homeButton.addEventListener('click', () => this.goHome());
        }
    }
}
