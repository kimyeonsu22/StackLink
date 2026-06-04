// 마이페이지 수정

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Accordion from '../../components/common/Accordion';

const TECH_LIST = [
  'JAVA', 'Spring Boot', 'Spring Security', 'JPA', 'QueryDSL',
  'SQL/RDBMS', 'NoSQL', 'C++', 'C#', 'Embedded',
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
  'React.js', 'Vue.js', 'Kotlin', 'Swift'
];

const CAREER_LIST = [
  '1년 미만', '1년 이상 ~ 3년 미만', '3년 이상 ~ 5년 미만',
  '5년 이상 ~ 7년 미만', '7년 이상 ~ 10년 미만', '10년 이상'
];

const POSITION_LIST = ['백엔드', '프론트엔드', 'PM', 'DB', '디자인'];

// TODO: 백엔드 API 연동 후 실제 유저 데이터로 교체
const dummyUser = {
  nickname: '닉네임',
  position: '프론트엔드',
  selectedTechs: { 'React.js': '1년 미만', 'TypeScript': '1년 미만' },
};

const MyPageEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(dummyUser.nickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [position, setPosition] = useState(dummyUser.position);
  const [selectedTechs, setSelectedTechs] = useState(dummyUser.selectedTechs);

  const handleTechCheck = (tech) => {
    setSelectedTechs((prev) => {
      if (prev[tech] !== undefined) {
        const updated = { ...prev };
        delete updated[tech];
        return updated;
      }
      return { ...prev, [tech]: '' };
    });
  };

  const handleCareerSelect = (tech, career) => {
    setSelectedTechs((prev) => ({ ...prev, [tech]: career }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: 백엔드 회원정보 수정 API 연동 필요
    console.log({ nickname, password, position, selectedTechs });
  };

  return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-6 flex justify-center">
            <div className="w-full max-w-lg">
              <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">
                <h2 className="text-xl font-bold text-gray-900">정보 변경</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* 닉네임 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">닉네임</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* 비밀번호 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">새 비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="변경할 비밀번호 입력"
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* 비밀번호 확인 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">새 비밀번호 확인</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="비밀번호 확인"
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* 희망 포지션 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">희망 포지션</label>
                    <Accordion title={position || '포지션 선택'}>
                      <div className="flex flex-col gap-2">
                        {POSITION_LIST.map((pos) => (
                            <label key={pos} className="flex items-center gap-2 cursor-pointer">
                              <input
                                  type="radio"
                                  name="position"
                                  value={pos}
                                  checked={position === pos}
                                  onChange={() => setPosition(pos)}
                              />
                              <span className="text-sm">{pos}</span>
                            </label>
                        ))}
                      </div>
                    </Accordion>
                  </div>

                  {/* 기술스택 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">기술스택</label>
                    <Accordion title="기술스택 선택">
                      <div className="flex flex-col gap-3">
                        {TECH_LIST.map((tech) => (
                            <div key={tech} className="flex flex-col gap-1">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedTechs[tech] !== undefined}
                                    onChange={() => handleTechCheck(tech)}
                                />
                                <span className="text-sm">{tech}</span>
                              </label>
                              {selectedTechs[tech] !== undefined && (
                                  <select
                                      value={selectedTechs[tech]}
                                      onChange={(e) => handleCareerSelect(tech, e.target.value)}
                                      className="ml-6 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500"
                                  >
                                    <option value="">경력 선택</option>
                                    {CAREER_LIST.map((career) => (
                                        <option key={career} value={career}>{career}</option>
                                    ))}
                                  </select>
                              )}
                            </div>
                        ))}
                      </div>
                    </Accordion>
                  </div>

                  {/* 버튼 */}
                  <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        onClick={() => navigate('/mypage')}
                        className="flex-1 border border-gray-300 text-gray-600 py-2 rounded hover:bg-gray-50 transition"
                    >
                      취소
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                    >
                      저장
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default MyPageEdit;