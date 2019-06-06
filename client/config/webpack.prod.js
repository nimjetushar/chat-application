const webpackMerge = require("webpack-merge"),
  commonConfig = require("./webpack.common.js"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  path = require("path"),
  basePath = process.cwd(),
  rootDir = path.resolve(basePath, "./");

module.exports = mode => {
  return webpackMerge(commonConfig(mode), {
    mode: 'production',
    output: {
      path: path.resolve(rootDir, "dist"),
      publicPath: "./",
      filename: "[name].[hash].js",
      chunkFilename: "[id].chunk.[hash].js"
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(rootDir, 'dist')]
      }),
      new OptimizeCSSAssetsPlugin({}),
      new CopyWebpackPlugin(
        [{
          from: path.resolve(rootDir, "public/favicon.ico"),
          to: ""
        }], {}
      )
    ],
    optimization: {
      minimize: true,
      minimizer: [new UglifyJsPlugin({
        include: /\.min\.js$/
      })]
    }
  });
}