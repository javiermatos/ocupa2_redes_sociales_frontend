
const DEFAULT_KEY = 'default';


class APIClientAbortManager {

    constructor() {
        this.promises = {};
    }

    abort(key = DEFAULT_KEY) {
        if (this.promises.hasOwnProperty(key)) {
            const {[key]: promise, ...restPromises} = this.promises;
            if (!promise.isResolved()) {
                promise.abort();
            }
            this.promises = restPromises;
        }
    }

    abortAll() {
        for (let key in this.promises) {
            if (this.promises.hasOwnProperty(key)) {
                if (!this.promises[key].isResolved()) {
                    this.promises[key].abort();
                }
            }
        }
        this.promises = {};
    }

    make(abortablePromise, key = DEFAULT_KEY, abortPendingRequest = true) {
        if (this.promises.hasOwnProperty(key)) {
            if (abortPendingRequest) {
                this.abort(key);
            }
            else {
                throw Error(`Pending abortable promise for key ${key}`);
            }
        }
        this.promises[key] = abortablePromise;
        return abortablePromise.promise;
    }

    get(key = DEFAULT_KEY) {
        if (this.promises.hasOwnProperty(key)) {
            return this.promises[key];
        }
    }

}

export default APIClientAbortManager;
