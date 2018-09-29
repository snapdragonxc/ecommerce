/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Category = require('../models/category');

var expect  = require('chai').expect;

var categories = require('../mock/category');

// setup server
var server = request.agent(app);

describe('Categories api create tests', () => {

  describe('Add a category to database', () => {
    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });
    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => {
        done()
      })
      .catch( (err) => done(err) );
    });

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

    var category = {
      name: 'mycategory',
    }
    it('admin user can add a new category', (done) => {
      server.post('/api/categories')
            .send(category)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.text).to.equal('mycategory');
              Category.findOne({name: 'mycategory'}, function(err, cat){
                expect(cat.name).to.equal('mycategory');
                done();
              });
            });
    });

  });

  describe('Cannot add a category to database if name already exists', () => {
    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });
    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => {
        done()
      })
      .catch( (err) => done(err) );
    });

    var mycategory = {
      name: 'mycategory'
    }

    it('seed database with category', (done) => {
      var category = new Category( mycategory );
      category.save(function(err, cat){
          if( err ){ done(err) }
          done();
      })
    });

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

    it('Can not add a category if name already exists', (done) => {
      server.post('/api/categories')
            .send(mycategory)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(401);
              expect(res.text).to.equal('A category with this name already exists');
              Category.findOne({name: 'mycategory'}, function(err, cat){
                expect(cat.name).to.equal('mycategory');
                done();
              });
            });
    });

  });

});
