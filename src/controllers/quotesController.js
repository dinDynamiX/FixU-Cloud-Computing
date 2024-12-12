const { bucket } = require('../config/cloudStorage');

let currentImageIndex = 0;
let images = [];

// Fungsi untuk mengambil daftar gambar dari bucket
const fetchImagesFromBucket = async () => {
  try {
    const [files] = await bucket.getFiles();
    images = files.map(file => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
  } catch (error) {
    console.error('Error fetching images:', error);
    images = [];
  }
};

// Fungsi untuk mendapatkan gambar saat ini
const getCurrentImage = (req, res) => {
  if (images.length === 0) {
    return res.status(404).json({ message: 'No images available' });
  }
  res.json({ image: images[currentImageIndex] });
};

// Memutar gambar setiap 30 detik
setInterval(() => {
  if (images.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }
}, 30000);

fetchImagesFromBucket();

module.exports = { getCurrentImage };
