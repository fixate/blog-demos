const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

const webpackConfFactory = (dirname = __dirname) => ({
  context: path.resolve(dirname, 'src'),

  entry: {
    main: './index.js',
  },

  output: {
    path: path.resolve(dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(dirname, 'src/lib'),
      path.resolve(dirname, 'node_modules'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: '/.js$/',
        exclude: path.resolve(dirname, 'src'),
        enforce: 'pre',
        use: 'source-map-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: {collapseWhitespace: true},
    }),
  ].concat(ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin()] : []),

  stats: {
    colors: true,
    chunks: false,
    modules: false,
  },

  node: {
    Buffer: false,
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    open: true,
    openPage: '',
  },
});

module.exports = webpackConfFactory;
