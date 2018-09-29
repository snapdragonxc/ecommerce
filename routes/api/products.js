/* eslint-disable */
const express = require('express');
const fs = require('fs');
const Product = require('../../models/product');
const sessionCheck = require('../middleware/authentication');
const imageUpdate = require('../middleware/imageUpdate');
const imageUpload = require('../middleware/imageUpload');

const router = express.Router();
const IMG_URL = './public/images/products/';

//router.post('/', sessionCheck, imageUpload, (req, res) => {
router.post('/', imageUpload, (req, res) => {
  const myproduct = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    saleprice: req.body.saleprice,
    img: req.files[0].filename,
    inventory: req.body.inventory,
    onDisplay: req.body.onDisplay || false,
  };
  Product.findOne({ name: myproduct.name }, (err, prod) => {
    if (prod !== null) {
      res.status(401);
      return res.send('A product with this name already exists');
    }
    const product = new Product(myproduct);
    product.save((error) => {
      if (!error) {
        res.status(200);
        return res.json(product);
      }
      res.status(500);
      return res.send(err);
    });
  });
});

router.get('/', (req, res) => {
  Product.find((err, products) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(products);
  });
});

router.get('/product/id/:id', (req, res) => {
  const { id } = req.params;

  Product.findById(id).exec((err, product) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(product);
  });
});

router.get('/product/name/:name', (req, res) => {
  const { name } = req.params;
  Product.findOne({ name }).exec((err, product) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(product);
  });
});

router.get('/display', (req, res) => {
  Product.find({ onDisplay: { $eq: true } }).exec((err, products) => {
    if (err) {
      return res.send(err);
    }
    return res.json(products);
  });
});

router.get('/:category/:page', (req, res) => {
  // paginate
  const filter = req.params.category;
  let query;
  if (filter === 'all-items') {
    query = {};
  } else {
    query = { category: { $eq: filter } };
  }
  const perPage = 6;
  const { page } = req.params;
  let index = page - 1;
  let pages = 1;
  Product.count(query).exec((err, count) => {
    if (err) {
      return res.send(err);
    }
    pages = Math.ceil(count / perPage);
    if (pages > 0) {
      if (index > (pages - 1)) {
        index -= 1;
      }
    }
    return Product.find(query).skip(perPage * index).limit(perPage).exec((error, products) => {
      if (error) {
        return res.send(err);
      }
      return res.json({ products, pages });
    });
  });
});

//  router.put('/:_id', sessionCheck, function(req, res){
router.put('/:_id', imageUpdate, (req, res) => {
  const { _id } = req.params;
  Product.findOneAndUpdate(
    { _id }, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        saleprice: req.body.saleprice,
        img: req.body.img,
        inventory: req.body.inventory,
        onDisplay: req.body.onDisplay || false,
      },
    }, {
      new: true,
    }, (err, product) => {
      if (err) {
        res.status(500);
        return res.send(err);
      }
      res.status(200);
      return res.json(product);
    },
  );
});

//  router.delete('/:_id', sessionCheck, function(req, res){
router.delete('/:_id', (req, res) => {
  const { _id } = req.params;
  let file = '';
  let thbfile = '';
  Product.findOne({ _id }).exec((err, product) => {
    if (err) {
      res.status(500);
      res.send(err);
    }
    Product.remove({ _id }, (removeErr) => {
      if (removeErr) {
        res.status(500);
        return res.send(removeErr);
      }
      // remove main
      return fs.unlink(IMG_URL + product.img, (imgfileErr) => {
        if (imgfileErr) {
          file = 'image file does not exist';
        }
        // remove thb
        const thb = `${product.img.substring(0, product.img.length - 4)}_thb.jpg`;
        return fs.unlink(IMG_URL + thb, (thbFileerr) => {
          if (thbFileerr) {
            thbFile = 'thb image file does not exist';
          }
          res.status(200);
          const data = { file: file, thbFile: thbFile, _id: req.params._id };
          return res.json(data);
        });
      });
    });
  });
});

module.exports = router;
