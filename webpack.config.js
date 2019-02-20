const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const DEV = process.env.NODE_ENV === 'development';
// Remove old hashed files
// Source Maps
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'main.js',
    publicPath: '/assets/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              use: [{
                  loader: 'file-loader',
                  options: {
                       name: '[name].[ext]',
                       outputPath: './'
                   },
              }]
          },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapContents: true
              }
            }]
        })
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, 'assets/dist'),
      filename: 'assets.json',
    }),
    new ExtractTextPlugin(DEV ? 'style.css' : 'style-[hash:6].css'),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://127.0.0.1:5000',
        files: [
          '**/*.html',
          '**/*.css',
          './assets/dist/main.js'
        ],
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
  ]
}
