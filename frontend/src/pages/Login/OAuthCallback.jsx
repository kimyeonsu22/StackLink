import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        const role = params.get('role');
        const nickname = params.get('nickname');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            if (role) localStorage.setItem('role', role);
            if (nickname) localStorage.setItem('nickname', nickname);
            window.location.replace('/');
        } else {
            navigate('/login', { replace: true });
        }
    }, [params, navigate]);

    return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;