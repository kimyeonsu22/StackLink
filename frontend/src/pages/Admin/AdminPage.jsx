// 관리자 페이지

import { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectListCard from '../../components/project/ProjectListCard';
import Pagination from '../../components/common/Pagination';

// TODO: 백엔드 API 연동 후 실제 데이터로 교체
const dummyProjects = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: 'AI 기반 기술 블로그 플랫폼 개발',
  tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
  position: '모집중',
  recruitCount: 3,
  deadline: '2026.07.08',
  favoriteCount: 128,
  isClosed: i % 3 === 0,
  createdAt: '2026.05.01',
}));

const dummyMembers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  nickname: '닉네임',
  position: '백엔드',
  career: '1년 미만',
  projectCount: 1,
  applyCount: 3,
  joinedAt: '2026.05.01',
}));

const PROJECT_PAGE_SIZE = 5;
const MEMBER_PAGE_SIZE = 5;

const AdminPage = () => {
  const [projectPage, setProjectPage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);

  const totalProjectPages = Math.ceil(dummyProjects.length / PROJECT_PAGE_SIZE);
  const totalMemberPages = Math.ceil(dummyMembers.length / MEMBER_PAGE_SIZE);

  const currentProjects = dummyProjects.slice(
      (projectPage - 1) * PROJECT_PAGE_SIZE,
      projectPage * PROJECT_PAGE_SIZE
  );

  const currentMembers = dummyMembers.slice(
      (memberPage - 1) * MEMBER_PAGE_SIZE,
      memberPage * MEMBER_PAGE_SIZE
  );

  const projectStats = [
    { label: '전체 공고수', value: dummyProjects.length },
    { label: '모집중', value: dummyProjects.filter((p) => !p.isClosed).length },
    { label: '마감 공고', value: dummyProjects.filter((p) => p.isClosed).length },
  ];

  const memberStats = [
    { label: '전체 회원', value: dummyMembers.length },
    { label: '이번달 가입', value: 31 },
    { label: '활성 회원', value: 102 },
  ];

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 bg-purple-700">
            <div className="flex gap-4 h-full">

              {/* 공고 관리 */}
              <div className="flex-1 bg-white rounded-2xl p-5 flex flex-col gap-4">
                <h2 className="text-base font-bold text-gray-900">공고 관리</h2>

                <div className="flex justify-around border-b border-gray-100 pb-4">
                  {projectStats.map((stat) => (
                      <div key={stat.label} className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">{stat.label}</span>
                        <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                      </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                  {currentProjects.map((project) => (
                      <ProjectListCard key={project.id} project={project} />
                  ))}
                </div>

                <Pagination
                    currentPage={projectPage}
                    totalPages={totalProjectPages}
                    onPageChange={(page) => {
                      if (page < 1 || page > totalProjectPages) return;
                      setProjectPage(page);
                    }}
                />
              </div>

              {/* 회원 관리 */}
              <div className="flex-1 bg-white rounded-2xl p-5 flex flex-col gap-4">
                <h2 className="text-base font-bold text-gray-900">회원 관리</h2>

                <div className="flex justify-around border-b border-gray-100 pb-4">
                  {memberStats.map((stat) => (
                      <div key={stat.label} className="flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-400">{stat.label}</span>
                        <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                      </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                  {currentMembers.map((member) => (
                      <div
                          key={member.id}
                          className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm flex-shrink-0">
                          {member.nickname[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{member.nickname}</p>
                          <p className="text-xs text-gray-400">{member.position} · {member.career}</p>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <div className="flex flex-col items-center">
                            <span className="text-gray-400">작성 공고</span>
                            <span className="font-semibold text-gray-700">{member.projectCount}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-gray-400">지원</span>
                            <span className="font-semibold text-gray-700">{member.applyCount}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{member.joinedAt}</span>
                      </div>
                  ))}
                </div>

                <Pagination
                    currentPage={memberPage}
                    totalPages={totalMemberPages}
                    onPageChange={(page) => {
                      if (page < 1 || page > totalMemberPages) return;
                      setMemberPage(page);
                    }}
                />
              </div>

            </div>
          </main>
        </div>
      </div>
  );
};

export default AdminPage;