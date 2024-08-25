const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./temp.ts",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      OUTPUT_FILE_FORMAT: `"${process.env.OUTPUT_FILE_FORMAT || "csv"}"`,
      PARSE_JSON: process.env.OUTPUT_FORMAT !== "raw"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'temp.js',
    path: path.resolve(__dirname),
  },
};
