const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'
const sourcePath = path.join(__dirname, './src')
const staticsPath = __dirname

const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(){
  console.log(isProd)
  return {
    context: sourcePath,
    devtool: 'eval',
    entry: {
      app: './index.js',
      vendor: ['react']
    },
    output: {
      path: staticsPath,
      filename: '[name].bundle.js'
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
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('bundle.css'),
      new HtmlWebpackPlugin({template: './template.html'}),
      new webpack.LoaderOptionsPlugin({minimize: true}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        sourceMap: true,
        output: {
          comments: false
        },
      })
    ]
  }
}
