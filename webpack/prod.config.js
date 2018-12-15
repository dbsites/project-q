/**
 * @module  prod.config.js
 * @description Webpack Production Mode Configuration
 */

const merge = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
  mode: 'production',
});
