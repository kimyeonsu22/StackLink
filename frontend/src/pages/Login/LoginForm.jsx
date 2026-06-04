// 로그인 폼

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import InputField from '../../components/common/InputField';
import SocialLoginButtons from '../../components/common/SocialLoginButtons';
import { login } from '../../api/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login(email, password);
            const { accessToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            const decoded = jwtDecode(accessToken);
            localStorage.setItem('userId', decoded.sub);
            localStorage.setItem('role', decoded.role);
            navigate('/');
        } catch (err) {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="w-80">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <InputField
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <Link to="/find-account" className="text-purple-600 hover:underline">
                        계정 찾기
                    </Link>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                    Login
                </button>
            </form>

            <p className="text-sm text-center mt-3">
                계정이 없으신가요?{' '}
                <Link to="/register" className="text-purple-600 hover:underline">
                    회원가입
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

export default LoginForm;