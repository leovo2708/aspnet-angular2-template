var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    // devtool: 'source-map', // enable for debugging

    output: {
        path: path.resolve(__dirname, '../../../wwwroot/report1'),
        publicPath: 'wwwroot/report1/',
        filename: "[name].chunk.js"
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: '[name].chunk.css',
            disable: false,
            allChunks: true
        }),
        //new OptimizeCssAssetsPlugin({
        //    cssProcessorOptions: { discardComments: { removeAll: true } }
        //}), // cause bug #70042
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index-prod.ejs',
            filename: 'index.cshtml',
            hash: true,
            inject: false,
            xhtml: true
        })
    ]
});