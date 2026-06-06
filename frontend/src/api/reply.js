import api from './axios';

export const getReplies = (projectId) =>
    api.get(`/projects/${projectId}/replies`);

export const createReply = (projectId, content, parentId = null) =>
    api.post(`/projects/${projectId}/replies`, { content, parentId });

export const updateReply = (projectId, replyId, content) =>
    api.patch(`/projects/${projectId}/replies/${replyId}`, { content });

export const deleteReply = (projectId, replyId) =>
    api.delete(`/projects/${projectId}/replies/${replyId}`);
