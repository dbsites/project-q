/**
 * ************************************
 *
 * @module  webpack.config.js
 * @author Team Quail
 * @description Webpack Configuration
 *
 * ************************************
 */

const HTMLWebpack = require('html-webpack-plugin');
const path = require('path');

const HTMLWebPackPlugin = new HTMLWebpack({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(`${__dirname}/dist`),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
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
