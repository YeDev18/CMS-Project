import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import * as XLSX from 'xlsx';

type Lib = {
  lib: string;
  HeaderTable: string[];
  Table: [];
};
interface Current {
  imo: number;
  id: string;
  libDTCI: string;
  libTM: string;
}

const Tables: FC<Lib> = ({ lib, HeaderTable, Table }) => {
  const [current, setCurrent] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Table.slice(startIndex, endIndex);
  const exportToExcel = () => {
    // Créer une nouvelle feuille de calcul
    const ws = XLSX.utils.json_to_sheet(Table);
    // Créer un nouveau classeur
    const wb = XLSX.utils.book_new();
    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, `${lib}.xlsx`);
  };
  console.log(setItemsPerPage);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(Table.length / itemsPerPage);
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
          className="rounded border border-shadowColors p-1 text-shadowColors hover:border hover:border-firstBlue hover:text-firstColors active:border active:bg-firstBlue"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  return (
    <div className=" flex w-full flex-col gap-6 text-grayBlack ">
      <div className="flex w-full justify-between">
        <button className="inline-flex items-center  rounded-md bg-firstBlue p-2 text-firstColors shadow-sm">
          {' '}
          <Icon
            icon="lucide:circle-check-big"
            width="1em"
            height="1em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          {lib} : <span className="font-semibold">{Table.length}</span>
        </button>
        <button
          className="inline-flex items-center rounded-md bg-firstBlue p-2 text-firstColors shadow-sm"
          type="button"
          onClick={() => exportToExcel()}
        >
          <Icon
            icon="material-symbols:download"
            width="1em"
            height="1em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          Export en csv
        </button>
      </div>
      <div className=" flex w-full flex-col gap-6 ">
        <table className="w-full">
          <tr className="flex  w-full  justify-start rounded-md bg-slate-50 p-4 shadow-sm">
            {HeaderTable.map((item, index) => {
              return (
                <th
                  className="headerFirst w-72 text-start font-semibold  "
                  key={index}
                >
                  {item}
                </th>
              );
            })}
          </tr>
          {currentItems.map((val: Current, id: number) => {
            return (
              <tr
                key={id}
                className="flex w-full justify-start  border-b-2 border-slate-50 p-4 "
              >
                <td className="w-32 text-start">{val.id}</td>
                {val.imo ? <td className="w-72 text-start">{val.imo}</td> : ''}
                <td className="w-72 text-start">{val.libDTCI}</td>
                {val.libTM ? (
                  <td className="w-72 text-start">{val.libTM}</td>
                ) : (
                  ''
                )}
              </tr>
            );
          })}
        </table>
        {renderPaginationControls()}
      </div>
    </div>
  );
};

export default Tables;
