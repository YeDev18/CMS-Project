import { Icon } from '@iconify/react';
import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';

type Compo1 = {
  icon1: string;
  icon2: string;
  name: string;
  number: number;
  index: number;
  route: string;
};

export const Component1: FC<Compo1> = ({
  icon1,
  icon2,
  name,
  number,
  index,
  route,
}) => {
  return (
    <div
      key={index}
      className="flex h-48  w-full flex-col justify-between rounded-md bg-firstColors p-4 shadow-sm shadow-shadowColors"
    >
      <div className=" w-fit rounded-md bg-firstBlue p-2">
        <Icon
          icon={icon1}
          width="2rem"
          height="2rem"
          style={{ color: '#EEEEEC' }}
        />
      </div>
      <p className="text-2xl font-medium lg:text-xl xl:text-2xl ">{name}</p>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-medium">{number}</p>
        <Link
          to={route}
          className=" w-fit  cursor-pointer rounded-md bg-firstBlue p-1 text-2xl"
        >
          <Icon
            icon={icon2}
            width="1.2rem"
            height="1.2rem"
            style={{ color: '#EEEEEC' }}
            className="rotate-45"
          />
        </Link>
      </div>
    </div>
  );
};

type Compo2 = {
  lib: string;
  file?: string;
};

export const Component2: FC<Compo2> = ({ lib }) => {
  const laRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const nom = laRef.current;
    console.log(nom);
  };

  return (
    <div className="mt-2 flex h-40 w-48 flex-col items-center justify-around gap-2 rounded-md border-2 border-dashed border-firstBlue p-2">
      <label
        htmlFor="fileId"
        className="flex cursor-pointer flex-col items-center justify-between gap-2"
      >
        <h2 className="text-[1.2rem] font-medium text-grayBlack" ref={laRef}>
          File {lib}
        </h2>
        <div className="block rounded-full bg-firstBlue p-2 ">
          <Icon
            icon="mdi:cloud-upload-outline"
            width="2rem"
            height="2rem"
            color="#EEEEEC"
          />
        </div>

        <p className="text-testColors1 text-center text-[0.6rem]">
          <br />
          Import file from your computer(*.xls)
        </p>
      </label>
      <input
        onChange={handleClick}
        className="hidden"
        accept=".xlsx, .xls"
        type="file"
        id="fileId"
      />
    </div>
  );
};
