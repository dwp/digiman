const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  entry: {
    digiman: './app/digiman-unstyled.index.ts'
  }
});