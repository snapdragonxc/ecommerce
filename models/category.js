const mongoose = require('mongoose');
// Fix mongoose upgrade warnings
mongoose.set('useCreateIndex', true);

const categorySchema = mongoose.Schema({
  name: { type: String, index: { unique: true } },
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
