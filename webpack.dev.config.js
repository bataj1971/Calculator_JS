const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  
  output : {
    filename:'bundle.js',
    path: path.resolve(__dirname,'./dist'),
    publicPath :''
  },

  mode:'development',  // development / production

  devServer: {
    hot: true,
    port:9000
  },

  module: {
    rules:[
      {
        test: /\.(png|jpg)$/ ,  use: ['file-loader']
      },
      {
        test : /\.css$/,   use:['style-loader','css-loader']
      },
      {
        test : /\.scss$/ , use:['style-loader','css-loader','sass-loader' ]
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
       filename: 'styles.css'
     }),

     new HtmlWebpackPlugin({
       template:'src/index.html'
     })
  ]
}
