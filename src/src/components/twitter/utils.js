import qs from 'qs';
import apiClient from '../../api/client';
import {TWITTER_API_URL} from '../../settings';


const TWITTER_POST_LIKE = 'create';
const TWITTER_POST_DISLIKE = 'destroy';


function twitterPostLikeDislike(userId, postId, action) {
    const {promise} = apiClient.get(TWITTER_API_URL + `/favorites/${action}.json` + qs.stringify({
        id: postId,
        bearer: userId,
    }, {addQueryPrefix: true}));
    return promise;
}

export function twitterPostLike(userId, postId) {
    return twitterPostLikeDislike(userId, postId, TWITTER_POST_LIKE);
}

export function twitterPostDislike(userId, postId) {
    return twitterPostLikeDislike(userId, postId, TWITTER_POST_DISLIKE);
}


const TWITTER_POST_RETWEET = 'retweet';
const TWITTER_POST_UNRETWEET = 'unretweet';

function twitterPostRetweetUnretweet(userId, postId, action) {
    const {promise} = apiClient.get(TWITTER_API_URL + `/statuses/${action}/${postId}.json` + qs.stringify({
        bearer: userId,
    }, {addQueryPrefix: true}));
    return promise;
}

export function twitterPostRetweet(userId, postId) {
    return twitterPostRetweetUnretweet(userId, postId, TWITTER_POST_RETWEET);
}

export function twitterPostUnretweet(userId, postId) {
    return twitterPostRetweetUnretweet(userId, postId, TWITTER_POST_UNRETWEET);
}


const TWITTER_USER_FOLLOW = 'create';
const TWITTER_USER_UNFOLLOW = 'destroy';

function twitterUserFollowUnfollow(userId, twitterUserId, action) {
    const {promise} = apiClient.get(TWITTER_API_URL + `/friendships/${action}.json` + qs.stringify({
        user_id: twitterUserId,
        bearer: userId,
    }, {addQueryPrefix: true}));
    return promise;
}

export function twitterUserFollow(userId, postId) {
    return twitterUserFollowUnfollow(userId, postId, TWITTER_USER_FOLLOW);
}

export function twitterUserUnfollow(userId, postId) {
    return twitterUserFollowUnfollow(userId, postId, TWITTER_USER_UNFOLLOW);
}
