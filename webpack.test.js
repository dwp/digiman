const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval-source-map',
  performance: {
    hints: false
  },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve('./', 'build/')
	},
	module: {
		rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          configFile: '.eslintrc.json'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
});

