import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const config: (env?: any, argv?: any) => webpack.Configuration = (env = {}, argv = {}) => ({
    entry: './src/site/index.tsx',
    context: argv.process || __dirname,
    mode: argv.mode || 'development',
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
        new ExtractTextPlugin('index.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${argv.mode}"`
            }
        })
    ]
});
export default config;
