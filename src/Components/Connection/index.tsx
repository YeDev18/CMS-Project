import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import Header from '../Header';

const Connection = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useAuth();
  const error = useAuth()?.error;
  const server = useServer();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      await auth?.LoginAction(email, password);
      server?.showUserInitialize();
    }
  };

  return (
    <div>
      <div className="w-[30rem] rounded-md px-10 py-6 shadow-md">
        <Header />
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="mx-auto flex max-w-lg flex-col gap-3"
          >
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="email"
                name="email"
                id="email"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="absolute top-3 -z-10  origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                Email
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="password"
                name="password"
                minLength={6}
                id="password"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="absolute top-3 -z-10  origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                Password
              </label>
            </div>
            <div className="group relative z-0 mb-5 flex w-full flex-col items-center gap-5 pt-9 ">
              <button className="w-fit rounded-md bg-firstBlue px-4 py-2 text-xl text-firstColors">
                {' '}
                Connection
              </button>
              <button type="submit">Mot de passe oublie</button>
            </div>
            {error ? (
              <div className="flex items-center justify-center gap-2 text-red-800">
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
