// 내 프로젝트 목록

import { useNavigate } from 'react-router-dom';

const MyProjectCard = ({ project, path, navState }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(path ?? `/projects/${project.id}`, { state: navState })}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition flex flex-col gap-2"
        >
            <h3 className="font-semibold text-gray-900 text-sm">{project.projectname}</h3>
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
                <span className="ml-auto text-gray-400">{project.deadlineAt?.slice(0, 10)}</span>
            </div>
        </div>
    );
};

export default MyProjectCard;