var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var moment = require('moment');

const formatString = 'MMM DD, YYYY';
var today = moment.utc();
today.hour(today.hour() - 4);
var todayString = today.format(formatString);
var balanceUpDate = moment.utc(today).subtract(1, 'months');
var balanceUpDateString = balanceUpDate.format(formatString);

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, '../../../wwwroot/report1'),
        publicPath: 'http://localhost:12346/',
        filename: "[name].js"
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: './src/index-dev.ejs',
            filename: 'index.html',
            hash: true,
            inject: false,
            xhtml: true,
            today: todayString,
            balanceUpDate: balanceUpDateString
        })
    ],

    devServer: {
        proxy: [{
            context: ['/**'],
            target: 'http://localhost:60809/',
            secure: false
        }]
    }
});