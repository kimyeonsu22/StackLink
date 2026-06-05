// ai 기반 추천 공고 5개

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AiRecommendTop5 = ({ projects }) => {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState(null); // { project, x, y }

    const handleMouseEnter = (e, project) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({ project, x: rect.left, y: rect.top });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-60">
            <h3 className="text-sm font-bold text-purple-600 mb-3">🏆 AI 기반 나에게 맞는 TOP 5</h3>
            <div className="flex flex-col gap-2">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}
                        onMouseEnter={(e) => handleMouseEnter(e, project)}
                        onMouseLeave={() => setTooltip(null)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 rounded p-1 transition"
                    >
                        <span className="text-purple-600 font-bold text-sm w-4">{index + 1}</span>
                        <span className="text-xs text-gray-700 truncate">{project.projectname}</span>
                    </div>
                ))}
            </div>

            {tooltip && tooltip.project.reason && (
                <div
                    className="fixed w-52 bg-gray-900 text-white text-xs rounded-lg p-3 z-50 shadow-lg pointer-events-none"
                    style={{ top: tooltip.y, left: tooltip.x - 220 }}
                >
                    <p className="mb-1.5">{tooltip.project.reason}</p>
                    <p className="text-purple-300 font-semibold">
                        적합도 점수 {Math.round((tooltip.project.score ?? 0) * 100)}점
                    </p>
                </div>
            )}
        </div>
    );
};

export default AiRecommendTop5;