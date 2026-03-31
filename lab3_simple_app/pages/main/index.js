import { FeedbackCardComponent } from "../../components/feedback-card/index.js";
import { FeedbackDetailPage } from "../feedback-detail/index.js";
import { store } from "../../store.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = '';
        this.courseFilter = '';
    }

    get feedbacksContainer() {
        return document.getElementById('feedbacks-container');
    }

    getFeedbacks() {
        return store.getFeedbacks();
    }

    getCourses() {
        const courses = [...new Set(this.getFeedbacks().map(f => f.course))];
        return courses;
    }

    getHTML() {
        const courses = this.getCourses();
        const courseOptions = courses.map(course =>
            `<option value="${course}">${course}</option>`
        ).join('');

        return (
            `
                <div class="header">
                    <div class="container">
                        <h1>📝 Обратная связь по курсу</h1>
                        <button id="home-button" class="btn btn-home">🏠 Домой</button>
                    </div>
                </div>
                <div class="container">
                    <div class="filters">
                        <div class="row">
                            <div class="col-md-5">
                                <input type="text" id="filter-input" class="filter-input"
                                       placeholder="🔍 Поиск по студенту..." autocomplete="off">
                            </div>
                            <div class="col-md-4">
                                <select id="course-filter" class="filter-input">
                                    <option value="">Все курсы</option>
                                    ${courseOptions}
                                </select>
                            </div>
                            <div class="col-md-3">
                                <button id="add-button" class="btn btn-success w-100">+ Добавить отзыв</button>
                            </div>
                        </div>
                    </div>
                    <div id="feedbacks-container" class="row">
                        <!-- Здесь будут карточки отзывов -->
                    </div>
                </div>
            `
        );
    }

    getFilteredFeedbacks() {
        let filtered = this.getFeedbacks();

        if (this.filterText && this.filterText.trim() !== '') {
            filtered = filtered.filter(feedback =>
                feedback.title.toLowerCase().includes(this.filterText.toLowerCase())
            );
        }

        if (this.courseFilter && this.courseFilter !== '') {
            filtered = filtered.filter(feedback =>
                feedback.course === this.courseFilter
            );
        }

        return filtered;
    }

    renderFeedbacks() {
        const container = this.feedbacksContainer;
        if (!container) return;

        container.innerHTML = '';

        const filteredFeedbacks = this.getFilteredFeedbacks();

        if (filteredFeedbacks.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        😊 Отзывов не найдено. Добавьте первый отзыв!
                    </div>
                </div>
            `;
            return;
        }

        filteredFeedbacks.forEach((item) => {
            const feedbackCard = new FeedbackCardComponent(container);
            feedbackCard.render(
                item,
                this.clickCard.bind(this),
                this.deleteFeedback.bind(this)
            );
        });
    }

    addFeedback() {
        const feedbacks = this.getFeedbacks();
        const newId = feedbacks.length > 0
            ? Math.max(...feedbacks.map(f => f.id)) + 1
            : 1;

        const newFeedback = {
            id: newId,
            src: "https://img.freepik.com/premium-photo/anonymous-person-in-suit-wearing-hat-with-covered-face_955712-23964.jpg",
            title: `Студент ${newId}`,
            text: "Это новый отзыв о курсе. Здесь можно написать свои впечатления, пожелания и рекомендации.",
            rating: 5,
            course: "Веб-разработка",
            date: new Date().toLocaleDateString('ru-RU')
        };

        store.addFeedback(newFeedback);
        this.renderFeedbacks();
    }

    deleteFeedback(id) {
        store.deleteFeedback(parseInt(id));
        this.renderFeedbacks();
    }

    filterFeedbacks() {
        const filterInput = document.getElementById('filter-input');
        const courseSelect = document.getElementById('course-filter');

        if (filterInput) {
            this.filterText = filterInput.value;
        }
        if (courseSelect) {
            this.courseFilter = courseSelect.value;
        }

        this.renderFeedbacks();
    }

    clickCard(id) {
        const feedbackPage = new FeedbackDetailPage(this.parent, id);
        feedbackPage.render();
    }

    goHome() {
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.renderFeedbacks();

        const addButton = document.getElementById('add-button');
        if (addButton) {
            const newAddButton = addButton.cloneNode(true);
            addButton.parentNode.replaceChild(newAddButton, addButton);
            newAddButton.addEventListener('click', () => this.addFeedback());
        }

        const filterInput = document.getElementById('filter-input');
        if (filterInput) {
            filterInput.value = this.filterText;
            filterInput.addEventListener('input', () => this.filterFeedbacks());
        }

        const courseFilter = document.getElementById('course-filter');
        if (courseFilter) {
            courseFilter.value = this.courseFilter;
            courseFilter.addEventListener('change', () => this.filterFeedbacks());
        }

        const homeButton = document.getElementById('home-button');
        if (homeButton) {
            const newHomeButton = homeButton.cloneNode(true);
            homeButton.parentNode.replaceChild(newHomeButton, homeButton);
            newHomeButton.addEventListener('click', () => this.goHome());
        }
    }
}
