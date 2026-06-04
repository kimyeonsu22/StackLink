// 게시글 작성에서 오른쪽 게시자(팀장)
const TeamLeaderCard = ({ leader }) => {
    const handleFollow = () => {
        // TODO: 백엔드 /api/follow 연동 필요
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-gray-900 font-bold mb-3">팀 리더</h3>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-200" />
                    <div>
                        <p className="text-gray-900 text-sm font-semibold">{leader.nickname}</p>
                        <p className="text-gray-400 text-xs">{leader.position}</p>
                    </div>
                </div>
                <button
                    onClick={handleFollow}
                    className="text-xs border border-purple-300 text-purple-600 px-3 py-1 rounded hover:bg-purple-50 transition"
                >
                    팔로우
                </button>
            </div>
            <div className="flex gap-4 text-xs text-gray-400 mb-3">
                <span>프로젝트 {leader.projectCount}</span>
                <span>팔로워 {leader.followerCount}</span>
            </div>
            <p className="text-gray-500 text-xs">{leader.bio}</p>
        </div>
    );
};

export default TeamLeaderCard;