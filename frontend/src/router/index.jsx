// 라우터
import { createBrowserRouter } from 'react-router-dom';

// 로그인, 회원가입
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Login/RegisterPage';

// 주요기능(메인)
import MainPage from '../pages/Main/MainPage';
import ProjectListPage from '../pages/Main/ProjectListPage';
import ProjectDetailPage from '../pages/Main/ProjectDetailPage';
import ProjectCreatePage from '../pages/Main/ProjectCreatePage';
import ProjectApplyPage from '../pages/Main/ProjectApplyPage';
import ProjectManagePage from '../pages/Main/ProjectManagePage';

// 마이페이지
import MyPage from '../pages/MyPage/MyPage';
import MyPageEdit from '../pages/MyPage/MyPageEdit';

// 관리자 페이지
import AdminPage from '../pages/Admin/AdminPage';
import AdminRoute from './AdminRoute';

// 구독
import SubscriptionPage from '../pages/Subscription/SubscriptionPage';

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },

    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },

    { path: '/projects', element: <ProjectListPage /> },
    { path: '/projects/:id', element: <ProjectDetailPage /> },
    { path: '/projects/create', element: <ProjectCreatePage /> },
    { path: '/projects/:id/apply', element: <ProjectApplyPage /> },
    { path: '/projects/:id/applicants', element: <ProjectManagePage /> },

    {
        element: <AdminRoute />,
        children: [
            { path: '/admin', element: <AdminPage /> },
        ]
    },

    { path: '/mypage', element: <MyPage /> },
    { path: '/mypage/edit', element: <MyPageEdit /> },

    { path: '/subscription', element: <SubscriptionPage /> },

]);

export default router;
