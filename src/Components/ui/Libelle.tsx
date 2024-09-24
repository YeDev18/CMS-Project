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
      className="h-10 rounded-md p-2 shadow-sm shadow-slate-200"
      style={{ backgroundColor: `${color}` }}
    >
      <p className="inline-flex size-full items-center whitespace-nowrap px-1 text-slate-100">
        {' '}
        <Icon icon={icon} width="1em" height="1em" className="mr-1" />
        {libelle} :{' '}
        <span className="pl-1 font-semibold text-slate-100"> {number}</span>
      </p>
    </div>
  );
};

export default Libelle;
