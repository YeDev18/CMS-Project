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
    type: string;
    date: string;
    mouvement: string;
    [key: string]: any;
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

    // console.log(selectValue + '/' + selectValue2);
    const newFilteredData = Filt2;
    const newFilteredDataAll = Filt;
    MonthsYears === 'All/All'
      ? setFilteredData(newFilteredDataAll)
      : setFilteredData(newFilteredData);

    MonthsYears === '/' && setFilteredData(newFilteredDataAll);
  };

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

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

  const handleClick = () => {
    setForm(!form);
  };
  const handleTlick = () => {
    return (
      <div>
        <div className="bg-grayBlack opacity-10 w-full h-full absolute top-0 left-0 rounded-md"></div>
        <div className="bg-white w-96 h-96 absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-1/2 rounded-sm flex justify-center items-center">
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
      <div className=" flex flex-col gap-6 text-grayBlack">
        <div className="flex justify-between">
          <div className="flex gap-8">
            <button className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center">
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
                  // value={selectValue}
                  className="bg-none outline-4 bg-firstColors"
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
                <span className="border border-borderColor h-4"></span>
                <select
                  name=""
                  id=""
                  className="bg-none outline-none bg-firstColors"
                  // value={selectValue2}
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
          </div>

          <button
            className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center"
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
        <div className=" w-full  flex flex-col gap-6 ">
          <table className="w-full">
            <tr className="flex justify-start  py-4 px-2  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
              {nonDeclare ? (
                <th className="font-normal text-start w-12">
                  <input type="checkbox" name="" id="" />
                </th>
              ) : (
                ``
              )}

              {HeaderTable.map((item, index) => {
                return (
                  <th
                    className=" text-start font-semibold lg:w-28 xl:w-52"
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
            {currentItems.map(val => {
              return (
                <>
                  <tr
                    key={val.id}
                    className="flex justify-start py-4 px-2   w-full border-b-2 border-slate-50 "
                  >
                    {nonDeclare ? (
                      <td className="text-start w-12">
                        <input type="checkbox" name="" id="" />
                      </td>
                    ) : (
                      ``
                    )}

                    <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-base">
                      {val.id}
                    </td>
                    <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-sm">
                      {val.libDTCI}
                    </td>
                    <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-base">
                      {val.mouvement}
                    </td>

                    {/* <td className="text-start lg:w-32 xl:w-52 text-sm xl:text-base">
                  {val.type}
                </td> */}

                    <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
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
