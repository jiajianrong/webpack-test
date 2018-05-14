if (typeof Promise === 'undefined') {
    //window.Promise = require('promise/lib/es6-extensions.js');
    //promise/lib/es6-extensions.js低版本UC上有问题，替换成pinkie-promise
    window.Promise = require('pinkie-promise');
}

if (!Object.assign) {
    Object.assign = require('object-assign');
}


// new Set() polyfill for making API calls.
require('babel-polyfill');

// fetch() polyfill for making API calls.
require('whatwg-fetch');


import request from '../../utils/request'

import './index.css'


function main() {
    let tpl = require('./tpl.ejs');
    let fn = eval(tpl)
    let dom = fn()
    window.document.body.innerHTML = (dom)
    
    request.get('https://abc.com/api').then(response => {
        console.dir(response)
    })
}


main()



if (module.hot) {
    module.hot.accept();
}


