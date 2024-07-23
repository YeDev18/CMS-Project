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
    <p
      className={`rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center whitespace-nowrap text-slate-100`}
      style={{ backgroundColor: `${color}` }}
    >
      {' '}
      <Icon icon={icon} width="1em" height="1em" className={`mr-2`} />
      {libelle} :{' '}
      <span className="font-semibold pl-1 text-slate-100"> {number}</span>
    </p>
  );
};

export default Libelle;
