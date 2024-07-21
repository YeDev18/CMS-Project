import url from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';

const DeclarationConforme = () => {
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>(['']);
  // const data2: any = [];
  const Data3: any = [];
  const [selectValue, setSelectValue] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const MonthsYears = selectValue2 + '-' + selectValue;
  // const [modifiedData, setModifiedData] = useState<any[]>([]);
  // const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    url
      .get('/api/declare-conforme')
      .then(res => res.data)
      .then(data => {
        setData1(data);
      })
      .catch(error => console.log(error));
  }, []);
  console.log(data1);
  // for (let index = 1; index < data1.length; index++) {
  //   data2.push(data1[index].soumission_dtci);
  // }

  // setModifiedData([
  //   ...modifiedData
  //   {imo : data1.somm}
  // ]);
  const modifiedData = data1.map((item: any, index: number) => ({
    id: index,
    imo: item?.soumission_dtci?.imo_dtci,
    libDTCI: item?.soumission_dtci?.nom_navire_dtci,
    type: 'viav',
    mouvement:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
    date:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? item?.soumission_dtci?.eta_dtci
        : item?.soumission_dtci?.etd_dtci,
  }));
  console.log(modifiedData);
  for (let index = 1; index < modifiedData.length; index++) {
    Data3.push(modifiedData[index]);
  }
  // const Filter = useMemo(() => {
  //   return modifiedData.filter(
  //     (item: any) => item?.date.slice(0, 7) == MonthsYears
  //   );
  // }, [MonthsYears]);
  const Filter2 = useMemo(() => {
    return modifiedData.filter((item: any) => item?.date);
  }, [MonthsYears == '-' || 'All-All']);
  // console.log(Filter);
  console.log(Filter2);

  const handleClick2 = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setData3(newFilteredDataAll);
    // console.log(Filter);
    console.log(Filter2);
    console.log(selectValue);
    console.log(MonthsYears);
  };
  // setData2([data1.slice(startIndex, endIndex), ...data2]);
  // console.log(data2);

  // console.log(Filt, Filt2);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(data1.length / itemsPerPage);
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
  return (
    <>
      <div className="w-screen flex flex-col gap-6 ">
        <div className="flex justify-between w-full pb-6">
          <div className="flex gap-4">
            <Libelle
              icon="lucide:circle-check-big"
              libelle="Conformes"
              color="#114837"
              number={data1.length}
            />
            <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
              <form
                action=""
                className="flex gap-3  items-center justify-center"
                onSubmit={handleClick2}
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
                  onChange={e => {
                    setSelectValue(e.target.value);
                  }}
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
                  onChange={e => {
                    setSelectValue2(e.target.value);
                  }}
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
            <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
              <label htmlFor="">
                <Icon icon="mdi:search" width="1.5em" height="1.5em" />
              </label>
              <input
                type="number"
                placeholder="IMO"
                // onChange={() => handleChange}
                className="border w-32 outline-none p-1 rounded-sm text-sm font-medium"
                onChange={e => {
                  setSelectValue(e.target.value);
                }}
              />
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
          {modifiedData
            .slice(startIndex, endIndex)
            .map((val: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
                >
                  <td className="text-start lg:w-32 text-sm xl:text-base">
                    {index}
                  </td>
                  <td className="text-start lg:w-32 text-sm xl:text-base">
                    {val?.imo}
                  </td>
                  <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-sm">
                    {val?.libDTCI}
                  </td>
                  <td className="text-start lg:w-40 text-sm xl:text-base">
                    {val?.mouvement}
                  </td>

                  <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                    {val?.date}
                  </td>
                </tr>
              );
            })}
        </table>
        {renderPaginationControls()}
      </div>
    </>
  );
};

export default DeclarationConforme;
