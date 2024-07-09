import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../Data';

const Sideba2 = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const handleClick = (key: number) => {
    setDropdown(!dropdown);
    console.log(key);
  };
  return (
    <div className="w-full flex flex-col gap-4 p-3 whitespace-nowrap ">
      {MenuItems.map((item, index) => (
        <div key={index} className="">
          {!item.ite && (
            <button
              onClick={() => setDropdown(false)}
              className="flex justify-start gap-2 items-center h-12 w-full border rounded-lg px-3 "
            >
              <Icon icon={item.icon} width="1.8em" height="1.8em" />
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
                onClick={() => handleClick(index)}
                className="flex justify-start gap-2 items-center h-12 w-full border rounded-md px-3 "
              >
                <Icon icon={item.icon} width="1.8em" height="1.8em" />
                <button className="hidden xl:flex">{item.lib}</button>
              </button>
              {item.ite && (
                <ul className="flex flex-col pl-2 gap-2 ">
                  {dropdown &&
                    item.ite.map((good, index) => (
                      <button
                        key={index}
                        onClick={() => setDropdown(true)}
                        className="dropdown flex justify-start gap-2 items-center h-12 w-full border  rounded-md px-3"
                      >
                        <Icon icon={good.icon} />
                        <Link to={good.route} className="hidden xl:flex">
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
