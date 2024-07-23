import { Outlet } from 'react-router-dom';
import { Countries } from '../Components/Data';
import logo from '../assets/images/logo.png';

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
  console.log(formattedDate);
  return (
    <div className="bg-bgColors w-full h-screen py-9  px-9 text-textColor">
      <div className=" bg-firstColors w-full h-full rounded-md shadow-lg p-8">
        <div className="flex justify-between pb-8">
          <div className="flex gap-4 items-center">
            <div className="flex border-[0.5px] border-borderColor rounded-2xl px-2 py-1  w-fit">
              <p>Abidjan</p>
            </div>
            <span className="border-[0.5px] border-borderColor h-8 "></span>
            <p className="font-semibold">{formattedDate}</p>
          </div>
          <div className="flex gap-4">
            {Countries.map((countrie, index) => {
              return (
                <div key={index} className="w-16 h-8">
                  <img
                    src={countrie.img}
                    alt={countrie.alt}
                    className="w-full h-ful"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-12 py-12">
          <div className="">
            <div className="w-80 h-35">
              <img src={logo} alt="Logo" className="w-full h-full" />
            </div>
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
