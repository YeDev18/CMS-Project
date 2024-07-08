import { useState } from 'react';
import { MenuItems } from '../Data';

const Sideba2 = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const handleClick = (key: number) => {
    setDropdown(!dropdown);
    console.log(key);
  };
  return (
    <aside className='" flex w-[30vh] h-fit  flex-col items-center py-5 gap-12'>
      <div>
        <ul>
          {MenuItems.map((item, index) => (
            <div key={index}>
              {!item.ite && (
                <li onClick={() => setDropdown(false)}>{item.lib}</li>
              )}
              {item.ite && (
                <li onClick={() => handleClick(index)}>
                  {item.lib}
                  {item.ite && (
                    <ul>
                      {dropdown &&
                        item.ite.map((good, index) => (
                          <li key={index}>{good.lib}</li>
                        ))}
                    </ul>
                  )}
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sideba2;
