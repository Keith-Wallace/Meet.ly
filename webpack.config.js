var glob = require('glob');

module.exports = {
  entry: glob.sync('./client/app/**/*.js*'),
  output: {
    path: __dirname,
    filename: "./client/js/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};