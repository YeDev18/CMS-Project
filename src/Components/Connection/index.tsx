import { Icon } from '@iconify/react';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import Header from '../Header';

const Connection = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useAuth();
  const error = useAuth()?.error;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      auth?.LoginAction(email, password);
    }
  };

  return (
    <div>
      <div className="w-[30rem] bg-bgColors py-6 px-10 rounded-md shadow-md">
        <Header />
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="max-w-lg mx-auto flex flex-col gap-3"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            <div className="flex flex-col gap-5 items-center relative z-0 w-full mb-5 pt-9 group ">
              <button className="text-xl text-firstColors rounded-md bg-firstBlue py-2 px-4 w-fit">
                {' '}
                Connection
              </button>
              <button type="submit">Mot de passe oublie</button>
            </div>
            {error ? (
              <div className="flex justify-center items-center gap-2 text-red-800">
                <Icon icon="icon-park-outline:attention" />
                <p className="font-medium ">Email et mot de passe incorrect</p>
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connection;
