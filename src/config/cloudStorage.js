const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../StorageServiceKey.json'),
});

const bucketName = process.env.BUCKET_NAME; 
const bucket = storage.bucket(bucketName);

module.exports = { bucket };



