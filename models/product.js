const mongoose = require('mongoose');
// Fix mongoose upgrade warnings
mongoose.set('useCreateIndex', true);

const productSchema = mongoose.Schema({
  name: { type: String, index: { unique: true } },
  sku: String,
  description: String,
  category: String,
  price: Number,
  saleprice: Number,
  img: String,
  inventory: Number,
  onDisplay: Boolean,
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
