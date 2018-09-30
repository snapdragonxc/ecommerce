/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Category = require('../models/category');

var expect  = require('chai').expect;

var categories = require('../mock/category');

var bcrypt = require('bcryptjs');

// setup server
var server = request.agent(app);

describe('Categories api delete tests', () => {
  describe('Delete a category from database', function(){
    it('clean User database', (done) => {
      User.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    it('clean Category database', (done) => {
      Category.deleteMany().exec()
      .then( () => done() )
      .catch( (err) => done(err) );
    });

    var id = '';
    it('seed database with category', (done) => {
      var category = new Category({
          name: 'mycategory'
      });
      category.save(function(err, cat){
          if( err ){ done(err) }
          id = cat._id;
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

    it('can delete category', (done) => {
      server.delete('/api/categories/' + id)
            .end(function(err, res){
              if (err) return done(err);
              expect(res.status).to.equal(200);
              Category.findOne({name: 'mycategory'}, function(err, cat){
                expect(cat).to.be.null;
                done();
              });
            });
    });
  });
});
