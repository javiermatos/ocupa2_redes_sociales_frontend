
export const AUTH_TOKEN_LOGIN = 'AUTH_TOKEN_LOGIN';
export function login(email) {
    return {
        type: AUTH_TOKEN_LOGIN,
        email: email,
    };
}

export const AUTH_TOKEN_LOGIN_SUCCESS = 'AUTH_TOKEN_LOGIN_SUCCESS';
export function loginSuccess(email, instagramUserId, instagramKey, twitterUserId, twitterKey) {
    return {
        type: AUTH_TOKEN_LOGIN_SUCCESS,
        email: email,
        instagramUserId: instagramUserId,
        instagramKey: instagramKey,
        twitterUserId: twitterUserId,
        twitterKey: twitterKey,
    };
}

export const AUTH_TOKEN_LOGIN_ERROR = 'AUTH_TOKEN_LOGIN_ERROR';
export function loginError(errors) {
    return {
        type: AUTH_TOKEN_LOGIN_ERROR,
        errors: errors,
    };
}

export const AUTH_TOKEN_LOGOUT = 'AUTH_TOKEN_LOGOUT';
export function logout() {
    return {
        type: AUTH_TOKEN_LOGOUT,
    }
}
