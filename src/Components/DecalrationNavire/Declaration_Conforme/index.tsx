import Overlay from '@/Components/DecalrationNavire/Declaration_Conforme/overlay';
import useExportExcel from '@/Components/ui/export-excel';
import usePagination from '@/Components/ui/pagination';
import { useServer } from '@/Context/ServerProvider';
import { DeclarationTypes } from '@/Types';
import { Icon } from '@iconify/react';
import React, { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';

const DeclarationConforme = () => {
  const server = useServer();
  const overlay = useServer()?.overlay;
  const conform = useServer()?.conform || [];
  console.log(conform);

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const [searchValue, setSearchValue] = useState<string>();

  const MonthsYears = formValue.years + '-' + formValue.months;
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
  const [update, setUpdate] = useState<boolean>(false);
  const [portA, setPortA] = useState<boolean>(false);
  const [portSP, setPortSP] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleUpdateFilter = () => {
    setUpdate(false);
    setPortA(false);
    setPortSP(false);
    setFormValue({ ...formValue, months: '', years: '' });

    //     setSearchValue('dc');
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
  const handleChangeCheck = () => {
    setUpdate(!update);
    server?.toInitialize();
  };
  const handleChangePortA = () => {
    setPortA(!portA);
    setPortSP(false);
    server?.toInitialize();
  };
  const handleChangePortSP = () => {
    setPortSP(!portSP);
    setPortA(false);
    server?.toInitialize();
  };

  const Filter = useMemo(() => {
    return conform?.filter((val: DeclarationTypes) =>
      val.soumission_dtci.mouvement_dtci === 'Arrivée'
        ? val.soumission_dtci.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val.soumission_dtci.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? conform : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: DeclarationTypes) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : Final;
  const dataFinalChecked = update
    ? dataFinal.filter((val: DeclarationTypes) => val.observation)
    : dataFinal;

  let FinalData = dataFinalChecked;
  if (portA) {
    FinalData = dataFinalChecked.filter(
      (val: DeclarationTypes) => val.trafic_maritime.port_trafic === 'ABIDJAN'
    );
  } else if (portSP) {
    FinalData = dataFinalChecked.filter(
      (val: DeclarationTypes) => val.trafic_maritime.port_trafic === 'SAN PEDRO'
    );
  } else {
    <></>;
  }

  const { exportToExcel } = useExportExcel(FinalData, 'Conforme');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);

  const FinalPagination = FinalData.slice(startIndex, endIndex);
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
          {showFilter ? (
            <div className="absolute top-12 z-10 flex w-80 flex-col gap-4 bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filtre</h2>
                <button onClick={handleUpdateFilter}>
                  <Icon icon="radix-icons:update" />
                </button>
              </div>

              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Periode
                </h3>
                <form action="" className="flex items-center justify-center">
                  <div className="flex h-fit w-full flex-col gap-4 whitespace-nowrap rounded-sm ">
                    <select
                      name="months"
                      id=""
                      value={formValue.months}
                      className="border border-gray-700/10 bg-firstColors  bg-none p-2"
                      onChange={e => {
                        setFormValue({
                          ...formValue,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      {AllMonths.map((month, index) => (
                        <option key={index} value={month.value}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="years"
                      id=""
                      value={formValue.years}
                      className="border border-gray-700/10 bg-firstColors bg-none  p-2 outline-none"
                      onChange={e => {
                        setFormValue({
                          ...formValue,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    >
                      {Year.map((year, index) => (
                        <option key={index} value={year.value}>
                          {year.year}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  IMO
                </h3>
                <input
                  type="number"
                  placeholder="IMO"
                  value={searchValue}
                  className="w-full rounded-sm border  border-gray-700/10 bg-firstColors bg-none p-2 outline-none "
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <div className="w-full ">
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Port
                </h3>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Port Abidjan
                    </label>
                    <input
                      type="checkbox"
                      checked={portA}
                      onChange={handleChangePortA}
                      placeholder=""
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                    />
                  </div>
                  <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                    <label
                      htmlFor=""
                      className="text-base font-normal  text-[#000]/80"
                    >
                      Port San-Pedro
                    </label>
                    <input
                      type="checkbox"
                      checked={portSP}
                      onChange={handleChangePortSP}
                      placeholder="MO"
                      className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="mb-3 rounded-md bg-[#7B7B7B]/5 p-2 text-base font-normal">
                  Mise á jour
                </h3>
                <div className="flex h-fit w-full items-center justify-between rounded-sm border border-gray-700/10 p-2 ">
                  <label
                    htmlFor=""
                    className="text-base font-normal text-[#000]/80"
                  >
                    À mettre á jour
                  </label>
                  <input
                    type="checkbox"
                    checked={update}
                    onChange={handleChangeCheck}
                    placeholder=""
                    className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
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
