import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
const NavBar = () => {
  const server = useServer();
  return (
    <div className="flex h-16 w-[full] items-center justify-start gap-4 rounded-sm bg-firstColors p-3 shadow shadow-shadowColors">
      <button
        className="cursor-pointer"
        onClick={() => server.showResponsive()}
      >
        <Icon icon="clarity:menu-line" className="flex lg:hidden" />
      </button>

      <h1 className="text-lg font-bold xl:text-xl">CONTRÔLE VOYAGES</h1>
    </div>
  );
};

export default NavBar;
