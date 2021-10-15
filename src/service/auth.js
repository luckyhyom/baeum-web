export default class AuthService {

    constructor(http) {
        this.http = http;
    }

    async getCsrfToken() {
        const res = await this.http.fetch('/auth/csrf-token',{ method: 'GET' });
        return res.csrfToken;
    }
}