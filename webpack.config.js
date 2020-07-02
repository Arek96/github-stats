const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  node: {
    fs: "empty"
  },
  entry: {
    main: "./src/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html")
    }),
    new Dotenv({
      path: "./.env"
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
