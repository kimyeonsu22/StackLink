const ProjectContent = ({ project }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h2 className="text-gray-900 font-bold mb-3">프로젝트 소개</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{project.content}</p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h2 className="text-gray-900 font-bold mb-4">모집 정보</h2>
                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex gap-4">
                        <span className="text-purple-600 w-24 flex-shrink-0">✦ 모집 인원</span>
                        <span className="text-gray-600">{project.recruitCount}명</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-purple-600 w-24 flex-shrink-0">✦ 기술 스택</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectContent;