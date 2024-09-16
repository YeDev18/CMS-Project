import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
type Props = {
  children: ReactNode;
};
const ProtectRoutes = () => {
  const user = useAuth();

  {
    return user?.token ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectRoutes;
