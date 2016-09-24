var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
            }
        ])
    ]
}
