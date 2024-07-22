import axios from 'axios';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Context = {
  token: string;
  userName: string;
  email: string;
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
}
const AuthContext = createContext<Context | null>(null);
const AuthProvider: FC<Props> = ({ children }) => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');

  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();
  console.log(password);

  const RegisterAction = async (email: Register, password: Register) => {
    try {
      const response = await axios.post(
        'https://reqres.in/api/register',
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
      setUserName(response.data.userName);
      setPassword(response.data.password);
      setEmail(response.data.email);
      setToken(response.data.token);
      setSucces(`register successful: ${response.data.token}`);
      localStorage.setItem('site', response.data.token);
      console.log(userName, password, email);
      navigate('/accueil');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.log(error);
      setSucces('');
    }
  };

  const LoginAction = async (email: Register, password: Register) => {
    try {
      const response = await axios.post(
        'https://reqres.in/api/login',
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
      navigate('/accueil');
      setUserName(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('site', response.data.token);
    } catch (err: any) {
      console.log(err);
      console.log(password, succes);
    }
  };

  const logout = () => {
    setUserName('');
    setToken('');
    localStorage.removeItem('site');
    navigate('/');
  };
  return (
    <AuthContext.Provider
      value={{ token, userName, email, RegisterAction, LoginAction, logout }}
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
