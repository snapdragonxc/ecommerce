/* eslint-disable */

var request = require('supertest');

var app = require('../app');

var User = require('../models/user');

var Category = require('../models/category');

var expect  = require('chai').expect;

var categories = require('../mock/category');

// setup server
var server = request.agent(app);

describe('Categories api update tests', () => {
  // not applicable
});
