const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(env) {
  return {
    entry: './src/index.js',
    output: {
      path: `./build`,
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
      },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: ['css-loader', 'sass-loader']}),
        exclude: /node_modules/
      }]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
      new HtmlWebpackPlugin({
        template: './src/template.html'
      }),
      new DashboardPlugin()
    ]
  }
}
