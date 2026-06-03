// 프로젝트 상세정보 페이지 내 컴포넌트
const ProjectInfo = ({ project, showFollow = true }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
        <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
          {project.isClosed ? '모집 완료' : '모집 중'}
        </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
          팀 프로젝트
        </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>

            <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                    <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
                ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200" />
                    <span className="text-gray-700">{project.author}</span>
                    <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">팀 리더</span>
                    {showFollow && <button className="text-xs text-purple-600 hover:underline">팔로우</button>}
                </div>
                <span>조회수 {project.viewCount}</span>
                <span>좋아요️ {project.favoriteCount}</span>
                <span>현재지원자 {project.applyCount} / {project.recruitCount}</span>
                <span className="ml-auto text-gray-400">마감일 {project.deadline}</span>
            </div>
        </div>
    );
};

export default ProjectInfo;