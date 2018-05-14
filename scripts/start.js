'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    console.log(err)
    throw err;
});


const PORT = 8888;


const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');


config.entry = [ config.entry.index,
                 'webpack/hot/dev-server',
                 `webpack-dev-server/client?http://localhost:${PORT}/`,
               ]


const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
    //disableHostCheck: false,
    //compress: true,
    //clientLogLevel: 'none',
    contentBase: false,
    //watchContentBase: true,
    hot: true,
    inline: true,
    //quiet: true,
    //watchOptions: { ignored: /node_modules/ },
    //https: false,
    host: '0.0.0.0',
    //overlay: false,
    //historyApiFallback: { disableDotRule: true },
    //public: '10.252.173.64',
//  proxy:[ { 
//      target: 'http://127.0.0.1:8002',
//      logLevel: 'silent',
//      context: [Function: context],
//      onProxyReq: [Function: onProxyReq],
//      onError: [Function],
//      secure: false,
//      changeOrigin: true,
//      ws: true,
//      xfwd: true 
//  } ]
})
server.listen(PORT, '0.0.0.0', function() {
    console.log('webpack dev server已启动，支持HMR')
});

