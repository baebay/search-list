const webpack = require('webpack');
const env = require('dotenv').config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
};
