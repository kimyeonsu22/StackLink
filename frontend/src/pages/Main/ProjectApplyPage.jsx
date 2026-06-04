// 프로젝트 지원 페이지
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectInfo from '../../components/project/ProjectInfo';
import ProjectContent from '../../components/project/ProjectContent';
import TeamLeaderCard from '../../components/project/TeamLeaderCard';
import HotProjects from '../../components/project/HotProjects';
import ProjectApplyForm from '../../components/project/ProjectApplyForm';

import { useParams, useNavigate } from 'react-router-dom';

// TODO: 백엔드 API 연동 후 실제 데이터로 교체
const dummyProject = {
  id: 1,
  title: 'AI 기반 학습 관리 플랫폼 프론트엔드 개발자 모집',
  tags: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Figma'],
  author: '김민우',
  viewCount: 356,
  favoriteCount: 42,
  applyCount: 3,
  recruitCount: 5,
  deadline: '2024.06.30 (D-12)',
  isClosed: false,
  content: 'AI 기반으로 개인 맞춤형 학습 경로를 추천해주는 학습 관리 플랫폼을 개발하고 있습니다.',
};

const dummyLeader = {
  nickname: '김민우',
  position: '백엔드 개발자',
  projectCount: 12,
  followerCount: 238,
  bio: '교육과 기술의 연결을 꿈꾸는 백엔드 개발자입니다.',
};

const dummyHotProjects = [
  { id: 1, title: 'AI 기반 기술 블로그 플랫폼 개발' },
  { id: 2, title: '개발자 Q&A 커뮤니티 플랫폼' },
  { id: 3, title: '실시간 협업 문서 편집 도구' },
  { id: 4, title: '헬스케어 맞춤 관리 모바일 앱' },
  { id: 5, title: '온라인 스터디 관리 플랫폼' },
];

const ProjectApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex gap-4">

              {/* 왼쪽 공고 내용 */}
              <div className="flex-1 flex flex-col gap-4">
                <button
                    onClick={() => navigate('/projects')}
                    className="text-purple-600 text-sm flex items-center gap-1 hover:opacity-80 transition w-fit"
                >
                  ← 목록으로 돌아가기
                </button>

                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <ProjectInfo project={dummyProject} />
                </div>

                <ProjectContent project={dummyProject} />

                {/*프로젝트 지원용 컴포넌트 생성 및 주입*/}
                <ProjectApplyForm projectId={id} />
              </div>

              {/* 오른쪽 패널 */}
              <div className="w-60 flex-shrink-0 flex flex-col gap-4">

                <TeamLeaderCard leader={dummyLeader} />
                <HotProjects projects={dummyHotProjects} />
              </div>

            </div>
          </main>
        </div>
      </div>
  );
};

export default ProjectApplyPage;
