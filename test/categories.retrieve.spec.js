/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Category = require('../models/category');

var expect  = require('chai').expect;

var categories = require('../mock/category');

// setup server
var server = request.agent(app);

describe('Categories api retrieve tests', () => {
  describe('Get all categories from database', function(){
    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    it('seed categories', (done) => {
      Category.create(categories, function (err, cats) {
        if(err){ return done(err) }
        done();
      });
    });

    it('can get all categories', (done) => {
      server.get('/api/categories')
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              var cats = res.body.map( (cat) => {
                return { name: cat.name };
              });
              cats.forEach((cat) => {
                var found = categories.find( (item) => (item.name === cat.name) );
                expect(cat.name).to.equal(found.name);
              });
              done();
            });
    });
  });

  describe('Get a category by id from database', function(){
    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    var mycat = {};
    it('seed database with category', (done) => {
      var category = new Category({
          name: 'mycategory'
      });
      category.save(function(err, cat){
          if( err ){ done(err) }
          mycat = cat;
          done();
      })
    });

    it('can get a category by id', (done) => {
      server.get('/api/categories/' + mycat._id)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              var cat = res.body;
              expect(cat.name).to.equal(mycat.name);
              expect(cat._id.toString()).to.equal(mycat._id.toString());
              done();
            });
    });
  });

  describe('Get a category by name from database', function(){
    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    var mycat = {};
    it('seed database with category', (done) => {
      var category = new Category({
          name: 'mycategory'
      });
      category.save(function(err, cat){
          if( err ){ done(err) }
          mycat = cat;
          done();
      })
    });

    it('can get a category by name', (done) => {
      server.get('/api/categories/name/' + mycat.name)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              var cat = res.body;
              expect(cat.name).to.equal(mycat.name);
              expect(cat._id.toString()).to.equal(mycat._id.toString());
              done();
            });
    });
  });
});
