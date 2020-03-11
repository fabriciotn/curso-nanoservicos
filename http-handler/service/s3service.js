import { v4 as uuidv4 } from 'uuid';

const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

const S3 = new AWS.S3()
const BUCKET = 'nanoservices-imagens'

const upload = body => {
    const id = uuidv4()
    return new Promise((res, rej) => {
        S3.putObject({
            Bucket: BUCKET,
            Key: id + 'jpg',
            Body: new Buffer(body.replace(/^data:image\/\w+;base64,/,""),'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if(err) {
                return rej(err)
            }
            return res({
                bucket: BUCKET,
                key: id + 'jpg'
            })
        })
    })
}

module.exports = {
    upload: upload
}