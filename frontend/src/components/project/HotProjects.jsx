// 오른쪽 핫한 프로젝트 (일단 더미 데이터 적용)

import { useNavigate } from 'react-router-dom';

const HotProjects = ({ projects }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-60">
            <h3 className="text-sm font-bold text-orange-500 mb-3">🔥 핫한 공고</h3>
            <div className="flex flex-col gap-2">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 rounded p-1 transition"
                    >
                        <span className="text-orange-500 font-bold text-sm w-4">{index + 1}</span>
                        <span className="text-xs text-gray-700 truncate">{project.projectname}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotProjects;