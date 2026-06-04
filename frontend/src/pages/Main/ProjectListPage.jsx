// 프로젝트 리스트 화면

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectListCard from '../../components/project/ProjectListCard';
import Pagination from '../../components/common/Pagination';
import AiRecommendTop5 from '../../components/project/AiRecommendTop5';
import SubscribePrompt from '../../components/project/SubscribePrompt';

// TODO: 백엔드 API 연동 후 실제 데이터로 교체
const dummyProjects = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: 'AI 기반 기술 블로그 플랫폼 개발',
  tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
  position: '모집중',
  recruitCount: 5,
  deadline: '2026.07.08',
  favoriteCount: 128,
  isClosed: false,
  createdAt: '2시간 전',
}));

const dummyAiProjects = [
  { id: 1, title: '실시간 협업 문서 편집 도구' },
  { id: 2, title: 'AI 기반 기술 블로그 플랫폼 개발' },
  { id: 3, title: '헬스케어 맞춤 관리 모바일 앱' },
  { id: 4, title: '포트폴리오 사이트 제작' },
  { id: 5, title: '사내 관리 시스템 개발' },
];

const PAGE_SIZE = 8;

const ProjectListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // TODO: 백엔드 인증 API 연동 후 실제 구독 여부로 교체
  const isSubscribed = false;

  const totalPages = Math.ceil(dummyProjects.length / PAGE_SIZE);
  const currentProjects = dummyProjects.slice(
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

              {/* 왼쪽 공고 리스트 */}
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

              {/* 오른쪽 패널 */}
              <div className="w-60 flex-shrink-0 flex flex-col gap-4">
                {/* 공고 만들기 유도 */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 items-center text-center">
                  <p className="text-sm font-semibold text-gray-700">원하는 공고가 없다면 만들어보세요!</p>
                  <button
                      onClick={() => navigate('/projects/create')}
                      className="w-full bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    공고 만들기
                  </button>
                </div>

                {/* 구독 여부에 따라 AI 추천 or 구독 유도 */}
                {isSubscribed
                    ? <AiRecommendTop5 projects={dummyAiProjects} />
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