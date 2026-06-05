// 마이페이지 수정

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Accordion from '../../components/common/Accordion';
import TechStackSelector from '../../components/common/TechStackSelector';
import InputField from '../../components/common/InputField';
import { getMyProfile, updateMyProfile, checkNickname, checkPhone } from '../../api/user';

const POSITION_LIST = ['백엔드', '프론트엔드', 'PM', 'DB', '디자인'];

const MyPageEdit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [position, setPosition] = useState('');
  const [selectedTechs, setSelectedTechs] = useState({});
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [phoneMsg, setPhoneMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMyProfile();
        const user = res.data;
        setUsername(user.username);
        setNickname(user.nickname);
        setPhoneNumber(user.phoneNumber ?? '');
        setPosition(user.position ?? '');
        setSelectedTechs(user.techStack ?? {});
      } catch (err) {
        console.error('유저 정보 조회 실패', err);
      }
    };
    fetchUser();
  }, []);

  const handleNicknameCheck = async () => {
    try {
      const res = await checkNickname(nickname);
      setNicknameMsg(res.data.available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
    } catch {
      setNicknameMsg('확인 중 오류가 발생했습니다.');
    }
  };

  const handlePhoneCheck = async () => {
    try {
      const res = await checkPhone(phoneNumber);
      setPhoneMsg(res.data.available ? '사용 가능한 전화번호입니다.' : '이미 사용 중인 전화번호입니다.');
    } catch {
      setPhoneMsg('확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await updateMyProfile({
        username,
        nickname,
        phoneNumber,
        password: password || null,
        position,
        techStack: selectedTechs,
      });
      localStorage.setItem('nickname', nickname);
      alert('정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (err) {
      alert('정보 수정에 실패했습니다.');
      console.error(err);
    }
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
                  <div className="flex flex-col gap-1">
                    <InputField
                        label="닉네임"
                        type="text"
                        value={nickname}
                        onChange={(e) => { setNickname(e.target.value); setNicknameMsg(''); }}
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
                    {nicknameMsg && (
                        <p className={`text-xs ${nicknameMsg.includes('가능') ? 'text-green-500' : 'text-red-500'}`}>
                          {nicknameMsg}
                        </p>
                    )}
                  </div>

                  {/* 전화번호 */}
                  <div className="flex flex-col gap-1">
                    <InputField
                        label="전화번호"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value); setPhoneMsg(''); }}
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
                    {phoneMsg && (
                        <p className={`text-xs ${phoneMsg.includes('가능') ? 'text-green-500' : 'text-red-500'}`}>
                          {phoneMsg}
                        </p>
                    )}
                  </div>

                  {/* 비밀번호 */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">새 비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="변경할 비밀번호 입력 (변경 안 할 경우 공란)"
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
