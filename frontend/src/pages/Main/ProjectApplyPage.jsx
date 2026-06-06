import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectInfo from '../../components/project/ProjectInfo';
import ProjectContent from '../../components/project/ProjectContent';
import TeamLeaderCard from '../../components/project/TeamLeaderCard';
import HotProjects from '../../components/project/HotProjects';
import ProjectApplyForm from '../../components/project/ProjectApplyForm';
import { getProject, getTop5Projects } from '../../api/project';
import { getUserProfile } from '../../api/user';

const ProjectApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [leader, setLeader] = useState(null);
  const [hotProjects, setHotProjects] = useState([]);

  useEffect(() => {
    getProject(id).then((res) => {
      const p = res.data;
      setProject(p);
      if (p.userId) {
        getUserProfile(p.userId).then((r) => setLeader(r.data)).catch(() => {});
      }
    }).catch(() => {});

    getTop5Projects().then((res) => setHotProjects(res.data)).catch(() => {});
  }, [id]);

  if (!project) return null;

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
                <ProjectInfo project={project} applyCount={project.applyCount} />
              </div>

              <ProjectContent project={project} />

              <ProjectApplyForm projectId={id} />
            </div>

            {/* 오른쪽 패널 */}
            <div className="w-60 flex-shrink-0 flex flex-col gap-4">
              {leader && <TeamLeaderCard leader={leader} />}
              {hotProjects.length > 0 && <HotProjects projects={hotProjects} />}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectApplyPage;
