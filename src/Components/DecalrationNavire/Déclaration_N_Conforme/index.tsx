import url from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { AllMonths, headerTable, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import usePagination from '../../ui/pagination';

const DeclaratioNConforme = () => {
  const server = useServer();
  const notConform = useServer().notConform;
  const user = useServer().user;
  const csrfToken = server?.csrfToken;
  const overlay = useServer().overlay;
  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const [searchValue, setSearchValue] = useState();
  const [observation, setObservation] = useState({
    observation: '',
  });
  const [tags, setTags] = useState<boolean>(false);
  const [notificationTags, setNotificationTags] = useState<boolean>(false);
  const [notificationUpdate, setNotificationUpdate] = useState<
    boolean | number
  >(0);

  const [portA, setPortA] = useState<boolean>(false);
  const [portSP, setPortSP] = useState<boolean>(false);
  const handleChangeCheck = () => {
    setTags(!tags);
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
    server?.toInitialize();
  };
  const MonthsYears = formValue.years + '-' + formValue.months;
  const [data3, setData3] = useState({
    idInstance: '',
    idSoumission: '',
    nonDTCI: '',
    imoDTCI: '',
    consignataireDTCI: '',
    mouvementDTCI: '',
    dateDTCI: '',
    nonTM: '',
    imoTM: '',
    consignataireTM: '',
    mouvementTM: '',
    dateTM: '',
    observation: '',
  });

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSubmit = (id: any, data: any) => {
    url
      .put(`api/declarationstatus/${id}/add_observation/`, data)
      .then(res => {
        server?.toInitialize();
        setNotificationTags(true);
        setTimeout(() => {
          setNotificationTags(false);
          server?.showOverlay();
        }, 2000);
      })
      .catch(error => console.log(error));
  };
  const handleUpdateSubmit = (
    id: any,
    nom_navire_dtci: any,
    date_mouvement: any,
    consignataire_dtci: any,
    observation: any
  ) => {
    url
      .put(
        `api/update-soumission-dtci-and-status/${id}/`,
        {
          nom_navire_dtci,
          date_mouvement,
          consignataire_dtci,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      )
      .then(res => {
        setNotificationUpdate(true);
        setTimeout(() => {
          server?.showOverlay();
          setNotificationUpdate(0);
        }, 2000);

        server?.toInitialize();
      })
      .catch(error => {
        setNotificationUpdate(false);
        setTimeout(() => {
          setNotificationUpdate(0);
        }, 2000);
        console.log(error);
      });
  };

  const Filter = useMemo(() => {
    return notConform.filter((val: any) =>
      val.soumission_dtci.mouvement_dtci === 'Arrivée'
        ? val.soumission_dtci.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val.soumission_dtci.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? notConform : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : Final;

  const dataFinalChecked = tags
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Decalaration non conforme.xlsx`);
  };

  const { renderPaginationControls, FinalPagination } =
    usePagination(FinalData);

  const handleChange = (val: any) => {
    server.showOverlay();
    // !data3.observation && AddUpdate();
    setData3({
      ...data3,

      idInstance: val.id,
      idSoumission: val.soumission_dtci.id,
      nonDTCI: val.soumission_dtci.nom_navire_dtci,
      imoDTCI: val.soumission_dtci.imo_dtci,
      mouvementDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
      consignataireDTCI: val.soumission_dtci.consignataire_dtci,
      dateDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée'
          ? val.soumission_dtci.eta_dtci
          : val.soumission_dtci.etd_dtci,
      nonTM: val.trafic_maritime.nom_navire_trafic,
      imoTM: val.trafic_maritime.imo_trafic,
      consignataireTM: val.trafic_maritime.consignataire_trafic,
      mouvementTM:
        val.trafic_maritime.mouvement_trafic === 'Arrivée' ? 'ETA' : 'ETD',
      dateTM: val.trafic_maritime.date_trafic.split('-').reverse().join('-'),
      observation: val.observation,
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap w-full">
        <Libelle
          icon="charm:notes-cross"
          libelle="Non Conformes"
          color="#F59069"
          number={notConform.length}
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
              {/* <span className="border border-borderColor h-4"></span> */}
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
            className=" border-b w-28 outline-none pb-1 text-sm  h-fit font-medium"
            onChange={(e: any) => {
              setSearchValue(e.target.value);
            }}
          />
          <span className="border border-borderColor h-4"></span>
          <div className="flex  justify-center items-center h-fit">
            <label htmlFor="" className="font-semibold text-sm">
              Tags
            </label>
            <input
              type="checkbox"
              checked={tags}
              onChange={handleChangeCheck}
              placeholder="IMO"
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
              placeholder="IMO"
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
              placeholder="IMO"
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
        {!(MonthsYears === '-') || searchValue || tags || portA || portSP ? (
          <div className="rounded-md bg-[#F59069] shadow-sm shadow-slate-200 p-2 inline-flex gap-1 items-center h-10 text-firstColors ">
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
      <div className="w-full h-full  overflow-x-auto  pr-2 relative">
        <table className="w-full">
          <thead>
            <tr className="gridArray6 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 sticky top-0">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className="text-start  font-semibold headerSecond "
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
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
                    {val.soumission_dtci.nom_navire_dtci}
                  </td>
                  <td className="text-start  text-sm xl:text-base headerSecond">
                    {val.soumission_dtci.imo_dtci}
                  </td>

                  <td className="text-start lg:w-40 text-sm xl:text-base headerSecond">
                    {val.soumission_dtci.mouvement_dtci}
                  </td>

                  <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base headerSecond ">
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

                  <td className="text-end lg:w-28 xl:w-48 flex gap-3  headerSecond">
                    {!val.observation ? (
                      <button onClick={() => handleChange(val)}>
                        <Icon
                          icon="mingcute:more-2-fill"
                          width="20"
                          height="20"
                        />
                      </button>
                    ) : (
                      <button
                        className="bg-[#F59069]  text-firstColors px-2 font-medium rounded-md text-sm"
                        onClick={() => handleChange(val)}
                      >
                        Mettre á jour
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {renderPaginationControls()}

      {/* OVERLAY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {overlay ? (
        <div className="absolute inset-y-2/4 w-full h-fit z-[40] justify-center items-center animate-fadIn-up">
          <div className="w-[40rem] h-fit  absolute  top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded">
            <div className="flex gap-2 justify-between py-6 flex-col bg-firstColors rounded-sm items-center h-full">
              <div className="flex justify-center items-center gap-4 w-full px-12">
                <h3 className="w-[16rem] p-2 rounded-sm bg-cyan-200 text-lg text-gray-800 font-semibold">
                  Declaration DTCI
                </h3>
                <h3 className="w-[16rem] p-2 rounded-sm bg-red-200 text-lg text-gray-800 font-semibold">
                  Declaration TM
                </h3>
              </div>
              <div className="flex gap-4 justify-center">
                <form action="" className="flex flex-col gap-3  w-[16rem]">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Imo DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.imoDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Nom DTCI
                    </label>
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                        value={data3.nonDTCI}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
                        value={data3.nonDTCI}
                        onChange={(e: any) =>
                          setData3({
                            ...data3,
                            nonDTCI: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Mouvement DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.mouvementDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date DTCI
                    </label>
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                        onChange={(e: any) =>
                          setData3({
                            ...data3,
                            dateDTCI: e.target.value
                              .split('-')
                              .reverse()
                              .join('-'),
                          })
                        }
                      />
                    )}
                  </div>
                </form>
                <form action="" className="flex flex-col gap-3 w-[16rem]">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Imo TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors w-[16rem] bg-firstColors text-sm "
                      value={data3.imoTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Nom TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.nonTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Mouvement TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.mouvementTM}
                    />
                  </div>

                  {/* <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Consignataire TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.consignataireTM}
                    />
                  </div> */}

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
                      value={data3.dateTM}
                    />
                  </div>
                </form>
              </div>

              {user.role === 'analyst' ? (
                <>
                  <div className="flex flex-col w-full px-14 gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Observation
                    </label>
                    <textarea
                      name="observation"
                      className="border outline-none p-2 h-32"
                      onChange={(e: any) =>
                        setObservation({
                          ...observation,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      {data3.observation}
                    </textarea>

                    <div
                      className={`h-8 py-4 flex justify-start items-center   gap-1 text-[#ffffff]`}
                    >
                      <Icon
                        icon="lets-icons:check-fill"
                        className={`${notificationTags && 'text-[#0e5c2f]'}`}
                      />
                      <p className={`${notificationTags && 'text-[#0e5c2f]'}`}>
                        Observation Accepté
                      </p>
                    </div>
                  </div>

                  <button
                    className="bg-firstBlue  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center transition ease-in-out delay-150 hover:scale-105 "
                    onClick={() => {
                      handleSubmit(data3.idInstance, observation);
                    }}
                  >
                    Observation
                  </button>
                </>
              ) : (
                data3.observation && (
                  <div className=" w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-1  w-[33rem]">
                      <label htmlFor="" className="text-gray-500 font-semibold">
                        Observation
                      </label>
                      <textarea
                        disabled
                        className="border outline-none p-2 h-32"
                        value={data3.observation}
                      >
                        {data3.observation}
                      </textarea>
                      <div
                        className={`h-8 py-4 flex justify-between items-center   gap-1 text-[#ffffff]`}
                      >
                        {' '}
                        <div className="flex justify-start items-center  gap-1 ">
                          <Icon
                            icon="lets-icons:check-fill"
                            className={`${
                              notificationUpdate && 'text-[#0e5c2f]'
                            }`}
                          />
                          <p
                            className={`${
                              notificationUpdate && 'text-[#0e5c2f]'
                            }`}
                          >
                            Modification reussie
                          </p>
                        </div>
                        <div className="flex justify-end items-center  gap-1 ">
                          <Icon
                            icon="lets-icons:check-fill"
                            className={`${
                              notificationUpdate === false && 'text-[#6E2920]'
                            }`}
                          />
                          <p
                            className={`${
                              notificationUpdate === false && 'text-[#6E2920]'
                            }`}
                          >
                            Modification echoue
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      // to={`/update/${data3.idInstance}`}
                      className="bg-firstBlue mt-4  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center transition ease-in-out delay-150 hover:scale-105 "
                      onClick={() =>
                        handleUpdateSubmit(
                          data3.idSoumission,
                          data3.nonDTCI,
                          data3.dateDTCI.split('-').reverse().join('-'),
                          data3.consignataireDTCI,
                          data3.observation
                        )
                      }
                    >
                      UPDATE
                    </button>
                  </div>
                )
              )}
            </div>

            <button className="absolute right-4 top-2">
              <Icon
                icon="ic:round-close"
                width="1.5em"
                height="1.5em"
                className="text-grayBlack: '#000000',"
                onClick={() => server.showOverlay()}
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

export default DeclaratioNConforme;
