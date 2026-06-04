// 마이페이지내 팔로우, 팔로잉 영역

const FollowModal = ({ title, list, onClose }) => {
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
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{user.nickname}</p>
                                <p className="text-xs text-gray-400">{user.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowModal;