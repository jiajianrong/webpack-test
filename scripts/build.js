'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    console.log(err)
    throw err;
});


const fs = require('fs-extra');
const webpack = require('webpack');
const paths = require('./paths');
const config = require('./webpack.config.prod');


copyPublicFolder( paths.appPublic, paths.appBuild )

webpack(config).run(compileDone)




function copyPublicFolder(appPublic, appBuild) {
    console.log( `将html文件从 ${appPublic} 拷贝到 ${appBuild}` )
    fs.copySync(appPublic, appBuild, {});
}


function compileDone(err, status) {
    if (err) throw new Error(err)
    console.log('build done')
}



