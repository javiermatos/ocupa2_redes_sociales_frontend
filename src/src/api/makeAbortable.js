
export function PromiseAbortedError(message) {
    this.name = 'PromiseAbortedError';
    this.message = message;
    this.stack = (new Error()).stack;
}
PromiseAbortedError.prototype = new Error();

// https://github.com/facebook/react/issues/5465#issuecomment-157888325
export const makeAbortable = (promise) => {
    let _hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            (val) => (_hasCanceled ? reject(new PromiseAbortedError('Promise aborted')) : resolve(val)),
            (error) => (_hasCanceled ? reject(new PromiseAbortedError('Promise aborted')) : reject(error)),
        );
    });

    return {
        promise: wrappedPromise,
        abort: () => {
            _hasCanceled = true;
        },
    };
};
