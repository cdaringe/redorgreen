var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
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
    { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions' },
    { test: /\.png$/, loader: 'url-loader?limit=100000' },
    { test: /\.jpg$/, loader: 'file-loader' },
    { test: /\.json$/, loader: 'json-loader' },
    ]
  }
};
if (process.env === 'production') {
    var config;
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin(config));
} else {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}
