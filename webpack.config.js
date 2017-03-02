var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    // autoprefixer = require('autoprefixer'),
    // ngAnnotatePlugin = require('ng-annotate-webpack-plugin'),
    // CopyWebpackPlugin = require('copy-webpack-plugin'),
    _ = require('lodash'),
    path = require('path'),
    env = _.trim(process.env.NODE_ENV);

console.log("=============================" + env + "=============================");
console.log("=============================" + __dirname + "=============================");

var webpackConfig = {
    devtool: 'cheap-module-source-map', //generate source map for developing
    entry: {
        app: ['babel-polyfill',__dirname + "/main.js"], //the main file for start app
        
    },

    output: {
        // publicPath: __dirname + "/public",
        path: __dirname + "/dist", //the path saving packed file 
        // filename: "bundle[hash].js" //the out put file name
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        alias: {
            
        }
    },
    module: { 

        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },            
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader',
            //     exclude: /node_modules/
            // },
        ]
    },

    postcss: function() {
        return [autoprefixer];
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: __dirname + "/index.html" //packed js append to index.html,set index.html path
        }),
        new webpack.DefinePlugin({
            'process.env': "'" + env + "'",
        }),
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.bundle.js"),

        // new ngAnnotatePlugin({ add: true }),
    ],

}


module.exports = webpackConfig;