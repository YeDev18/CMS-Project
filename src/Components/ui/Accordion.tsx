import { Icon } from '@iconify/react';
import { FC, useRef } from 'react';
type AccorProps = {
  year: string;
  months: string[];
  isOpen: boolean;
  onClick: () => void;
};

const Accordion: FC<AccorProps> = ({ year, months, isOpen, onClick }) => {
  const contentHeight = useRef<HTMLDivElement>(null);
  return (
    <div>
      <button
        onClick={onClick}
        className="flex w-full justify-between border-b py-4 text-start text-3xl font-medium text-grayBlack"
      >
        {year}
        <Icon icon="zondicons:cheveron-down" />
      </button>
      <div
        className=" grid grid-cols-6 gap-4"
        ref={contentHeight}
        style={{
          height: isOpen ? `${contentHeight.current?.scrollHeight}px` : ' 0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
      >
        {months.map((month, index) => (
          <div key={index} className="mx-auto block py-6">
            <button className="ease h-16 w-28 rounded-md text-center text-lg font-normal text-grayBlack shadow-sm shadow-shadowColors transition duration-100 hover:bg-firstBlue hover:font-medium hover:text-firstColors ">
              {month}
            </button>
          </div>
        ))}
      </div>
      qqqqqqqq
    </div>
  );
};

export default Accordion;
