// 관리자 페이지

import { useState } from 'react';
import { FiHome } from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Pagination from '../../components/common/Pagination';
import ProjectInfo from '../../components/project/ProjectInfo';
import ProjectContent from '../../components/project/ProjectContent';
import { projects, members } from '../../data/dummy';

const adminMenus = [
  { label: '관리자 홈', icon: <FiHome />, path: '/admin' },
];

const PROJECT_PAGE_SIZE = 5;
const MEMBER_PAGE_SIZE = 7;

const AdminPage = () => {
  const [projectPage, setProjectPage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const totalProjectPages = Math.ceil(projects.length / PROJECT_PAGE_SIZE);
  const totalMemberPages = Math.ceil(members.length / MEMBER_PAGE_SIZE);

  const currentProjects = projects.slice(
    (projectPage - 1) * PROJECT_PAGE_SIZE,
    projectPage * PROJECT_PAGE_SIZE
  );

  const currentMembers = members.slice(
    (memberPage - 1) * MEMBER_PAGE_SIZE,
    memberPage * MEMBER_PAGE_SIZE
  );

  const projectStats = [
    { label: '전체 공고수', value: projects.length },
    { label: '모집중', value: projects.filter((p) => !p.isClosed).length },
    { label: '마감 공고', value: projects.filter((p) => p.isClosed).length },
  ];

  const memberStats = [
    { label: '전체 회원수', value: members.length },
    { label: '공고 올린 회원수', value: members.filter((m) => m.projectCount > 0).length },
    { label: '지원한 회원수', value: members.filter((m) => m.applyCount > 0).length },
  ];

  const handleDelete = (projectId) => {
    // TODO: 백엔드 DELETE /api/admin/projects/:id 연동 필요
    console.log('삭제할 공고 ID:', projectId);
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header showSearch={false} profilePath="/admin" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar menus={adminMenus} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
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
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition flex flex-col gap-2"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className={`px-2 py-0.5 rounded-full text-white ${project.isClosed ? 'bg-gray-400' : 'bg-purple-600'}`}>
                        {project.isClosed ? '모집 완료' : '모집 중'}
                      </span>
                      <span>{project.createdAt}</span>
                    </div>
                  </div>
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
                      <p className="text-xs text-gray-400">{member.position}</p>
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

      {/* 공고 상세 모달 */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">공고 상세</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <ProjectInfo project={selectedProject} />
            <ProjectContent project={selectedProject} />

            <button
              onClick={() => handleDelete(selectedProject.id)}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition mt-2"
            >
              공고 삭제
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
