import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  return (
    <div className=" relative flex gap-6 bg-bgColors w-full h-screen py-9  px-9 text-textColor">
      <Sidebar />
      <div className="w-full  flex flex-col gap-4 h-[95vh]">
        <NavBar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
