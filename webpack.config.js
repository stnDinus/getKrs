const path = require('path');

module.exports = {
  entry: "./temp.ts",
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
