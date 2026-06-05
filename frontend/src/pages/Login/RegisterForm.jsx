// 회원가입 입력 폼

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import SocialLoginButtons from '../../components/common/SocialLoginButtons';
import Accordion from '../../components/common/Accordion';
import TechStackSelector from '../../components/common/TechStackSelector';
import { signup, checkEmail, checkNickname } from '../../api/auth';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        username: '',
        phoneNumber: '',
    });

    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedTechs, setSelectedTechs] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            await signup({
                email: form.email,
                password: form.password,
                nickname: form.nickname,
                username: form.username,
                phoneNumber: form.phoneNumber,
                role: 'APPLICANT',
                position: selectedPosition,
                techStack: selectedTechs,
            });
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.message || '';
            if (msg.includes('password') && msg.includes('8')) {
                setError('비밀번호는 8자 이상 입력해주세요.');
            } else {
                setError(msg || '회원가입에 실패했습니다.');
            }
        }
    };

    const handleEmailCheck = async () => {
        if (!form.email) return;
        const res = await checkEmail(form.email);
        alert(res.data ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
    };

    const handleNicknameCheck = async () => {
        if (!form.nickname) return;
        const res = await checkNickname(form.nickname);
        alert(res.data ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
    };




    return (
        <div className="w-80">
            <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* 이메일 + 중복 확인 */}
                <InputField
                    label="이메일"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    rightButton={
                        <button
                            type="button"
                            onClick={handleEmailCheck}
                            className="bg-purple-600 text-white text-xs px-3 rounded hover:bg-purple-700 transition"
                        >
                            중복 확인
                        </button>
                    }
                />

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
                <InputField
                    label="닉네임"
                    type="text"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
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
                    <Accordion title={selectedPosition || '포지션 선택'}>
                        <div className="flex flex-col gap-2">
                            {['백엔드', '프론트엔드', 'PM', 'DB', '디자인'].map((position) => (
                                <label key={position} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="position"
                                        value={position}
                                        checked={selectedPosition === position}
                                        onChange={() => setSelectedPosition(position)}
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
                        <TechStackSelector
                            selectedTechs={selectedTechs}
                            onChange={setSelectedTechs}
                        />
                    </Accordion>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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