import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const config: webpack.Configuration = {
    entry: './src/site/index.tsx',
    output: {
        path: resolve(__dirname, 'build', 'bundle')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            options: {
                configFileName: resolve(__dirname, 'src', 'site', 'tsconfig.json'),
                useTranspileModule: true
            }
        }, {
            test: /\.less$/,
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
            test: /\.(jpg|png|ttf)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Megan & Jake - June 23, 2018',
            favicon: resolve(__dirname, 'src', 'site', 'images', 'favicon.ico'),
            template: resolve(__dirname, 'src', 'site', 'index.html')
        }),
        new ExtractTextPlugin('index.css')
    ]
};
export default config;
