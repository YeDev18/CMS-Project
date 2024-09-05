import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
type Props = {
  children: ReactNode;
};
const ProtectRoutes = () => {
  const user = useAuth();
  // : <Navigate to="/" />
  // user?.token ?
  {
    return <Outlet />;
  }
};

export default ProtectRoutes;
