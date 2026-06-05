import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// 요청 서버로 가기전에 가로채서 중간 검사
// 로컬 스토리지에 토큰 있느느지 확인해서 있으면 토큰 요청에 같이 넣어줌
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
