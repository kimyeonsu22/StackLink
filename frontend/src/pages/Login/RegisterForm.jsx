// 회원가입 입력 폼

import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import SocialLoginButtons from '../../components/common/SocialLoginButtons';
import Accordion from '../../components/common/Accordion';

const RegisterForm = () => {

    // 테스트 파일에 있는 경력, 기술 스택 리스트 토대로 하드코딩 해둠
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

    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        username: '',
        phoneNumber: '',
    });

    // 선택한 포지션
    const [selectedPositions, setSelectedPositions] = useState([]);

    // 선택된 기술 스택
    const [selectedTechs, setSelectedTechs] = useState({});


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        // TODO: 백엔드 /api/auth/signup 연동
        // role은 APPLICANT로 고정
        const requestBody = {
            email: form.email,
            password: form.password,
            nickname: form.nickname,
            username: form.username,
            phoneNumber: form.phoneNumber,
            role: 'APPLICANT',
            position: selectedPositions,
            techStack: selectedTechs,
        };
        console.log(requestBody);
    };

    const handleEmailCheck = () => {
        // TODO: 백엔드 이메일 중복 확인 API 필요
    };

    const handleNicknameCheck = () => {
        // TODO: 백엔드 닉네임 중복 확인 API 필요
    };

    // 포지션
    const handlePositionChange = (position) => {
        setSelectedPositions((prev) =>
            prev.includes(position)
                ? prev.filter((p) => p !== position)
                : [...prev, position]
        );
    };

    // 기술스택핸들러
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

    // 경력선택
    const handleCareerSelect = (tech, career) => {
        setSelectedTechs((prev) => ({ ...prev, [tech]: career }));
    };


    return (
        <div className="w-80">
            <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* 이메일 + 중복 확인 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm">이메일</label>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                        />
                        <button
                            type="button"
                            onClick={handleEmailCheck}
                            className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition"
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 비밀번호 */}
                <InputField
                    label="비밀번호"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                {/* 비밀번호 확인 */}
                <InputField
                    label="비밀번호 확인"
                    type="password"
                    value={form.passwordConfirm}
                    onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
                />

                {/* 닉네임 + 중복 확인 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm">닉네임</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                        />
                        <button
                            type="button"
                            onClick={handleNicknameCheck}
                            className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition"
                        >
                            중복 확인
                        </button>
                    </div>
                </div>

                {/* 이름 */}
                <InputField
                    label="이름"
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                {/* 전화번호 */}
                <InputField
                    label="전화번호"
                    type="tel"
                    value={form.phoneNumber}
                    placeholder="010-1234-5678"
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />

                {/* 개발직군 아코디언 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm">포지션</label>
                    <Accordion title="포지션 선택">
                        <div className="flex flex-col gap-2">
                            {['백엔드', '프론트엔드', 'PM', 'DB', '디자인'].map((position) => (
                                <label key={position} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={position}
                                        checked={selectedPositions.includes(position)}
                                        onChange={() => handlePositionChange(position)}
                                    />
                                    <span>{position}</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                </div>

                {/* 기술스택 아코디언 */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm">기술스택</label>
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
                                        <span>{tech}</span>
                                    </label>
                                    {/* 체크하면 경력 드롭다운 표시 */}
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

                {/* 가입 버튼 */}
                <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                    Create Account
                </button>
            </form>

            <p className="text-sm text-center mt-3">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="text-purple-600 hover:underline">
                    로그인
                </Link>
            </p>

            <div className="flex items-center gap-2 my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="text-sm text-gray-400">OR</span>
                <hr className="flex-1 border-gray-300" />
            </div>

            <SocialLoginButtons />
        </div>
    );
};

export default RegisterForm;