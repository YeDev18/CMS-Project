import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { headersNavire } from '../Data';

const Navire = () => {
  const Navire = useServer().navire;

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
    const totalPages = Math.ceil(TrueData.length / itemsPerPage);
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
  const [searchNavire, setSearchNavire] = useState();
  const TrueData = searchValue
    ? Navire.filter((val: any) => val.imo.toString().includes(searchValue))
    : Navire;
  const FinalData = searchNavire
    ? TrueData.filter((val: any) => val.nom.toString().includes(searchNavire))
    : TrueData;

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
    <div className=" flex flex-col gap-6 text-grayBlack w-full ">
      <div className="flex justify-start gap-3 flex-wrap gap-y-4 w-full pb-3">
        <div>
          <p className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-firstBlue text-firstColors">
            {' '}
            <Icon
              icon="lucide:ship"
              width="1em"
              height="1em"
              style={{ color: 'rgb(255, 255, 255)' }}
              className="mr-2"
            />
            Navires :{' '}
            <span className="font-semibold pl-1"> {Navire.length}</span>
          </p>
        </div>

        <div className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex gap-2 items-center h-10">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.2em" height="1.2em" />
          </label>
          <input
            type="Number"
            placeholder="IMO"
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
            className=" border-b w-28 outline-none pb-1 text-sm  h-fit font-medium"
          />
          <input
            type="text"
            placeholder="NAVIRE"
            onChange={(e: any) => {
              setSearchNavire(e.target.value);
            }}
            className=" border-b w-38 outline-none pb-1 text-sm  h-fit font-medium"
          />
        </div>

        <button
          className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#0e5c2f] text-firstColors"
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
      <table className="w-full lg:w-2/3 pb-6">
        <thead>
          <tr className="grid grid-cols-3 py-4 px-2 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
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
          {FinalData.slice(startIndex, endIndex).map(
            (val: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="grid grid-cols-3 py-4 px-2  w-full border-b-2 border-slate-50 "
                >
                  <td className="text-start ">{index + 1}</td>
                  <td className="text-start">{val.imo}</td>
                  <td className="text-start ">{val.nom}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default Navire;
