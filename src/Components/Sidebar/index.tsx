import logo from '../../assets/images/logo.png';
import Sideba2 from '../Sideba2.tsx';

// type Item = {
//   lib: string;
//   icon: string;
//   route: string;
//   items: string[];
// };
const NavHeader = () => (
  <header>
    <div className="lg:w-24 xl:w-48">
      <img className="w-full h-full flex" src={logo} alt="Logo" />
    </div>
  </header>
);

const Sidebar = () => {
  return (
    <aside className=" w-full h-[98vh] flex-col items-center py-5 gap-12 bg-firstColors rounded-md shadow-sm shadow-shadowColors flex">
      <NavHeader />
      <Sideba2 />
    </aside>
  );
};

export default Sidebar;
