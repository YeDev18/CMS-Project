import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from './Chart';
import { Component1 } from './Component';
import DataCount from './data.count';
import SelectedFile from './SelectedFile';
import TonnagesGraph from './TonnagesGraph';

const Accueil = () => {
  const {
    navire,
    consignataire,
    conform,
    notConform,
    undeclared,
    conformTonnages,
    notConformTonnages,
    undeclaredTonnages,
  } = useServer() || {};
  const overlay = useServer()?.overlay;
  const server = useServer();
  const [lib, setLib] = useState('');

  const handleSelectedCompare = (lib: string) => {
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
    <div className="relative w-full">
      <div className="flex items-center justify-between pb-2">
        <div className="font-semibold">{formattedDate}</div>
        <div className="flex w-fit items-center justify-center rounded-2xl border-[0.5px] px-2  py-1">
          <Icon
            icon="typcn:location"
            width="1.2rem"
            height="1.2rem"
            style={{ color: '#313131' }}
          />
          <p>Abidjan</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-start gap-4 lg:flex-row">
          <div className="flex-center w-full gap-4 lg:w-2/5">
            <Component1
              index={1}
              icon1="lucide:ship"
              icon2="mingcute:arrow-up-fill"
              name="Navires"
              number={navire?.length || 0}
              route="/navire"
            />
            <Component1
              index={2}
              icon1="lucide:contact"
              icon2="mingcute:arrow-up-fill"
              name="Consignataires"
              number={consignataire?.length || 0}
              route="/consignataire"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4 md:flex-row lg:w-3/5">
            <div className="flex h-48 w-full  flex-col justify-between rounded-md bg-firstColors pt-4 shadow-sm shadow-shadowColors lg:w-2/4 ">
              <div className="flex-between  px-4">
                <h3 className="text-[1.25rem] font-bold text-[#272A2D]">
                  VOYAGES
                </h3>
                <Link
                  to="/declaration_conforme"
                  className=" w-fit  cursor-pointer rounded-md bg-firstBlue p-1 text-2xl"
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

              <div className="flex-center mx-4 w-fit gap-2 rounded-md border px-2 py-3">
                <button
                  className="w-fit rounded-md bg-firstBlue p-2 text-xl text-firstColors"
                  onClick={() => (server?.showOverlay(), setLib('VOYAGES'))}
                >
                  <Icon icon="octicon:feed-plus-16" />
                </button>
                <p className="text-base font-medium ">Comparaison Voyages</p>
              </div>

              <DataCount
                conform={conform}
                notConform={notConform}
                undeclared={undeclared}
              />
            </div>

            <div className="flex h-48 w-full  flex-col justify-between rounded-md bg-firstColors pt-4 shadow-sm shadow-shadowColors lg:w-1/2 ">
              <div className="flex-between  px-4">
                <h3 className="text-[1.25rem] font-bold text-[#272A2D]">
                  TONNAGES
                </h3>
                <Link
                  to={''}
                  className=" w-fit  cursor-pointer rounded-md bg-firstBlue p-1 text-2xl"
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
              <div className="flex-center mx-4 w-fit gap-2 rounded-md border px-2 py-3">
                <button
                  className="w-fit rounded-md bg-firstBlue p-2 text-xl text-firstColors"
                  onClick={() => (server?.showOverlay(), setLib('TONNAGES'))}
                >
                  <Icon icon="octicon:feed-plus-16" />
                </button>
                <p className="text-base font-medium ">Comparaison Tonnages</p>
              </div>
              <DataCount
                conform={conformTonnages}
                notConform={notConformTonnages}
                undeclared={undeclaredTonnages}
              />
            </div>
          </div>
        </div>

        <div className="mb-2 flex h-fit w-full flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <Chart />
          </div>
          <div className="flex h-fit w-full flex-col items-start justify-start gap-6 rounded-md border p-4 lg:w-fit">
            <TonnagesGraph />
          </div>
        </div>
      </div>
      {overlay ? handleSelectedCompare(lib) : ''}
    </div>
  );
};

export default Accueil;
