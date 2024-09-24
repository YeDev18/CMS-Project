import { Icon } from '@iconify/react';
import React, { FC, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

type Lib = {
  lib: string;
  HeaderTable: string[];
  liv: string;
  Table: Array<{
    id: string;
    libDTCI: string;
    imo: number;
    type: string;
    date: string;
    mouvement: string;
    // [key: string]: any;
  }>;
  nonDeclare?: boolean;
  color?: string;
};

const SecondTables: FC<Lib> = ({
  lib,
  HeaderTable,
  Table,
  liv,
  color,
  nonDeclare,
}) => {
  const [current, setCurrent] = useState(1);
  const [selectValue, setSelectValue] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [filteredData, setFilteredData] = useState(Table);
  const [form, setForm] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);
  const [searchValue, setSearchValue] = useState();
  const MonthsYears = selectValue + '/' + selectValue2;
  const exportToExcel = () => {
    // Créer une nouvelle feuille de calcul
    const ws = XLSX.utils.json_to_sheet(filteredData);
    // Créer un nouveau classeur
    const wb = XLSX.utils.book_new();
    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, `${lib}.xlsx`);
  };
  const Filt = useMemo(() => {
    return Table.filter(item => item.date);
  }, []);
  const Filt2 = useMemo(() => {
    return Table.filter(item => item.date.slice(3, 10) === MonthsYears);
  }, [MonthsYears]);

  const handleClick2 = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFilteredData = Filt2;
    const newFilteredDataAll = Filt;
    MonthsYears === 'All/All'
      ? setFilteredData(newFilteredDataAll)
      : setFilteredData(newFilteredData);

    MonthsYears === '/' && setFilteredData(newFilteredDataAll);
  };

  const DataFinal = searchValue
    ? currentItems.filter(val => val.imo.toString().includes(searchValue))
    : currentItems;

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    return (
      <div className="flex justify-end">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="rounded border border-shadowColors p-1 text-shadowColors hover:border hover:border-firstBlue hover:bg-firstBlue hover:text-firstColors active:border active:bg-firstBlue"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="w-16 px-2 text-center">
          <span className="text-borderColor font-medium">{current}</span> /{' '}
          <span className="text-borderColor">{totalPages}</span>
        </div>
        <button
          onClick={goToNextPage}
          disabled={current === totalPages}
          className="rounded border border-shadowColors p-1 text-shadowColors hover:border hover:border-firstBlue hover:bg-firstBlue hover:text-firstColors active:border active:bg-firstBlue"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  const handleClick = () => {
    setForm(!form);
  };
  const handleTlick = () => {
    return (
      <div>
        <div className="absolute left-0 top-0 size-full rounded-md bg-grayBlack opacity-10"></div>
        <div className="absolute left-[50%] top-[50%] flex size-96 -translate-x-2/4 -translate-y-1/2 items-center justify-center rounded-sm bg-white">
          <button
            onClick={() => setForm(false)}
            className="absolute right-2 top-2"
          >
            <Icon icon="ic:round-close" width="1.5em" height="1.5em" />
          </button>
          <div className="flex flex-col">
            <h1>Bon voila</h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" flex w-full flex-col gap-6 text-grayBlack ">
        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <button className="inline-flex items-center whitespace-nowrap rounded-md p-2 shadow-sm shadow-shadowColors">
              {' '}
              <Icon
                icon={liv}
                width="1em"
                height="1em"
                style={{ color: color }}
                className="mr-2"
              />
              {lib} : <span className="font-semibold">{Table.length}</span>
            </button>
            <div className="inline-flex items-center gap-4 rounded-md p-2 shadow-sm shadow-shadowColors">
              <form
                action=""
                className="flex items-center  justify-center gap-3"
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
                  className="bg-firstColors bg-none outline-4"
                  onChange={e => {
                    setSelectValue(e.target.value);
                  }}
                >
                  <option value="All">Month</option>
                  <option value="01">Janvier</option>
                  <option value="02">Fevrier</option>
                  <option value="03">Mars</option>
                  <option value="04">Avril</option>
                  <option value="05">Mai</option>
                  <option value="06">Juin</option>
                  <option value="07">Juillet</option>
                  <option value="08">Aout</option>
                  <option value="09">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Decembre</option>
                </select>
                <span className="border-borderColor h-4 border"></span>
                <select
                  name=""
                  id=""
                  className="bg-firstColors bg-none outline-none"
                  onChange={e => {
                    setSelectValue2(e.target.value);
                  }}
                >
                  <option value="All">Year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
                <button type="submit">
                  {' '}
                  <Icon icon="mdi:filter" width="1.5em" height="1.5em" />
                </button>
              </form>
            </div>
            <div className="inline-flex items-center gap-4 rounded-md p-2 shadow-sm shadow-shadowColors">
              <label htmlFor="">
                <Icon icon="mdi:search" width="1.5em" height="1.5em" />
              </label>
              <input
                type="number"
                placeholder="IMO"
                // onChange={() => handleChange}
                className="w-32 rounded-sm border p-1 text-sm font-medium outline-none"
                onChange={e => {
                  setSelectValue(e.target.value);
                }}
              />
            </div>
          </div>

          <button
            className="inline-flex items-center rounded-md p-2 shadow-sm shadow-shadowColors"
            onClick={() => exportToExcel()}
          >
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
        <div className=" flex  w-full flex-col gap-6 ">
          <table className="w-full">
            <tr className="shadow-testColors1 flex  w-full justify-start  rounded-md bg-slate-50 px-2 py-4 shadow-sm ">
              {HeaderTable.map((item, index) => {
                return (
                  <th
                    className=" headerSecond text-start font-semibold lg:w-28 xl:w-52"
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
            {DataFinal.map((val, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className="flex w-full justify-start border-b-2 border-slate-50 px-2 py-4 "
                  >
                    <td className="text-start text-sm lg:w-32 xl:text-base">
                      {index}
                    </td>
                    <td className="text-start text-sm lg:w-32 xl:text-base">
                      {val.imo}
                    </td>
                    <td className="text-start text-sm lg:w-28 xl:w-52 xl:text-sm">
                      {val.libDTCI}
                    </td>
                    <td className="text-start text-sm lg:w-40 xl:text-base">
                      {val.mouvement}
                    </td>

                    <td className="text-start text-sm lg:w-28 xl:w-48 xl:text-base ">
                      {val.date}
                    </td>
                    {nonDeclare ? (
                      <td className="text-end lg:w-28 xl:w-48 ">
                        <button onClick={() => handleClick()}>
                          <Icon
                            icon="mingcute:more-2-fill"
                            width="20"
                            height="20"
                          />
                        </button>
                        {/* <button onClick={() => handleClick()}>
                          <Icon
                            icon="mingcute:more-2-fill"
                            width="20"
                            height="20"
                          />
                        </button> */}
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                </>
              );
            })}
          </table>
          {form ? handleTlick() : ''}
          {renderPaginationControls()}
        </div>
      </div>
    </>
  );
};

export default SecondTables;
