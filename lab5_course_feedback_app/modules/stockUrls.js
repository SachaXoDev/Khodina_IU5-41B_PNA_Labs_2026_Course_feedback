export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3007';
    }

    getGroups() {
        return `${this.baseUrl}/api/student_groups`;
    }

    getGroupById(id) {
        return `${this.baseUrl}/api/student_groups/${id}`;
    }

    createGroup() {
        return `${this.baseUrl}/api/student_groups`;
    }

    updateGroup(id) {
        return `${this.baseUrl}/api/student_groups/${id}`;
    }

    deleteGroup(id) {
        return `${this.baseUrl}/api/student_groups/${id}`;
    }
}

export const stockUrls = new StockUrls();
