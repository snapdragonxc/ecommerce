/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Product = require('../models/product');

var expect  = require('chai').expect;

var categories = require('../mock/category');

var products = require('../mock/product');

var bcrypt = require('bcryptjs');

// setup server
var server = request.agent(app);

describe('Products api create tests', () => {

  describe('Add a product to database', () => {
    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });
    it('clean Product database', (done) => {
      Product.deleteMany().exec()
      .then( () => {
        done()
      })
      .catch( (err) => done(err) );
    });

    var admin = {
      username: 'admin',
      password: 'password'
    }
    it('seed User database with admin user', (done) => {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(admin.password, salt);
      var user = new User({
        username: admin.username.toLowerCase(),
        password: hash,
      });
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
              expect(res.body.username).to.equal('admin');
              done();
          });
    });

    var myproduct = {
      name: 'myproduct',
      description: 'mydescription',
      category: 'mycategory',
      price: 99.00,
      saleprice: 11.00,
      img: 'product.jpg',
      inventory: 1
    }
    it('admin user can add a new product', (done) => {
      server.post('/api/products')
            .field('name', 'myproduct')
            .field('description', 'mydescription')
            .field('category', 'mycategory')
            .field('price', '99.00')
            .field('saleprice', '11.00')
            .field('inventory', '1')
            .field('img', 'product.jpg')
            .attach('imgUploader', 'test/product.jpg')
            .end(function(err, res){
              if (err) return done(err);
              var prod = res.body;
              expect(res.status).to.equal(200);
              expect(prod.name).to.equal(myproduct.name);
              expect(prod.description).to.equal(myproduct.description);
              expect(prod.category).to.equal(myproduct.category);
              expect(prod.price).to.equal(myproduct.price);
              expect(prod.saleprice).to.equal(myproduct.saleprice);
              expect(prod.inventory).to.equal(myproduct.inventory);
              done();
            });
    });
  })

  describe('Cannot add a product to database if name already exists', () => {

    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });
    it('clean Product database', (done) => {
      Product.deleteMany().exec()
      .then( () => {
        done()
      })
      .catch( (err) => done(err) );
    });

    var myproduct = {
      name: 'myproduct',
      description: 'mydescription',
      category: 'mycategory',
      price: 99.00,
      saleprice: 11.00,
      img: 'product.jpg',
      inventory: 1
    }

    it('seed database with product', (done) => {
      var product = new Product( myproduct );
      product.save(function(err, prod){
          if( err ){ done(err) }
          done();
      })
    });

    var admin = {
      username: 'admin',
      password: 'password'
    }
    it('seed User database with admin user', (done) => {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(admin.password, salt);
      var user = new User({
        username: admin.username.toLowerCase(),
        password: hash,
      });
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
              expect(res.body.username).to.equal('admin');
              done();
          });
    });

    it('Can not add a product if name already exists', (done) => {
      server.post('/api/products')
            .field('name', 'myproduct')
            .field('description', 'mydescription')
            .field('category', 'mycategory')
            .field('price', '99.00')
            .field('saleprice', '11.00')
            .field('inventory', '1')
            .field('img', 'product.jpg')
            .attach('imgUploader', 'test/product.jpg')
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(401);
              expect(res.text).to.equal('A product with this name already exists');
              Product.findOne({name: 'myproduct'}, function(err, prod){
                expect(prod.name).to.equal('myproduct');
                done();
              });
            });
    });

  });
});
