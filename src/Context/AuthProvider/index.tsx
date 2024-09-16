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
  user: number;
  success: boolean;
  error: boolean;
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
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const server = useServer();
  const cfr = server?.getCrsf;
  console.log(cfr);

  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();
  console.log(server?.getCsrf);

  // const getCookies = (name: string) => {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== '') {
  //     console.log(document.cookie);
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       // Vérifie si ce cookie commence par le nom recherché
  //       if (cookie.substring(0, name.length + 1) === name + '=') {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // };

  // console.log(document.cookie);

  // const csrftoken = getCookies('csrftoken');
  // console.log(csrftoken);

  const cookie = document.cookie.split(' ');
  console.log(cookie);
  const cookiesMap = {};
  let nameCookie = '';
  let valueCookie = '';
  cookie.forEach(cookie => {
    const [name, value] = cookie.split('=');
    // console.log(name, value);
    nameCookie = name;
    valueCookie = value;
    // cookiesMap[name] = value;

    // cookiesMap[name] = value;
  });
  console.log(nameCookie, valueCookie);

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
      // setSucces(`register successful:`);
      setToken(response.data.token);
      navigate('/');
    } catch (err: any) {
      console.log(error);
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
      // localStorage.setItem('site', 'Tom');
      localStorage.setItem('site', response.data.jwt);
      setSuccess(true);
      server?.showUserInitialize();
      navigate('/accueil');
      const decode: any = jwtDecode(response.data.jwt);
      setUser(decode.id);
      // console.log(csrftoken);
    } catch (err: any) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setTimeout(() => {
        localStorage.removeItem('site');
      }, 36000);
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      const response = await url.post(
        '/api/logout',
        {},

        {
          headers: {
            'X-CSRFToken': server?.getCrsf.csrfToken, // Inclure le token CSRF
          }, // S'assure que les cookies sont inclus dans la requête
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
