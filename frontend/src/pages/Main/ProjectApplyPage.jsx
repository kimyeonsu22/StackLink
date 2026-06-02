// 프로젝트 지원 페이지
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectInfo from '../../components/project/ProjectInfo';
import ProjectContent from '../../components/project/ProjectContent';
import TeamLeaderCard from '../../components/project/TeamLeaderCard';
import HotProjects from '../../components/project/HotProjects';
import ProjectApplyForm from '../../components/project/ProjectApplyForm';


const ProjectApplyPage = () => {
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

                <!-- 프로젝트 지원용 컴포넌트 생성 및 주입 -->
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
