const { resolve } = require('path');


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
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' }
            ]
        },
        plugins: []
    };
};
