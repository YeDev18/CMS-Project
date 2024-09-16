import SidebarR from '@/Components/SiderbarR';
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
  const toogle = server.responsive;
  const auth = useAuth();
  return (
    <>
      <div
        className={`flex relative p-2 items-center justify-between bg-bgColors w-full h-screen text-textColor ${
          toogle ? 'overflow-hidden' : ''
        }`}
      >
        {overlay && (
          <div
            className="w-full h-full bg-black/25 fixed z-30 animate-fadIn-up"
            onClick={() => server?.showOverlay()}
          ></div>
        )}
        {toogle ? (
          <div className="absolute inset-0 h-[100vh] w-[100%] lg:hidden">
            {' '}
            <SidebarR />
          </div>
        ) : (
          ''
        )}

        <div className="w-[15vw] hidden h-full lg:flex fixed pl-3  items-center ">
          <Sidebar />
        </div>

        <div className="w-full lg:w-[83vw] flex flex-col relative lg:left-[16vw] gap-4 h-[98vh]">
          <NavBar />
          <div className=" w-[100%] flex h-full relative">
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
        </div>
      </div>
    </>
  );
};

export default Home;
