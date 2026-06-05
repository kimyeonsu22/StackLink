import { useState, useEffect } from 'react';
import { FiHome } from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Pagination from '../../components/common/Pagination';
import {
  getAdminProjects,
  getAdminProjectStats,
  deleteAdminProject,
  getAdminUsers,
  getAdminUserStats,
  banUser,
  restoreUser,
} from '../../api/admin';

const adminMenus = [
  { label: '관리자 홈', icon: <FiHome />, path: '/admin' },
];

const PROJECT_PAGE_SIZE = 6;
const MEMBER_PAGE_SIZE = 8;

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({});
  const [projectPage, setProjectPage] = useState(1);
  const [totalProjectPages, setTotalProjectPages] = useState(1);

  const [members, setMembers] = useState([]);
  const [memberStats, setMemberStats] = useState({});
  const [memberPage, setMemberPage] = useState(1);
  const [totalMemberPages, setTotalMemberPages] = useState(1);

  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async (page) => {
    const res = await getAdminProjects({ page: page - 1, size: PROJECT_PAGE_SIZE });
    const { content, totalPages } = res.data.data;
    setProjects(content);
    setTotalProjectPages(totalPages);
  };

  const fetchMembers = async (page) => {
    const res = await getAdminUsers({ page: page - 1, size: MEMBER_PAGE_SIZE });
    const { content, totalPages } = res.data.data;
    setMembers(content);
    setTotalMemberPages(totalPages);
  };

  useEffect(() => {
    getAdminProjectStats().then((res) => setProjectStats(res.data.data));
    getAdminUserStats().then((res) => setMemberStats(res.data.data));
  }, []);

  useEffect(() => { fetchProjects(projectPage); }, [projectPage]);
  useEffect(() => { fetchMembers(memberPage); }, [memberPage]);

  const handleDelete = async (projectId) => {
    await deleteAdminProject(projectId);
    setSelectedProject(null);
    fetchProjects(projectPage);
    getAdminProjectStats().then((res) => setProjectStats(res.data.data));
  };

  const handleBan = async (userId) => {
    await banUser(userId);
    fetchMembers(memberPage);
    getAdminUserStats().then((res) => setMemberStats(res.data.data));
  };

  const handleRestore = async (userId) => {
    await restoreUser(userId);
    fetchMembers(memberPage);
    getAdminUserStats().then((res) => setMemberStats(res.data.data));
  };

  const projectStatItems = [
    { label: '전체 공고수', value: projectStats.total ?? '-' },
    { label: '모집중', value: projectStats.active ?? '-' },
    { label: '마감 공고', value: projectStats.closed ?? '-' },
    { label: '삭제된 공고', value: projectStats.deleted ?? '-' },
  ];

  const memberStatItems = [
    { label: '전체 회원수', value: memberStats.total != null ? memberStats.total - (memberStats.admins ?? 0) : '-' },
    { label: '활성 회원', value: memberStats.active != null ? memberStats.active - (memberStats.admins ?? 0) : '-' },
    { label: '제재 회원', value: memberStats.deleted ?? '-' },
  ];

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
                {projectStatItems.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{project.projectName}</h3>
                      {project.isDeleted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-500">삭제됨</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className={`px-2 py-0.5 rounded-full text-white ${project.isClosed ? 'bg-gray-400' : 'bg-purple-600'}`}>
                        {project.isClosed ? '모집 완료' : '모집 중'}
                      </span>
                      <span>{project.createdAt?.slice(0, 10)}</span>
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
                {memberStatItems.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {members.filter((m) => m.role !== 'ADMIN').map((member) => (
                  <div
                    key={member.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm flex-shrink-0">
                      {member.nickname[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{member.nickname}</p>
                      <p className="text-xs text-gray-400">{member.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${member.deleted ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                      {member.deleted ? '제재' : '활성'}
                    </span>
                    <span className="text-xs text-gray-400">{member.createdAt?.slice(0, 10)}</span>
                    {member.deleted ? (
                      <button
                        onClick={() => handleRestore(member.id)}
                        className="text-xs px-3 py-1 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
                      >
                        복구
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBan(member.id)}
                        className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition"
                      >
                        제재
                      </button>
                    )}
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

            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p><span className="font-semibold">공고명:</span> {selectedProject.projectName}</p>
              <p><span className="font-semibold">작성자:</span> {selectedProject.authorNickname}</p>
              <p><span className="font-semibold">상태:</span> {selectedProject.isClosed ? '모집 완료' : '모집 중'}</p>
              <p><span className="font-semibold">모집 인원:</span> {selectedProject.recruitCount}명</p>
              <p><span className="font-semibold">지원자 수:</span> {selectedProject.applyCount}명</p>
              <p><span className="font-semibold">마감일:</span> {selectedProject.deadlineAt?.slice(0, 10)}</p>
              <p><span className="font-semibold">조회수:</span> {selectedProject.viewCount}</p>
              <p><span className="font-semibold">좋아요:</span> {selectedProject.favoriteCount}</p>
            </div>

            {selectedProject.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">
              {selectedProject.content}
            </div>

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
