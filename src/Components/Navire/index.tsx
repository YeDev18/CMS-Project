import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { headersNavire } from '../Data';

const Navire = () => {
  const data = useServer().navire;

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

  const Navire = data.map((item: any, index: number) => ({
    id: index,
    imo: item.imo,
    nom: item.nom,
  }));

  const [searchValue, setSearchValue] = useState();
  const TrueData = searchValue
    ? Navire.filter((val: any) => val.imo.toString().includes(searchValue))
    : Navire;

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
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <p className="rounded-md shadow-sm  p-2 inline-flex items-center bg-firstBlue text-firstColors">
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
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <label htmlFor="">
              <Icon icon="mdi:search" width="1.5em" height="1.5em" />
            </label>
            <input
              type="Number"
              placeholder="IMO"
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
              className="border w-48 outline-none p-1 rounded-sm text-sm font-medium"
            />
          </div>
        </div>

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
      <table className="w-full pb-6">
        <tr className="flex justify-start  py-4 px-4  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
          {headersNavire.map((item, index) => {
            return (
              <th
                className=" text-start font-semibold lg:w-28 xl:w-72 headerFirst"
                key={index}
              >
                {item}
              </th>
            );
          })}
        </tr>
        {TrueData.slice(startIndex, endIndex).map((val: any, index: number) => {
          return (
            <tr
              key={index}
              className="flex justify-start p-4  w-full border-b-2 border-slate-50 "
            >
              <td className="text-start w-32">{index + 1}</td>
              <td className="text-start w-72">{val.imo}</td>
              <td className="text-start w-72">{val.nom}</td>
            </tr>
          );
        })}
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default Navire;
