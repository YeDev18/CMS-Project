import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { headersConsignataires } from '../Data';
import useExportExcel from '../ui/export-excel';
import usePagination from '../ui/pagination';

type ConsigneeProps = {
  item: number;
  imo: string;
  nom: string;
};
const Consignataire = () => {
  const data = useServer().consignataire;

  const Consignataire = data.map((item: ConsigneeProps, index: number) => ({
    id: index + 1,
    imo: item.imo,
    nom: item.nom,
  }));

  const [searchValue, setSearchValue] = useState<string>();

  const TrueData = searchValue
    ? Consignataire.filter((val: ConsigneeProps) =>
        val.nom.includes(searchValue)
      )
    : Consignataire;

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(TrueData);
  const FinalPagination = TrueData.slice(startIndex, endIndex);

  const { exportToExcel } = useExportExcel(FinalPagination, 'Consignataire');

  return (
    <div className=" flex w-full flex-col justify-between gap-6 text-grayBlack ">
      <div className="flex h-10 w-full justify-start gap-3">
        <p className="inline-flex items-center  rounded-md bg-firstBlue p-2 text-firstColors shadow-sm">
          {' '}
          <Icon
            icon="lucide:contact"
            width="1em"
            height="1em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          Consignatires :{' '}
          <span className="pl-1 font-semibold"> {data.length}</span>
        </p>
        <div className="inline-flex items-center gap-4 rounded-md p-2 shadow-sm shadow-slate-200">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.5em" height="1.5em" />
          </label>
          <input
            type="text"
            placeholder="Consignataire"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
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
      <table className="size-full pb-6 lg:w-3/4">
        <thead>
          <tr className="flex w-full justify-start  rounded-md bg-slate-50 p-4 shadow-sm ">
            {headersConsignataires.map((item, index) => {
              return (
                <th
                  className=" headerFirst text-start font-semibold lg:w-28 xl:w-72"
                  key={index}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FinalPagination.map((val: ConsigneeProps, index: number) => {
            return (
              <tr
                key={index}
                className="flex w-full justify-start  border-b-2 border-slate-50 p-4 "
              >
                <td className="w-32 text-start">{index + 1}</td>
                <td className="w-96 text-start">{val.nom}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default Consignataire;
