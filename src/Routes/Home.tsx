import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  const overlay = useServer().overlay;
  const server = useServer();
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
        <div className=" w-[100%] hidden md:flex h-full">
          <Outlet />
        </div>
        <div className="  w-[100%] flex justify-center items-center md:hidden h-[85vh]">
          <Icon
            icon="tabler:device-mobile-off"
            width="30em"
            height="30em"
            className="text-slate-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
