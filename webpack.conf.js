const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

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
  ],
};
