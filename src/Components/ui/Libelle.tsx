import { Icon } from '@iconify/react';
import { FC } from 'react';

type Icon = {
  libelle: string;
  icon: string;
  color: string;
  number: number;
};
const Libelle: FC<Icon> = ({ libelle, icon, color, number }) => {
  return (
    <div
      className="p-2 rounded-md shadow-sm shadow-slate-200 h-10"
      style={{ backgroundColor: `${color}` }}
    >
      <p className="px-1 inline-flex items-center whitespace-nowrap size-full text-slate-100">
        {' '}
        <Icon icon={icon} width="1em" height="1em" className="mr-1" />
        {libelle} :{' '}
        <span className="font-semibold pl-1 text-slate-100"> {number}</span>
      </p>
    </div>
  );
};

export default Libelle;
