const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    const release = env === 'production';
    return {
        entry: './src',
        output: {
            path: resolve(__dirname, release ? 'dist' : 'build'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: ['css-loader'], fallback: 'style-loader' }) },
                { test: /\.less$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'less-loader'], fallback: 'style-loader' }) },
                { test: /\.(jpg|png|ttf)$/, use: 'file-loader' }
            ]
        },
        plugins: [
            new ExtractTextPlugin('styles.css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': env === 'production' ? '"production"' : '"development"'
            })
        ]
    };
};
