// 모집자 기준에서 프로젝트 관리 페이지 (지원자 지원 현황, 수락 등)

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Pagination from '../../components/common/Pagination';
import ProjectContent from '../../components/project/ProjectContent';
import { applicants as initialApplicants, projects } from '../../data/dummy';

const PAGE_SIZE = 6;

const ProjectManagePage = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState(initialApplicants);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const project = projects.find(p => p.id === Number(id)) ?? projects[0];

  const pendingApplicants = applicants.filter((a) => !a.isApproved);
  const approvedApplicants = applicants.filter((a) => a.isApproved);

  const totalPages = Math.ceil(pendingApplicants.length / PAGE_SIZE);
  const currentApplicants = pendingApplicants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = [
    { label: '지원자 수', value: applicants.length },
    { label: '모집 인원', value: project.recruitCount },
    { label: '승인 인원', value: approvedApplicants.length },
  ];

  const handleApprove = (applicantId) => {
    // TODO: 백엔드 PATCH /api/projects/:id/applicants/:applicantId/approve 연동 필요
    if (approvedApplicants.length >= project.recruitCount) {
      alert('모집 인원이 가득 찼습니다.');
      return;
    }
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, isApproved: true } : a))
    );
  };

  const handleReject = (applicantId) => {
    // TODO: 백엔드 DELETE /api/projects/:id/applicants/:applicantId 연동 필요
    setApplicants((prev) => prev.filter((a) => a.id !== applicantId));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full max-w-5xl mx-auto flex gap-4">

            <div className="flex-1 flex flex-col gap-4">

              <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
                <h2 className="text-base font-bold text-gray-900">공고 지원</h2>

                <div className="flex justify-around border-b border-gray-100 pb-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-400">{stat.label}</span>
                      <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {currentApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      onClick={() => setSelectedApplicant(applicant)}
                      className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-purple-300 hover:shadow-sm transition"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{applicant.nickname}</p>
                        <p className="text-xs text-gray-400">{applicant.applyPosition}</p>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleApprove(applicant.id)}
                          className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(applicant.id)}
                          className="text-xs bg-white text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      if (page < 1 || page > totalPages) return;
                      setCurrentPage(page);
                    }}
                  />
                )}
              </div>

              {approvedApplicants.length > 0 && (
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                  <h2 className="text-base font-bold text-gray-900">승인된 지원자</h2>
                  {approvedApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      onClick={() => setSelectedApplicant(applicant)}
                      className="border border-purple-200 bg-purple-50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{applicant.nickname}</p>
                        <p className="text-xs text-gray-400">{applicant.applyPosition}</p>
                      </div>
                      <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                        승인 완료
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-gray-900">{project.title}</h3>
                <ProjectContent project={project} />
              </div>
            </div>

          </div>
        </main>
      </div>

      {selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">지원자 정보</h2>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-200 flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-gray-900">{selectedApplicant.nickname}</p>
                <p className="text-sm text-gray-500">{selectedApplicant.username} · {selectedApplicant.phoneNumber}</p>
                <p className="text-sm text-gray-500">{selectedApplicant.position}</p>
                <p className="text-sm text-gray-400">{selectedApplicant.bio}</p>
              </div>
            </div>

            {/* 지원 내용 */}
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">지원 포지션: {selectedApplicant.applyPosition}</p>
              <p className="text-sm text-gray-700">{selectedApplicant.applyContent}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {Object.entries(selectedApplicant.techStack || {}).map(([tech, career]) => (
                <span key={tech} className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                  {tech} · {career}
                </span>
              ))}
            </div>

            <div className="flex gap-6 border-t border-gray-100 pt-4 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900">{selectedApplicant.followerCount}</span>
                <span className="text-xs text-gray-400">팔로워</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-gray-900">{selectedApplicant.followingCount}</span>
                <span className="text-xs text-gray-400">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectManagePage;
