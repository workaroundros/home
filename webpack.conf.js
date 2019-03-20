const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Before importing imagemin plugin make sure you add it in `package.json` (`dependencies`) and install
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

module.exports = {
  devtool: 'sourcemap',
  resolve: {
    alias: {
      // jquery: 'jquery/src/jquery',
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg)(\?v=\d\.\d\.\d)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // {
      // test: /jquery\..*?\.js$/,
      // loader: 'imports-loader?this=>window',
      // },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'gallery.html',
      template: 'src/gallery.pug',
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        // Lossless optimization with custom option
        // Feel free to experement with options for better result for you
        plugins: [
          imageminGifsicle({
            interlaced: true,
          }),
          imageminJpegtran({
            progressive: true,
          }),
          imageminOptipng({
            optimizationLevel: 5,
          }),
          imageminSvgo({
            removeViewBox: true,
          }),
        ],
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
