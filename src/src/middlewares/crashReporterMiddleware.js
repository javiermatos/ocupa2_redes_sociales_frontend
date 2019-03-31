
const crashReporterMiddleware = store => next => action => {
    try {
        return next(action);
    } catch (error) {
        console.error('Caught an exception!', error);
        // Raven.captureException(err, {
        //     extra: {
        //         action,
        //         state: store.getState()
        //     }
        // });
        throw error;
    }
};

export default crashReporterMiddleware;
