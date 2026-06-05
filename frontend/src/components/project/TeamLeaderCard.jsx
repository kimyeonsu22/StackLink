import { useState, useEffect } from 'react';
import { toggleFollow, getFollowingList } from '../../api/follow';

const TeamLeaderCard = ({ leader }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(leader.followerCount ?? 0);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        getFollowingList(userId)
            .then((res) => {
                const following = res.data.some((u) => u.id === leader.id);
                setIsFollowing(following);
            })
            .catch(() => {});
    }, [leader.id]);

    const handleFollow = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const res = await toggleFollow(leader.id);
        const nowFollowing = res.data;
        setIsFollowing(nowFollowing);
        setFollowerCount((prev) => nowFollowing ? prev + 1 : prev - 1);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-gray-900 font-bold mb-3">팀 리더</h3>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-200" />
                    <div>
                        <div className="flex items-center gap-1">
                            <p className="text-gray-900 text-sm font-semibold">{leader.nickname}</p>
                            {leader.pro && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-semibold">PRO</span>
                            )}
                        </div>
                        <p className="text-gray-400 text-xs">{leader.position}</p>
                    </div>
                </div>
                <button
                    onClick={handleFollow}
                    className={`text-xs px-3 py-1 rounded border transition ${
                        isFollowing
                            ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
                            : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                    }`}
                >
                    {isFollowing ? '팔로잉' : '팔로우'}
                </button>
            </div>
            <div className="flex gap-4 text-xs text-gray-400 mb-3">
                <span>프로젝트 {leader.projectCount}</span>
                <span>팔로워 {followerCount}</span>
            </div>
            <p className="text-gray-500 text-xs">{leader.bio}</p>
        </div>
    );
};

export default TeamLeaderCard;
