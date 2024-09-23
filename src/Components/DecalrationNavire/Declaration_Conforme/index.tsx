import Overlay from '@/Components/DecalrationNavire/Declaration_Conforme/overlay';
import useExportExcel from '@/Components/ui/export-excel';
import usePagination from '@/Components/ui/pagination';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import Table from '../table-compare';

const DeclarationConforme = () => {
  const server = useServer();
  const overlay = useServer().overlay;
  const conform = useServer().conform;

  const Data3: any = [];

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const [searchValue, setSearchValue] = useState();

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
    tonage: '',
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
    FinalData == Final;
    //     setSearchValue('dc');
  };
  const handleChange = (val: any) => {
    server.showOverlay();
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
      tonage: val?.soumission_dtci?.tonage_facture_dtci,
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
    return conform.filter((val: any) =>
      val.soumission_dtci.mouvement_dtci === 'Arrivée'
        ? val.soumission_dtci.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val.soumission_dtci.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? conform : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : Final;
  const dataFinalChecked = update
    ? dataFinal.filter((val: any) => val.observation)
    : dataFinal;

  let FinalData = dataFinalChecked;
  if (portA) {
    FinalData = dataFinalChecked.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'ABIDJAN'
    );
  } else if (portSP) {
    FinalData = dataFinalChecked.filter(
      (val: any) => val.trafic_maritime.port_trafic === 'SAN PEDRO'
    );
  } else {
    ('');
  }

  const modifiedData = FinalData.map((item: any, index: number) => ({
    Id: index,
    DateDeclaration: item?.soumission_dtci.date_declaration_dtci
      .split('-')
      .reverse()
      .join('-'),
    Port: item?.soumission_dtci.port_dtci,
    Imo: item?.soumission_dtci?.imo_dtci,
    Navire: item?.soumission_dtci?.nom_navire_dtci,
    Mrn: item?.soumission_dtci?.mrn_dtci,
    Consignataire: item?.soumission_dtci?.consignataire_dtci,
    Tonnage: item?.soumission_dtci?.tonnage_facture_dtci,
    Numero_de_Voyage: item?.soumission_dtci?.numero_voyage_dtci,
    Mouvement:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? 'Arrivée'
        : 'Depart',
    Date:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? item?.soumission_dtci?.eta_dtci.split('-').reverse().join('-')
        : item?.soumission_dtci?.etd_dtci.split('-').reverse().join('-'),
  }));
  for (let index = 1; index < modifiedData.length; index++) {
    Data3.push(modifiedData[index]);
  }

  const { exportToExcel } = useExportExcel(FinalData, 'Conforme');

  const { renderPaginationControls, startIndex, endIndex } =
    usePagination(FinalData);

  let FinalPagination = FinalData.slice(startIndex, endIndex);
  return (
    <div className="w-full relative h-full flex flex-col gap-6 ">
      <div className="flex justify-between gap-2 gap-y-4 w-full relative">
        <div className="flex gap-4">
          {' '}
          <Libelle
            icon="lucide:circle-check-big"
            libelle="Conformes"
            color="#2563eb"
            number={conform.length}
          />
          <button
            className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#0e5c2f] text-firstColors text-sm h-10 "
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
            <div className="rounded-md bg-[#2563eb]  shadow-sm shadow-slate-200 p-2 inline-flex gap-1 items-center h-10 text-firstColors whitespace-nowrap ">
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

        <div className="z-10 static  w-full flex justify-end ">
          <button
            className="rounded-md  whitespace-nowrap shadow-sm shadow-slate-200 p-2 inline-flex items-center bg-[#191114]  text-sm  text-firstColors font-semibold h-10 "
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
            <div className="bg-white z-3 absolute top-12 shadow w-80 p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl">Filtre</h2>
                <button onClick={handleUpdateFilter}>
                  <Icon icon="radix-icons:update" />
                </button>
              </div>

              <div className="w-full ">
                {' '}
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Periode
                </h3>
                <form action="" className="flex items-center justify-center">
                  <div className="w-full h-fit rounded-sm whitespace-nowrap flex flex-col gap-4 ">
                    <select
                      name="months"
                      id=""
                      value={formValue.months}
                      className="bg-none border border-gray-700/10  bg-firstColors p-2"
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
                      className="bg-none border outline-none border-gray-700/10  bg-firstColors p-2"
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
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  IMO
                </h3>
                <input
                  type="number"
                  placeholder="IMO"
                  value={searchValue}
                  className="bg-none border border-gray-700/10  bg-firstColors p-2 w-full rounded-sm outline-none "
                  onChange={(e: any) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <div className="w-full ">
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Port
                </h3>
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Port Abidjan
                    </label>
                    <input
                      type="checkbox"
                      checked={portA}
                      onChange={handleChangePortA}
                      placeholder=""
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                  <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                    <label
                      htmlFor=""
                      className="font-normal text-base  text-[#000]/80"
                    >
                      Port San-Pedro
                    </label>
                    <input
                      type="checkbox"
                      checked={portSP}
                      onChange={handleChangePortSP}
                      placeholder="MO"
                      className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full ">
                {' '}
                <h3 className="font-normal bg-[#7B7B7B]/5 p-2 rounded-md mb-3 text-base">
                  Mise á jour
                </h3>
                <div className="flex justify-between items-center h-fit w-full p-2 rounded-sm border border-gray-700/10 ">
                  <label
                    htmlFor=""
                    className="font-normal text-base text-[#000]/80"
                  >
                    À mettre á jour
                  </label>
                  <input
                    type="checkbox"
                    checked={update}
                    onChange={handleChangeCheck}
                    placeholder=""
                    className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="w-full h-full overflow-x-auto pr-2 relative">
        <Table data={FinalPagination} label="conform" onClick={handleChange} />
      </div>
      {renderPaginationControls()}

      {/* OVERLAY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {overlay ? <Overlay data={data3} /> : ''}
    </div>
  );
};

export default DeclarationConforme;
