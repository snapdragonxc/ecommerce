const multer = require('multer');
const imagemagick = require('imagemagick');
const fs = require('fs');

const IMG_URL = './public/images/products/';

const Storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, './public/images/products'),
  filename: (req, file, callback) => callback(null, `${Date.now()} _${file.originalname}`),
});

const upload = multer({ storage: Storage })
  .array('imgUploader', 1); // Field name and max count

const imageUpdate = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }

    if (req.body.updateImage === 'false') {
      return next();
    }
    const oldImg = req.body.img;
    let img = '';
    if (req.files[0]) {
      img = req.files[0].filename;
    } else {
      res.status(500);
      return res.send('Missing image file name');
    }
    // remove img
    return fs.unlink(IMG_URL + oldImg, (removeErr) => {
      if (err) {
        res.status(500);
        return res.json({ error: removeErr, type: 'error removing original image' });
      }
      // remove thb
      const thb = `${oldImg.substring(0, oldImg.length - 4)}_thb.jpg`;
      return fs.unlink(IMG_URL + thb, (removeThbErr) => {
        if (removeThbErr) {
          res.status(500);
          return res.json({ error: removeThbErr, type: 'error removing original image' });
        }
        return imagemagick.resize({
          srcPath: IMG_URL + img,
          dstPath: `${IMG_URL + img.substring(0, img.length - 4)}_thb.jpg`,
          width: 256,
        }, (resizeErr) => {
          if (resizeErr) {
            res.status(500);
            return res.send(resizeErr);
          }
          req.body.img = img;
          return next();
        });
      });
    });
  });
};
module.exports = imageUpdate;
