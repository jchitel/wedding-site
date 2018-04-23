const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env = {}, argv = {}) => ({
    entry: './src/index.tsx',
    context: argv.process || __dirname,
    mode: argv.mode || 'development',
    output: {
        path: resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true, modules: true }
                }, {
                    loader: 'less-loader'
                }]
            }),
        }, {
            test: /\.less$/,
            include: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'less-loader'
                }]
            }),
        }, {
            test: /\.(jpg|jpeg|png|ttf)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Megan & Jake - June 23, 2018',
            favicon: resolve(__dirname, 'src', 'images', 'favicon.ico'),
            template: resolve(__dirname, 'src', 'index.html')
        }),
        new ExtractTextPlugin('index.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${argv.mode}"`
            }
        })
    ]
});
