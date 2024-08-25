const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./temp.ts",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      OUTPUT_FILE_FORMAT: process.env.OUTPUT_FILE_FORMAT || "csv",
      PARSE_JSON: JSON.stringify(process.env.PARSE_JSON !== undefined)
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
    extensions: ['.ts', '.ts', '.js'],
  },
  output: {
    filename: 'temp.js',
    path: path.resolve(__dirname),
  },
};
