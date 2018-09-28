const express = require('express');
const categories = require('./api/categories');
const products = require('./api/products');
const users = require('./api/users');
const cart = require('./api/cart');

const router = express.Router();
router.use('/categories', categories);
router.use('/products', products);
router.use('/users', users);
router.use('/cart', cart);

module.exports = router;
