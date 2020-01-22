const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  entry: {
    digiman: [
      './app/digiman.index.ts'
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.ts', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.mustache/,
        exclude: /node_modules/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sourceMap: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Digiman',
      template: 'app/index.html'
    })
  ]
};