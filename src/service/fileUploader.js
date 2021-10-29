import { config } from '../config/config'
import { uploadFile } from 'react-s3'

const s3Keys = {
    bucketName: config.aws.s3.BUCKET_NAME,
    region: config.aws.s3.REGION,
    accessKeyId: config.aws.s3.ACCESS_KEY,
    secretAccessKey: config.aws.s3.SECRET_KEY,
}

function s3Configs(dirName) {
    if(!dirName.startsWith('/')) {
        dirName = '/'+dirName
    }
    return {
        ...s3Keys,
        dirName: `baeumFiles${dirName}`
    }
}
export default class FileUploader {
    constructor(http) {
        this.http = http
    }

    uploadImage(file) {
        return uploadFile(file,s3Configs('/profile'))
    }

    uploadThumbnail(file) {
        return uploadFile(file,s3Configs('/lectures/thumbnail'));
    }
}