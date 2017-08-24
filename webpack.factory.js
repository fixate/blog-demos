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
    // add your specific template in the subfolder's webpack
    // new HtmlWebpackPlugin({
    //   template: `src/index.ejs`,
    //   minify: {collapseWhitespace: true},
    // }),
  ].concat(
    ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            output: {
              comments: false,
            },
            compress: {
              unsafe_comps: true,
              properties: true,
              keep_fargs: false,
              pure_getters: true,
              collapse_vars: true,
              unsafe: true,
              warnings: false,
              screw_ie8: true,
              sequences: true,
              dead_code: true,
              drop_debugger: true,
              comparisons: true,
              conditionals: true,
              evaluate: true,
              booleans: true,
              loops: true,
              unused: true,
              hoist_funs: true,
              if_return: true,
              join_vars: true,
              cascade: true,
              drop_console: true,
            },
          }),
        ]
      : []
  ),

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
