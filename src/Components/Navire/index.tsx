import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { headersNavire } from '../Data';
import usePagination from '../ui/pagination';
type BoardProps = {
  imo: string;
  nom: string;
};

const Navire = () => {
  const Navire = useServer().navire;
  // const summ = useFilter()?.sum;
  // console.log(summ);

  const [searchValue, setSearchValue] = useState<string>();
  const [searchNavire, setSearchNavire] = useState<string>();
  const TrueData = searchValue
    ? Navire.filter((val: BoardProps) =>
        val.imo.toString().includes(searchValue)
      )
    : Navire;
  const FinalData = searchNavire
    ? TrueData.filter((val: BoardProps) =>
        val.nom.toString().includes(searchNavire)
      )
    : TrueData;

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);

  const FinalPagination = FinalData.slice(startIndex, endIndex);

  const exportToExcel = () => {
    // Créer une nouvelle feuille de calcul
    const ws = XLSX.utils.json_to_sheet(TrueData);
    // Créer un nouveau classeur
    const wb = XLSX.utils.book_new();
    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, `Navires.xlsx`);
    console.log('vit');
  };

  return (
    <div className=" flex w-full flex-col gap-6 text-grayBlack ">
      <div className="flex w-full flex-wrap justify-start gap-3 gap-y-4 pb-3">
        <div>
          <p className="inline-flex items-center rounded-md bg-firstBlue p-2 text-firstColors shadow-sm shadow-slate-200">
            {' '}
            <Icon
              icon="lucide:ship"
              width="1em"
              height="1em"
              style={{ color: 'rgb(255, 255, 255)' }}
              className="mr-2"
            />
            Navires :{' '}
            <span className="pl-1 font-semibold"> {Navire.length}</span>
          </p>
        </div>

        <div className="inline-flex h-10 items-center gap-2 rounded-md p-2 shadow-sm shadow-slate-200">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.2em" height="1.2em" />
          </label>
          <input
            type="Number"
            placeholder="IMO"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            className=" h-fit w-28 border-b pb-1 text-sm  font-medium outline-none"
          />
          <input
            type="text"
            placeholder="NAVIRE"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchNavire(e.target.value);
            }}
            className=" h-fit w-36 border-b pb-1 text-sm  font-medium outline-none"
          />
        </div>

        <button
          className="inline-flex items-center rounded-md bg-[#0e5c2f] p-2 text-firstColors shadow-sm shadow-slate-200"
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
      <table className="w-full pb-6 lg:w-2/3">
        <thead>
          <tr className="grid w-full grid-cols-3 rounded-md bg-slate-50 px-2 py-4 shadow-sm ">
            {headersNavire.map((item, index) => {
              return (
                <th className=" text-start font-semibold" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FinalPagination.map((val: BoardProps, index: number) => {
            return (
              <tr
                key={index}
                className="grid w-full grid-cols-3 border-b-2  border-slate-50 px-2 py-4 "
              >
                <td className="text-start ">{index + 1}</td>
                <td className="text-start">{val.imo}</td>
                <td className="text-start ">{val.nom}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default Navire;
