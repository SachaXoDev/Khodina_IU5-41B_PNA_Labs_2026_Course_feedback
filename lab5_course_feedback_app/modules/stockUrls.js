export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005';
    }

    getGroups() {
        return `${this.baseUrl}/api/group-students`;
    }

    getGroupById(id) {
        return `${this.baseUrl}/api/group-students/${id}`;
    }

    createGroup() {
        return `${this.baseUrl}/api/group-students`;
    }

    updateGroup(id) {
        return `${this.baseUrl}/api/group-students/${id}`;
    }

    deleteGroup(id) {
        return `${this.baseUrl}/api/group-students/${id}`;
    }
}

export const stockUrls = new StockUrls();
