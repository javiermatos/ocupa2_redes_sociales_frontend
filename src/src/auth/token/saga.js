import {call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../api/client';
import * as actionCreators from './actions';
import {INSTAGRAM_API_URL, TWITTER_API_URL} from '../../settings';
import qs from 'qs';


function* authTokenLogin({email}) {
    try {
        const instagramCancelablePromise = apiClient.get(INSTAGRAM_API_URL + '/get/key' + qs.stringify({
            email: email,
        }, {addQueryPrefix: true}));
        const instagramResponse = yield call(() => (instagramCancelablePromise.promise));

        const twitterCancelablePromise = apiClient.get(TWITTER_API_URL + '/get/key' + qs.stringify({
            email: email,
        }, {addQueryPrefix: true}));
        const twitterResponse = yield call(() => (twitterCancelablePromise.promise));

        if (instagramResponse.status === 200 && twitterResponse.status === 200) {
            yield put(actionCreators.loginSuccess(
                email, instagramResponse.body.userid, instagramResponse.body.key,
                twitterResponse.body.userid, twitterResponse.body.key,
            ));
        }
        else {
            yield put(actionCreators.loginError({
                instagramError: instagramResponse.body,
                twitterError: twitterResponse.body,
            }));
        }
    }
    catch (error) {
        yield put(actionCreators.loginError(error));
    }
}

export default function* () {
    yield takeEvery(actionCreators.AUTH_TOKEN_LOGIN, authTokenLogin);
}
