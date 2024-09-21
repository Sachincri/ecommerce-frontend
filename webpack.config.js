const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", // the entry point for our app
  output: {
    path: path.resolve(__dirname, "build"), // the output folder for our bundled files
    filename: "bundle.js", // the name of the output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // match .js and .jsx files
        exclude: /node_modules/, // exclude node_modules
        use: {
          loader: "babel-loader", // use babel-loader for transpiling JS
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // include the presets
          },
        },
      },
      {
        test: /\.scss$/, // match .scss files
        use: [
          "style-loader", // inject CSS into the DOM
          "css-loader", // turn CSS into commonJS
          "sass-loader", // turn SCSS into CSS
        ],
      },
      {
        test: /\.css$/, // match .css files
        use: ["style-loader", "css-loader"], // handle CSS files
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i, // match image files
        type: "asset/resource", // use Webpack's asset module for images
        generator: {
          filename: 'images/[hash][ext][query]', // place images in the 'images' folder in output
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // use your HTML template
    }),
  ],
  devServer: {
    static: "./build", // serve files from build folder
    open: true, // open browser on server start
    hot: true, // enable hot module replacement
  },
  resolve: {
    extensions: [".js", ".jsx"], // allow imports without specifying extension
  },
};
