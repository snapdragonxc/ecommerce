/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var expect  = require("chai").expect;

var server = request.agent(app);

describe('User api tests', () => {

  describe('Logout a user', () => {
    it('clean database', (done) => {
      User.remove({}).exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    })
    var myuser = {
      name: 'myuser',
      password: 'mypassword'
    }
    it('seed User database with user', (done) => {
      var user = new User(myuser);
      user.save(function(err){
        if( err ){ done(err) }
        done();
      })
    });
    // sign in as admin user
    it('can login a user ', (done) => {
      server.post('/api/users/login')
          .send(myuser)
          .end(function(err, res) {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.name).to.equal('myuser');
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
    });
  });

  describe('Login a user', function(){
    it('clean database', (done) => {
      User.remove({}).exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    })

    var myuser = {
      name: 'myuser',
      password: 'mypassword'
    }
    it('seed User database with admin user', (done) => {
      var user = new User(myuser);
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
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.name).to.equal('myuser');
              done();
          });
    });
  });

  describe('Register a new user', function(){
    it('clean database', (done) => {
      User.remove({}).exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    })

    var user = {
      name: 'myname',
      password: 'mypassword'
    }
    var admin = {
      name: 'admin',
      password: 'password'
    }
    it('seed User database with admin user', (done) => {
      var user = new User(admin);
      user.save(function(err){
        if( err ){ done(err) }
        done();
      })
    });
    // sign in as admin user
    it('can login as an admin user ', (done) => {
      server.post('/api/users/login')
          .send(admin)
          .end(function(err, res) {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.name).to.equal('admin');
              done();
          });
    });

    it('admin user can register a new user', (done) => {
      server.post('/api/users/register')
            .send(user)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.text).to.equal('myname');
              User.findOne({name: 'myname'}, function(err, usr){
                expect(usr.name).to.equal('myname');
                expect(usr.password).to.equal('mypassword')
              });
              done();
            });
    });
  });

});
