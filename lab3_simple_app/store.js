class Store {
    constructor() {
        this.feedbacks = this.getInitialData();
    }

    getInitialData() {
        return [
            {
                id: 1,
                src: "https://tse4.mm.bing.net/th/id/OIP.lAnBX3W53ZLP9dHkyuHrMQHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3",
                title: "Егор Крид",
                text: "Отличный курс! Материал изложен понятно и структурированно. Преподаватель всегда на связи, отвечает на вопросы. Рекомендую всем!",
                rating: 5,
                course: "Веб-разработка",
                date: "15.03.2026"
            },
            {
                id: 2,
                src: "https://images.genius.com/5ea20a28fe68dbc8e432dae2f92c0fe0.1000x1000x1.jpg",
                title: "Ваня Дмитриенко",
                text: "Курс очень помог в освоении JavaScript. Много практики, реальные примеры. Единственное - хотелось бы больше домашних заданий.",
                rating: 4,
                course: "JavaScript",
                date: "14.03.2026"
            },
            {
                id: 3,
                src: "https://th.bing.com/th/id/R.0f8019b39b4fab1f00068e1162badd97?rik=GlKYFAI5Qkjq4A&pid=ImgRaw&r=0",
                title: "Том Харди",
                text: "Замечательный курс! Получил много полезных знаний. Особенно понравилась структура и подача материала. Спасибо преподавателю!",
                rating: 5,
                course: "Frontend разработка",
                date: "13.03.2026"
            },
            {
                id: 4,
                src: "https://24smi.org/public/media/celebrity/2019/08/05/zs4aokgxxq4t-biographia-irina-shejk.jpg",
                title: "Ирина Шейк",
                text: "Курс хороший, но некоторые темы хотелось бы разобрать подробнее. В целом, довольна, рекомендую.",
                rating: 4,
                course: "React",
                date: "12.03.2026"
            },
            {
                id: 5,
                src: "https://media1.popsugar-assets.com/files/thumbor/8V9TZbX_9YfNnxMQDsOA6UudXgU/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2023/02/26/044/n/1922153/b67f8c1f9ca5804e_GettyImages-1469833844/i/zendaya-makeup-sag-awards.jpg",
                title: "Зендая",
                text: "Лучший курс по веб-разработке! Все четко, понятно, с примерами. После курса смогла устроиться на работу стажером.",
                rating: 5,
                course: "Полный курс веб-разработки",
                date: "10.03.2026"
            }
        ];
    }

    getFeedbacks() {
        return this.feedbacks;
    }

    addFeedback(feedback) {
        this.feedbacks.push(feedback);
    }

    deleteFeedback(id) {
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
    }

    updateFeedbacks(feedbacks) {
        this.feedbacks = feedbacks;
    }
}

export const store = new Store();
