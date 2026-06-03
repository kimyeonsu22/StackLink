// 댓글
import { useState } from 'react';
import { replies as allReplies } from '../../data/dummy';

const ReplySection = ({ projectId }) => {
    const [comment, setComment] = useState('');

    // TODO: 백엔드 댓글 목록 API 연동 후 교체
    const dummyReplies = allReplies.filter(r => r.projectId === Number(projectId));

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 백엔드 댓글 작성 API 연동 필요
        setComment('');
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-gray-900 font-bold">댓글</h2>

            <div className="flex flex-col gap-3">
                {dummyReplies.map((reply) => (
                    <div key={reply.id} className="flex flex-col gap-1 border-b border-gray-100 pb-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-800 text-sm font-semibold">{reply.author}</span>
                            <span className="text-gray-400 text-xs">{reply.createdAt}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{reply.content}</p>
                        <button
                            onClick={() => {
                                // TODO: 백엔드 댓글 좋아요 API 연동 필요
                            }}
                            className="flex items-center gap-1 text-gray-400 text-xs hover:text-red-400 transition w-fit"
                        >
                            좋아요️ {reply.likeCount}
                        </button>
                    </div>
                ))}
            </div>

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
        </div>
    );
};

export default ReplySection;