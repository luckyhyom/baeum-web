export default class LectureService {
    constructor(http) {
        this.http = http;
    }

    async getAll() {
        return await this.http.fetch('/lectures', { method: 'GET' });
    }

    async create(data) {
        return await this.http.fetch('/lectures', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async remove(id) {
        return await this.http.fetch(`/lectures/trash/${id}`, {
            method: 'PATCH',
        }); 
    }
}