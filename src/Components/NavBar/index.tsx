import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
const NavBar = () => {
  const server = useServer();
  return (
    <div className="h-[4rem] bg-firstColors w-[full] py-3 px-3 flex justify-start gap-4 items-center rounded-sm shadow shadow-shadowColors">
      <button
        className="cursor-pointer"
        onClick={() => server.showResponsive()}
      >
        <Icon icon="clarity:menu-line" className="flex lg:hidden" />
      </button>

      <h1 className="text-lg xl:text-xl font-bold">CONTRÔLE VOYAGES</h1>
    </div>
  );
};

export default NavBar;
