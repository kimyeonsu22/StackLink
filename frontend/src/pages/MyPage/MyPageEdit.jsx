// 마이페이지 수정

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Accordion from '../../components/common/Accordion';
import TechStackSelector from '../../components/common/TechStackSelector';
import InputField from '../../components/common/InputField';
// TODO: 백엔드 API 연동 후 실제 유저 데이터로 교체
import { currentUser } from '../../data/dummy';

const POSITION_LIST = ['백엔드', '프론트엔드', 'PM', 'DB', '디자인'];

const MyPageEdit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser.username);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [position, setPosition] = useState(currentUser.position);
  const [selectedTechs, setSelectedTechs] = useState(currentUser.techStack);

  const handleNicknameCheck = () => {
    // TODO: 백엔드 닉네임 중복 확인 API 필요
  };

  const handlePhoneCheck = () => {
    // TODO: 백엔드 전화번호 중복 확인 API 필요
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: 백엔드 회원정보 수정 API 연동 필요
    console.log({ username, nickname, phoneNumber, password, position, selectedTechs });
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

                  {/* 이름 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">이름</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* 닉네임 */}
                  <InputField
                      label="닉네임"
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      rightButton={
                          <button
                              type="button"
                              onClick={handleNicknameCheck}
                              className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition"
                          >
                              중복 확인
                          </button>
                      }
                  />

                  {/* 전화번호 */}
                  <InputField
                      label="전화번호"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="010-1234-5678"
                      rightButton={
                          <button
                              type="button"
                              onClick={handlePhoneCheck}
                              className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition"
                          >
                              중복 확인
                          </button>
                      }
                  />

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
                      <TechStackSelector
                          selectedTechs={selectedTechs}
                          onChange={setSelectedTechs}
                      />
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