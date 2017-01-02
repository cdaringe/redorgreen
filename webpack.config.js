var path = require('path')
var webpack = require('webpack')
module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 4 versions' },
    { test: /\.png$/, loader: 'url-loader?limit=100000' },
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.json$/, loader: 'json-loader' }
    ]
  }
}
if (process.env.NODE_ENV === 'production') {
  console.info('UGLIFYING')
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({}))
} else {
  console.info('HOTIFYING')
  module.exports.entry = module.exports.entry.concat([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ])
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin())
}
