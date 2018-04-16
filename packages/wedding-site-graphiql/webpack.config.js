const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (_env = {}, argv = {}) => ({
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
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            options: { useTranspileModule: true }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }]
            }),
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Megan & Jake - June 23, 2018',
            template: resolve(__dirname, 'src', 'index.html')
        }),
        new ExtractTextPlugin('index.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${argv.mode}"`
            }
        }),
        new webpack.ContextReplacementPlugin(
            /graphql-language-service-interface[\\/]dist$/,
            new RegExp(`^\\./.*\\.js$`)
        )
    ]
});
