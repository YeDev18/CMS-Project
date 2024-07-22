import axios from 'axios';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Context = {
  token: string;
  name: string;
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
  name: string;
  token: string;
}
const AuthContext = createContext<Context | null>(null);
const AuthProvider: FC<Props> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');

  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();
  console.log(password);

  const RegisterAction = async (
    name: Register,
    email: Register,
    password: Register
  ) => {
    try {
      const response = await axios.post(
        'https://dj-declaration.onrender.com/api/register',
        {
          name,
          email,
          password,
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
      setToken(response.data.token);
      setSucces(`register successful: ${response.data.token}`);
      localStorage.setItem('site', response.data.token);
      console.log(response.data);
      console.log(name, password, email);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      console.log(error);
      setSucces('');
    }
  };

  const LoginAction = async (email: Register, password: Register) => {
    try {
      const response = await axios.post(
        'https://dj-declaration.onrender.com/api/login',
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

      // setName(response.data.nme);
      setToken(response.data);
      localStorage.setItem('site', response.data);
      navigate('/accueil');
      console.log(token);
    } catch (err: any) {
      console.log(err);
      console.log(password, succes);
    }
  };

  const logout = () => {
    setName('');
    setToken('');
    localStorage.removeItem('site');
    navigate('/');
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        name,
        email,
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
