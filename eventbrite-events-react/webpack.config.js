var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/index.js'
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    output: {
        filename: 'index_bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new CopyWebpackPlugin([
            {
                from: 'images/',
                to: __dirname + '/dist/images/'
            },
            {
                from: 'static/',
                to: __dirname + '/dist/static'
            },
            {
                from: 'manifest.json',
                to: __dirname + '/dist/manifest.json'
            },
            {
                from: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                to: __dirname + '/dist/bower_components/bootstrap/dist/css/bootstrap.min.css'
            },
            {
                from: 'bower_components/jquery/dist/jquery.min.js',
                to: __dirname + '/dist/bower_components/jquery/dist/jquery.min.js'
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
}
