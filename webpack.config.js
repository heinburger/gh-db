const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = resolve(__dirname, 'src')

module.exports = {
  entry: `${srcPath}/index.js`,
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'standard-loader',
      exclude: /node_modules/
    },{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
