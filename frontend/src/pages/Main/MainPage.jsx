// 메인페이지

import {Link} from 'react-router-dom';

import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProjectCard from '../../components/project/ProjectCard';
import AiRecommendTop5 from '../../components/project/AiRecommendTop5';
import SubscribePrompt from '../../components/project/SubscribePrompt';
import StatBar from '../../components/common/StatBar';
import HotProjects from '../../components/project/HotProjects.jsx';


// 아래 전부 테스트 위한 더미데이터임,
// 백엔드 API 연동 후 실제 데이터 사용하기
const dummyProjects = [
    { id: 1, title: 'AI 기반 기술 블로그 플랫폼 개발', tags: ['React', 'Node.js', 'MySQL'], position: '프론트엔드', deadline: '2024-05-30' },
    { id: 2, title: 'AI 기반 기술 블로그 플랫폼 개발', tags: ['React', 'Vue', 'MongoDB', 'AWS'], position: '백엔드', deadline: '2024-05-30' },
    { id: 3, title: 'AI 기반 기술 블로그 플랫폼 개발', tags: ['React', 'Node.js', 'MySQL'], position: '프론트엔드', deadline: '2024-05-30' },
    { id: 4, title: 'AI 기반 기술 블로그 플랫폼 개발', tags: ['React', 'Node.js', 'MySQL'], position: '프론트엔드', deadline: '2024-05-30' },
];

const dummyTop5 = [
    { id: 1, title: '기술 블로그 플랫폼 개발' },
    { id: 2, title: '쇼핑몰 리뉴얼 프로젝트' },
    { id: 3, title: 'AI 챗봇 서비스 개발' },
    { id: 4, title: '포트폴리오 사이트 제작' },
    { id: 5, title: '사내 관리 시스템 개발' },
];

const dummyStats = [
    { label: '전체공고수', value: '1,234' },
    { label: '모집중', value: '567' },
    { label: '지원자수', value: '453' },
    { label: '매칭률', value: '87%' },
];

const MainPage = () => {
    // TODO: 백엔드 인증 API 연동 후 실제 구독 여부로 교체
    // 현재 테스트 단계에선 해당 bool 로 구독 비구독 판별
    const isSubscribed = true;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                {/* 메인 컨텐츠 */}
                <main className="flex-1 overflow-y-auto p-6 flex justify-center">
                    <div className={"w-full max-w-5xl flex gap-4"}>
                        {/* 공고 목록 */}
                        <div className="flex-1 flex flex-col gap-4">
                            {/* AI 추천 배너 */}
                            <div className="bg-purple-600 text-white rounded-xl px-5 py-4">
                                <p className="text-sm font-semibold">AI가 당신에게 꼭 맞는 프로젝트의 팀원을 추천해드립니다!</p>
                                <p className="text-xs mt-1 opacity-80">기술 스택, 협업 스타일, 프로젝트 규모에 맞게 AI가 당신의 이상적인 팀원을 찾아드려요.</p>
                            </div>

                            {/* 공고 카드 목록 */}
                            <div className="flex flex-col gap-3">
                                {dummyProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>

                            {/* 전체보기 버튼 */}
                            <Link to="/projects" className="text-center text-sm text-purple-600 hover:underline py-2">
                                공고 전체보기
                            </Link>
                        </div>

                        {/* 오른쪽 패널 */}
                        <div className="w-60 flex-shrink-0 flex flex-col gap-4">
                            <HotProjects projects={dummyTop5} />
                            {isSubscribed
                                ? <AiRecommendTop5 projects={dummyTop5} />
                                : <SubscribePrompt />
                            }
                        </div>
                    </div>
                </main>
            </div>

            <div className="pb-4">
                <StatBar stats={dummyStats} />
            </div>
        </div>
    );
};

export default MainPage;