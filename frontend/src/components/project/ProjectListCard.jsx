// 프로젝트 공고 리스트

import { useNavigate } from 'react-router-dom';

const ProjectListCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition flex flex-col gap-2"
        >
            <h3 className="font-semibold text-gray-900">{project.title}</h3>

            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>{project.position}</span>
                <span>{project.recruitCount}명</span>
                <span>~{project.deadline}</span>
                <span className="ml-auto">❤️ {project.favoriteCount}</span>
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

            <div className="flex justify-between items-center text-xs text-gray-400">
        <span className={`px-2 py-0.5 rounded-full text-white text-xs ${project.isClosed ? 'bg-gray-400' : 'bg-purple-600'}`}>
          {project.isClosed ? '모집 완료' : '모집 중'}
        </span>
                <span>{project.createdAt}</span>
            </div>
        </div>
    );
};

export default ProjectListCard;