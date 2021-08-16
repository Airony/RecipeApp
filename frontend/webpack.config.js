const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  //   mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower-components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",

          {
            loader: "sass-resources-loader",
            options: {
              resources: [__dirname + "\\src\\styles\\_variables.scss"],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 5000,
    publicPath: "http://localhost:5000/dist/",
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
