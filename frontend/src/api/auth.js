import api from './axios';

// 로그인 버튼
export const login = (email, password) =>
    api.post('/auth/login', { email, password });

// 회원가입
export const signup = (data) =>
    api.post('/auth/signup', data);

// 이메일 중복 확인
export const checkEmail = (email) =>
    api.get('/auth/check-email', { params: { email } });

// 닉네임 중복 확인
export const checkNickname = (nickname) =>
    api.get('/auth/check-nickname', { params: { nickname } });

// 로그아웃
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('nickname');
};