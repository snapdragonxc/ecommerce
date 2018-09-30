/* eslint-disable */
const bcrypt = require('bcryptjs');
const User = require('./models/user');

module.exports = ({ name, password }) => (
  new Promise((resolve, reject) => {
      User.findOne({ username: name.toLowerCase() }, function (err, usr) {
        if (usr !== null) {
          reject('A user with this name already exists');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
          username: name.toLowerCase(),
          password: hash,
        });

        user.save((error) => {
          if (!error) {
            resolve(name);
          }
          reject(`Error: ${err}`);
        });
      });
  })
);
