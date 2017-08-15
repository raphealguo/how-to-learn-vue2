var path = require('path')

module.exports = {
  entry: './src/entries/index.js',
  output: {
    filename: './dist/v1.1.js'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options:{
          "presets": ["es2015"]
        }
      }],
      include: __dirname
    }]
  },
  resolve: {
    modules: [
      path.resolve('./src')
    ]
  }
}