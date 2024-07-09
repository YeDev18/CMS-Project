import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  return (
    <div className="  flex gap-3 bg-bgColors w-full h-screen  px-3 text-textColor">
      <div className="w-[15vw] h-[100vh] fixed  bg-slate-800 ">
        <Sidebar />
      </div>

      <div className="w-[80vw] flex flex-col relative left-[15vw] le gap-4 h-[95vh] ">
        <NavBar />
        <div className=" w-[100%] hidden xl:flex h-[85vh]">
          <Outlet />
        </div>
        <div className="  w-[100%] flex xl:hidden h-[85vh]">
          <p>Affiche sur Ordinateur</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
