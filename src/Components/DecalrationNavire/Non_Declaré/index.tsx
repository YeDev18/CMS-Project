import useExportExcel from '@/Components/ui/export-excel';
import useFilter from '@/Components/ui/FilterDeclarative';
import usePagination from '@/Components/ui/pagination';
import { useDeclarationBoard } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';

const NonDeclaration = () => {
  const { undeclared } = useDeclarationBoard();
  let Undeclared = undeclared;

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const {
    FinalData,
    MonthsYears,
    searchValue,
    portSP,
    portA,
    filterComponent,
  } = useFilter(Undeclared, 'Nom-Conforme');

  const ExcelData = FinalData.map((item: any, index: number) => ({
    Id: index,
    Imo: item?.trafic_maritime?.imo_trafic,
    Navire: item?.trafic_maritime?.nom_navire_trafic,
    Mouvement: item?.trafic_maritime.mouvement_trafic,
    Date: item?.trafic_maritime?.date_trafic.split('-').reverse().join('-'),
    Port: item?.trafic_maritime?.port_trafic,
  }));

  const { exportToExcel } = useExportExcel(ExcelData, 'non declare');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);
  const FinalPagination = FinalData.slice(startIndex, endIndex);

  return (
    <div className="relative flex size-full flex-col gap-6  ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="ph:x-circle"
            libelle="Non declarés"
            color="#F0352B"
            number={undeclared.length}
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
          {!(MonthsYears === '-') || searchValue || portA || portSP ? (
            <div className="inline-flex h-10  items-center gap-1 whitespace-nowrap rounded-md bg-[#F0352B] p-2 text-firstColors shadow-sm shadow-slate-200">
              <Icon
                icon="ph:x-circle"
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
        <Table data={FinalPagination} label="Non Declare" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default NonDeclaration;
