const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output : {
    filename:'bundle.[contenthash].js',
    path: path.resolve(__dirname,'./dist'),
    publicPath :''
  },

  mode:'production',  // development / production

  module: {
    rules:[
      {
        test: /\.(png|jpg)$/ ,  use: ['file-loader']
      },
      {
        test : /\.css$/,   use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test : /\.scss$/ , use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource',
        generator: {
          filename: "assets/[name][ext][query]",
        },
      },
      {        
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
