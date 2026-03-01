import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');
// const webpack = require('webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true,
      silent: true
    }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(process.env)
    // })
  ],
};