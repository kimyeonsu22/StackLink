import api from './axios';

// 관리자 - 공고 목록 조회
export const getAdminProjects = (params) =>
    api.get('/admin/projects', { params });

// 관리자 - 공고 통계
export const getAdminProjectStats = () =>
    api.get('/admin/projects/stats');

// 관리자 - 공고 삭제
export const deleteAdminProject = (id) =>
    api.delete(`/admin/projects/${id}`);

// 관리자 - 회원 목록 조회
export const getAdminUsers = (params) =>
    api.get('/admin/users', { params });

// 관리자 - 회원 통계
export const getAdminUserStats = () =>
    api.get('/admin/users/stats');

// 관리자 - 회원 제재
export const banUser = (id) =>
    api.patch(`/admin/users/${id}/ban`);

// 관리자 - 회원 복구
export const restoreUser = (id) =>
    api.patch(`/admin/users/${id}/restore`);
