import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import { Component1 } from './Component';
import Notification from './Notification';
import SelectedFile from './SelectedFile';

const Accueil = () => {
  const navire = useServer()?.navire;
  const consignataire = useServer()?.consignataire;
  const conform = useServer()?.conform;
  const notConform = useServer()?.notConform;
  const undeclared = useServer()?.undeclared;
  const overlay = useServer()?.overlay;
  const server = useServer();
  const [lib, setLib] = useState('');

  const handleSelected = (lib: string) => {
    return <SelectedFile libelle={lib} onClick={() => server?.showOverlay()} />;
  };

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
    <div className="w-full relative">
      <div className="flex justify-between items-center pb-2">
        <div className="text-borderColor font-semibold">{formattedDate}</div>
        <div className="flex justify-center items-center border-[0.5px] border-borderColor rounded-2xl px-2 py-1  w-fit">
          <Icon
            icon="typcn:location"
            width="1.2rem"
            height="1.2rem"
            style={{ color: '#313131' }}
          />
          <p className="text-borderColor">Abidjan</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-start lg:flex-row gap-4">
          <div className="w-full lg:w-2/5 flex-center gap-4">
            <Component1
              index={1}
              icon1="lucide:ship"
              icon2="mingcute:arrow-up-fill"
              name="Navires"
              number={navire?.length}
              route="/navire"
            />
            <Component1
              index={2}
              icon1="lucide:contact"
              icon2="mingcute:arrow-up-fill"
              name="Consignataires"
              number={consignataire?.length}
              route="/consignataire"
            />
          </div>
          <div className="w-full flex justify-start gap-4 items-center lg:w-3/5">
            <div className="h-48 w-full lg:w-[50%]  flex flex-col justify-between bg-firstColors rounded-md shadow-sm shadow-shadowColors pt-4 ">
              <div className="flex-between  px-4">
                <h3 className="font-bold text-[1.25rem] text-[#272A2D]">
                  VOYAGES
                </h3>
                <Link
                  to="/declaration_conforme"
                  className=" bg-firstBlue  w-fit p-1 rounded-md text-2xl cursor-pointer"
                >
                  <Icon
                    icon="mingcute:arrow-up-fill"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: '#EEEEEC' }}
                    className="rotate-45"
                  />
                </Link>
              </div>

              <div className="mx-4 flex-center w-fit border rounded-md px-2 py-3 gap-2">
                <button
                  className="bg-firstBlue text-xl rounded-md text-firstColors p-2 w-fit"
                  onClick={() => (server?.showOverlay(), setLib('VOYAGES'))}
                >
                  <Icon icon="octicon:feed-plus-16" />
                </button>
                <p className="text-md font-medium ">Comparaison Voyages</p>
              </div>

              <div className="grid grid-cols-3 w-full place-items-center h-10 bg-[#f7f7f8] rounded-b-md">
                <div className=" flex-center border-r-2 w-full gap-2 text-xl text-[#2563eb]">
                  <Icon
                    icon="lucide:circle-check-big"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">
                    {conform?.length}
                  </p>
                </div>
                <div className="flex-center border-r-2 w-full gap-2 text-xl text-[#f59069] ">
                  <Icon icon="charm:notes-cross" className="drop-shadow-sm" />
                  <p className="font-medium  drop-shadow-sm">
                    {notConform?.length}
                  </p>
                </div>
                <div className="flex-center w-full gap-2 text-xl  text-[#f0352b]">
                  <Icon icon="ph:x-circle" className="drop-shadow-sm " />
                  <p className="font-medium drop-shadow-sm">
                    {undeclared?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-48 w-full lg:w-[50%]  flex flex-col justify-between bg-firstColors rounded-md shadow-sm shadow-shadowColors pt-4 ">
              <div className="flex-between  px-4">
                <h3 className="font-bold text-[1.25rem] text-[#272A2D]">
                  TONNAGES
                </h3>
                <Link
                  to={''}
                  className=" bg-firstBlue  w-fit p-1 rounded-md text-2xl cursor-pointer"
                >
                  <Icon
                    icon="mingcute:arrow-up-fill"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: '#EEEEEC' }}
                    className="rotate-45"
                  />
                </Link>
              </div>
              <div className="mx-4 flex-center w-fit border rounded-md px-2 py-3 gap-2">
                <button
                  className="bg-firstBlue text-xl rounded-md text-firstColors p-2 w-fit"
                  onClick={() => setLib('TONNAGES')}
                >
                  <Icon icon="octicon:feed-plus-16" />
                </button>
                <p className="text-md font-medium ">Comparaison Tonnages</p>
              </div>

              <div className="grid grid-cols-2 w-full place-items-center h-10 bg-[#f7f7f8] rounded-b-md">
                <div className=" flex-center border-r-2 w-full gap-2 text-xl text-[#2563eb]">
                  <Icon
                    icon="solar:graph-up-broken"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">12</p>
                </div>
                <div className="flex-center w-full gap-2 text-xl text-[#f59069] ">
                  <Icon
                    icon="solar:graph-up-broken"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">13</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-fit flex flex-col mb-2 lg:flex-row gap-6">
          <div className="w-full  lg:w-[50%]">
            <Chart />
          </div>
          <div className="w-full lg:w-fit h-fit border rounded-md flex flex-col justify-start items-start p-4 gap-6">
            <h2 className="font-semibold text-xl">
              Tonages des differents navires
            </h2>
            <div className=" w-full flex flex-row justify-between lg:flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {server.notification ? (
        <>
          {!server.error1 && !server.error2 && server.loading ? (
            <Notification
              icon={'eos-icons:loading'}
              notification={' Analyse des données'}
              bottom={2}
            />
          ) : (
            ''
          )}

          {server.error1 || server.error2 ? (
            <Notification
              icon={'carbon:close-outline'}
              notification={'Comparaison Echoue'}
              bottom={48}
            />
          ) : (
            ''
          )}

          <>
            {!server.error1 && !server.error2 && server.success ? (
              <Notification
                icon={'gg:check-o'}
                notification={'Comparaison reussie'}
                bottom={24}
              />
            ) : (
              ''
            )}
          </>
        </>
      ) : (
        ''
      )}

      {overlay ? handleSelected(lib) : ''}
    </div>
  );
};

export default Accueil;
