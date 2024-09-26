import Overlay from '@/Components/DecalrationNavire/Declaration_Conforme/overlay';
import useExportExcel from '@/Components/ui/export-excel';
import useFilter from '@/Components/ui/FilterDeclarative';
import usePagination from '@/Components/ui/pagination';
import { useDeclarationBoard, useServer } from '@/Context/ServerProvider';
import { DeclarationTypes } from '@/Types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';

const DeclarationConforme = () => {
  const server = useServer();
  const overlay = server?.overlay;
  const { conform } = useDeclarationBoard();
  let Conform = conform;

  const [data3, setDate3] = useState({
    idInstance: '',
    nonDTCI: '',
    imoDTCI: '',
    consignataireDTCI: '',
    mouvementDTCI: '',
    dateDTCI: '',
    dateDeclaration: '',
    port: '',
    typeNavire: '',
    mrn: '',
    numVoyage: '',
    consignataire: '',
    tonnage: '',
    observation: '',
    dateTm: '',
  });

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleChange = (val: DeclarationTypes) => {
    server?.showOverlay();
    setDate3({
      ...data3,
      idInstance: val.id,
      observation: val.observation,
      nonDTCI: val.soumission_dtci.nom_navire_dtci,
      imoDTCI: val.soumission_dtci.imo_dtci,
      mouvementDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée' ? 'Arrivée' : 'Départ',
      consignataireDTCI: val.soumission_dtci.consignataire_dtci,
      dateDeclaration: val?.soumission_dtci?.date_declaration_dtci
        .split('-')
        .reverse()
        .join('-'),
      port: val?.soumission_dtci?.port_dtci,
      typeNavire: val?.soumission_dtci?.type_de_navire_dtci,
      mrn: val?.soumission_dtci?.mrn_dtci,
      numVoyage: val?.soumission_dtci?.numero_voyage_dtci,
      consignataire: val?.soumission_dtci?.consignataire_dtci,
      dateDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée'
          ? val.soumission_dtci.eta_dtci.split('-').reverse().join('-')
          : val.soumission_dtci.etd_dtci.split('-').reverse().join('-'),
      dateTm: val.trafic_maritime.date_trafic,
    });
  };

  // }
  const {
    dataFinalChecked,
    MonthsYears,
    searchValue,
    update,
    portSP,
    portA,
    filterComponent,
  } = useFilter(Conform, 'Conforme');

  const { exportToExcel } = useExportExcel(dataFinalChecked, 'Conforme');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(dataFinalChecked);

  const FinalPagination = dataFinalChecked.slice(startIndex, endIndex);

  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          {' '}
          <Libelle
            icon="lucide:circle-check-big"
            libelle="Conformes"
            color="#2563eb"
            number={conform.length}
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
              Quantite : {dataFinalChecked.length}
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
      <div className="relative size-full overflow-x-auto pr-2">
        <Table data={FinalPagination} label="conform" onClick={handleChange} />
      </div>
      {renderPaginationControls()}

      {/* OVERLAY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {overlay ? <Overlay data={data3} /> : ''}
    </div>
  );
};

export default DeclarationConforme;
