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
  const { pathname } = useServer();
  const server = useServer();

  // const cookie = document.cookie.split(' ');
  // console.log(cookie);
  // const cookiesMap = {};
  // let nameCookie = '';
  // let valueCookie = '';
  // cookie.forEach(cookie => {
  //   const [name, value] = cookie.split('=');
  //   nameCookie = name;
  //   valueCookie = value;
  // });
  // console.log(nameCookie, valueCookie);

  const handleConsole = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? prevIndex : index));
  };
  return (
    <div className="h-full w-full flex flex-col p-2">
      <div className="w-full flex flex-col  gap-4  whitespace-nowrap  h-full ">
        {MenuItems.map((item, index) => (
          <div key={index} className="">
            {!item.ite && (
              <button
                ref={active}
                onClick={() => {
                  return handleConsole(index);
                }}
                className={`flex justify-start gap-2 items-center h-10 w-full border border-[#000]/5 transition-all ease delay-50  hover:bg-firstBlue hover:text-firstColors rounded-md ${
                  pathname === item.route ? 'bg-firstBlue text-firstColors' : ''
                }`}
              >
                <Link
                  to={item.route}
                  className="p-2 w-full text-start flex items-center gap-2 text-sm xl:text-base"
                  onClick={() => server.showResponsive()}
                >
                  <Icon icon={item.icon} className="w-6 h-6" />

                  <span>{item.lib}</span>
                </Link>
              </button>
            )}
            {item.ite && (
              <>
                <button
                  onClick={() => handleConsole(index)}
                  className={`flex justify-between xl:justify-between gap-2 items-center h-12 w-full border transition-all ease delay-150  hover:bg-firstBlue hover:text-firstColors rounded-lg px-3 ${
                    activeIndex === index ? 'bg-firstBlue text-firstColors' : ''
                  }`}
                >
                  <div className=" gap-3  ">
                    <button className=" flex gap-2 text-start  items-center justify-center text-sm xl:text-base w-full">
                      <Icon icon={item.icon} className="w-6 h-6" />
                      <span>{item.lib}</span>
                    </button>
                  </div>
                  <Icon icon="gridicons:dropdown" className="w-6 h-6" />
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
                          <Link
                            to={good.route}
                            className="w-full text-start flex gap-2 items-center text-sm xl:text-base"
                            onClick={() => server.showResponsive()}
                          >
                            <Icon icon={good.icon} className="w-4 h-4" />
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
