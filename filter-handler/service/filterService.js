const jimp = require('jimp');

const s3Service = require('./s3Service')

const filter = async event => {
    const s3Info = JSON.parse(event.Records[0].Sns.Message)
    const bucket = s3Info.Records[0].s3.bucket.name
    const key = s3Info.Records[0].s3.object.key
    const objetoS3 = await s3Service.getObject(bucket, key)
    const imagem = await jimp.read(objetoS3)
    const buffer = await imagem.grayscale().quality(80).getBufferAsync(jimp.MIME_JPEG)
    await s3Service.putObject(buffer, key)
}

module.exports = {
    filter: filter
}