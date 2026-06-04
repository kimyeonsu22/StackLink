// 마이페이지

import { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProfileSection from '../../components/mypage/ProfileSection';
import MyProjectCard from '../../components/mypage/MyProjectCard';
import Pagination from '../../components/common/Pagination';

// TODO: 백엔드 API 연동 후 실제 데이터로 교체
// 더미데이터 사용
const dummyUser = {
  nickname: '닉네임',
  username: '이름',
  email: 'example@email.com',
  position: '프론트엔드',
  tags: ['React', 'TypeScript', 'Node.js'],
  followerCount: 121,
  followingCount: 111,
};

const dummyFavoriteProjects = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: 'AI 기반 기술 블로그 플랫폼 개발',
  tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
  isClosed: false,
  deadline: '~2026.07.08',
}));

const dummyMyProjects = Array.from({ length: 6 }, (_, i) => ({
  id: i + 10,
  title: 'AI 기반 기술 블로그 플랫폼 개발',
  tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
  isClosed: false,
  deadline: '~2026.07.08',
}));

const PAGE_SIZE = 4;

const MyPage = () => {
  const [favPage, setFavPage] = useState(1);
  const [myPage, setMyPage] = useState(1);

  const favTotalPages = Math.ceil(dummyFavoriteProjects.length / PAGE_SIZE);
  const myTotalPages = Math.ceil(dummyMyProjects.length / PAGE_SIZE);

  const currentFavProjects = dummyFavoriteProjects.slice(
      (favPage - 1) * PAGE_SIZE,
      favPage * PAGE_SIZE
  );

  const currentMyProjects = dummyMyProjects.slice(
      (myPage - 1) * PAGE_SIZE,
      myPage * PAGE_SIZE
  );

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-6">

              {/* 프로필 섹션 */}
              <ProfileSection user={dummyUser} />

              {/* 하단 두 섹션 */}
              <div className="flex gap-4">

                {/* 내가 좋아요한 공고 */}
                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="font-bold text-gray-900">내가 좋아요한 공고</h2>
                  <div className="flex flex-col gap-3">
                    {currentFavProjects.map((project) => (
                        <MyProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                  <Pagination
                      currentPage={favPage}
                      totalPages={favTotalPages}
                      onPageChange={(page) => {
                        if (page < 1 || page > favTotalPages) return;
                        setFavPage(page);
                      }}
                  />
                </div>

                {/* 내가 올린 공고 */}
                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="font-bold text-gray-900">내가 올린 공고</h2>
                  <div className="flex flex-col gap-3">
                    {currentMyProjects.map((project) => (
                        <MyProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                  <Pagination
                      currentPage={myPage}
                      totalPages={myTotalPages}
                      onPageChange={(page) => {
                        if (page < 1 || page > myTotalPages) return;
                        setMyPage(page);
                      }}
                  />
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default MyPage;