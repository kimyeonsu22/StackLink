// 프로젝트 생성 페이지
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "../../components/layout/Header.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import ProjectCategory from "../../components/project/ProjectCategory.jsx";
import ProjectType from "../../components/project/ProjectType.jsx";
import TechStackSelector from "../../components/common/TechStackSelector.jsx";
import TeamLeaderCard from "../../components/project/TeamLeaderCard.jsx";
import HotProjects from "../../components/project/HotProjects.jsx";
import { createProject, getTop5Projects } from "../../api/project.js";
import { getUserProfile } from "../../api/user.js";

const ProjectCreatePage = () => {
  const navigate = useNavigate();
  const [projectname, setProjectName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [selectedTechs, setSelectedTechs] = useState({});
  const [content, setContent] = useState('');
  const [recruitcount, setRecruitcount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');

  const [leader, setLeader] = useState(null);
  const [hotProjects, setHotProjects] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUserProfile(userId).then((res) => setLeader(res.data)).catch(() => {});
    }
    getTop5Projects().then((res) => setHotProjects(res.data)).catch(() => {});
  }, []);

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  }

  const handleProjectContent = (e) => {
    setContent(e.target.value);
  }

  const handleProjectCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleProjectType = (e) => {
    setType(e.target.value);
  }

  const handleRecruitcount = (e) => {
    setRecruitcount(e.target.value);
  }

  const handleDeadLine = (e) => {
    setDeadline(e.target.value);
  }
  const handleProjectStartDate = (e) => {
    setProjectStartDate(e.target.value);
  }
  const handleProjectEndDate = (e) => {
    setProjectEndDate(e.target.value);
  }

  const handleProjectRegister = () => {
    const formData = {
      projectname : projectname,
      content : content,
      projectCategory : category,
      projectType : type,
      recruitCount : parseInt(recruitcount, 10),
      deadlineAt : new Date(deadline),
      projectStartDate : new Date(projectStartDate),
      projectEndDate : new Date(projectEndDate),

      techStack : selectedTechs,
    }

    if (projectname === '' || content === '' || category === '' || type === '' || recruitcount === '' || deadline === '' || projectStartDate === '' || projectEndDate === '') {
      alert("필수 값이 누락되었습니다.");
    } else {
      const data = {
        projectname,
        content,
        projectCategory: category,
        projectType: type,
        recruitCount: parseInt(recruitcount, 10),
        deadlineAt: new Date(deadline).toISOString(),
        projectStartDate: new Date(projectStartDate).toISOString(),
        projectEndDate: new Date(projectEndDate).toISOString(),
        techStack: selectedTechs,
      };

      createProject(data)
        .then(() => {
          alert("공고 작성이 완료되었습니다.");
          navigate('/projects');
        })
        .catch((err) => {
          const msg = err.response?.data?.message || '공고 작성에 실패했습니다.';
          alert(msg);
        });
    }
  }

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-5xl flex gap-4">
              <div className="flex-1 flex flex-col gap-4">
                <button
                    onClick={() => navigate('/projects')}
                    className="text-purple-600 text-sm flex items-center gap-1 hover:opacity-80 transition w-fit"
                >
                  ← 목록으로 돌아가기
                </button>

                {/* 프로젝트 공고작성 헤더 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h1 className="text-2xl font-bold text-gray-900">새 모집 공고 작성</h1>
                  <br/>
                  <div className="inline-flex">
                    <p>멋진 팀원을 만나 프로젝트를 함께 만들어보세요!&nbsp;</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </div>
                </div>

                {/* 프로젝트 공고 제목 및 각종 설정 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">

                  <p>
                    공고 제목&nbsp;
                    {/*Red Dot */}
                    <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </p>
                  <br/>
                  <input type="text" name="projectname" id="projectname"
                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         placeholder="프로젝트의 핵심을 담은 제목을 작성해주세요."
                        onChange={handleProjectName}/>
                  <br/><br/>
                  <ProjectCategory onChange={handleProjectCategory}></ProjectCategory>
                  <ProjectType onChange={handleProjectType}></ProjectType>
                </div>

                {/* 프로젝트 본문 */}
                <div className="flex-shrink-0 flex flex-col gap-4 bg-white rounded-xl p-5 border border-gray-200">
                  <p>
                    프로젝트 소개&nbsp;
                    <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </p>
                  <textarea className="border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:border-purple-500"
                            name="content" id="" cols="30" rows="20" onChange={handleProjectContent}></textarea>
                </div>

                {/* 프로젝트 요구 기술 스택 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-4">
                  <p>
                    사용 기술 스택&nbsp;
                    <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </p>
                  <TechStackSelector
                      selectedTechs={selectedTechs}
                      onChange={setSelectedTechs}
                  />
                </div>

                {/* 프로젝트 진행 기간 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-wrap items-end gap-4">
                  {/*시작 예정일 그룹*/}
                  <div className="flex flex-col gap-1.5">
                    <p >
                      프로젝트 진행 기간&nbsp;
                      <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                    </p>
                    <span className="text-xs text-gray-600 font-medium">시작 예정일</span>
                    <div className="relative w-81">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://w3.org" fill="currentColor" viewBox="0 0 20 20">
                          <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                      </div>
                      <input type="date" onChange={handleProjectStartDate}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                  </div>

                  {/*연결선 (물결표) */}
                  <span className="text-gray-400 pb-3">~</span>

                  {/*종료 예정일 그룹 */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-gray-600 font-medium">종료 예정일</span>
                    <div className="relative w-81">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://w3.org" fill="currentColor" viewBox="0 0 20 20">
                          <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                      </div>
                      <input type="date" onChange={handleProjectEndDate}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                  </div>
                </div>

                {/* 모집 마감일 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <p >
                      모집 마감일&nbsp;
                      <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                    </p>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://w3.org" fill="currentColor" viewBox="0 0 20 20">
                          <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                      </div>
                      <input type="date" onChange={handleDeadLine}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                  </div>
                </div>

                {/* 모집 인원 input*/}
                <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-4">
                  <p>
                    모집 인원&nbsp;
                    <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </p>
                  <input type="text" name="projectname" id="projectname"
                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         placeholder="모집 인원을 입력해주세요."
                         onChange={handleRecruitcount}/>
                </div>

                {/* 공고 작성완료 버튼 */}
                <div className="flex justify-center mt-6">
                  <button className="bg-violet-300 rounded-xl w-md h-15 text-amber-50 hover:bg-violet-500 border-gray-200
                         active:translate-y-[5px]" onClick={handleProjectRegister}>

                    {/*버튼 글자 바로 왼쪽에 아이콘 붙이기*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    공고 작성완료
                  </button>
                </div>
              </div>


              {/* 오른쪽 사이드 내용 */}
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

export default ProjectCreatePage;