import qs from 'qs';
import 'whatwg-fetch';
import {getAuthenticationHeaders} from '../auth';
import {makeAbortable} from './makeAbortable';


// https://github.com/mo/abortcontroller-polyfill/issues/10
const AbortController = window.AbortController;

class APIClient {

    defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    // https://stackoverflow.com/questions/46869503/es6-arrow-functions-trigger-super-outside-of-function-or-class-error
    // We cannot define methods as arrow functions as if we do that, inheriting classes would not be able to call this
    // or super as local bindings are not created
    //
    // An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to
    // arguments, super, this, or new.target within an ArrowFunction must resolve to a binding in a lexically enclosing
    // environment... An ArrowFunction that references super is always contained within a non-ArrowFunction and the
    // necessary state to implement super is accessible via the scope that is captured by the function object of the
    // ArrowFunction.
    constructor() {
        this._fetch = this._fetch.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
    }

    processResponse(response) {
        let bodyPromise = null;
        const contentType = response.headers.get('Content-Type');
        switch (contentType) {
            case 'application/json':
                bodyPromise = response.json();
                break;
            case 'text/html':
                bodyPromise = Promise.resolve({
                    non_field_errors: [`${response.status} (${response.statusText})`],
                });
                break;
            default:
                bodyPromise = Promise.resolve({
                    non_field_errors: [`Content-Type ${contentType} is not valid`],
                });
        }
        return bodyPromise.then((body) => ({
            status: response.status,
            headers: response.headers,
            body: body,
            success: (response.status >= 200 && response.status < 300),
        }));
    }

    // TODO: No authentication required?
    _getHeaders() {
        // const authenticationHeaders = getAuthenticationHeaders();
        return {
            ...this.defaultHeaders,
            // ...((authenticationHeaders !== null) ? authenticationHeaders : {}),
        };
    }

    _fetchAbortController(request) {
        const abortController = new AbortController();
        const requestWithCredentials = new Request(request, {
            headers: this._getHeaders(),
            signal: abortController.signal,
        });
        let resolved = false;
        const processResponsePromise = fetch(requestWithCredentials)
            .then((response) => {
                resolved = true;
                return response;
            })
            .then(this.processResponse);
        return {
            promise: processResponsePromise,
            abort: () => { return abortController.abort(); },
            isResolved: () => { return resolved; },
        };
    }

    _fetchFakeAbortController(request) {
        const requestWithCredentials = new Request(request, {
            headers: this._getHeaders(),
        });
        const {promise, abort} = makeAbortable(fetch(requestWithCredentials));
        let resolved = false;
        const processResponsePromise = promise
            .then((response) => {
                resolved = true;
                return response;
            })
            .then(this.processResponse);
        return {
            promise: processResponsePromise,
            abort: abort,
            isResolved: () => { return resolved; },
        };
    }

    _fetch(request) {
        return this._fetchAbortController(request);
        // return this._fetchFakeAbortController(request);
    }

    get(url, queries = {}) {
        const querystring = qs.stringify(queries, {addQueryPrefix: true});
        const urlQuerystring = (querystring !== '') ? url + querystring : url;
        const init = {method: 'GET'};
        const request = new Request(urlQuerystring, init);
        return this._fetch(request);
    }

    post(url, data = null) {
        let init = {method: 'POST'};
        if (data !== null) {
            init = {
                ...init,
                body: JSON.stringify(data),
            };
        }
        const request = new Request(url, init);
        return this._fetch(request);
    }

    put(url, data = null) {
        let init = {method: 'PUT'};
        if (data !== null) {
            init = {
                ...init,
                body: JSON.stringify(data),
            };
        }
        const request = new Request(url, init);
        return this._fetch(request);
    }

    patch(url, data = null) {
        let init = {method: 'PATCH'};
        if (data !== null) {
            init = {
                ...init,
                body: JSON.stringify(data),
            };
        }
        const request = new Request(url, init);
        return this._fetch(request);
    }

    delete(url) {
        const init = {method: 'DELETE'};
        const request = new Request(url, init);
        return this._fetch(request);
    }
}

export default APIClient;
