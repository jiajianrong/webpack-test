'use strict';
const path = require('path');
const fs = require('fs-extra');


function getPaths() {
    const appDirectory = fs.realpathSync(process.cwd());
    const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
    
    console.log( `项目根路径 ${appDirectory}` )

    return {
        appBuild: resolveApp('build'),
        appPublic: resolveApp('public'),
        appIndexJs: resolveApp('src/pages/index/index.js'),
        appHtml: resolveApp('public/index.html'),
        appSrc: resolveApp('src'),
    }
}


let paths = getPaths()

module.exports = paths