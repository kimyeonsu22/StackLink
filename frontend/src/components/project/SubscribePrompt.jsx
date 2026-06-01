import { useNavigate } from 'react-router-dom';

const SubscribePrompt = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 w-60 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-purple-600">✨ 프리미엄 구독</h3>
            <p className="text-xs text-gray-600">
                AI가 나에게 맞는 프로젝트를 자동으로 추천해드려요!
            </p>
            <button
                onClick={() => navigate('/subscription')}
                className="bg-purple-600 text-white text-xs py-2 rounded-lg hover:bg-purple-700 transition"
            >
                구독하기
            </button>
        </div>
    );
};

export default SubscribePrompt;