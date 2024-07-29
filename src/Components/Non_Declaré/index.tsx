import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';
const NonDeclaration = () => {
  const undeclared = useServer().undeclared;

  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const mondifieData = undeclared.map((item: any, index: number) => ({
    id: index,
    imo: item.trafic_maritime.imo_trafic,
    libTM: item.trafic_maritime.nom_navire_trafic,
    consignataire: item.trafic_maritime.consignataire_trafic,
    mouvement:
      item.trafic_maritime.mouvement_trafic === 'Arrivée' ? 'ETA' : 'ETD',
    date: item.trafic_maritime.date_trafic,
  }));
  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(data8.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="px-2 w-16 text-center">
          <span className="font-medium text-borderColor">{current}</span> /{' '}
          <span className="text-borderColor">{totalPages}</span>
        </div>
        <button
          onClick={goToNextPage}
          disabled={current === totalPages}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };
  const [searchValue, setSearchValue] = useState();
  const data8 = searchValue
    ? mondifieData.filter((val: any) =>
        val.imo.toString().includes(searchValue)
      )
    : mondifieData;
  console.log(data8);
  console.log(mondifieData);
  return (
    <div className="w-screen flex flex-col gap-4   ">
      <div className="flex justify-between w-full pb-6">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Nom declares"
            color="#F0352B"
            number={mondifieData.length}
          />
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <form
              action=""
              className="flex gap-3  items-center justify-center"
              // onSubmit={handleClick2}
            >
              <label htmlFor="">
                <Icon
                  icon="lucide:calendar-days"
                  width="1.5em"
                  height="1.5em"
                  style={{ color: '#0a0a0a' }}
                  className="mr-2"
                />
              </label>
              <select
                name=""
                id=""
                className="bg-none outline-4 bg-firstColors"
                // onChange={e => {
                //   setSelectValue(e.target.value);
                // }}
              >
                {AllMonths.map((month, index) => (
                  <option key={index} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
              <span className="border border-borderColor h-4"></span>
              <select
                name=""
                id=""
                className="bg-none outline-none bg-firstColors"
                // onChange={e => {
                //   setSelectValue2(e.target.value);
                // }}
              >
                {Year.map((year, index) => (
                  <option key={index} value={year.value}>
                    {year.year}
                  </option>
                ))}
              </select>
              <button type="submit">
                <Icon icon="mdi:filter" width="1.5em" height="1.5em" />
              </button>
            </form>
          </div>
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <label htmlFor="">
              <Icon icon="mdi:search" width="1.5em" height="1.5em" />
            </label>
            <input
              type="number"
              placeholder="IMO"
              className="border w-32 outline-none p-1 rounded-sm text-sm font-medium"
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <button className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center">
          <Icon
            icon="material-symbols:download"
            width="1em"
            height="1em"
            style={{ color: '#313131' }}
            className="mr-2"
          />
          Export en csv
        </button>
      </div>
      <table className="w-full pb-6">
        <tr className="flex justify-start  py-4 px-2  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
          {headerTable.map((item, index) => {
            return (
              <th
                className=" text-start font-semibold lg:w-28 xl:w-52 headerSecond"
                key={index}
              >
                {item}
              </th>
            );
          })}
        </tr>
        {data8.slice(startIndex, endIndex).map((val: any, index: number) => {
          return (
            <tr
              key={index}
              className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
            >
              <td className="text-start lg:w-32 text-sm xl:text-base">
                {index + 1}
              </td>
              <td className="text-start lg:w-32 text-sm xl:text-base">
                {val.imo}
              </td>
              <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-sm">
                {val.libTM}
              </td>
              <td className="text-start lg:w-40 text-sm xl:text-base">
                {val.mouvement}
              </td>

              <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                {val.date}
              </td>
            </tr>
          );
        })}
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
