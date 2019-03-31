import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware as createRouterMiddleware} from 'redux-first-routing';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import history from './history';
import crashReporterMiddleware from './middlewares/crashReporterMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import rootReducer from './reducer';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (history, initialState = {}) => {
    // Build the middleware with the history object
    const routerMiddleware = createRouterMiddleware(history);
    // Build the middleware for saga
    const sagaMiddleware = createSagaMiddleware();

    // Create the store
    const store = {
        ...createStore(
            persistedRootReducer,
            initialState,
            applyMiddleware(
                loggerMiddleware,
                crashReporterMiddleware,
                routerMiddleware,
                sagaMiddleware,
            ),
        ),
        runSaga: sagaMiddleware.run,
    };

    const persistor = persistStore(store);

    return {
        store: store,
        persistor: persistor,
    };
};

const {store, persistor} = configureStore(history);

export default store;

export {
    persistor,
};
