export default class FileUploader {
    constructor(http) {
        this.http = http
    }

    uploadImage(data) {
        return this.http.fetch('/auth/image', {
            method: 'POST',
            body: data
        }, true)
    }
}