import { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';

import { Icon } from '@iconify/react';

const NavBar = () => {
  const auth = useAuth();
  const user = auth?.token;
  const [log, setLog] = useState<boolean>(false);
  console.log(user);
  const handleClick = () => {
    setLog(!log);
  };
  return (
    <div className="h-[5rem] bg-firstColors w-[full] py-3 px-5 flex justify-between items-center rounded-md shadow-sm shadow-shadowColors">
      <h1 className="text-xl xl:text-2xl font-semibold">
        Declaration des Navires
      </h1>
      <div className="flex gap-3 relative">
        <button className=" p-1 transition duration-100 ease rounded-full hover:rounded-full hover:bg-firstBlue  ">
          <Icon
            icon="mdi:user"
            width="2.3em"
            height="2.3em"
            className="transition duration-100 ease hover:text-firstColors s"
          />
        </button>

        <button
          className="  p-1 transition duration-100 ease rounded-full hover:rounded-full hover:bg-firstBlue "
          onClick={() => {
            handleClick();
          }}
        >
          <Icon
            icon="iconamoon:settings-thin"
            width="2.3em"
            height="2.3em"
            className="transition duration-100 ease hover:text-firstColors "
          />
        </button>

        {log ? (
          <div className=" absolute right-0 top-12 py-4 px-6 flex flex-col gap-4 rounded shadow-md bg-firstColors">
            <p></p>
            <button className="flex gap-2  text-gray-700">
              <Icon
                icon="mingcute:information-fill"
                width="1.5em"
                height="1.5em"
              />{' '}
              <p>Information</p>
            </button>
            <button
              className="flex gap-2 text-gray-700 "
              onClick={() => auth?.logout()}
            >
              <Icon icon="ic:outline-logout" width="1.5em" height="1.5em" />
              <p>Deconnexion</p>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default NavBar;
