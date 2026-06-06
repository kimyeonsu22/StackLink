// 프로젝트 공고 리스트

import { useNavigate } from 'react-router-dom';

const ProjectListCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition flex flex-col gap-2"
        >
            <h3 className="font-semibold text-gray-900">{project.projectname}</h3>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>{project.recruitCount}명</span>
                <span>~{project.deadlineAt?.slice(0, 10)}</span>
                <span className="ml-auto">좋아요️ {project.favoriteCount}</span>
            </div>

            <div className="flex flex-wrap gap-1">
                {project.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className={`px-2 py-0.5 rounded-full text-white ${project.isClosed ? 'bg-gray-400' : 'bg-purple-600'}`}>
                    {project.isClosed ? '모집 완료' : '모집 중'}
                </span>
                {project.projectCategory && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">{project.projectCategory}</span>
                )}
                {project.projectType && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{project.projectType}</span>
                )}
                <span className="ml-auto text-gray-400">{project.createdAt?.slice(0, 10)}</span>
            </div>
        </div>
    );
};

export default ProjectListCard;