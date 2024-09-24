import SidebarResponsive from '@/Components/Aside/sidebar-responsive';
import { useAuth } from '@/Context/AuthProvider';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Aside/Sidebar';
import NavBar from '../Components/NavBar';

const Home = () => {
  const overlay = useServer().overlay;
  const server = useServer();
  const me = useServer().user;
  const toogle = server.responsive;
  const auth = useAuth();
  return (
    <>
      <div
        className={`bg-bgColors text-textColor relative flex h-screen w-full items-center justify-between p-2 ${
          toogle ? 'overflow-hidden' : ''
        }`}
      >
        {overlay && (
          <div
            className="fixed z-30 size-full animate-fadIn-up bg-black/25"
            onClick={() => server?.showOverlay()}
          ></div>
        )}
        {toogle ? (
          <div className="absolute inset-0 h-screen w-full lg:hidden">
            {' '}
            <SidebarResponsive />
          </div>
        ) : (
          ''
        )}

        <div className="fixed hidden h-full w-[15vw] items-center pl-3  lg:flex ">
          <Sidebar />
        </div>

        <div className="relative flex h-[98vh] w-full flex-col gap-4 lg:left-[16vw] lg:w-[83vw]">
          <NavBar />
          <div className=" relative flex size-full">
            <Outlet />
            {server.setting && (
              <div className="fixed  bottom-10 left-[14vw] flex h-fit w-64 flex-col items-center justify-start gap-2 rounded bg-firstColors shadow">
                <div className="white-nowrap  w-full border-b px-3 py-2 text-left">
                  <h2 className="font-semibold">{me.name}</h2>
                  <p className="text-sm opacity-80">{me.role}</p>
                </div>
                <button
                  className="white-nowrap block w-full  border-b px-3 pb-3 pt-1 text-left align-middle font-medium"
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
