import api from './axios';

// 공고 목록 조회
export const getProjects = (keyword) =>
    api.get('/projects', {
        params: keyword ? {keyword} : {}
    });

// 공고 단건 조회
export const getProject = (projectId) =>
    api.get(`/projects/${projectId}`);

// 공고 생성
export const createProject = (data) =>
    api.post('/projects', data);

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

// 내가 올린 공고 목록
export const getMyProjects = () =>
    api.get('/projects/my');

// 내가 지원한 공고 목록
export const getMyApplies = () =>
    api.get('/projects/my-applies');

// 공고 지원 취소
export const cancelApply = (projectId) =>
    api.delete(`/projects/${projectId}/apply`);

// 지원자 거절
export const rejectApplicant = (projectId, userId) =>
    api.patch(`/projects/${projectId}/applications/${userId}/reject`);

// 핫한 공고 Top5
export const getTop5Projects = () =>
    api.get('/projects/top5');

// 공고 마감
export const closeProject = (projectId) =>
    api.patch(`/projects/${projectId}/close`);

// 공개 통계
export const getProjectStats = () =>
    api.get('/projects/stats');
