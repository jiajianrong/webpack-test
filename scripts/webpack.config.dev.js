const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');


module.exports = {
    /* https://github.com/ahfarmer/webpack-hmr-3-ways
     * webpack-dev-server API模式的HMR 不需要devServer配置 (直接写在start.js里)
     * devServer: {
        contentBase: false,
        host: '127.0.0.1',
        hot: true,
        port: 8888,
        https: false,
    },*/
    // publicPath: '/', dev模式不能使用
    devtool: 'cheap-module-source-map',
    entry: {
        index: paths.appIndexJs,
    },
    output: {
        filename: '[name].js',
        path: paths.appBuild,
    },
    
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
                presets: ['env'],
                // This is a feature of `babel-loader` for webpack (not Babel itself). It
                // enables caching results in ./node_modules/.cache/babel-loader/ directory for
                // faster rebuilds.
                cacheDirectory: true,
            }
        },
        /*{
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }
            ]
        }*/
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
        // "url" loader works just like "file" loader but it also embeds
        // assets smaller than specified size as data URLs to avoid requests.
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
                limit: 10000,
                name: 'static/page-index/[name].[hash:8].[ext]',
            }
        },
        {
            test: /\.ejs$/,
            //loader: 'ejs-loader?variable=data'
            loader: 'html-loader!ejs-loader?variable=data'
        }]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]


};