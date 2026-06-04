// 마이페이지

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProfileSection from '../../components/mypage/ProfileSection';
import MyProjectCard from '../../components/mypage/MyProjectCard';
import Pagination from '../../components/common/Pagination';
import { getMyProfile } from '../../api/user';
import { getMyProjects, getMyApplies } from '../../api/project';
import { getMyFavorites } from '../../api/favorites';

const PAGE_SIZE = 4;

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [myApplies, setMyApplies] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const [myPage, setMyPage] = useState(1);
  const [applyPage, setApplyPage] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, myProjectsRes, favoritesRes, myAppliesRes] = await Promise.all([
          getMyProfile(),
          getMyProjects(),
          getMyFavorites(),
          getMyApplies(),
        ]);
        setUser(userRes.data);
        setMyProjects(myProjectsRes.data);
        setFavoriteProjects(favoritesRes.data);
        setMyApplies(myAppliesRes.data);
      } catch (err) {
        console.error('마이페이지 데이터 조회 실패', err);
      }
    };
    fetchAll();
  }, []);

  const favTotalPages = Math.ceil(favoriteProjects.length / PAGE_SIZE);
  const myTotalPages = Math.ceil(myProjects.length / PAGE_SIZE);
  const applyTotalPages = Math.ceil(myApplies.length / PAGE_SIZE);

  const currentFavProjects = favoriteProjects.slice(
      (favPage - 1) * PAGE_SIZE,
      favPage * PAGE_SIZE
  );

  const currentMyProjects = myProjects.slice(
      (myPage - 1) * PAGE_SIZE,
      myPage * PAGE_SIZE
  );

  const currentApplies = myApplies.slice(
      (applyPage - 1) * PAGE_SIZE,
      applyPage * PAGE_SIZE
  );

  const statusLabel = (status) => {
    switch (status) {
      case 'APPLIED': return { text: '검토 중', style: 'bg-yellow-100 text-yellow-600' };
      case 'ACCEPTED': return { text: '수락됨', style: 'bg-green-100 text-green-600' };
      case 'REJECTED': return { text: '거절됨', style: 'bg-red-100 text-red-500' };
      default: return { text: status, style: 'bg-gray-100 text-gray-500' };
    }
  };

  if (!user) return null;

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-6">

              <ProfileSection user={user} />

              {/* 내가 지원한 공고 */}
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-gray-900">내가 지원한 공고</h2>
                <div className="flex flex-col gap-3">
                  {currentApplies.map((apply) => (
                    <div
                      key={apply.projectId}
                      className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:border-purple-300 transition cursor-pointer"
                      onClick={() => navigate(`/projects/${apply.projectId}`)}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-gray-900">{apply.projectname}</p>
                        <p className="text-xs text-gray-400">지원 포지션: {apply.position}</p>
                        <p className="text-xs text-gray-400">{apply.appliedAt?.slice(0, 10)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusLabel(apply.status).style}`}>
                          {statusLabel(apply.status).text}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: 지원 취소 API 연동
                          }}
                          className="text-xs text-red-400 border border-red-300 px-2 py-1 rounded-lg hover:bg-red-50 transition"
                        >
                          지원 취소
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {applyTotalPages > 1 && (
                  <Pagination
                    currentPage={applyPage}
                    totalPages={applyTotalPages}
                    onPageChange={(page) => {
                      if (page < 1 || page > applyTotalPages) return;
                      setApplyPage(page);
                    }}
                  />
                )}
              </div>

              <div className="flex gap-4">

                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="font-bold text-gray-900">내가 좋아요한 공고</h2>
                  <div className="flex flex-col gap-3">
                    {currentFavProjects.map((project) => (
                        <MyProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                  {favTotalPages > 1 && (
                    <Pagination
                        currentPage={favPage}
                        totalPages={favTotalPages}
                        onPageChange={(page) => {
                          if (page < 1 || page > favTotalPages) return;
                          setFavPage(page);
                        }}
                    />
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="font-bold text-gray-900">내가 올린 공고</h2>
                  <div className="flex flex-col gap-3">
                    {currentMyProjects.map((project) => (
                        <MyProjectCard key={project.id} project={project} navState={{ isOwner: true }} />
                    ))}
                  </div>
                  {myTotalPages > 1 && (
                    <Pagination
                        currentPage={myPage}
                        totalPages={myTotalPages}
                        onPageChange={(page) => {
                          if (page < 1 || page > myTotalPages) return;
                          setMyPage(page);
                        }}
                    />
                  )}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default MyPage;
