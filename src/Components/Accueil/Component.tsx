import { Icon } from '@iconify/react';
import { FC, useRef } from 'react';

type Compo1 = {
  icon1: string;
  icon2: string;
  name: string;
  number: number;
  index: number;
};

export const Component1: FC<Compo1> = ({
  icon1,
  icon2,
  name,
  number,
  index,
}) => {
  return (
    <div
      key={index}
      className="h-40 w-56 flex flex-col justify-between bg-firstColors rounded-md shadow-sm shadow-shadowColors p-4"
    >
      <div className=" bg-firstBlue w-fit p-2 rounded-md">
        <Icon
          icon={icon1}
          width="2rem"
          height="2rem"
          style={{ color: '#EEEEEC' }}
        />
      </div>
      <p className="text-lg">{name}</p>
      <div className="flex justify-between items-center">
        <p className="text-3xl font-medium">{number}</p>
        <div className=" bg-firstBlue  w-fit p-1 rounded-md cursor-pointer">
          <Icon
            icon={icon2}
            width="1.2rem"
            height="1.2rem"
            style={{ color: '#EEEEEC' }}
            className="rotate-45"
          />
        </div>
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
    <div className="border-dashed w-48 h-40 mt-2 rounded-md border-2 p-2 border-firstBlue flex flex-col gap-2 justify-around items-center">
      <label
        htmlFor="fileId"
        className="flex flex-col gap-2 justify-between items-center cursor-pointer"
      >
        <h2 className="font-medium text-[1.2rem] text-grayBlack" ref={laRef}>
          File {lib}
        </h2>
        <div className="block bg-firstBlue rounded-full p-2 ">
          <Icon
            icon="mdi:cloud-upload-outline"
            width="2rem"
            height="2rem"
            color="#EEEEEC"
          />
        </div>

        <p className="text-[0.6rem] text-testColors1 text-center">
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
