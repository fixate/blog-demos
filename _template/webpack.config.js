const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfFactory = require('../../webpack.factory');
const path = require('path');

const webpackConf = webpackConfFactory(__dirname);

module.exports = Object.assign({}, webpackConf, {
  entry: {
    main: './index.js',
  },

  plugins: webpackConf.plugins.concat([
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: {collapseWhitespace: true},
    }),
  ]),
});
