import api from './axios';

// 내 프로필 조회
export const getMyProfile = () =>
    api.get('/users/me');

// 회원정보 수정
export const updateMyProfile = (data) =>
    api.put('/users/me', data);

// 닉네임 중복 확인
export const checkNickname = (nickname) =>
    api.get('/users/check-nickname', { params: { nickname } });

// 전화번호 중복 확인
export const checkPhone = (phoneNumber) =>
    api.get('/users/check-phone', { params: { phoneNumber } });
