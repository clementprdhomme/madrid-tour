'use strict';

var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /.*\.svg$/,
        loaders: [
          'svg-sprite?' + JSON.stringify({ name: '[name]_[hash]', prefixize: true}),
          'svgo-loader?useConfig=svgoConfig1'
        ]
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    postcss: [
      require('postcss-import')(),
      require('postcss-nested')(),
      require('postcss-simple-vars')(),
      require('postcss-hexrgba')(),
    ],
    loaders: {
      css: ExtractTextPlugin.extract('css')
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  svgoConfig1: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false}
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
