'use strict'
module.exports = {
  entry: './app.js',
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {test: /\.css$/ ,loader: 'style!css'}
    ]
  }
};