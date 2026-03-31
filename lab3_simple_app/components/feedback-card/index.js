export class FeedbackCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '⭐';
            } else {
                stars += '☆';
            }
        }
        return stars;
    }

    getHTML(data) {
        const stars = this.getStars(data.rating);
        return (
            `
                <div class="col-md-4 mb-4" data-feedback-id="${data.id}">
                    <div class="card feedback-card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <img src="${data.src}" class="rounded-circle me-3" width="60" height="60" alt="${data.title}">
                                <div>
                                    <h5 class="card-title mb-0">${data.title}</h5>
                                    <small class="text-muted">${data.course}</small>
                                </div>
                            </div>
                            <div class="rating mb-2">
                                ${stars}
                                <small class="text-muted ms-2">${data.rating}/5</small>
                            </div>
                            <p class="card-text">"${data.text}"</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <small class="text-muted">📅 ${data.date}</small>
                                <div class="card-actions">
                                    <button class="btn btn-primary btn-sm view-btn" data-id="${data.id}">
                                        Подробнее
                                    </button>
                                    <button class="btn btn-danger btn-sm delete-btn" data-id="${data.id}">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    addListeners(data, onView, onDelete) {
        const viewBtn = document.querySelector(`.view-btn[data-id="${data.id}"]`);
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);

        if (viewBtn) {
            viewBtn.addEventListener("click", () => onView(data.id));
        }
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => onDelete(data.id));
        }
    }

    render(data, onView, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onView, onDelete);
    }
}
