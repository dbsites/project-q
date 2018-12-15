/**
 * @module  dev.config.js
 * @description Webpack Development Mode Configuration
 */

const path = require('path');
const merge = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    compress: true,                                       // GZIP Compression
    contentBase: path.resolve(__dirname, '../dist'),      // Serve static content from ../dist
    historyApiFallback: true,                             // Redirect 404s back to /index.html
    host: '0.0.0.0',                                      // Bind host for Docker compatibility
    proxy: {
      '/api': 'http://ethiq-dev-server:3000',             // Proxy requests to '8080/api' route
    },
    port: 8080,                                           // Specify PORT for requests
  },
  devtool: 'source-map',
});
