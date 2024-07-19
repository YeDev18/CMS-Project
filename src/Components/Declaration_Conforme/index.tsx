import url from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';

const DeclarationConforme = () => {
  const [data1, setData1] = useState<any[]>(['']);
  const data2: any = [];
  const Data3: any = [];
  const [selectValue, setSelectValue] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const MonthsYears = selectValue2 + '-' + selectValue;
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    url
      .get('/api/declare-conforme')
      .then(res => res.data)
      .then(data => {
        setData1(data);
      })
      .catch(error => console.log(error));
  }, []);
  for (let index = 1; index < data1.length; index++) {
    data2.push(data1[index].soumission_dtci);
  }
  const modifiedData = data2.map((item: any, index: number) => ({
    id: index,
    imo: item.imo_dtci,
    libDTCI: item.nom_navire_dtci,
    type: 'viav',
    mouvement: item.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
    date: item.mouvement_dtci === 'Arrivée' ? item.eta_dtci : item.etd_dtci,
  }));
  // console.log(modifiedData);
  for (let index = 1; index < modifiedData.length; index++) {
    Data3.push(modifiedData[index]);
  }
  const Filt = useMemo(() => {
    return Data3.filter(
      (item: any) => item.date.slice(0, 7) == MonthsYears
    ).map((item: any, index: number) => ({
      id: index,
      imo: item.imo,
      libDTCI: item.libDTCI,
      type: 'viav',
      mouvement: item.mouvement,
      date: item.date,
    }));
  }, [MonthsYears]);
  const Filt2 = useMemo(() => {
    return Data3.filter((item: any) => item.date).map(
      (item: any, index: number) => ({
        id: index,
        imo: item.imo,
        libDTCI: item.libDTCI,
        type: 'viav',
        mouvement: item.mouvement,
        date: item.date,
      })
    );
  }, [MonthsYears]);
  console.log(filteredData);

  const handleClick2 = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFilteredData = Filt2;
    const newFilteredDataAll = Filt;
    console.log(MonthsYears);
    console.log(newFilteredData);
    console.log(newFilteredDataAll);
  };

  // console.log(Filt, Filt2);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(Data3.length / itemsPerPage);
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
              number={Data3.length}
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
          {Data3.slice(startIndex, endIndex).map((val: any, index: number) => {
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
                  {val.libDTCI}
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
    </>
  );
};

export default DeclarationConforme;
