import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import { MenuItems } from '../Data';

const Sideba2 = () => {
  const active = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const auth = useAuth();
  const me = useServer().user;
  console.log(useServer());
  const { pathname } = useServer();
  console.log(pathname);
  const server = useServer();

  const handleConsole = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? prevIndex : index));
    console.log(activeIndex);
  };
  return (
    <div className="h-full w-full flex flex-col p-3">
      <div className="w-full flex flex-col  gap-4  whitespace-nowrap  h-full ">
        {MenuItems.map((item, index) => (
          <div key={index} className="w">
            {!item.ite && (
              <button
                ref={active}
                onClick={() => {
                  return handleConsole(index);
                }}
                className={`flex justify-center xl:justify-start gap-2 items-center h-12 w-full border transition-all ease delay-50  hover:bg-firstBlue hover:text-firstColors rounded-lg px-3 ${
                  pathname === item.route ? 'bg-firstBlue text-firstColors' : ''
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
                  onClick={() => handleConsole(index)}
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
                    {activeIndex === index &&
                      item.ite.map((good, index) => (
                        <button
                          key={index}
                          className={`dropdown flex justify-start gap-2 border items-center h-12 w-full transition-all ease delay-150 hover:bg-firstBlue hover:text-firstColors rounded-md px-3 ${
                            pathname === good.route
                              ? 'bg-firstBlue text-firstColors'
                              : ''
                          }`}
                        >
                          <Icon icon={good.icon} />
                          <Link
                            to={good.route}
                            className="hidden w-full xl:flex"
                          >
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
      <div className="flex justify-end">
        <button
          className="text-grayBlack"
          onClick={() => (server.showSetting(), server?.showUserInitialize())}
        >
          <Icon
            icon="fluent:more-vertical-16-filled"
            width="1.5em"
            height="1.5em"
          />
        </button>
      </div>
    </div>
  );
};

export default Sideba2;
