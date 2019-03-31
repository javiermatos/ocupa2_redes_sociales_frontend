import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {startListener} from 'redux-first-routing';
import {PersistGate} from 'redux-persist/integration/react';
import history from './history';
import router from './router';
import rootSaga from './saga';
import * as serviceWorker from './serviceWorker';
import store, {persistor} from './store';


// Start the saga listener for side effects
store.runSaga(rootSaga);

// Start the history listener, which automatically dispatches actions to keep the store in sync with the history
startListener(history, store);

// Create the reactive render function
function render(pathname) {
    router.resolve(pathname).then((component) => {
        ReactDOM.render((
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {component}
                </PersistGate>
            </Provider>
        ), document.getElementById('root'));
    });
}

// Get the current pathname
let currentLocation = store.getState().router.pathname;

// Subscribe to the store location
const unsubscribe = store.subscribe(() => {
    const previousLocation = currentLocation;
    currentLocation = store.getState().router.pathname;

    if (previousLocation !== currentLocation) {
        console.log('Location changed from', previousLocation, 'to', currentLocation);
        render(currentLocation);
    }
});

// Call render function once, on app start
render(currentLocation);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
