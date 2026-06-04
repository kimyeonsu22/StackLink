// 마이페이지 영역

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FollowModal from './FollowModal';
import { getFollowerList, getFollowingList } from '../../api/follow';

const ProfileSection = ({ user }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null); // 'follower' | 'following' | null
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    const handleOpenModal = async (type) => {
        try {
            if (type === 'follower') {
                const res = await getFollowerList(user.id);
                setFollowerList(res.data);
            } else {
                const res = await getFollowingList(user.id);
                setFollowingList(res.data);
            }
            setModal(type);
        } catch (err) {
            console.error('팔로우 목록 조회 실패', err);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-8">
            {/* 프로필 이미지 */}
            <div className="w-20 h-20 rounded-full bg-purple-200 flex-shrink-0" />

            {/* 프로필 정보 */}
            <div className="flex flex-col gap-1 flex-1">
                <p className="font-bold text-gray-900 text-lg">{user.nickname}</p>
                <p className="text-sm text-gray-500">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
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
                    onClose={() => setModal(null)}
                />
            )}

            {/* 팔로잉 모달 */}
            {modal === 'following' && (
                <FollowModal
                    title="팔로잉"
                    list={followingList}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
};

export default ProfileSection;
