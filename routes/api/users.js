var express = require('express');
var User = require('../../models/user');
var sessionCheck = require('../middleware/authentication');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/login', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    User.findOne({name: name}, function(err, usr){
      if(err){
        res.status(500);
        return res.send(err);
      }
      if(usr === null){
        res.status(401);
        return res.send("Bad username or password");
      }
      if( name === usr.name && password === usr.password ){
        req.session.regenerate(function(){
          req.session.user = name;
          res.status(200)
          return res.json({'name': name} );
        });
      } else {
        res.status(401);
        return res.send("Bad username or password");
      }
    });
});

router.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.status(200);
      return res.send('User logged out');
    })
});

router.post('/register', sessionCheck, function(req, res){

  var name = req.body.name;
  var password = req.body.password;

  User.findOne({name: name}, function(err, usr){

    if( usr !== null ){
      res.status(401);
      return res.send("A user with that name already exists");
    }
    var user = new User({
        name: name.toLowerCase(),
        password: password
    });
    user.save(function(err){
        if( !err ){
            res.status(200);
            res.send(name);
        } else {
          res.status(500);
          return res.send("User save error");
        }
    })
  });
});

module.exports = router;
