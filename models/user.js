/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Fix mongoose upgrade warnings
mongoose.set('useCreateIndex', true);
// Define User Model
const userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: String,
});

// Add password validation function to User model as required by passport
userSchema.methods.validPassword = function (myPlaintextPassword){
  // ES6 arrow does not have this pointer - unless you want to bind
  const result = bcrypt.compareSync(myPlaintextPassword, this.password);
  return result;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
