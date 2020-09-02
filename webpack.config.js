const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //index.html 생성.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
        print: './src/print.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
            ]
        })
    ],
    output: {
        // filename: 'main.js',
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.(fbx|FBX)$/,
                use: [
                    'ignore-loader',
                ]
            },
        ],
    },
};