const path = require('path');

const APP_PATH = path.resolve(__dirname, '../app');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    app: './app/index.jsx',
    framework: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: 'js/bundle.js',
    path: DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            publicPath: '/',
            name: '[path][name].[ext]',
            limit: 500, // 是把小于500B的文件打成Base64的格式，写入JS
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, '../static/images'),
      appPath: APP_PATH,
    },
    extensions: ['.js', '.jsx', 'css', 'less', '.json'],
  },
};
