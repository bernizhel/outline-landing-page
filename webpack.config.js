const path = require('path');
const HtmlWP = require('html-webpack-plugin');
const MiniCSSExtractWP = require('mini-css-extract-plugin');
const TerserWP = require('terser-webpack-plugin');
const CSSMinimizerWP = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        clean: !isDev,
        assetModuleFilename: '[contenthash][ext]',
    },
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
        },
    },
    devServer: {
        port: 3000,
        open: true,
    },
    target: isDev ? 'web' : 'browserslist',
    optimization: {
        minimizer: [new CSSMinimizerWP(), new TerserWP()],
        splitChunks: {
            chunks: 'all',
        },
    },
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtractWP.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWP({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new MiniCSSExtractWP({
            filename: filename('css'),
        }),
    ],
};
