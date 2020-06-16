const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const PROXY = `http://${HOST}:${PORT}`;

module.exports = {
   entry: './src/index.js',
   output: {
      publicPath: '/'
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.(png|jpg|gif)$/,
            use: ['file-loader']
         },
         {
            test: /\.html$/,
            use: ['html-loader']
         }
      ]
   },
   devServer: {
      historyApiFallback: true,
      compress: true,
      inline: true,
      port: '8080',
      allowedHosts: [
         '.amazonaws.com'
      ]
  },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: './index.html'
      })
   ]
}