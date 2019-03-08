/**
 * @module  dev.config.js
 * @description Webpack Development Mode Configuration
 */

const path = require("path");
const dotenv = require("dotenv");
const merge = require("webpack-merge");
const webpack = require("webpack");

const HTMLWebpack = require("html-webpack-plugin");

const common = require("./common.config");

// Plugin to add bundle.js to index.html
const HTMLWebPackPlugin = new HTMLWebpack({
  template: path.resolve(__dirname, "../src/index.html"),
  filename: "./index.html"
});

// Plugin to add .env variables for client-side access
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  const prevCopy = { ...prev };
  prevCopy[`process.env.${next}`] = JSON.stringify(env[next]);
  return prevCopy;
}, {});

// Construct plugin to hold environment keys
const ENVPlugin = new webpack.DefinePlugin(envKeys);

module.exports = merge(common, {
  mode: "development",
  devServer: {
    compress: true, // GZIP Compression
    contentBase: path.resolve(__dirname, "../dist"), // Serve static content from ../dist
    historyApiFallback: true, // Redirect 404s back to /index.html
    host: "0.0.0.0", // Bind host for Docker compatibility
    proxy: {
      "/api": "http://localhost:3000" // Proxy requests to '8080/api' route
    },
    port: 8080 // Specify PORT for requests
  },
  devtool: "source-map",
  plugins: [ENVPlugin, HTMLWebPackPlugin]
});
