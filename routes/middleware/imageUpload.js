const multer = require('multer');
const imagemagick = require('imagemagick');

const IMG_URL = './public/images/products/';

const Storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, IMG_URL),
  filename: (req, file, callback) => callback(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage: Storage })
  .array('imgUploader', 1); // Field name and max count

const imageUpload = (req, res, next) => {
  upload(req, res, (uploadErr) => {

    console.log('ee', uploadErr)

    if (uploadErr) {
      res.status(500);
      return res.send(uploadErr);
    }

    let img = '';
    if (req.files[0]) {
      img = req.files[0].filename;
    } else {
      res.status(500);
      return res.send('Missing image file name');
    }

    console.log('img', img);
    
    return imagemagick.resize({
      srcPath: IMG_URL + img,
      dstPath: `${IMG_URL + img.substring(0, img.length - 4)}_thb.jpg`,
      width: 256,
    }, (resizeErr) => {
      console.log('ee', resizeErr)
      if (resizeErr) {
        res.status(500);
        return res.send(resizeErr);
      }
      return next();
    });
  });
};

module.exports = imageUpload;
