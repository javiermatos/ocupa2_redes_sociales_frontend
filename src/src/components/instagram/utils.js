import qs from 'qs';
import apiClient from '../../api/client';
import {INSTAGRAM_API_URL} from '../../settings';


const INSTAGRAM_POST_LIKE = 'like';
const INSTAGRAM_POST_DISLIKE = 'dislike';

function instagramPostLikeDislike(userId, postId, action) {
    const {promise} = apiClient.get(INSTAGRAM_API_URL + `/media/${postId}/like` + qs.stringify({
        user_id: userId,
        action: action,
    }, {addQueryPrefix: true}));
    return promise;
}

export function instagramPostLike(userId, postId) {
    return instagramPostLikeDislike(userId, postId, INSTAGRAM_POST_LIKE);
}

export function instagramPostDislike(userId, postId) {
    return instagramPostLikeDislike(userId, postId, INSTAGRAM_POST_DISLIKE);
}


const INSTAGRAM_USER_FOLLOW = 'follow';
const INSTAGRAM_USER_UNFOLLOW = 'unfollow';

function instagramUserFollowUnfollow(userId, user, action) {
    const {promise} = apiClient.get(INSTAGRAM_API_URL + `/${user}/follow` + qs.stringify({
        user_id: userId,
        action: action,
    }, {addQueryPrefix: true}));
    return promise;
}

export function instagramUserFollow(userId, user) {
    return instagramUserFollowUnfollow(userId, user, INSTAGRAM_USER_FOLLOW);
}

export function instagramUserUnfollow(userId, user) {
    return instagramUserFollowUnfollow(userId, user, INSTAGRAM_USER_UNFOLLOW);
}
