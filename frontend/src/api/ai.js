import api from './axios';

// 구독 여부 확인
export const checkSubscription = (userId) =>
    api.get(`/ai/subscription/${userId}`);

// AI 매칭 추천 (구독자만)
export const getAiMatching = (userId, techStack) =>
    api.get(`/ai/matching/${userId}`, { params: { techStack } });

// Todo: 구독하기 필요


// Todo: 구독취소 필요