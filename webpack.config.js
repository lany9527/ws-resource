const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    "ws-resource": path.join(__dirname, 'index.ts'),
    "ws-resource.min": path.join(__dirname, 'index.ts')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.coffee', '.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: false,
      test: /\.min\.js$/
    })
  ]
};