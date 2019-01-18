/**
 * @module  prod.config.js
 * @description Webpack Production Mode Configuration
 */

const path = require('path');
const merge = require('webpack-merge');

const HTMLWebpack = require('html-webpack-plugin');

const common = require('./common.config');

// Plugin to add bundle.js to index.html
const HTMLWebPackPlugin = new HTMLWebpack({
  template: path.resolve(__dirname, '../src/index.html'),
  filename: './index.html',
});

module.exports = merge(common, {
  mode: 'production',
  plugins: [HTMLWebPackPlugin],
});
