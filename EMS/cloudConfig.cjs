const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dcnssac5e',
    api_key: '143217569758745',
    api_secret: '065ECnw9dPw-gjMoiYcfr92EAx0'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'EMS', // Specify the folder in Cloudinary
        allowed_formats: ['png', 'jpg', 'jpeg'],
        public_id: (req, file) => file.originalname.split('.')[0], // Use original file name
    },
});

module.exports = { cloudinary, storage };
