const path = require('path');

module.exports = {

  entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.jsx')],

  output: {
    path: path.join(__dirname, 'public/javascripts'),
    filename: 'app.bundle.js',
  },

  mode: process.env.NODE_ENV || 'development',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },

  devtool: 'source-map',

};
