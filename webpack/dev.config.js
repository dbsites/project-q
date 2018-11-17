/**
 * ************************************
 *
 * @module  webpack.config.js
 * @description Webpack Configuration
 *
 * ************************************
 */

const HTMLWebpack = require('html-webpack-plugin');
const path = require('path');

const HTMLWebPackPlugin = new HTMLWebpack({
  template: path.resolve(__dirname, '../src/index.html'),
  filename: './index.html',
});

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),             // Output bundle file to root/dist
    filename: 'bundle.js',                                // Bundle file name
    publicPath: '/',                                      // Specify base path for all assets as root
  },
  devServer: {
    compress: true,                                       // GZIP Compression
    contentBase: path.resolve(__dirname, '../dist'),      // Serve static content from ../dist
    historyApiFallback: true,                             // Redirect 404s back to /index.html
    hotOnly: true,                                        // Enable hot module replacement wihout page refresh
    proxy: {
      '/api': {                                           // Proxy requests to '8080/api' route
        target: 'http://localhost:3000',                  // Proxy 8080 to 3000
        pathRewrite: { '^/api': '' },                     // Rewrite '/api' to '/'
      },
    },
    port: 8080,                                           // Specify PORT for requests
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'source-map-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [HTMLWebPackPlugin],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
