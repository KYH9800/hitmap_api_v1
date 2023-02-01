const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

module.exports = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const filiname = path.basename(file.originalname).trim();
      let newFilename = '';
      for (let value of filiname) {
        if (value === ' ') {
          value = '-';
        }
        newFilename += value;
      }

      cb(null, `original/${Date.now()}_${newFilename}`);
    },
  }),
  limits: { fileSize: 25 * 1024 * 1024 },
});
