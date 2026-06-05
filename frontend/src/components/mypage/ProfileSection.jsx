// 마이페이지 영역

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FollowModal from './FollowModal';
import { getFollowerList, getFollowingList, toggleFollow } from '../../api/follow';

const ProfileSection = ({ user }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null); // 'follower' | 'following' | null
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [followingIdSet, setFollowingIdSet] = useState(new Set()); // 내가 팔로우 중인 ID set

    const handleOpenModal = async (type) => {
        try {
            if (type === 'follower') {
                // 팔로워 모달 열 때 팔로잉 목록도 함께 조회 (맞팔 여부 확인용)
                const [followerRes, followingRes] = await Promise.all([
                    getFollowerList(user.id),
                    getFollowingList(user.id),
                ]);
                setFollowerList(followerRes.data);
                setFollowingList(followingRes.data);
                setFollowingIdSet(new Set(followingRes.data.map((u) => u.id)));
            } else {
                const res = await getFollowingList(user.id);
                setFollowingList(res.data);
                setFollowingIdSet(new Set(res.data.map((u) => u.id)));
            }
            setModal(type);
        } catch (err) {
            console.error('팔로우 목록 조회 실패', err);
        }
    };

    const handleToggleFollow = async (targetId) => {
        try {
            await toggleFollow(targetId);
        } catch (err) {
            console.error('팔로우 토글 실패', err);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-8">
            {/* 프로필 이미지 */}
            <div className="w-20 h-20 rounded-full bg-purple-200 flex-shrink-0" />

            {/* 프로필 정보 */}
            <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-lg">{user.nickname}</p>
                    {user.pro && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-600 text-white font-semibold">PRO</span>
                    )}
                </div>
                <p className="text-sm text-gray-500">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(user.techStack || {}).map(([tech, career]) => (
                        <span key={tech} className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                            {tech} · {career}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{user.position}</p>
            </div>

            {/* 팔로워/팔로잉 */}
            <div className="flex gap-6">
                <button
                    onClick={() => handleOpenModal('follower')}
                    className="flex flex-col items-center hover:opacity-80 transition"
                >
                    <span className="text-2xl font-bold text-gray-900">{user.followerCount}</span>
                    <span className="text-xs text-gray-400">팔로워</span>
                </button>
                <button
                    onClick={() => handleOpenModal('following')}
                    className="flex flex-col items-center hover:opacity-80 transition"
                >
                    <span className="text-2xl font-bold text-gray-900">{user.followingCount}</span>
                    <span className="text-xs text-gray-400">팔로잉</span>
                </button>
            </div>

            {/* 정보 변경 버튼 */}
            <button
                onClick={() => navigate('/mypage/edit')}
                className="text-sm border border-purple-300 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
            >
                정보 변경
            </button>

            {/* 팔로워 모달 */}
            {modal === 'follower' && (
                <FollowModal
                    title="팔로워"
                    list={followerList}
                    type="follower"
                    followingIdSet={followingIdSet}
                    onClose={() => setModal(null)}
                    onToggleFollow={handleToggleFollow}
                />
            )}

            {/* 팔로잉 모달 */}
            {modal === 'following' && (
                <FollowModal
                    title="팔로잉"
                    list={followingList}
                    type="following"
                    onClose={() => setModal(null)}
                    onToggleFollow={handleToggleFollow}
                />
            )}
        </div>
    );
};

export default ProfileSection;
