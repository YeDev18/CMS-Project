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
      className={`fixed w-64 ${bottom} animateElement right-3 flex items-center justify-start gap-2 rounded-md bg-firstBlue px-2 py-3 shadow-sm`}
    >
      {' '}
      <Icon icon={icon} className="text-xl text-firstColors" />
      <h2 className="text-base font-bold text-firstColors">{notification}</h2>
    </div>
  );
};

export default Notification;
