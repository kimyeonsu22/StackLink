// 왼쪽 사이드바 (홈, 공고 모집, 공공 작성, 알림, 프리미엄)

import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiList, FiEdit, FiBell, FiStar } from 'react-icons/fi';

const menus = [
    { label: '홈', icon: <FiHome />, path: '/' },
    { label: '모집 공고', icon: <FiList />, path: '/projects' },
    { label: '공고 작성하기', icon: <FiEdit />, path: '/projects/create' },
    { label: '알림', icon: <FiBell />, path: '/notifications' },
    { label: '프리미엄', icon: <FiStar />, path: '/subscription' },
];

const Sidebar = ({ menus: customMenus }) => {
    const location = useLocation();
    const menuList = customMenus ?? menus;

    return (
        <aside className="w-48 min-h-screen bg-white border-r border-gray-200 py-6 flex flex-col gap-1">
            {menuList.map((menu) => (
                <Link
                    key={menu.label}
                    to={menu.path}
                    className={`flex items-center gap-3 px-5 py-3 text-sm hover:bg-purple-50 hover:text-purple-600 transition
            ${location.pathname === menu.path ? 'text-purple-600 bg-purple-50 font-semibold' : 'text-gray-600'}`}
                >
                    {menu.icon}
                    {menu.label}
                </Link>
            ))}
        </aside>
    );
};

export default Sidebar;