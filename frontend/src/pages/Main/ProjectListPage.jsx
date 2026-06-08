// 프로젝트 리스트 화면

import { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectListCard from '../../components/project/ProjectListCard';
import Pagination from '../../components/common/Pagination';
import AiRecommendTop5 from '../../components/project/AiRecommendTop5';
import SubscribePrompt from '../../components/project/SubscribePrompt';
import { getProjects } from '../../api/project';
import { checkSubscription, getAiMatching } from '../../api/ai';
import { getMyProfile } from '../../api/user';

const PAGE_SIZE = 5;

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [aiProjects, setAiProjects] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    getProjects(keyword)
        .then((res) => setProjects(res.data))
        .catch(console.error);

    const userId = localStorage.getItem('userId');
    if (userId) {
      checkSubscription(userId).then((res) => {
        const subscribed = res.data.isSubscribed;
        setIsSubscribed(subscribed);
        if (subscribed) {
          setAiLoading(true);
          getMyProfile().then((profileRes) => {
            const techStack = profileRes.data.techStack ?? {};
            const techString = Object.keys(techStack).join(',');
            getAiMatching(userId, techString).then((aiRes) => {
              setAiProjects(aiRes.data.map((p) => ({
                id: p.projectId,
                projectname: p.projectName,
                reason: p.reason,
                score: p.score,
              })));
            }).catch(() => {}).finally(() => setAiLoading(false));
          }).catch(() => setAiLoading(false));
        }
      }).catch(() => {});
    }
  }, [keyword]);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const currentProjects = projects.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex gap-4">

              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-lg font-bold text-gray-900">모집 공고</h2>

                <div className="flex flex-col gap-3">
                  {currentProjects.map((project) => (
                      <ProjectListCard key={project.id} project={project} />
                  ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
              </div>

              <div className="w-60 flex-shrink-0 flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 items-center text-center">
                  <p className="text-sm font-semibold text-gray-700">원하는 공고가 없다면 만들어보세요!</p>
                  <button
                      onClick={() => navigate('/projects/create')}
                      className="w-full bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    공고 만들기
                  </button>
                </div>

                {isSubscribed
                    ? <AiRecommendTop5 projects={aiProjects} loading={aiLoading} />
                    : <SubscribePrompt />
                }
              </div>

            </div>
          </main>
        </div>
      </div>
  );
};

export default ProjectListPage;
