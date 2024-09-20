// import logo from '@/src/assets/images/Logo-CMS-1.png';
import logo from '../../../assets/images/Logo-CMS-1.png';
import ItemsNav from './items.tsx';

// type Item = {
//   lib: string;
//   icon: string;
//   route: string;
//   items: string[];
// };
export const NavHeader = () => (
  <header>
    <div className="w-32 xl:w-40">
      <img className="w-full h-full flex" src={logo} alt="Logo" />
    </div>
  </header>
);

const Sidebar = () => {
  return (
    <aside className=" w-full h-screen  lg:h-[98vh] flex-col items-center py-5 gap-12 bg-firstColors rounded-md shadow-sm shadow-shadowColors flex static z-50">
      {/* <>
        <Icon icon="clarity:menu-line" />
      </> */}
      <NavHeader />
      <ItemsNav />
    </aside>
  );
};

export default Sidebar;
