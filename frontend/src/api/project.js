import api from './axios';

// 공고 목록 조회
export const getProjects = () =>
    api.get('/projects');

// 공고 단건 조회
export const getProject = (projectId) =>
    api.get(`/projects/${projectId}`);

// 공고 생성
export const createProject = (userId, data) =>
    api.post(`/projects?userId=${userId}`, data);

// 공고 수정
export const updateProject = (projectId, data) =>
    api.put(`/projects/${projectId}`, data);

// 공고 삭제
export const deleteProject = (projectId) =>
    api.delete(`/projects/${projectId}`);

// 공고 지원
export const applyProject = (projectId, data) =>
    api.post(`/projects/${projectId}/apply`, data);

// 지원자 목록 조회
export const getApplicants = (projectId) =>
    api.get(`/projects/${projectId}/applications`);

// 지원자 팀원으로 승인
export const acceptApplicant = (projectId, userId) =>
    api.post(`/projects/${projectId}/members/${userId}`);
