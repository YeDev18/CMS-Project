import url from '@/api';
import { jwtDecode } from 'jwt-decode';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Context = {
  token: string;
  name: string;
  email: string;
  role: string;
  user: number;
  RegisterAction: Function;
  LoginAction: Function;
  logout: () => void;
};
type Props = {
  children: ReactNode;
};
interface Register {
  email: string;
  password: string;
  name: string;
  role: string;
  token: string;
}
const AuthContext = createContext<Context | null>(null);
const AuthProvider: FC<Props> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');
  const [user, setUser] = useState<any>();

  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();

  const RegisterAction = async (
    name: Register,
    email: Register,
    password: Register,
    role: Register
  ) => {
    try {
      const response = await url.post(
        '/api/register',
        {
          name,
          email,
          password,
          role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setName(response.data.name);
      setPassword(response.data.password);
      setEmail(response.data.email);
      setRole(response.data.role);
      setSucces(`register successful:`);
      localStorage.setItem('site', response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.log(error);
      setSucces('');
    }
  };

  const LoginAction = async (email: Register, password: Register) => {
    try {
      const response = await url.post(
        '/api/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setToken(response.data.jwt);
      localStorage.setItem('site', response.data.jwt);
      navigate('/accueil');
      const decode: any = jwtDecode(response.data.jwt);
      setUser(decode.id);
    } catch (err: any) {
      console.log(err);
      console.log(password, succes);
    }
  };
  const logout = async () => {
    try {
      const response = await url.post('/api/logout');
      navigate('/');
      localStorage.removeItem('site');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        name,
        email,
        role,
        user,
        RegisterAction,
        LoginAction,
        logout,
      }}
    >
      {' '}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
