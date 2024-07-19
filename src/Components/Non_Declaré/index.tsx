import url from '@/api';
import { Icon } from '@iconify/react';
import { AllMonths, headerTable, Year } from '../Data';

import { useEffect, useState } from 'react';
import Libelle from '../ui/Libelle';
// import{SecondTab;}
const NonDeclaration = () => {
  const [data1, setData1] = useState<any>([]);
  const data2: any = [];
  const [data3, setData3] = useState<any>(['']);
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    url
      .get('api/non-declare')
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));
  }, []);
  for (let index = 1; index < data1.length; index++) {
    data2.push(data1[index].trafic_maritime);
  }
  const mondifieData = data2.map((item: any, index: number) => ({
    id: index,
    imo: item.imo_trafic,
    libTM: item.nom_navire_trafic,
    type: 'viav',
    consignataire: item.consignataire_trafic,
    mouvement: item.mouvement_trafic === 'Arrivée' ? 'ETA' : 'ETD',
    date: item.date_trafic,
  }));
  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(mondifieData.length / itemsPerPage);
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
  // setData3(mondifieData);
  console.log(mondifieData);
  ///Leureur vient de la je dois trouve le probleme
  // console.log(data3);
  return (
    <div className="w-screen flex flex-col gap-4   ">
      <div className="flex justify-between w-full pb-6">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Non declare"
            color="#ea546c"
            number={data1.length}
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
                {' '}
                <Icon icon="mdi:filter" width="1.5em" height="1.5em" />
              </button>
            </form>
          </div>
        </div>
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
        {mondifieData
          .slice(startIndex, endIndex)
          .map((val: any, index: number) => {
            return (
              <tr
                key={index}
                className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
              >
                <td className="text-start lg:w-32 text-sm xl:text-base">
                  {val.id}
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
