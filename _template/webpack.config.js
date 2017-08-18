const webpackConfFactory = require('../../webpack.factory');
const path = require('path');

const webpackConf = webpackConfFactory(__dirname);

module.exports = Object.assign({}, webpackConf, {
  entry: {
    main: './index.js',
  },
});
