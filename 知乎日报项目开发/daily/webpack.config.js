const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry: {
        main: './main',
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },

    mode: 'development',

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunckFilename: '[id].css'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: '/dist/',
                                    filename: 'main.css'
                                }
                            },
                            "css-loader"
                        ]
                    }
                }
            },
            {
                test: '/\.js$/',
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                //  配置打包 css 文件
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist/',
                            filename: 'main.css'
                        }
                    },
                    "css-loader"
                ]
            },
            {
                //  配置打包图片字体等文件
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
};

module.exports = config;