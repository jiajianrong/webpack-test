function stringifyParams(params) {
    if (!params) return null;
    return Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&');
};


function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

const DEFAULT_HEADERS = {
    'cache-control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    // 'application/json; charset=utf-8'
    'Accept': 'application/json'
}

/**
 * Requests a URL, returning a promise.
 */
export default {
    get: function(url, params, headers) {
        if (params && JSON.stringify(params)!=='{}') {
            url += '?' + stringifyParams(params)
        }
        return fetch(url, {
            method: "get",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include'
        })
        .then(checkStatus)
        .then((response) => response.json())
        .catch(err => ({err}));
    },
    post: function(url, params, headers) {
        return fetch(url, {
            method: "post",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include',
            body: stringifyParams(params)
        })
        .then(checkStatus)
        .then((response) => response.json())
        .catch(err => ({err}));
    }
}
