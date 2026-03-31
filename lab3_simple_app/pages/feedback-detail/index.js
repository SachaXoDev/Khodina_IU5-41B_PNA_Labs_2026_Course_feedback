import { FeedbackDetailComponent } from "../../components/feedback-detail/index.js";
import { MainPage } from "../main/index.js";
import { store } from "../../store.js";

export class FeedbackDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get feedbackContainer() {
        return document.getElementById('feedback-container');
    }

    getData() {
        const feedbacks = store.getFeedbacks();
        const feedback = feedbacks.find(f => f.id === this.id);

        if (feedback) return feedback;

        return {
            id: this.id,
            src: "https://randomuser.me/api/portraits/lego/1.jpg",
            title: "Студент",
            text: "Информация об отзыве не найдена",
            rating: 5,
            course: "Веб-разработка",
            date: new Date().toLocaleDateString('ru-RU')
        };
    }

    getHTML() {
        return (
            `
                <div class="header">
                    <div class="container">
                        <h1>📖 Детали отзыва</h1>
                        <button id="home-button" class="btn btn-home">🏠 Домой</button>
                    </div>
                </div>
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-12">
                            <div id="feedback-container">
                                <!-- Здесь будет детальный отзыв -->
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12 text-center">
                            <button id="back-button" class="btn btn-secondary">← Назад к отзывам</button>
                        </div>
                    </div>
                </div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        const feedbackDetail = new FeedbackDetailComponent(this.feedbackContainer);
        feedbackDetail.render(data);

        const backButton = document.getElementById('back-button');
        if (backButton) {
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            newBackButton.addEventListener('click', () => this.clickBack());
        }

        const homeButton = document.getElementById('home-button');
        if (homeButton) {
            const newHomeButton = homeButton.cloneNode(true);
            homeButton.parentNode.replaceChild(newHomeButton, homeButton);
            newHomeButton.addEventListener('click', () => this.goHome());
        }
    }
}
