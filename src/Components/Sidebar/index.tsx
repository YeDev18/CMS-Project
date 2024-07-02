import { Icon } from '@iconify/react';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { MenuItems } from '../Data';

type Item = {
  lib: string;
  icon: string;
  route: string;
  items: string[];
};
const NavHeader = () => (
  <header>
    <div className="w-52">
      <img className="w-full h-full" src={logo} alt="Logo" />
    </div>
  </header>
);
type ButtonProps = {
  onClick: (item: string) => void;
  lib: string;
  icon?: string;
  isActive: boolean;
  hasSubNav?: boolean;
  index: number;
  route?: string;
};

const NavButton: FC<ButtonProps> = ({
  onClick,
  lib,
  icon,
  isActive,
  hasSubNav,
  index,
  route,
}) => {
  return (
    // <Link to="/accueil">
    <button
      key={index}
      type="button"
      onClick={() => onClick(lib)}
      className={` w-full relative flex justify-center gap-2 items-center  h-12 px-4  rounded-md ${
        isActive ? 'active buttonHeader' : 'buttonHeader'
      }`}
    >
      {icon && <Icon icon={icon} width="1.8em" height="1.8em" />}
      <Link
        to={route!}
        className=" text-center flex items-center text-md font-normal h-full w-full"
      >
        {lib}
      </Link>
      {hasSubNav && <Icon icon="zondicons:cheveron-down" />}
    </button>
    // </Link>
  );
};
type SubMenuProps = {
  item: Item;
  activeItem: string;
  handleClick: (args0: string) => void;
};

const SubMenu: FC<SubMenuProps> = ({ item, activeItem, handleClick }) => {
  const navRef = useRef<HTMLDivElement>(null);
  // console.log(navRef);
  const isSubNavOpen = (item: string, items: string[]) =>
    items.some(i => i === activeItem) || item === activeItem;

  return (
    <div
      className={`overflow-hidden transition-[0.5s] pl-4 ${
        isSubNavOpen(item.lib, item.items) ? 'open' : ' '
      }`}
      style={{
        height: !isSubNavOpen(item.lib, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className={`sub-nav-inner  py-3 gap-4 flex  flex-col`}>
        {item?.items.map((subItem, index) => (
          <NavButton
            index={index}
            onClick={handleClick}
            lib={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('');

  const handleClick = (item: string) => {
    console.log('activeItem', activeItem);
    setActiveItem(item !== activeItem ? item : '');
  };
  return (
    <aside className=" flex w-[30vh] h-[95vh]  flex-col items-center py-5 gap-12 bg-firstColors rounded-md shadow-sm shadow-shadowColors ">
      <NavHeader />
      <div className="p-4 w-full flex flex-col gap-4">
        {MenuItems.map((item, index) => (
          <div key={index}>
            {!item.items && (
              <NavButton
                index={index}
                onClick={handleClick}
                lib={item.lib}
                icon={item.icon}
                isActive={activeItem === item.lib}
                hasSubNav={!!item.items}
                route={item.route}
              />
            )}
            {item.items && (
              <>
                <NavButton
                  index={index}
                  onClick={handleClick}
                  lib={item.lib}
                  icon={item.icon}
                  isActive={activeItem === item.lib}
                  hasSubNav={!!item.items}
                />
                <SubMenu
                  activeItem={activeItem}
                  handleClick={handleClick}
                  item={item}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
