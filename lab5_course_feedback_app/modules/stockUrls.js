export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005';  // поменяли порт
    }

    getGroups() {
        return `${this.baseUrl}/api/group-students`;  // поменяли endpoint
    }

    getGroupById(id) {
        return `${this.baseUrl}/api/group-students/${id}`;  // поменяли endpoint
    }

    createGroup() {
        return `${this.baseUrl}/api/group-students`;  // поменяли endpoint
    }

    updateGroup(id) {
        return `${this.baseUrl}/api/group-students/${id}`;  // поменяли endpoint
    }

    deleteGroup(id) {
        return `${this.baseUrl}/api/group-students/${id}`;  // поменяли endpoint
    }
}

export const stockUrls = new StockUrls();
