import logo from '../../../assets/images/Logo-CMS-1.png';
import ItemsNav from './items.tsx';
export const NavHeader = () => (
  <header>
    <div className="w-32 xl:w-40">
      <img className="flex size-full" src={logo} alt="Logo" />
    </div>
  </header>
);

const Sidebar = () => {
  return (
    <aside className=" static z-50  flex h-screen w-full flex-col items-center gap-12 rounded-md bg-firstColors py-5 shadow-sm shadow-shadowColors lg:h-[98vh]">
      <NavHeader />
      <ItemsNav />
    </aside>
  );
};

export default Sidebar;
