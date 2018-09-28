const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/signin', (req, res) => res.render('index'));
router.get('/shop', (req, res) => res.render('index'));
router.get('/shop/*', (req, res) => res.render('index'));
router.get('/cart', (req, res) => res.render('index'));
router.get('/detail/*', (req, res) => res.render('index'));
router.get('/dashboard/*', (req, res) => res.render('index'));


/* start dummy pages for testing */
/*
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
}); */

/* End dummy pages for testing */

module.exports = router;
