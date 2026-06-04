// 소셜 로그인 버튼 -> 로그인 화면, 회원가입 화면에서 사용

import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const SocialLoginButtons = () => {
    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="flex justify-center gap-4">
            <button
                onClick={() => handleSocialLogin('naver')}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:opacity-80 transition"
            >
                <SiNaver className="text-white text-lg" />
            </button>
            <button
                onClick={() => handleSocialLogin('kakao')}
                className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center hover:opacity-80 transition"
            >
                <RiKakaoTalkFill className="text-lg" />
            </button>
            <button
                onClick={() => handleSocialLogin('google')}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:opacity-80 transition"
            >
                <FcGoogle className="text-lg" />
            </button>
        </div>
    );
};

export default SocialLoginButtons;