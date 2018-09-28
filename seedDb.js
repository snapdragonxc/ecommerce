/* eslint-disable */

const Product = require('./models/product');
const Category = require('./models/category');
const categories = require('./mock/category');
const products = require('./mock/product');

module.exports = () => {
  Product.deleteMany().exec()
    .then(() => {
      Product.create(products, (err) => {
        if (err) {
          console.log(err);
      }
      });
    })
    .catch(err => console.log(err));

  Category.deleteMany().exec()
    .then(() => {
      Category.create(categories, (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch(err => console.log(err));
};
