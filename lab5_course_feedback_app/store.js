class Store {
    constructor() {
        this.groups = this.getInitialData();
    }

    getInitialData() {
        return [
            {
                id: 1,
                src: "https://cdn-icons-png.flaticon.com/512/1995/1995571.png",
                groupName: "IU5-31B",
                specialty: "Веб-разработка",
                description: "Помощь с дз по веб-разработке. Консультации по HTML, CSS, JavaScript",
                services: ["Веб-разработка", "HTML/CSS", "JavaScript"],
                price: 1500,
                format: "Онлайн",
                rating: 4.9,
                students: 24,
                teacher: "Анна Иванова",
                contact: "@iu5_31b_help",
                experience: "3 года",
                startDate: "2026-04-15"
            },
            {
                id: 2,
                src: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
                groupName: "IU5-42B",
                specialty: "JavaScript",
                description: "Помощь с задачами по JavaScript. Объяснение сложных тем, разбор домашних заданий",
                services: ["JavaScript", "React", "Node.js"],
                price: 1200,
                format: "Онлайн",
                rating: 4.8,
                students: 18,
                teacher: "Дмитрий Петров",
                contact: "@iu5_42b_js",
                experience: "2 года",
                startDate: "2026-04-20"
            },
            {
                id: 3,
                src: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
                groupName: "IU5-53B",
                specialty: "Node.js",
                description: "Бэкенд разработка на Node.js. Помощь с курсовыми проектами и API",
                services: ["Node.js", "Express", "MongoDB"],
                price: 1800,
                format: "Офлайн",
                rating: 4.7,
                students: 12,
                teacher: "Сергей Козлов",
                contact: "@iu5_53b_backend",
                experience: "2.5 года",
                startDate: "2026-05-01"
            },
            {
                id: 4,
                src: "https://cdn-icons-png.flaticon.com/512/1260/1260667.png",
                groupName: "IU5-64B",
                specialty: "React",
                description: "Современная React разработка. Помощь с проектами и объяснение хуков",
                services: ["React", "Redux", "Next.js"],
                price: 2000,
                format: "Онлайн",
                rating: 5.0,
                students: 20,
                teacher: "Елена Смирнова",
                contact: "@iu5_64b_react",
                experience: "3 года",
                startDate: "2026-04-10"
            },
            {
                id: 5,
                src: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
                groupName: "IU5-75B",
                specialty: "Python",
                description: "Python для анализа данных. Помощь с задачами по pandas, numpy",
                services: ["Python", "Pandas", "NumPy"],
                price: 1300,
                format: "Онлайн",
                rating: 4.6,
                students: 15,
                teacher: "Михаил Воронов",
                contact: "@iu5_75b_python",
                experience: "2 года",
                startDate: "2026-04-25"
            }
        ];
    }

    getGroups() {
        return this.groups;
    }

    addGroup(group) {
        this.groups.push(group);
    }

    deleteGroup(id) {
        this.groups = this.groups.filter(g => g.id !== id);
    }

    merge(...objects) {
        const result = {};

        for (let obj of objects) {
            if (obj && typeof obj === 'object') {
                for (let key in obj) {
                    if (!(key in result)) {
                        result[key] = obj[key];
                    }
                }
            }
        }

        return result;
    }

    isEqual(value1, value2) {
        if (typeof value1 !== typeof value2) return false;
        if (value1 === null || value2 === null) return value1 === value2;
        if (value1 === undefined || value2 === undefined) return value1 === value2;

        if (Array.isArray(value1) && Array.isArray(value2)) {
            if (value1.length !== value2.length) return false;
            for (let i = 0; i < value1.length; i++) {
                if (!this.isEqual(value1[i], value2[i])) return false;
            }
            return true;
        }

        if (Array.isArray(value1) || Array.isArray(value2)) return false;

        if (typeof value1 === 'object' && typeof value2 === 'object') {
            const keys1 = Object.keys(value1);
            const keys2 = Object.keys(value2);
            if (keys1.length !== keys2.length) return false;
            for (let key of keys1) {
                if (!this.isEqual(value1[key], value2[key])) return false;
            }
            return true;
        }

        return value1 === value2;
    }

    isPalindrome(str) {
        if (!str || typeof str !== 'string') return false;
        const cleanStr = str.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
        const reversed = cleanStr.split('').reverse().join('');
        return cleanStr === reversed;
    }
}

export const store = new Store();
