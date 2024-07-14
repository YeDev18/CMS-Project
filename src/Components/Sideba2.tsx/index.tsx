import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../Data';

const Sideba2 = () => {
  const [dropdown, setDropdown] = useState(false);
  const active = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const handleClick = () => {
    setDropdown(!dropdown);
  };
  const handleConsole = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? prevIndex : index));
    console.log(activeIndex, index);
    // console.log(index);
  };
  return (
    <div className="w-full flex flex-col gap-4 p-3 whitespace-nowrap ">
      {MenuItems.map((item, index) => (
        <div key={index} className="w">
          {!item.ite && (
            <button
              ref={active}
              onClick={() => {
                return setDropdown(false), handleConsole(index);
              }}
              className={`flex justify-center xl:justify-start gap-2 items-center h-12 w-full border transition-all ease delay-50  hover:bg-firstBlue hover:text-firstColors rounded-lg px-3 ${
                activeIndex === index ? 'bg-firstBlue text-firstColors' : ''
              }`}
            >
              <Icon
                icon={item.icon}
                width="1.8em"
                height="1.8em"
                className={``}
              />
              <Link
                to={item.route}
                className="p-2 w-full text-start hidden xl:flex"
              >
                {item.lib}
              </Link>
            </button>
          )}
          {item.ite && (
            <>
              <button
                onClick={() => (handleClick(), handleConsole(index))}
                className={`flex justify-center xl:justify-between gap-2 items-center h-12 w-full border transition-all ease delay-150  hover:bg-firstBlue hover:text-firstColors rounded-lg px-3 ${
                  activeIndex === index ? 'bg-firstBlue text-firstColors' : ''
                }`}
              >
                <div className="flex items-center justify-center gap-3  ">
                  <Icon icon={item.icon} width="1.8em" height="1.8em" />
                  <button className="hidden xl:flex">{item.lib}</button>
                </div>
                <Icon
                  icon="gridicons:dropdown"
                  width="1.3em"
                  height="1.3em"
                  className="hidden xl:flex"
                />
              </button>
              {item.ite && (
                <ul className="flex flex-col pl-2 gap-2 ">
                  {dropdown &&
                    item.ite.map((good, index) => (
                      <button
                        key={index}
                        onClick={() => setDropdown(true)}
                        className="dropdown flex justify-start gap-2 border items-center h-12 w-full hover:bg-firstBlue hover:text-firstColors rounded-md px-3"
                      >
                        <Icon
                          icon={good.icon}
                          // className={`${
                          //   activeIndex === index
                          //     ? 'bg-red-500'
                          //     : 'bg-slate-600'
                          // }`}
                        />
                        <Link to={good.route} className="hidden w-full xl:flex">
                          {good.lib}
                        </Link>
                      </button>
                    ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sideba2;
