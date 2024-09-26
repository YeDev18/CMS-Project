import useExportExcel from '@/Components/ui/export-excel';
import useFilter from '@/Components/ui/FilterDeclarative';
import usePagination from '@/Components/ui/pagination';
import { useTonnesBoard } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { headerTable } from '../../Data';
import Libelle from '../../ui/Libelle';
const T_NonDeclare = () => {
  const { undeclaredTonnages } = useTonnesBoard();
  let UndeclaredTonnages = undeclaredTonnages;

  const {
    FinalData,
    MonthsYears,
    searchValue,
    update,
    portSP,
    portA,
    filterComponent,
  } = useFilter(UndeclaredTonnages, 'TonnagesND');

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const { exportToExcel } = useExportExcel(
    UndeclaredTonnages,
    'Tonnages Non Declare'
  );

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(FinalData);
  const FinalPagination = FinalData.slice(startIndex, endIndex);

  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="lucide:anvil"
            libelle="Non declarés"
            color="#F0352B"
            number={UndeclaredTonnages.length}
          />
          <button
            className="inline-flex  h-10 items-center whitespace-nowrap rounded-md bg-[#0e5c2f] p-2 text-sm text-firstColors shadow-sm shadow-slate-200 "
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
          {!(MonthsYears === '-') ||
          searchValue ||
          update ||
          portSP ||
          portA ? (
            <div className="inline-flex h-10  items-center gap-1 whitespace-nowrap rounded-md bg-[#2563eb] p-2 text-firstColors shadow-sm shadow-slate-200 ">
              <Icon
                icon="charm:notes-cross"
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

        <div className="static z-10  flex w-full justify-end ">
          <button
            className="inline-flex  h-10 items-center whitespace-nowrap rounded-md bg-[#191114] p-2 text-sm  font-semibold  text-firstColors shadow-sm shadow-slate-200 "
            onClick={handleShowFilter}
          >
            <Icon
              icon="gridicons:filter"
              width="1.2em"
              height="1.2em"
              className="mr-2"
            />
            Filtre
          </button>
          {showFilter ? filterComponent() : ''}
        </div>
      </div>
      <div className="relative size-full overflow-x-auto  pr-2">
        <table className="w-full">
          <thead>
            <tr className="gridArray6 sticky top-0 w-full rounded-md bg-slate-50 shadow-sm">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className="headerSecond  text-start font-semibold "
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {FinalPagination.map((val: any, index: number) => {
            return (
              <tr
                key={index}
                className="gridArray6 w-full border-b-2 border-slate-50 "
              >
                <td className="text-start text-sm xl:text-base headerSecond">
                  {index + 1}
                </td>
                <td className="text-start  text-sm xl:text-sm headerSecond">
                  {val.data_port.Nom_Navire_port}
                </td>
                <td className="text-start  text-sm xl:text-base headerSecond">
                  {val.data_port.Imo_Navire_port}
                </td>

                <td className="text-start lg:w-40 text-sm xl:text-base headerSecond">
                  {val.data_port.Mouvement_port}
                </td>

                <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base headerSecond ">
                  {val.data_port.Date_Mouvement_port}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_NonDeclare;
