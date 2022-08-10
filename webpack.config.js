const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js"],
  },
  performance: { hints: false },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "src/pages/index.html",
    }),
    new HTMLWebpackPlugin({
      filename: "endGame.html",
      template: "src/pages/endGame.html",
    }),
    new HTMLWebpackPlugin({
      filename: "game.html",
      template: "src/pages/game.html",
    }),
    new HTMLWebpackPlugin({
      filename: "pickGame.html",
      template: "src/pages/pickGame.html",
    }),
    new HTMLWebpackPlugin({
      filename: "leaderboard.html",
      template: "src/pages/leaderboard.html",
    }),
    new HTMLWebpackPlugin({
      filename: "name.html",
      template: "src/pages/name.html",
    }),
    new HTMLWebpackPlugin({
      filename: "practice.html",
      template: "src/pages/practice.html",
    }),
    new HTMLWebpackPlugin({
      filename: "rules.html",
      template: "src/pages/rules.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "@webdiscus/pug-loader",
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 100,
              },
              webp: {
                lossless: 1,
              },
              avif: {
                cqLevel: 0,
              },
            },
          },
        },
      }),
    ],
  },
};
