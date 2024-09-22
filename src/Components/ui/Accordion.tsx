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
        className="flex justify-between border-b border-borderColors w-full font-medium text-grayBlack text-start py-4 text-3xl"
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
          <div key={index} className="py-6 block mx-auto">
            <button className="text-lg w-28 h-16 transition duration-100 ease hover:bg-firstBlue hover:text-firstColors hover:font-medium text-grayBlack font-normal text-center firstColors rounded-md shadow-sm shadow-shadowColors ">
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
