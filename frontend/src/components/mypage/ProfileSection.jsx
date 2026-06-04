// 마이페이지 영역

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FollowModal from './FollowModal';

const ProfileSection = ({ user }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(null); // 'follower' | 'following' | null

    // TODO: 백엔드 팔로워/팔로잉 목록 API 연동 필요
    const dummyFollowers = [
        { id: 1, nickname: '김철수', position: '프론트엔드' },
        { id: 2, nickname: '이영희', position: '백엔드' },
        { id: 3, nickname: '박지훈', position: 'PM' },
    ];

    const dummyFollowing = [
        { id: 1, nickname: '최민준', position: '백엔드' },
        { id: 2, nickname: '정수연', position: '디자인' },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-8">
            {/* 프로필 이미지 */}
            <div className="w-20 h-20 rounded-full bg-purple-200 flex-shrink-0" />

            {/* 프로필 정보 */}
            <div className="flex flex-col gap-1 flex-1">
                <p className="font-bold text-gray-900 text-lg">{user.nickname}</p>
                <p className="text-sm text-gray-500">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {user.tags?.map((tag) => (
                        <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{user.position}</p>
            </div>

            {/* 팔로워/팔로잉 */}
            <div className="flex gap-6">
                <button
                    onClick={() => setModal('follower')}
                    className="flex flex-col items-center hover:opacity-80 transition"
                >
                    <span className="text-2xl font-bold text-gray-900">{dummyFollowers.length}</span>
                    <span className="text-xs text-gray-400">팔로워</span>
                </button>
                <button
                    onClick={() => setModal('following')}
                    className="flex flex-col items-center hover:opacity-80 transition"
                >
                    <span className="text-2xl font-bold text-gray-900">{dummyFollowing.length}</span>
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
                    list={dummyFollowers}
                    onClose={() => setModal(null)}
                />
            )}

            {/* 팔로잉 모달 */}
            {modal === 'following' && (
                <FollowModal
                    title="팔로잉"
                    list={dummyFollowing}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
};

export default ProfileSection;