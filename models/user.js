const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Fix mongoose upgrade warnings
mongoose.set('useCreateIndex', true);
// Define User Model
const userSchema = mongoose.Schema({
  name: { type: String, index: { unique: true } },
  password: String,
});

// Add password validation function to User model as required by passport
userSchema.methods.validPassword = (myPlaintextPassword) => {
  const result = bcrypt.compareSync(myPlaintextPassword, this.password);
  // console.log('passwd compare', result);
  return result;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
