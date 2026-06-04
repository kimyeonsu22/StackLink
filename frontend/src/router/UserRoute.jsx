import { Navigate, Outlet } from 'react-router-dom';

export default function UserRoute() {
  const role = localStorage.getItem('role');
  return role === 'ROLE_ADMIN' ? <Navigate to="/admin" replace /> : <Outlet />;
}
