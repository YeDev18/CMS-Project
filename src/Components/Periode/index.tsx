import { useState } from 'react';
import { ItemsPeriode } from '../Data';
import Accordion from '../ui/Accordion';
type Index = number | null;

const Periode = () => {
  const [activeIndex, setActiveIndex] = useState<Index>(null);
  const handleClick = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };
  return (
    <div className="flex flex-col gap-6 pt-10">
      {ItemsPeriode.map((items, index) => (
        <Accordion
          key={index}
          year={items.year}
          months={items.months}
          isOpen={activeIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Periode;
