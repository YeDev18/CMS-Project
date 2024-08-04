import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';
const NonDeclaration = () => {
  const undeclared = useServer().undeclared;

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });

  const MonthsYears = formValue.years + '-' + formValue.months;

  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(dataFinal.length / itemsPerPage);
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

  return (
    <div className="w-screen flex flex-col gap-4   ">
      <div className="flex justify-between w-full pb-6">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Nom declares"
            color="#F0352B"
            number={undeclared.length}
          />
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <form action="" className="flex gap-3  items-center justify-center">
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
                name="months"
                id=""
                className="bg-none outline-4 bg-firstColors"
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
              <span className="border border-borderColor h-4"></span>
              <select
                name="years"
                id=""
                className="bg-none outline-none bg-firstColors"
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
        <thead>
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
        </thead>

        <tbody>
          {dataFinal
            .slice(startIndex, endIndex)
            .map((val: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
                >
                  <td className="text-start lg:w-32 text-sm xl:text-base">
                    {index + 1}
                  </td>
                  <td className="text-start lg:w-32 text-sm xl:text-base">
                    {val.trafic_maritime.imo_trafic}
                  </td>
                  <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-sm">
                    {val.trafic_maritime.nom_navire_trafic}
                  </td>
                  <td className="text-start lg:w-40 text-sm xl:text-base">
                    {val.trafic_maritime.mouvement_trafic}
                  </td>

                  <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                    {val.trafic_maritime.date_trafic
                      .split('-')
                      .reverse()
                      .join('-')}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
