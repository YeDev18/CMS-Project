import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

const ProtectRoutes = () => {
  const user = useAuth();

  {
    return user?.token ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectRoutes;
