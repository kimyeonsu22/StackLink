import api from './axios';

export const login = (email, password) =>
    api.post('/auth/login', { email, password });

export const signup = (data) =>
    api.post('/auth/signup', data);

export const checkEmail = (email) =>
    api.get('/auth/check-email', { params: { email } });

export const checkNickname = (nickname) =>
    api.get('/auth/check-nickname', { params: { nickname } });
