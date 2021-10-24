export default class LectureService {
    constructor(http) {
        this.http = http;
    }

    async getAll() {
        return await this.http.fetch('/lecture',{ method: 'GET' });
    }
}