const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (typeof req.session.cart !== 'undefined') {
    return res.json(req.session.cart);
  }
  const cart = [];
  return res.json(cart);
});

router.delete('/all', (req, res) => {
  req.session.cart = []; // empty
  req.session.save((err) => {
    if (err) {
      res.status(500); // error updating cart
      return res.send(err);
    }
    return res.send('cart is empty');
  });
});

router.delete('/id/:_id', (req, res) => {
  const { _id } = req.params;
  const cart = req.session.cart || [];
  let items = cart;
  const found = cart.findIndex(item => (item.product._id === _id));
  if (found !== -1) {
    items = cart.slice(0, found).concat(cart.slice(found + 1));
  }
  req.session.cart = items; // overwrite
  req.session.save((err) => {
    if (err) {
      res.status(500); // error updating cart
      return res.send(err);
    }
    return res.json(items);
  });
});

router.put('/', (req, res) => {
  const { _id } = req.body.product;
  let items = [];
  const cart = req.session.cart || [];
  const found = cart.findIndex(item => (item.product._id === _id));

  if (found === -1) {
    items = cart.concat(req.body);
  } else {
    items = cart.map((item, index) => {
      if (index !== found) {
        return item;
      }
      return req.body;
    });
  }
  req.session.cart = items; // overwrite
  req.session.save((err) => {
    if (err) {
      res.status(500); // error updating cart
      return res.send(err);
    }
    return res.json(items);
  });
});

router.post('/', (req, res) => {
  const cart = req.session.cart || [];
  const { _id } = req.body.product._id;
  let items = [];
  const found = cart.findIndex(item => (item.product._id === _id));
  if (found === -1) {
    items = cart.concat(req.body);
  } else {
    items = cart.map((item, index) => {
      if (index !== found) {
        return item;
      }
      req.body.qty += item.qty;
      req.body.subTotal = req.body.qty * req.body.product.price;
      return req.body;
    });
  }
  req.session.cart = items;
  req.session.save((err) => {
    if (err) {
      res.status(500); // error updating cart
      return res.send(err);
    }
    return res.json(items);
  });
});

module.exports = router;
