const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf.js');
const config = require('./config')[process.env.NODE_ENV];

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      minify: {
        html5: true,
      },
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
          BASE_URL: JSON.stringify(process.env.BASE_URI || config.api),
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'style-loader', // 在html中插入<style>标签
          },
          {
            loader: 'css-loader', // 获取引用资源，如@import,url()
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'style-loader' },
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
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: config.port,
    contentBase: path.join(__dirname, '../'),
    compress: true,
    historyApiFallback: true,
    hot: true, // 启动webpack热模块替换特性
    inline: true, // 自动刷新
    https: false,
    noInfo: true,
    open: true,
    proxy: {
      [`/${config.proxy.pathRewriteName}`]: {
        secure: false,
        changeOrigin: true,
        target: config.proxy.target,
        pathRewrite: { [`^/${config.proxy.pathRewriteName}`]: '' },
      },
    },
  },
});
