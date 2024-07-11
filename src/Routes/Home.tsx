import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  return (
    <div className="  flex items-center gap-3 bg-bgColors w-full h-screen  px-3 text-textColor">
      <div className="w-[15vw] h-[100vh] fixed flex items-center ">
        <Sidebar />
      </div>

      <div className="w-[80vw] flex flex-col  relative left-[17vw] le gap-4 h-[98vh]">
        <NavBar />
        <div className=" w-[100%] hidden xl:flex h-[85vh]">
          <Outlet />
        </div>
        <div className="  w-[100%] flex justify-center items-center xl:hidden h-[85vh]">
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
