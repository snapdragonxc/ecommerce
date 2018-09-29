/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Product = require('../models/product');

var expect  = require('chai').expect;

var categories = require('../mock/category');

var products = require('../mock/product');

// setup server
var server = request.agent(app);

describe('Products api tests', () => {

  describe('Delete a product from database', function(){
    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    it('clean Product database', (done) => {
      Product.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });
    var id = '';
    var myproduct = {
      name: 'myproduct',
      description: 'mydescription',
      category: 'mycategory',
      price: 99.00,
      saleprice: 11.00,
      img: 'myimage',
      inventory: 22
    }
    it('seed database with product', (done) => {
      var product = new Product( myproduct );
      product.save(function(err, prod){
        if( err ){ done(err) }
        id = prod._id;
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

    it('can delete product', (done) => {
      server.delete('/api/products/' + id)
            .end(function(err, res){
              if (err) return done(err);
              console.log(res.body)
              expect(res.status).to.equal(200);
              Product.findOne({name: 'myproduct'}, function(err, prod){
                expect(prod).to.be.null;
                done();
              });
            });
    });
  });

});
