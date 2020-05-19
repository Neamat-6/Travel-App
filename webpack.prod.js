const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const worboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    // context: __dirname + "/app",
    // entry:'./src/client/index.js',
    // output: {
    //     path: __dirname + "/dist",
    //     filename: 'bundle.js',
    // },
    entry: {
        serviceWorker: './src/client/serviceWorker.js',
        main:'./src/client/index.js',
            },
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use:
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media'
                    },
                  },
                
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new worboxPlugin.GenerateSW()
    ]
}
