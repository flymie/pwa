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
    path: path.resolve(__dirname, '../dist'),
  },
  // 服务端打包的时候忽略外部的npm包
  externals: nodeExternals({
    whitelist: [/antd/],
  }),
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        },
      },
    }),
    new CleanWebpackPlugin(['../dist/forSSr.js'], { allowExternal: true }),
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
      // {
      //   test: /\.css$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     {
      //       loader: 'style-loader', // 在html中插入<style>标签
      //     },
      //     {
      //       loader: 'css-loader', // 获取引用资源，如@import,url()
      //     },
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader', // 自动加前缀
          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: ['ignore-loader'],
      // },
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
      appPath: path.resolve(__dirname, '../app'),
    },
    extensions: ['.js', '.jsx', 'css', 'less', '.json'],
  },
});
