const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve('./', 'build/')
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new TerserPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/govuk-frontend/govuk/assets',
      to: 'assets/[path]/[name].[ext]'
    }])
  ]
});