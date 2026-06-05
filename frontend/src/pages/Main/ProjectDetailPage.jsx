// 프로젝트 상세 페이지

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectInfo from '../../components/project/ProjectInfo';
import ProjectContent from '../../components/project/ProjectContent';
import ReplySection from '../../components/project/ReplySection';
import TeamLeaderCard from '../../components/project/TeamLeaderCard';
import HotProjects from '../../components/project/HotProjects';
import { getProject, getTop5Projects, deleteProject } from '../../api/project';
import { toggleFavorite, getMyFavorites } from '../../api/favorites';
import { getUserProfile } from '../../api/user';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [leader, setLeader] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hotProjects, setHotProjects] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getTop5Projects().then((res) => setHotProjects(res.data));
    getProject(id)
        .then((res) => {
            setProject(res.data);
            getUserProfile(res.data.userId)
                .then((profileRes) => setLeader(profileRes.data))
                .catch(() => {});
        })
        .catch(() => setNotFound(true));

    if (localStorage.getItem('accessToken')) {
        getMyFavorites()
            .then((res) => {
                const liked = res.data.some((f) => f.id === Number(id));
                setIsLiked(liked);
            })
            .catch(() => {});
    }
  }, [id]);

  if (notFound) return <div className="flex items-center justify-center h-screen text-gray-500">존재하지 않는 공고입니다.</div>;
  if (!project) return <div className="flex items-center justify-center h-screen text-gray-500">로딩 중...</div>;

  const isOwner = localStorage.getItem('userId') === String(project.userId);

  const handleApply = () => {
    navigate(`/projects/${id}/apply`);
  };

  const handleDelete = () => {
    if (!window.confirm('공고를 삭제하시겠습니까?')) return;
    deleteProject(id).then(() => navigate('/projects'));
  };

  const handleLike = () => {
    toggleFavorite(id).then((res) => {
      const liked = res.data.liked;
      setIsLiked(liked);
      setProject((prev) => ({
        ...prev,
        favoriteCount: liked ? prev.favoriteCount + 1 : prev.favoriteCount - 1,
      }));
    });
  };

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex gap-4">

              <div className="flex-1 flex flex-col gap-4">
                <button
                    onClick={() => navigate('/projects')}
                    className="text-purple-600 text-sm flex items-center gap-1 hover:opacity-80 transition w-fit"
                >
                  ← 목록으로 돌아가기
                </button>

                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <ProjectInfo project={project} applyCount={project.applyCount ?? 0} />
                </div>

                <ProjectContent project={project} />

                <ReplySection projectId={id} />
              </div>

              <div className="w-60 flex-shrink-0 flex flex-col gap-4">
                {isOwner ? (
                  <>
                    <button
                      onClick={() => navigate(`/projects/${id}/applicants`)}
                      className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition"
                    >
                      지원 관리
                    </button>
                    <button
                      onClick={() => navigate(`/projects/${id}/edit`)}
                      className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl border border-purple-300 hover:bg-purple-50 transition"
                    >
                      공고 수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full bg-white text-red-500 font-semibold py-3 rounded-xl border border-red-300 hover:bg-red-50 transition"
                    >
                      공고 삭제
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleApply}
                      className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition"
                    >
                      지원하기
                    </button>
                    <button
                      onClick={handleLike}
                      className={`w-full font-semibold py-3 rounded-xl border transition ${
                        isLiked
                          ? 'bg-purple-50 text-purple-600 border-purple-300'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {isLiked ? '좋아요 ♥' : '좋아요 ♡'}
                    </button>
                  </>
                )}

                {!isOwner && leader && <TeamLeaderCard leader={leader} />}
                <HotProjects projects={hotProjects} />
              </div>

            </div>
          </main>
        </div>
      </div>
  );
};

export default ProjectDetailPage;
