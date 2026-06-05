import api from './axios';

// 좋아요 토글
export const toggleFavorite = (projectId) =>
    api.post(`/favorites/${projectId}`);

// 내가 좋아요한 공고 목록
export const getMyFavorites = () =>
    api.get('/favorites/mypage/favorite');
