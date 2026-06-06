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
            <h3 className="font-semibold text-sm mb-2">{project.projectname}</h3>

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
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {project.projectCategory && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">{project.projectCategory}</span>
                )}
                {project.projectType && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{project.projectType}</span>
                )}
                <span className="ml-auto text-gray-400">{project.deadlineAt?.slice(0, 10)}</span>
            </div>
        </div>
    );
};

export default ProjectCard;