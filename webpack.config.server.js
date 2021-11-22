const webpackNodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  name: "server",
  target: "node",
  entry: "./src/serverRenderer.js",
  externals: [webpackNodeExternals()],

  output: {
    filename: "server/serverRenderer.js",
    libraryTarget: "commonjs2",
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        issuer: /\.s?css$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * This plugin extract CSS into separate files.
     * It creates a CSS file per JS file which contains CSS.
     * It supports On-Demand-Loading of CSS and SourceMaps.
     * @link https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
     */
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ].filter(Boolean),
};
