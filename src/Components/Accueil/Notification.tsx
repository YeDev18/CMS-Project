import { Icon } from '@iconify/react';
import { FC } from 'react';

type Notification = {
  icon: string;
  notification: string;
  bottom: number;
};

const Notification: FC<Notification> = ({ icon, notification, bottom }) => {
  return (
    <div
      className={`fixed w-64 bottom-${bottom} right-3 rounded-md shadow-sm bg-[#009FE3] flex justify-start items-center gap-2 py-3 px-2 animateElement`}
    >
      {' '}
      <Icon icon={icon} className="text-firstColors text-xl" />
      <h2 className="font-bold text-base text-firstColors">{notification}</h2>
    </div>
  );
};

export default Notification;
