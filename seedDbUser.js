const User = require('./models/user');

module.exports = ({ name, password }) => (
  new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      name: name.toLowerCase(),
      password,
    }, {}, { upsert: true },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ name, password });
      }
    });
  })
);
