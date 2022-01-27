const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[name][ext]",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080, //default 8080
    open: true,
    hot: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  // loaders
  module: {
    rules: [
      // css
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: "asset/resource" },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "todo-list",
      filename: "index.html",
    }),
  ],
};
