import api from './axios';

// 내 프로필 조회
export const getMyProfile = () =>
    api.get('/users/me');
