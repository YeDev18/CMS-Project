import useExportExcel from '@/Components/ui/export-excel';
import useFilter from '@/Components/ui/FilterTonnage';
import usePagination from '@/Components/ui/pagination';
import { useTonnesBoard } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';

import { useState } from 'react';
import Libelle from '../../ui/Libelle';
import Table from '../table-tonnages';
const T_NonConforme = () => {
  const { notConformTonnages } = useTonnesBoard();
  let NotConformTonnages = notConformTonnages;
  console.log(NotConformTonnages);
  const {
    FinalData,
    MonthsYears,
    searchValue,
    update,
    portSP,
    portA,
    filterComponent,
  } = useFilter(NotConformTonnages, 'TonnagesNC');

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const { exportToExcel } = useExportExcel(FinalData, 'Tonnages Non conforme');

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(FinalData);
  const FinalPagination = FinalData.slice(startIndex, endIndex);
  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="lucide:anvil"
            libelle="Nom comfomes"
            color="#F59069"
            number={NotConformTonnages.length}
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
        <Table data={FinalPagination} label="Non-comforme" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_NonConforme;
