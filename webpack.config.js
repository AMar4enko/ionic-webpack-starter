var _ = require("lodash");
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var argv = require('yargs').argv;
var cssLoaders, plugins;
var appRoot = path.resolve(__dirname, "./app");

argv.env = argv.env || 'development';


if(argv.env != 'development'){
  cssLoaders = [
    { test: /\.css$/,    loader: ExtractTextPlugin.extract("style-loader", "css-loader?root="+appRoot) },
    { test: /\.less$/,    loader: ExtractTextPlugin.extract("style-loader", "css-loader?root="+appRoot+"!less-loader") },
    { test: /\.scss$/,    loader: ExtractTextPlugin.extract("style-loader","css-loader?root="+appRoot+"!sass") }
  ];
  plugins = [
    new ExtractTextPlugin("[name].css")
  ];


}else{
  cssLoaders = [
    { test: /\.css$/,    loader: "style-loader!css-loader?root="+appRoot },
    { test: /\.less$/,    loader: "style-loader!css-loader?root="+appRoot+"!less-loader" },
    { test: /\.scss$/,    loader: "style-loader!css-loader?root="+appRoot+"!sass" }
  ];
  plugins = [];
}

module.exports = {
  cache: true,
  debug: true,
  devTool: 'eval',
  entry: {
    vendor: ['angular', 'angular-ui-router', 'lodash', 'angular-animate', 'angular-cache', 'angular-sanitize', 'js-data', 'js-data-angular'],
    app: ['./app/index']
  },
  output: {
    path: path.join(__dirname, "www"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: cssLoaders.concat([
      { test: /\.(jpe?g|png|gif)$/i, loader: 'image?bypassOnDebug&optimizationLevel=7&interlaced=false' },
      {
        test   : /\.json$/,
        loader : 'json'
      },
      { test: /\.html$/,
        loader: "ngtemplate?relativeTo=" + (path.resolve(__dirname, './app')) + "/&module=templates!html?root=app"},
      { test: /\.jade$/,
        loader: "ngtemplate?relativeTo=" + (path.resolve(__dirname, './app')) + "/&module=templates!html!jade-html"},
      { test: /\.woff($|\?)/,   loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff' },
      { test: /\.woff2($|\?)/,   loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff' },
      { test: /\.ttf($|\?)/,    loader: "file-loader?prefix=font/" },
      { test: /\.eot($|\?)/,    loader: "file-loader?prefix=font/" },
      { test: /\.svg($|\?)/,    loader: "file-loader?prefix=font/" },
      {
        test   : /[\/]angular\.js$/,
        loader : 'exports?angular'
      }, {
        test   : /[\/]ionic\.js$/,
        loader : 'exports?ionic'
      }
    ]),
    noParse: [
      /bower_components/
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'node_modules')
    ],
    moduleDirectories: [
      'bower_components',
      'node_modules'
    ],
    alias: {
      app: [path.join(__dirname, 'app')]
    }
  },
  externals: {
    'js-data-schema': 'undefined'
  },
  plugins: plugins.concat([
    new webpack.ProvidePlugin({
      _: "lodash"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        'bower.json', ['main'])
    ),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(argv.env || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      pkg      : require('./package.json'),
      template : 'app/index.html',
      env  : argv.env || 'development'
    })
  ])
};
