export default class AuthService {

    constructor(http) {
        this.http = http;
    }

    async getCsrfToken() {
        const res = await this.http.fetch('/auth/csrf-token',{ method: 'GET' });
        return res.csrfToken;
    }

    async login(userId, password) {
        return await this.http.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ userId, password })
        })
    }

    async me() {
        return await this.http.fetch('/auth/me',{});
    }

}