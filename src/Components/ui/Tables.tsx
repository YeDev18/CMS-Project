import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import * as XLSX from 'xlsx';

type Lib = {
  lib: string;
  HeaderTable: string[];
  Table: any;
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
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-bgColors hover:text-firstColors hover:border"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  return (
    <div className=" flex flex-col gap-6 text-grayBlack w-full ">
      <div className="flex justify-between w-full">
        <button className="rounded-md shadow-sm  p-2 inline-flex items-center bg-firstBlue text-firstColors">
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
          className="rounded-md shadow-sm p-2 inline-flex items-center bg-firstBlue text-firstColors"
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
      <div className=" w-full flex flex-col gap-6 ">
        <table className="w-full">
          <tr className="flex justify-start gap  p-4  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50">
            {HeaderTable.map((item, index) => {
              return (
                <th
                  className="font-semibold text-start w-72 headerFirst  "
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
                className="flex justify-start p-4  w-full border-b-2 border-slate-50 "
              >
                <td className="text-start w-40">{val.id}</td>
                {val.imo ? <td className="text-start w-72">{val.imo}</td> : ''}
                <td className="text-start w-72">{val.libDTCI}</td>
                {val.libTM ? (
                  <td className="text-start w-72">{val.libTM}</td>
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
