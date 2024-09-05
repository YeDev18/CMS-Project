import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';
const NonDeclaration = () => {
  const undeclared = useServer().undeclared;

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });

  const MonthsYears = formValue.years + '-' + formValue.months;
  const server = useServer();
  const [portA, setPortA] = useState<boolean>(false);
  const [portSP, setPortSP] = useState<boolean>(false);

  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChangePortA = () => {
    setPortA(!portA);
    setPortSP(false);
    server?.toInitialize();
  };
  const handleChangePortSP = () => {
    setPortSP(!portSP);
    setPortA(false);
    server?.toInitialize();
  };

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(FinalData.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="px-2 w-24 text-center">
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
  const Filter = useMemo(() => {
    return undeclared.filter(
      (val: any) =>
        val.trafic_maritime.date_trafic.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? undeclared : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.trafic_maritime.imo_trafic.toString().includes(searchValue)
      )
    : Final;

  let FinalData = dataFinal;
  if (portA) {
    FinalData = dataFinal.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'ABIDJAN'
    );
  } else if (portSP) {
    FinalData = dataFinal.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'SAN PEDRO'
    );
  } else {
    console.log('');
  }

  const modifiedData = FinalData.map((item: any, index: number) => ({
    Id: index,
    Imo: item?.trafic_maritime?.imo_trafic,
    Navire: item?.trafic_maritime?.nom_navire_trafic,
    Mouvement: item?.trafic_maritime.mouvement_trafic,
    Date: item?.trafic_maritime?.date_trafic.split('-').reverse().join('-'),
    Port: item?.trafic_maritime?.port_trafic,
  }));

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Non declare.xlsx`);
  };

  return (
    <div className="w-full relative h-full flex flex-col gap-6  ">
      <div className="flex justify-start gap-2 flex-wrap gap-y-4 w-full">
        <Libelle
          icon="ph:x-circle"
          libelle="Nom declares"
          color="#F0352B"
          number={undeclared.length}
        />
        <div className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex gap-4 items-center w-fit h-10">
          <form action="" className="flex items-center justify-center">
            <label htmlFor="">
              <Icon
                icon="lucide:calendar-days"
                width="1.2em"
                height="1.2em"
                style={{ color: '#0a0a0a' }}
                className="mr-2"
              />
            </label>
            <div className="w-fit h-fit border p rounded-sm whitespace-nowrap ">
              <select
                name="months"
                id=""
                className="bg-none border-none bg-firstColors"
                onChange={e => {
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {AllMonths.map((month, index) => (
                  <option key={index} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
              <select
                name="years"
                id=""
                className="bg-none border-none bg-firstColors"
                onChange={e => {
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {Year.map((year, index) => (
                  <option key={index} value={year.value}>
                    {year.year}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex gap-2 items-center h-10 ">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.1em" height="1.1em" />
          </label>
          <input
            type="number"
            placeholder="IMO"
            className=" border-b w-28 outline-none pb-1 text-sm  h-fit font-medium"
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
          />
          <span className="border border-borderColor h-4"></span>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Port A
            </label>
            <input
              type="checkbox"
              checked={portA}
              onChange={handleChangePortA}
              placeholder="IMO"
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Port SP
            </label>
            <input
              type="checkbox"
              checked={portSP}
              onChange={handleChangePortSP}
              placeholder="IMO"
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
        </div>
        <button
          className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#0e5c2f] text-firstColors text-sm h-10 "
          onClick={() => exportToExcel()}
        >
          <Icon
            icon="material-symbols:download"
            width="1.2em"
            height="1.2em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          Export en csv
        </button>
        {!(MonthsYears === '-') || searchValue || portA || portSP ? (
          <div className="rounded-md bg-[#F0352B]  shadow-sm shadow-slate-200 p-2 inline-flex gap-1 items-center h-10 text-firstColors">
            <Icon
              icon="ph:x-circle"
              width="1.2em"
              height="1.2em"
              className="mr-2"
            />
            Quantite : {FinalData.length}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="w-full h-full overflow-x-auto  pr-2 relative">
        <table className="w-full pb-6">
          <thead>
            <tr className="gridArray5 text-start py-4 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className=" text-start font-semibold headerSecond"
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {FinalData.slice(startIndex, endIndex).map(
              (val: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="gridArray5 w-full border-b-2 border-slate-50 "
                  >
                    <td className="text-start  text-sm xl:text-base">
                      {index + 1}
                    </td>
                    <td className="text-start  text-sm xl:text-sm whitespace-normal">
                      {val.trafic_maritime.nom_navire_trafic}
                    </td>
                    <td className="text-start  text-sm xl:text-base">
                      {val.trafic_maritime.imo_trafic}
                    </td>
                    <td className="text-start text-sm xl:text-base">
                      {val.trafic_maritime.mouvement_trafic}
                    </td>

                    <td className="text-start text-sm xl:text-base ">
                      {val.trafic_maritime.date_trafic
                        .split('-')
                        .reverse()
                        .join('-')}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
