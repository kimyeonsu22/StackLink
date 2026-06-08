// 상단바

import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import {useState} from "react";

const Header = ({ showSearch = true, profilePath = '/mypage' }) => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem('nickname');
    const [keyword, setKeyword] = useState('');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleSearch = () => {
        const trimmed = keyword.trim();

        if(!trimmed) {
            navigate('/');
            return;
        }

        navigate(`/projects?keyword=${encodeURIComponent(keyword)}`);
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSearch();
        }
    };

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
            {/* 로고 */}
            <Link to="/" className="text-purple-600 text-xl font-bold">
                StackLink
            </Link>

            {/* 검색바 */}
            {showSearch && (
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="프로젝트, 기술, 포지션, 키워드 검색으로 공고를 찾아보세요"
                    className="w-1/2 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
                />
            )}

            {/* 우측 프로필 */}
            <div className="flex items-center gap-3">
                {nickname ? (
                    <>
                        <span className="text-sm text-gray-600">안녕하세요 <span className="font-semibold text-purple-600">{nickname}</span>님</span>
                        <Link to={profilePath}>
                            <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center hover:opacity-80 transition">
                                <FiUser size={18} className="text-purple-600" />
                            </div>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-500 hover:text-red-500 transition"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        로그인
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
