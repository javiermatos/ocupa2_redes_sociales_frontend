import {PromiseAbortedError} from './makeAbortable';


export function isAbortError(error) {
    return (
        error instanceof DOMException  // Using AbortController
        ||
        error instanceof PromiseAbortedError  // Using makeAbortable
    );
}
