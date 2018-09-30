/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var expect  = require("chai").expect;

var server = request.agent(app);

var bcrypt = require('bcryptjs');

describe('User api tests', () => {

  describe('Logout a user', () => {

    var myuser = {
      username: 'myuser',
      password: 'mypassword'
    }

    it('clean and seed database', (done) => {
      User.deleteMany({}, function (err) {
        if (err) {
          return done(err);
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(myuser.password, salt);
        var user = new User({
          username: myuser.username.toLowerCase(),
          password: hash,
        });
        user.save(function(err){
          if( err ){ return done(err) }
          return done();
        })
      });
    })

    // sign in as admin user
  /*  it('can login a user ', (done) => {
      server.post('/api/users/login')
          .send(myuser)
          .end(function(err, res) {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.username).to.equal('myuser');
              done();
          });
    });

    it('can logout a user', function(done){
      server.get('/api/users/logout')
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('User logged out');
                done();
            });
    }); */
  });

/*
  describe('Login a user', function(){
    it('clean database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    })

    var myuser = {
      username: 'myuser',
      password: 'mypassword'
    }
    it('seed User database with admin user', (done) => {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(myuser.password, salt);
      var user = new User({
        username: myuser.username.toLowerCase(),
        password: hash,
      });

      user.save(function(err){
        if( err ){ done(err) }
        done();
      })
    });
    // sign in a user
    it('can login a user ', (done) => {
      server.post('/api/users/login')
          .send(myuser)
          .end(function(err, res) {
            console.log('rr', err, res.body)
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.username).to.equal('myuser');
              done();
          });
    });
  });
*/

});
