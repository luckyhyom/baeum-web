export default class HttpClient {
    constructor(baseURL, getCsrfToken) {
        this.baseURL = baseURL;
        this.getCsrfToken = getCsrfToken;
    }

    async fetch(url, options) {
        let contentType = { 'Content-Type': 'application/json' };

        if(url === '/auth/image' || url === '/auth/video') {
            contentType = {};
        }

        const res = await fetch(this.baseURL+url, {
            ...options,
            headers: {
                ...contentType,
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

        if(data.statusCode < 200 || data.statusCode > 299) {
            throw new Error(data.message);
        }
        
        return data;
    }
}