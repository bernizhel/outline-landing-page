const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWP = require('copy-webpack-plugin');
const HtmlWP = require('html-webpack-plugin');
const MiniCSSExtractWP = require('mini-css-extract-plugin');
const TerserWP = require('terser-webpack-plugin');
const CSSMinimizerWP = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@s': path.resolve(__dirname, 'src', 'styles'),
    },
  },
  devServer: {
    port: 3000,
    open: false,
  },
  target: isDev ? 'web' : 'browserslist',
  optimization: {
    minimizer: [
      new CSSMinimizerWP(),
      new TerserWP(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractWP.loader, 'css-loader'],
      },
      {
        test: /\.(bmp|gif|jpe?g|png)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWP({
      template: './index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new MiniCSSExtractWP({
      filename: filename('css'),
    }),
    new CopyWP({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'img', 'iphone_6_3.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'client_1.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'client_2.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'client_3.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'client_4.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'iphone_blank_2.png'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'user.jpg'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'user_2.jpg'),
          to: path.resolve(__dirname, 'public'),
        },
        {
          from: path.resolve(__dirname, 'src', 'img', 'user_3.jpg'),
          to: path.resolve(__dirname, 'public'),
        },
      ]
    })
  ],
};
