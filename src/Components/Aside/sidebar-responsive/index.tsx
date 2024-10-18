import { useServer } from '@/Context/ServerProvider';
import Sidebar from '../Sidebar';

const SidebarResponsive = () => {
  const server = useServer();
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-20 h-screen w-full bg-black/50 "
        onClick={() => (server?.showResponsive(), server?.showSettingFinish())}
      ></div>
      <div className="absolute inset-0 z-40 size-fit h-screen w-72 bg-white">
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarResponsive;
