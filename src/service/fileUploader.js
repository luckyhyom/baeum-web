import { config } from '../config/config';
import S3 from 'react-aws-s3';

const s3Keys = {
    bucketName: config.aws.s3.BUCKET_NAME,
    region: config.aws.s3.REGION,
    accessKeyId: config.aws.s3.ACCESS_KEY,
    secretAccessKey: config.aws.s3.SECRET_KEY,
}
export default class FileUploader {
    constructor(http) {
        this.http = http
    }

    uploadImage(file) {
        return new S3(s3Configs('/profile'))
            .uploadFile(file, newFileName(file));
    }

    uploadThumbnail(file) {
        return new S3(s3Configs('/lectures/thumbnail'))
            .uploadFile(file, newFileName(file));
    }
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

function newFileName(file) {
    return new Date().getTime() + file.name;
}