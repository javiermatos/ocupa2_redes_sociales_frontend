import * as actionCreators from './actions';


const initialState = {
    email: null,
    instagramUserId: null,
    instagramKey: null,
    twitterUserId: null,
    twitterKey: null,
    errors: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case actions.AUTH_TOKEN_LOGIN:
        //     return initialState;
        case actionCreators.AUTH_TOKEN_LOGIN_SUCCESS:
            return {
                email: action.email,
                instagramUserId: action.instagramUserId,
                instagramKey: action.instagramKey,
                twitterUserId: action.twitterUserId,
                twitterKey: action.twitterKey,
                errors: {},
            };
        case actionCreators.AUTH_TOKEN_LOGIN_ERROR:
            return {
                email: null,
                instagramUserId: null,
                instagramKey: null,
                twitterUserId: null,
                twitterKey: null,
                errors: action.errors,
            };
        case actionCreators.AUTH_TOKEN_LOGOUT:
            return initialState;
        default:
            return state;
    }
};
