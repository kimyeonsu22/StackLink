// 마이페이지

import { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProfileSection from '../../components/mypage/ProfileSection';
import MyProjectCard from '../../components/mypage/MyProjectCard';
import Pagination from '../../components/common/Pagination';
import { getMyProfile } from '../../api/user';
import { getMyProjects } from '../../api/project';
import { getMyFavorites } from '../../api/favorites';

const PAGE_SIZE = 4;

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const [myPage, setMyPage] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, myProjectsRes, favoritesRes] = await Promise.all([
          getMyProfile(),
          getMyProjects(),
          getMyFavorites(),
        ]);
        setUser(userRes.data);
        setMyProjects(myProjectsRes.data);
        setFavoriteProjects(favoritesRes.data);
      } catch (err) {
        console.error('마이페이지 데이터 조회 실패', err);
      }
    };
    fetchAll();
  }, []);

  const favTotalPages = Math.ceil(favoriteProjects.length / PAGE_SIZE);
  const myTotalPages = Math.ceil(myProjects.length / PAGE_SIZE);

  const currentFavProjects = favoriteProjects.slice(
      (favPage - 1) * PAGE_SIZE,
      favPage * PAGE_SIZE
  );

  const currentMyProjects = myProjects.slice(
      (myPage - 1) * PAGE_SIZE,
      myPage * PAGE_SIZE
  );

  if (!user) return null;

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-6">

              <ProfileSection user={user} />

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
