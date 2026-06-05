// 마이페이지내 팔로우, 팔로잉 영역

import { useState } from 'react';

const FollowModal = ({ title, list, type, onClose, onToggleFollow, followingIdSet }) => {
    // 팔로잉 모달: 모두 팔로우 중 / 팔로워 모달: followingIdSet 기준으로 초기 상태 결정
    const [followingSet, setFollowingSet] = useState(
        () => type === 'following'
            ? new Set(list.map((u) => u.id))
            : new Set(followingIdSet)
    );

    const handleToggle = async (userId) => {
        await onToggleFollow(userId);
        setFollowingSet((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) next.delete(userId);
            else next.add(userId);
            return next;
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-80 p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">✕</button>
                </div>

                <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                    {list.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-purple-200 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">{user.nickname}</p>
                                <p className="text-xs text-gray-400">{user.position}</p>
                            </div>
                            {(type === 'following' || type === 'follower') && (
                                followingSet.has(user.id) ? (
                                    <button
                                        onClick={() => handleToggle(user.id)}
                                        className="text-xs text-red-400 border border-red-300 px-2 py-1 rounded-lg hover:bg-red-50 transition flex-shrink-0"
                                    >
                                        취소
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleToggle(user.id)}
                                        className="text-xs text-purple-600 border border-purple-300 px-2 py-1 rounded-lg hover:bg-purple-50 transition flex-shrink-0"
                                    >
                                        팔로우
                                    </button>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowModal;