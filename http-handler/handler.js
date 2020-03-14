'use strict';

const s3Service = require('./service/s3service')
const dynamoDbService = require('./service/dynamoDbServices')

module.exports.upload = async event => {
  const item = await s3Service.upload(event.body);
  await dynamoDbService.put(item);
  return {
    statusCode: 201,
    body: JSON.stringify(item)
  };
};
