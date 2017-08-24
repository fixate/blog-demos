const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfFactory = require('../webpack.factory');
const path = require('path');

const webpackConf = webpackConfFactory(__dirname);

module.exports = Object.assign({}, webpackConf, {
  entry: {
    main: './components/index.js',
  },

  resolve: Object.assign({}, webpackConf.resolve, {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  }),

  plugins: webpackConf.plugins.concat([
    new HtmlWebpackPlugin({
      template: `components/index.ejs`,
      minify: {collapseWhitespace: true},
    }),
  ]),
});
