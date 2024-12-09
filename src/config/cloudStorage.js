const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Inisialisasi Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, '../../StorageServiceKey.json'),
});

const bucketName = 'quotes_bucket'; 
const bucket = storage.bucket(bucketName);

module.exports = { bucket };



// * Test koneksi bucket * //

// const bucketName = 'quotes_bucket';

// // Tes akses bucket
// (async () => {
//   try {
//     const [files] = await storage.bucket(bucketName).getFiles();
//     console.log('Files in bucket:', files.map(file => file.name));
//   } catch (error) {
//     console.error('Error accessing bucket:', error);
//   }
// })();
