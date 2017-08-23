const webpackConfFactory = require('../webpack.factory');
const path = require('path');

const webpackConf = webpackConfFactory(__dirname);

module.exports = Object.assign({}, webpackConf, {
  entry: {
    main: './index.js',
  },

  resolve: Object.assign({}, webpackConf.resolve, {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  }),
});
