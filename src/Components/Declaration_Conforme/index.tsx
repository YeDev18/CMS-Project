import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';

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

  const [current, setCurrent] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
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

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(FinalData.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="px-2 w-24 text-center">
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
    console.log('');
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Decalaration conforme.xlsx`);
  };

  return (
    <div className="w-full relative h-full flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap gap-y-4 w-full ">
        <Libelle
          icon="lucide:circle-check-big"
          libelle="Conformes"
          color="#2563eb"
          number={conform.length}
        />
        <div className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex gap-4 items-center w-fit h-10">
          <form action="" className="flex items-center justify-center">
            <label htmlFor="">
              <Icon
                icon="lucide:calendar-days"
                width="1.2em"
                height="1.2em"
                style={{ color: '#0a0a0a' }}
                className="mr-2"
              />
            </label>
            <div className="w-fit h-fit border p rounded-sm whitespace-nowrap ">
              <select
                name="months"
                id=""
                className="bg-none border-none bg-firstColors"
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
                className="bg-none border-none bg-firstColors"
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
        <div className="rounded-md shadow-sm shadow-slate-200 p-2 inline-flex gap-2 items-center h-10 ">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.1em" height="1.1em" />
          </label>
          <input
            type="number"
            placeholder="IMO"
            value={searchValue}
            className=" border-b w-28 outline-none pb-1 text-sm  h-fit font-medium"
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
          />
          <span className="border border-borderColor h-4"></span>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Mise a jour
            </label>
            <input
              type="checkbox"
              checked={update}
              onChange={handleChangeCheck}
              placeholder=""
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Port A
            </label>
            <input
              type="checkbox"
              checked={portA}
              onChange={handleChangePortA}
              placeholder=""
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Port SP
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
        {!(MonthsYears === '-') || searchValue || update || portSP || portA ? (
          <div className="rounded-md bg-[#2563eb]  shadow-sm shadow-slate-200 p-2 inline-flex gap-1 items-center h-10 text-firstColors ">
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
      <div className="w-full h-full overflow-x-auto pr-2 relative">
        <table className="w-full pb-6">
          <thead>
            <tr className="gridArray6 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className=" text-start font-semibold headerSecond"
                    key={index}
                  >
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
                    className="gridArray6 w-full border-b-2 border-slate-50 "
                  >
                    <td className="text-start text-sm xl:text-base headerSecond">
                      {index + 1}
                    </td>
                    <td className="text-start whitespace-normal text-sm xl:text-sm headerSecond">
                      {val.soumission_dtci.nom_navire_dtci}
                    </td>
                    <td className="text-start text-sm xl:text-base headerSecond">
                      {val.soumission_dtci.imo_dtci}
                    </td>
                    <td className="text-start lg:w-40 text-sm xl:text-base headerSecond">
                      {val.soumission_dtci.mouvement_dtci}
                    </td>

                    <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base headerSecond">
                      {val.soumission_dtci.mouvement_dtci === 'Arrivée'
                        ? val.soumission_dtci.eta_dtci
                            .split('-')
                            .reverse()
                            .join('-')
                        : val.soumission_dtci.etd_dtci
                            .split('-')
                            .reverse()
                            .join('-')}
                    </td>
                    <td className="text-start  text-sm xl:text-base ">
                      <button onClick={() => handleChange(val)}>
                        <Icon
                          icon="weui:eyes-on-filled"
                          width="1em"
                          height="1em"
                        />
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      {renderPaginationControls()}

      {/* OVERLAY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {overlay ? (
        <div className="absolute inset-y-2/4 w-full h-fit justify-center z-50 items-center animate-fadIn-up ">
          <div className="w-96 h-fit absolute z-[2] inset-1/2 flex flex-col justify-center items-center gap-2 bg-firstColors -translate-x-2/4  -translate-y-2/4 shadow-sm shadow-slate-100 rounded-sm p-6">
            <div className="flex flex-col gap-1 w-full px-2">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Date de declaration
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.dateDeclaration}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2">
              <label htmlFor="" className="text-gray-500 font-semibold">
                IMO
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.imoDTCI}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2 ">
              <label htmlFor="" className="text-gray-500 font-semibold">
                MRN
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.mrn}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Nom
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.nonDTCI}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Mouvement
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.mouvementDTCI}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2 ">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Consignataire
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.consignataireDTCI}
              />
            </div>
            <div className="flex flex-col gap-1 w-full px-2 ">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Port
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.port}
              />
            </div>

            <div className="flex flex-col gap-1 w-full px-2 ">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Numero Voyage
              </label>
              <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.numVoyage}
              />
              {/* <input
                disabled
                type="text"
                className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                value={data3.dateTm}
              /> */}
            </div>

            <button
              className="absolute right-4 top-2"
              onClick={() => server?.showOverlay()}
            >
              <Icon
                icon="majesticons:close"
                width="1.5em"
                height="1.5em"
                className="text-black"
              />
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DeclarationConforme;
