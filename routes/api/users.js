/* eslint-disable */
var express = require('express');
var User = require('../../models/user');
var passport = require('passport');
var mongoose = require('mongoose');
var router = express.Router();


router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.status(200)
    return res.json({'username': req.user.username} );
  });

router.get('/logout', function(req, res){
  req.logout(); // passport added logout to req.
  res.status(200);
  return res.send('User logged out');
});

module.exports = router;
