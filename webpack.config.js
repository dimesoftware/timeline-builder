const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: 'Timeline',
        filename: 'timeline-builder.js',
        libraryExport: "default",
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: true,
                parallel: 4,
                uglifyOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            }),
        ],
    },
};