export default class HttpClient {
    constructor(baseURL, getCsrfToken) {
        this.baseURL = baseURL;
        this.getCsrfToken = getCsrfToken;
    }

    async fetch(url, options) {
        const res = await fetch(this.baseURL+url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                'csrf_token': this.getCsrfToken()
            },
            credentials: 'include'
        });

        let data;

        try {
            data = await res.json();
        } catch (error) {
            console.error(error);
        }
        
        return data;
    }
}