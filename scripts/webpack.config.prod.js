const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = require('./paths');


module.exports = {
    
    
    bail: true,
    entry: {
        index: paths.appIndexJs,
    },
    externals: {},
    output: {
        filename: 'static/page-index/[name].[chunkhash:8].js',
        chunkFilename: 'static/page-index/[name].[chunkhash:8].js',
        publicPath: 'https://cdn.abc.com/',
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
            loader: ExtractTextPlugin.extract({
                fallback: require.resolve('style-loader'),
                use: [{
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true,
                    },
                }, {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                    },
                }], // use end
            }), // loader end
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
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        
        new ExtractTextPlugin({
            filename: 'static/page-index/[name].[contenthash:8].css',
        }),
    ]

};