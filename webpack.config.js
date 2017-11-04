/*
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
*/

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

/*,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        //parse: {...options},
        mangle: {
          //...options,
          properties: {
            // mangle property options
          }
        },
        output: {
          comments: false,
          beautify: false//,
          //...options
        },
        //compress: {...options},
        warnings: false
      }
    })
  ]
*/