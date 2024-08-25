import { useAuth } from '@/Context/AuthProvider';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  const overlay = useServer().overlay;
  const server = useServer();
  const me = useServer().user;
  const auth = useAuth();
  return (
    <div className="flex items-center justify-between bg-bgColors w-full h-screen text-textColor">
      {overlay && (
        <div
          className="w-full h-full bg-black/25 fixed z-30 animate-fadIn-up"
          onClick={() => server?.showOverlay()}
        ></div>
      )}

      <div className="w-[15vw] h-full fixed pl-3 flex items-center ">
        <Sidebar />
      </div>

      <div className="w-[83vw] flex flex-col relative left-[16vw] gap-4 h-[98vh]">
        <NavBar />
        <div className=" w-[100%] hidden md:flex h-full relative">
          <Outlet />
          {server.setting && (
            <div className="fixed  w-64 h-fit bottom-10 left-[14vw] rounded shadow bg-firstColors flex flex-col justify-start items-center gap-2">
              <div className="text-left  w-full white-nowrap border-b pb-2 pt-2 px-3">
                <h2 className="font-semibold">{me.name}</h2>
                <p className="text-sm opacity-80">{me.role}</p>
              </div>
              {/* <button className="block text-left align-middle w-full white-nowrap border-b pt-1 pb-3 px-3 font-medium">
                Information
              </button> */}
              <button
                className="block text-left align-middle  w-full white-nowrap border-b pt-1 pb-3 px-3 font-medium"
                onClick={() => (auth?.logout(), server.showSettingFinish())}
              >
                Deconnexion
              </button>
              <button
                className="absolute right-2 top-3"
                onClick={() => server.showSettingFinish()}
              >
                <Icon icon="mingcute:close-fill" className="opacity-80" />
              </button>
            </div>
          )}
        </div>
        <div className="  w-[100%] flex justify-center items-center md:hidden h-[85vh]">
          <Icon
            icon="tabler:device-mobile-off"
            width="30em"
            height="30em"
            className="text-slate-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
