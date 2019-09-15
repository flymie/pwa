const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge({
  target: 'node',
  mode: 'production',
  entry: path.resolve(__dirname, '../app/forSSr.js'),
  output: {
    filename: 'forSSr.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../server'),
  },
  // 服务端打包的时候忽略外部的npm包
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      },
    }),
    new CleanWebpackPlugin(['../server/forSSR.js'], { allowExternal: true }),
  ],
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
        test: /\.css$/,
        use: ['ignore-loader'],
      },
      {
        test: /\.less$/,
        use: ['ignore-loader'],
      },
      {
        test: /\.scss$/,
        use: ['ignore-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, '../static/images'),
      appPath: path.resolve(__dirname, '../app'),
    },
    extensions: ['.js', '.jsx', 'css', 'less', '.json'],
  },
});
