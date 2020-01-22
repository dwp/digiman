const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve('./', 'build/')
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    compress: true,
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },

    historyApiFallback: true,
    before(app) {
      const favicon = require('express-favicon');
      
      require('./server/config.js')(app);

      app.use(favicon(path.join(__dirname, 'node_modules', 'govuk-frontend', 'govuk', 'assets', 'images', 'favicon.ico')));
    }
  },
  devtool: 'eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/govuk-frontend/govuk/assets',
      to: 'assets/[path]/[name].[ext]'
    }, ])
  ]
});