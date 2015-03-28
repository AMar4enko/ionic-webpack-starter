var gulp = require("gulp");
var gutil = require('gulp-util');
var webpack = require("webpack");
var ngAnnotateWebpackPlugin = require("ng-annotate-webpack-plugin");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var argv = require('yargs').argv;

argv.env = argv.env || 'development';

var src = './src',
  dest = './dist',
  webpackOptions = {
    debug: true,
    devtool: '#source-map',
    watchDelay: 200
  };

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["src/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  if(argv.env != 'development'){
    myConfig.plugins = myConfig.plugins.concat(
      new ngAnnotateWebpackPlugin({
        add: true
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {comments: false}
      })
    );
  }

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/www",
    inline: true,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(5000, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");
    });
});

gulp.task("webpack-test-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.debug = false;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/",
    inline: true,
    stats: {
      colors: true
    }
  }).listen(5000, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");
    });
});

