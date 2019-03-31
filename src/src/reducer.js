import {combineReducers} from 'redux';
import {routerReducer} from 'redux-first-routing';
import {authReducer} from './auth';


const rootReducer = combineReducers({
    auth: authReducer,
    router: routerReducer, // Convention is to use the "router" property
});

export default rootReducer;
