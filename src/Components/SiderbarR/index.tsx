import { useServer } from '@/Context/ServerProvider';
import Sidebar from '../Sidebar';

const SidebarR = () => {
  const server = useServer();
  return (
    <div className="relative">
      <div
        className="overlay absolute inset-0 w-full h-[100vh] bg-black/50 z-20 "
        onClick={() => server.showResponsive()}
      ></div>
      <div className="absolute inset-0 size-fit z-40 bg-white h-[100vh] w-72">
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarR;
