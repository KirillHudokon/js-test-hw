const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: "raw-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: "file-loader"
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    devServer:{
        overlay:true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin({
          root: path.resolve(__dirname, "../")
        }),
        new webpack.DefinePlugin({
          CANVAS_RENDERER: JSON.stringify(true),
          WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
          template: "./index.html"
        })
      ]
}