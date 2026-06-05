// 메인페이지

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectCard from '../../components/project/ProjectCard';
import AiRecommendTop5 from '../../components/project/AiRecommendTop5';
import SubscribePrompt from '../../components/project/SubscribePrompt';
import StatBar from '../../components/common/StatBar';
import HotProjects from '../../components/project/HotProjects.jsx';
import { getProjects, getTop5Projects, getProjectStats } from '../../api/project';
import { checkSubscription, getAiMatching } from '../../api/ai';
import { getMyProfile } from '../../api/user';

const MainPage = () => {
    const [projects, setProjects] = useState([]);
    const [hotProjects, setHotProjects] = useState([]);
    const [stats, setStats] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [aiProjects, setAiProjects] = useState([]);

    useEffect(() => {
        getTop5Projects().then((res) => setHotProjects(res.data));

        getProjectStats().then((res) => {
            const d = res.data;
            setStats([
                { label: '전체공고수', value: d.total },
                { label: '모집중', value: d.active },
                { label: '지원자수', value: d.applicants },
                { label: '매칭률', value: `${d.matchRate}%` },
            ]);
        });

        getProjects().then((res) => setProjects(res.data));

        const userId = localStorage.getItem('userId');
        if (userId) {
            checkSubscription(userId).then((res) => {
                const subscribed = res.data.isSubscribed;
                setIsSubscribed(subscribed);
                if (subscribed) {
                    getMyProfile().then((profileRes) => {
                        const techStack = profileRes.data.techStack ?? {};
                        const techString = Object.keys(techStack).join(',');
                        getAiMatching(userId, techString).then((aiRes) => {
                            setAiProjects(aiRes.data.map((p) => ({
                                id: p.projectId,
                                projectname: p.projectName,
                            })));
                        }).catch(() => {});
                    }).catch(() => {});
                }
            }).catch(() => {});
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-6 flex justify-center">
                    <div className="w-full max-w-5xl flex gap-4">

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="bg-purple-600 text-white rounded-xl px-5 py-4">
                                <p className="text-sm font-semibold">AI가 당신에게 꼭 맞는 프로젝트의 팀원을 추천해드립니다!</p>
                                <p className="text-xs mt-1 opacity-80">기술 스택, 협업 스타일, 프로젝트 규모에 맞게 AI가 당신의 이상적인 팀원을 찾아드려요.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {projects.slice(0, 4).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>

                            <Link to="/projects" className="text-center text-sm text-purple-600 hover:underline py-2">
                                공고 전체보기
                            </Link>
                        </div>

                        <div className="w-60 flex-shrink-0 flex flex-col gap-4">
                            <HotProjects projects={hotProjects} />
                            {isSubscribed
                                ? <AiRecommendTop5 projects={aiProjects} />
                                : <SubscribePrompt />
                            }
                        </div>
                    </div>
                </main>
            </div>

            <div className="pb-4">
                <StatBar stats={stats} />
            </div>
        </div>
    );
};

export default MainPage;
