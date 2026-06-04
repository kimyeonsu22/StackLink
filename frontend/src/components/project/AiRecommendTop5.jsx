// ai 기반 추천 공고 5개

import { useNavigate } from 'react-router-dom';

const AiRecommendTop5 = ({ projects }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-60">
            <h3 className="text-sm font-bold text-purple-600 mb-3">🏆 나에게 맞는 공고 TOP 5</h3>
            <div className="flex flex-col gap-2">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 rounded p-1 transition"
                    >
                        <span className="text-purple-600 font-bold text-sm w-4">{index + 1}</span>
                        <span className="text-xs text-gray-700 truncate">{project.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiRecommendTop5;