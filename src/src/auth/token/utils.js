import store from '../../store';


export function isAuthenticated() {
    const {auth} = store.getState();
    return !!(auth.email && auth.instagramUserId && auth.instagramKey && auth.twitterUserId && auth.twitterKey);
}

export function getAuthenticationHeaders() {
    const {auth} = store.getState();
    return (isAuthenticated())
        ? {Authorization: `Token ${auth.instagramKey} | ${auth.twitterKey}`}
        : null;
}
