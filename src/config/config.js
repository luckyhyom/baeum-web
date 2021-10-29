import dotenv from 'dotenv'
dotenv.config();

function required(key, defaultValue=undefined) {
    const result = process.env[key] || defaultValue;
    if(result == null) {
        throw new Error(`key ${key} is undefined`)
    }
    return result;
}

export const config = {
    aws: {
        s3: {
            ACCESS_KEY: required('REACT_APP_AWS_S3_ACCESS_KEY'),
            SECRET_KEY: required('REACT_APP_AWS_S3_SECRET_KEY'),
            REGION: required('REACT_APP_AWS_S3_REGION'),
            BUCKET_NAME: required('REACT_APP_AWS_S3_BUCKET_NAME'),
        }
    }
}