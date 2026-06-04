import api from './axios';

// 팔로우 토글
export const toggleFollow = (followingId) =>
    api.post(`/follow/${followingId}`);

// 팔로잉 목록 조회
export const getFollowingList = (userId) =>
    api.get(`/follow/${userId}/following`);

// 팔로워 목록 조회
export const getFollowerList = (userId) =>
    api.get(`/follow/${userId}/follower`);
