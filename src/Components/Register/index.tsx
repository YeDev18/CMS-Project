//
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Header from '../Header';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();
  const auth = useAuth();
  const [succes, setSucces] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name !== '' && password !== '' && email !== '') {
      console.log('tout est Bon');
      console.log(name, email, password);
      auth?.RegisterAction(name, email, password, role);
    } else {
      console.log('Rentrez vos id');
    }
  };

  return (
    <div className="flex gap-8">
      <div className="w-[30rem] bg-bgColors py-6 px-10 rounded-md shadow-md">
        <Header />
        <div>
          <form
            className="max-w-lg mx-auto flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setName(e.target.value);
                }}
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nom & Prenom
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                placeholder=""
                required
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                value={role}
                name="role"
                id="role"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setRole(e.target.value);
                }}
                required
              >
                <option value="analyst">Analyst</option>
                <option value="manager">Manager</option>
                <option value="dev">Dev</option>
              </select>
              <label className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                role
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                value={password}
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-[0.8px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-firstBlue peer"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                placeholder=""
                required
              />
              <label className="peer-focus:font-medium absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-firstBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>

            <div className="flex justify-center relative z-0 w-full mb-5 pt-9 group">
              <button
                type="submit"
                className="text-xl text-firstColors rounded-md bg-firstBlue py-2 px-4"
              >
                Inscrivez Vous
              </button>
            </div>
          </form>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default Register;
