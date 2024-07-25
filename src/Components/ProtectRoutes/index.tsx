import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
const ProtectRoutes = () => {
  const user = useAuth();
  if (!user?.token) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectRoutes;
