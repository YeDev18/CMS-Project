import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../../Data';

const ItemsNav = () => {
  const active = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const { pathname } = useServer();
  const server = useServer();

  const handleConsole = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? prevIndex : index));
  };
  return (
    <div className="flex size-full flex-col p-2">
      <div className="flex size-full flex-col  gap-4  whitespace-nowrap ">
        {MenuItems.map((item, index) => (
          <div key={index} className="">
            {!item.ite && (
              <button
                ref={active}
                onClick={() => {
                  return handleConsole(index);
                }}
                className={`ease flex h-10 w-full items-center justify-start gap-2 rounded-md border border-[#000]/5 transition-all  delay-75 hover:bg-firstBlue hover:text-firstColors ${
                  pathname === item.route ? 'bg-firstBlue text-firstColors' : ''
                }`}
              >
                <Link
                  to={item.route}
                  className="flex w-full items-center gap-2 p-2 text-start text-sm xl:text-base"
                  onClick={() => server.showResponsive()}
                >
                  <Icon icon={item.icon} className="size-6" />

                  <span>{item.lib}</span>
                </Link>
              </button>
            )}
            {item.ite && (
              <>
                <button
                  onClick={() => handleConsole(index)}
                  className={`ease flex h-12 w-full items-center justify-between gap-2 rounded-lg border px-3 transition-all  delay-150 hover:bg-firstBlue hover:text-firstColors xl:justify-between ${
                    activeIndex === index ? 'bg-firstBlue text-firstColors' : ''
                  }`}
                >
                  <div className=" gap-3  ">
                    <button className=" flex w-full items-center  justify-center gap-2 text-start text-sm xl:text-base">
                      <Icon icon={item.icon} className="size-6" />
                      <span>{item.lib}</span>
                    </button>
                  </div>
                  <Icon icon="gridicons:dropdown" className="size-6" />
                </button>
                {item.ite && (
                  <ul className="flex flex-col gap-2 pl-2 ">
                    {activeIndex === index &&
                      item.ite.map((good, index) => (
                        <button
                          key={index}
                          className={`dropdown ease flex h-12 w-full items-center justify-start gap-2 rounded-md border px-3 transition-all delay-150 hover:bg-firstBlue hover:text-firstColors ${
                            pathname === good.route
                              ? 'bg-firstBlue text-firstColors'
                              : ''
                          }`}
                        >
                          <Link
                            to={good.route}
                            className="flex w-full items-center gap-2 text-start text-sm xl:text-base"
                            onClick={() => server.showResponsive()}
                          >
                            <Icon icon={good.icon} className="size-4" />
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

export default ItemsNav;
