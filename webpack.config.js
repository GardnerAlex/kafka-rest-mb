const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== 'production';

const distFolder = 'build/front';

module.exports = {
  entry: { main: './src_front/index.jsx' },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  output: {
    path: path.resolve(__dirname, distFolder),
    sourceMapFilename: 'bundle.js.map',
    publicPath: '',
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Malwarebytes Test App',
      template: './public/index.html',
      favicon: './public/favicon-196x196.png'
    }),
    new Dotenv({
      path: './.env'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, distFolder),
    compress: true,
    host: '127.0.0.1',
    port: 9099,
    writeToDisk: true,
    disableHostCheck: true
  },
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false
};
