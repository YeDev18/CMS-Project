import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';

const NavBar = () => {
  const auth = useAuth();
  const me = useServer().user;
  const [log, setLog] = useState<boolean>(false);
  const handleClick = () => {
    setLog(!log);
  };

  return (
    <div className="h-[5rem] bg-firstColors w-[full] py-3 px-5 flex justify-between items-center rounded-md shadow-sm shadow-shadowColors">
      <h1 className="text-xl xl:text-2xl font-semibold">
        Declaration des Voyages
      </h1>
      <div className="flex gap-3 relative">
        <div className=" flex p-1 gap-2 justify-center items-center  rounded-full   ">
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">{me.name}</p>
            <div className="flex justify-center items-center gap-1 text-xs">
              <Icon
                icon="ic:round-circle"
                width="0.5em"
                height="0.5em"
                style={{ color: '#4db051' }}
              />
              <p className="font-normal">En ligne</p>
            </div>
          </div>

          <Icon
            icon="mdi:user"
            width="2.3em"
            height="2.3em"
            className="transition duration-100 ease hover:text-firstColors s"
          />
        </div>

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
            {/* <button className="flex gap-2  text-gray-700">
              <Icon
                icon="mingcute:information-fill"
                width="1.5em"
                height="1.5em"
              />{' '}
              <p>Information</p>
            </button> */}
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
