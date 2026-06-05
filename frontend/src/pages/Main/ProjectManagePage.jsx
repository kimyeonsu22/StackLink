import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Pagination from '../../components/common/Pagination';
import { getProject, getApplicants, acceptApplicant, rejectApplicant, closeProject } from '../../api/project';

const PAGE_SIZE = 6;

const ProjectManagePage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    getProject(id).then((res) => setProject(res.data));
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    const res = await getApplicants(id);
    setApplicants(res.data);
  };

  if (!project) return null;

  const pendingApplicants = applicants.filter((a) => a.status === 'APPLIED');
  const acceptedApplicants = applicants.filter((a) => a.status === 'ACCEPTED');

  const totalPages = Math.ceil(pendingApplicants.length / PAGE_SIZE);
  const currentApplicants = pendingApplicants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = [
    { label: '지원자 수', value: applicants.filter((a) => a.status !== 'REJECTED').length },
    { label: '모집 인원', value: project.recruitCount },
    { label: '승인 인원', value: acceptedApplicants.length },
  ];

  const handleAccept = async (userId) => {
    if (acceptedApplicants.length >= project.recruitCount) {
      alert('모집 인원이 가득 찼습니다.');
      return;
    }
    await acceptApplicant(id, userId);
    fetchApplicants();
  };

  const handleReject = async (userId) => {
    await rejectApplicant(id, userId);
    fetchApplicants();
  };

  const handleClose = async () => {
    if (!window.confirm('공고를 마감하시겠습니까? 마감 후에는 지원을 받을 수 없습니다.')) return;
    await closeProject(id);
    setProject((prev) => ({ ...prev, isClosed: true }));
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
                      key={applicant.userId}
                      onClick={() => setSelectedApplicant(applicant)}
                      className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-purple-300 hover:shadow-sm transition"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-gray-800">{applicant.nickname}</p>
                          {applicant.pro && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-semibold">PRO</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{applicant.position}</p>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleAccept(applicant.userId)}
                          className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(applicant.userId)}
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

              {acceptedApplicants.length > 0 && (
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                  <h2 className="text-base font-bold text-gray-900">승인된 지원자</h2>
                  {acceptedApplicants.map((applicant) => (
                    <div
                      key={applicant.userId}
                      onClick={() => setSelectedApplicant(applicant)}
                      className="border border-purple-200 bg-purple-50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-gray-800">{applicant.nickname}</p>
                          {applicant.pro && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-semibold">PRO</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{applicant.position}</p>
                      </div>
                      <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full">
                        승인 완료
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* 공고 정보 */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">{project.projectname}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${project.isClosed ? 'bg-gray-400' : 'bg-purple-600'}`}>
                    {project.isClosed ? '모집 완료' : '모집 중'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{project.content}</p>
                <div className="flex justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                  <span>모집 인원: {project.recruitCount}명</span>
                  <span>마감: {project.deadlineAt?.slice(0, 10)}</span>
                </div>
                {!project.isClosed && (
                  <button
                    onClick={handleClose}
                    className="w-full mt-1 text-sm border border-gray-300 text-gray-600 py-2 rounded-xl hover:bg-gray-50 transition"
                  >
                    공고 마감
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* 지원자 상세 모달 */}
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
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">{selectedApplicant.nickname}</p>
                  {selectedApplicant.pro && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-semibold">PRO</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{selectedApplicant.email} · {selectedApplicant.phoneNumber}</p>
                <p className="text-sm text-gray-500">{selectedApplicant.userPosition}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">지원 포지션: {selectedApplicant.position}</p>
              <p className="text-sm text-gray-700">{selectedApplicant.content}</p>
            </div>

            {selectedApplicant.techStack?.length > 0 && (
              <div className="flex flex-col gap-1">
                {selectedApplicant.techStack.map((item) => (
                  <div key={item.tech} className="flex items-center justify-between bg-purple-50 rounded-lg px-3 py-1.5">
                    <span className="text-xs font-medium text-purple-600">{item.tech}</span>
                    {item.career && <span className="text-xs text-gray-400">{item.career}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectManagePage;
