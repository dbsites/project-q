const path = require('path');
const Webpack = require('html-webpack-plugin');

const HTMLWebPackPlugin =
  new Webpack({
    template: './src/index.html',
    filename: './index.html',
  });

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(`${__dirname}/dist`),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
          loader: 'source-map-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [HTMLWebPackPlugin],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
