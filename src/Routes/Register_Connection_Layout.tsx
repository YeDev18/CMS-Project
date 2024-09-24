import { Outlet } from 'react-router-dom';
import { Countries } from '../Components/Data';
import logo from '../assets/images/Logo-CMS-1.png';

const RCLayout = () => {
  function Days(date: Date, day: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + day);
    return newDate;
  }
  const todayDate = new Date();
  const days = 0;
  const newDate = Days(todayDate, days);
  const dateFormatter = new Intl.DateTimeFormat('fr-FR');
  const formattedDate = dateFormatter.format(newDate);
  return (
    <div className="bg-bgColors text-textColor h-screen w-full p-6">
      <div className=" size-full rounded-md bg-firstColors p-8 shadow-lg">
        <div className="flex justify-between pb-2">
          <div className="flex items-center gap-4">
            <div className="border-borderColor flex w-fit rounded-2xl border-[0.5px] px-2  py-1">
              <p>Abidjan</p>
            </div>
            <span className="border-borderColor h-8 border-[0.5px] "></span>
            <p className="font-semibold">{formattedDate}</p>
          </div>
          <div className="flex gap-4">
            {Countries.map((countrie, index) => {
              return (
                <div key={index} className="h-8 w-16">
                  <img
                    src={countrie.img}
                    alt={countrie.alt}
                    className="h-ful w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-12 py-12">
          <div className="h-35 w-48">
            <img src={logo} alt="Logo" className="size-full" />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCLayout;
