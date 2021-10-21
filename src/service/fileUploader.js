export default class FileUploader {
    constructor(http) {
        this.http = http
    }

    uploadImage(data) {
        this.http.fetch('/auth/image', {
            method: 'POST',
            body: data
        })
    }
}