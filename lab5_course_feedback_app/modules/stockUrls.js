export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005';
    }

    getGroups() {
        return `${this.baseUrl}/api/groups`;
    }

    getGroupById(id) {
        return `${this.baseUrl}/api/groups/${id}`;
    }

    createGroup() {
        return `${this.baseUrl}/api/groups`;
    }

    updateGroup(id) {
        return `${this.baseUrl}/api/groups/${id}`;
    }

    deleteGroup(id) {
        return `${this.baseUrl}/api/groups/${id}`;
    }
}

export const stockUrls = new StockUrls();
