import { useState, useEffect } from 'react';
import { getReplies, createReply, updateReply, deleteReply } from '../../api/reply';

const ReplyItem = ({ reply, projectId, myUserId, onRefresh, depth = 0 }) => {
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const isDeleted = reply.content === '삭제된 댓글입니다.';
    const isOwner = myUserId && reply.userId === Number(myUserId);

    const handleUpdate = async () => {
        if (!editContent.trim()) return;
        await updateReply(projectId, reply.replyId, editContent);
        setEditing(false);
        onRefresh();
    };

    const handleDelete = async () => {
        await deleteReply(projectId, reply.replyId);
        onRefresh();
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;
        await createReply(projectId, replyContent, reply.replyId);
        setReplyContent('');
        setReplying(false);
        onRefresh();
    };

    return (
        <div className={depth > 0 ? 'ml-6 border-l-2 border-gray-100 pl-3' : ''}>
            <div className="flex flex-col gap-1 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-gray-800 text-sm font-semibold">{reply.username}</span>
                    <span className="text-gray-400 text-xs">{reply.createdAt?.slice(0, 10)}</span>
                </div>

                {editing ? (
                    <div className="flex gap-2 mt-1">
                        <input
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="flex-1 border border-gray-300 text-gray-800 text-sm rounded px-3 py-1 focus:outline-none focus:border-purple-500"
                        />
                        <button onClick={handleUpdate} className="text-xs text-purple-600 hover:text-purple-800">저장</button>
                        <button onClick={() => setEditing(false)} className="text-xs text-gray-400 hover:text-gray-600">취소</button>
                    </div>
                ) : (
                    <p className={`text-sm ${isDeleted ? 'text-gray-400 italic' : 'text-gray-600'}`}>{reply.content}</p>
                )}

                {!isDeleted && (
                    <div className="flex gap-3 mt-1">
                        {myUserId && depth === 0 && (
                            <button
                                onClick={() => setReplying(!replying)}
                                className="text-xs text-gray-400 hover:text-purple-500 transition"
                            >
                                답글
                            </button>
                        )}
                        {isOwner && !editing && (
                            <>
                                <button onClick={() => setEditing(true)} className="text-xs text-gray-400 hover:text-blue-500 transition">수정</button>
                                <button onClick={handleDelete} className="text-xs text-gray-400 hover:text-red-500 transition">삭제</button>
                            </>
                        )}
                    </div>
                )}

                {replying && (
                    <form onSubmit={handleReply} className="flex gap-2 mt-2">
                        <input
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="답글을 입력하세요"
                            className="flex-1 border border-gray-300 text-gray-800 text-sm rounded px-3 py-1 focus:outline-none focus:border-purple-500"
                        />
                        <button type="submit" className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition">등록</button>
                        <button type="button" onClick={() => setReplying(false)} className="text-xs text-gray-400 hover:text-gray-600">취소</button>
                    </form>
                )}
            </div>

            {reply.children?.map((child) => (
                <ReplyItem
                    key={child.replyId}
                    reply={child}
                    projectId={projectId}
                    myUserId={myUserId}
                    onRefresh={onRefresh}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
};

const ReplySection = ({ projectId }) => {
    const [replies, setReplies] = useState([]);
    const [comment, setComment] = useState('');
    const myUserId = localStorage.getItem('userId');

    const fetchReplies = () => {
        getReplies(projectId)
            .then((res) => setReplies(res.data))
            .catch(() => {});
    };

    useEffect(() => {
        fetchReplies();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        await createReply(projectId, comment);
        setComment('');
        fetchReplies();
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-gray-900 font-bold">댓글 {replies.length > 0 && `(${replies.length})`}</h2>

            <div className="flex flex-col">
                {replies.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">첫 댓글을 남겨보세요!</p>
                ) : (
                    replies.map((reply) => (
                        <ReplyItem
                            key={reply.replyId}
                            reply={reply}
                            projectId={projectId}
                            myUserId={myUserId}
                            onRefresh={fetchReplies}
                        />
                    ))
                )}
            </div>

            {myUserId ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        className="flex-1 border border-gray-300 text-gray-800 text-sm rounded px-3 py-2 focus:outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white text-sm px-4 rounded hover:bg-purple-700 transition"
                    >
                        등록
                    </button>
                </form>
            ) : (
                <p className="text-gray-400 text-sm text-center">댓글을 작성하려면 로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default ReplySection;
