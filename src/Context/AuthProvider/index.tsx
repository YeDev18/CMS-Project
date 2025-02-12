import url from '@/api';
import { jwtDecode } from 'jwt-decode';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServer } from '../ServerProvider';

type Context = {
  token: string | null;
  name: string;
  email: string;
  role: string;
  user: string;
  success: boolean;
  error: boolean;
  RegisterAction: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  LoginAction: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<Context | null>(null);

export const Viva = () => {
  const server = useServer();
  console.log(server);
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState('');
  const server = useServer();
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();
  function getCookie(name: string) {
    let cookieValue = null;
    password;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrfToken = getCookie('csrftoken');

  const RegisterAction = async (
    name: string,
    email: string,
    password: string,
    role: string
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
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const LoginAction = async (email: string, password: string) => {
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
            'X-CSRFToken': csrfToken,
          },
        }
      );

      setToken(response.data.jwt);

      localStorage.setItem('site', response.data.jwt);
      setSuccess(true);
      server?.showUserInitialize();

      navigate('/accueil');
      const decode: { id: string } = jwtDecode(response.data.jwt);
      setUser(decode.id);
    } catch (error: unknown) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setTimeout(() => {
        localStorage.removeItem('site');
      }, 36000);
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await url.post(
        '/api/logout',
        {},

        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      navigate('/');
      localStorage.removeItem('site');
      server?.showUserInitialize();
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
        error,
        success,
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

export const useUser = () => {
  const { user } = useServer() ?? {
    user: { role: '' },
  };
  if (!user) {
    throw new Error('useServer must be used within a Provider');
  }
  return { user };
};
