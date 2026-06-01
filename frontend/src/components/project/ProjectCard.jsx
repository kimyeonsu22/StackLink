// 프로젝트 공고 카드
// 마이페이지, 관리자 페이지, 메인페이지, 공고 페이지에서 사용

import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition"
        >
            <h3 className="font-semibold text-sm mb-2">{project.title}</h3>

            {/* 태그 */}
            <div className="flex flex-wrap gap-1 mb-3">
                {project.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>

            {/* 하단 정보 */}
            <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{project.position}</span>
                <span>{project.deadline}</span>
            </div>
        </div>
    );
};

export default ProjectCard;