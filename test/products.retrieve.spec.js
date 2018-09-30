/* eslint-disable */
/*
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

  describe('Get all products from database', function(){
    it('clean Product database', (done) => {
      Product.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    it('seed products', (done) => {
      Product.create(products, function (err, prods) {
        if(err){ return done(err) }
        done();
      });
    });

    it('can get all products', (done) => {
      server.get('/api/products')
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              var prods = res.body.map( (prod) => {
                return {
                  name: prod.name,
                  description: prod.description ,
                  category: prod.category ,
                  price: prod.price ,
                  saleprice: prod.saleprice ,
                  img: prod.img ,
                  inventory: prod.inventory
                };
              });
              prods.forEach((prod) => {
                var found = products.find( (item) => (item.name === prod.name) );
                expect(prod.name).to.equal(found.name);
                expect(prod.description).to.equal(found.description);
                expect(prod.price).to.equal(found.price);
                expect(prod.saleprice).to.equal(found.saleprice);
                expect(prod.img).to.equal(found.img);
                expect(prod.inventory).to.equal(found.inventory);
              });
              done();
            });
    });
  });

  describe('Get a product by id from database', function(){
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

    it('can get a product by id', (done) => {
      server.get('/api/products/product/id/' + id)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              var prod = res.body;
              expect(prod.name).to.equal(myproduct.name);
              expect(prod.description).to.equal(myproduct.description);
              expect(prod.category).to.equal(myproduct.category);
              expect(prod.price).to.equal(myproduct.price);
              expect(prod.saleprice).to.equal(myproduct.saleprice);
              expect(prod.img).to.equal(myproduct.img);
              expect(prod.inventory).to.equal(myproduct.inventory);
              expect(prod._id.toString()).to.equal(id.toString());
              done();
            });
    });
  });

});
*/
