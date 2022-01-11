export default class HttpClient {
    constructor(baseURL, getCsrfToken) {
        this.baseURL = baseURL;
        this.getCsrfToken = getCsrfToken;
    }

    async fetch(url, options, isMultipart) {
        let contentType = { 'Content-Type': 'application/json' };

        if(isMultipart) {
            contentType = {};
        }

        const res = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: {
                ...contentType,
                ...options.headers,
                'csrf-token': await this.getCsrfToken(),
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