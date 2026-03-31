export class FeedbackDetailComponent {
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
                <div class="card feedback-detail-card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <img src="${data.src}" class="rounded-circle img-fluid mb-3" style="max-width: 150px;" alt="${data.title}">
                                <h4>${data.title}</h4>
                                <p class="text-muted">${data.course}</p>
                                <div class="rating">
                                    ${stars}
                                    <span class="ms-2">${data.rating}/5</span>
                                </div>
                                <p class="mt-2"><small>📅 ${data.date}</small></p>
                            </div>
                            <div class="col-md-8">
                                <h3>Отзыв студента</h3>
                                <div class="feedback-text p-3 bg-light rounded">
                                    <p class="lead">"${data.text}"</p>
                                </div>
                                <div class="mt-4">
                                    <h5>Дополнительная информация:</h5>
                                    <ul class="list-unstyled">
                                        <li><strong>ID отзыва:</strong> ${data.id}</li>
                                        <li><strong>Курс:</strong> ${data.course}</li>
                                        <li><strong>Дата:</strong> ${data.date}</li>
                                        <li><strong>Оценка:</strong> ${data.rating}/5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
