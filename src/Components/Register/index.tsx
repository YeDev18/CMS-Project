//
import { FormEvent, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import Header from '../Header';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const auth = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name !== '' && password !== '' && email !== '') {
      auth?.RegisterAction(name, email, password, role);
    } else {
      console.log('Une Erreur du backend');
    }
  };

  return (
    <div className="flex gap-8">
      <div className="w-[30rem] rounded-md px-10 py-6 shadow-md">
        <Header />
        <div>
          <form
            className="mx-auto flex max-w-lg flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setName(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                Nom & Prenom
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder=""
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                Email
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <select
                value={role}
                name="role"
                id="role"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setRole(e.target.value);
                }}
                required
              >
                <option value="tous">Rôle</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Administrateur</option>
                <option value="dev">Dev</option>
              </select>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                role
              </label>
            </div>
            <div className="group relative z-0 mb-5 w-full">
              <input
                type="password"
                value={password}
                minLength={6}
                name="password"
                id="password"
                className="peer block w-full appearance-none border-0 border-b-[0.8px] border-gray-300 bg-transparent px-0 py-2.5 text-gray-900 focus:border-firstBlue focus:outline-none focus:ring-0"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                placeholder=""
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-firstBlue rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                Password
              </label>
            </div>

            <div className="group relative z-0 mb-5 flex w-full justify-center pt-9">
              <button
                type="submit"
                className="rounded-md bg-firstBlue px-4 py-2 text-xl text-firstColors"
              >
                Inscrivez Vous
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
