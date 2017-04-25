const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('./package.json');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
};


const common = {

  entry: {
    app: PATHS.src,
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  context: PATHS.src,

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.ejs'),
      hash: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }

};


const development = {
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.src,
    historyApiFallback: true,
    hot: true,

    watchOptions: {
      poll: 300
    },

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000 ,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: {
        DEBUG: true
      }
    })
  ]
};


const production = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      ENV: {
        DEBUG: false
      }
    })
  ]
};


switch (process.env.npm_lifecycle_event)
{

  case 'build':

    process.env.BABEL_ENV = 'build';
    module.exports = merge(common, production);
    break;

  default:

    process.env.BABEL_ENV = 'development';
    module.exports = merge(common, development);

}


