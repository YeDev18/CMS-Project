import url from '@/api';
import useExportExcel from '@/Components/ui/export-excel';
import { useUser } from '@/Context/AuthProvider';
import { useDeclarationBoard, useServer } from '@/Context/ServerProvider';
import { DataProps, DeclarationTypes } from '@/Types';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import usePagination from '../../ui/pagination';
import Table from '../table-compare';

type ObservationProps = {
  observation: string;
};

const DeclaratioNConforme = () => {
  const server = useServer();
  const { notConform } = useDeclarationBoard();
  let NotConform = notConform;
  const { user } = useUser();

  const User = user;
  const csrfToken = server?.csrfToken;
  const overlay = useServer()?.overlay;
  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const [searchValue, setSearchValue] = useState<string>();
  const [observation, setObservation] = useState<ObservationProps>({
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
    dateTm: '',
    observation: '',
  });
  const handleSubmit = (id: number, data: DataProps) => {
    url
      .put(`api/declarationstatus/${id}/add_observation/`, data)
      .then(res => {
        console.log(res);
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
    id: string,
    nom_navire_dtci: string,
    date_mouvement: string,
    consignataire_dtci: string
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
        console.log(res);
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
    return NotConform.filter((val: DeclarationTypes) =>
      val.soumission_dtci.mouvement_dtci === 'Arrivée'
        ? val.soumission_dtci.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val.soumission_dtci.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? notConform : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: DeclarationTypes) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : Final;

  const dataFinalChecked = tags
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
    console.log('');
  }

  const { exportToExcel } = useExportExcel(FinalData, 'nom declare');

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(FinalData);

  const handleChange = (val: DeclarationTypes) => {
    server?.showOverlay();
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
  const FinalPagination = FinalData.slice(startIndex, endIndex);
  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="flex w-full flex-wrap justify-start gap-2">
        <Libelle
          icon="charm:notes-cross"
          libelle="Non Conformes"
          color="#F59069"
          number={notConform.length}
        />
        <div className="inline-flex h-10 w-fit items-center gap-4 rounded-md p-2 shadow-sm shadow-slate-200">
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
            <div className="size-fit whitespace-nowrap rounded-sm border ">
              <select
                name="months"
                id=""
                className="border-none bg-firstColors bg-none"
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
                className="border-none bg-firstColors bg-none"
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
        <div className="inline-flex h-10 items-center gap-2 rounded-md p-2 shadow-sm shadow-slate-200 ">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.1em" height="1.1em" />
          </label>
          <input
            type="number"
            placeholder="IMO"
            className=" h-fit w-28 border-b pb-1 text-sm  font-medium outline-none"
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          />
          <span className="h-4 border"></span>
          <div className="flex  h-fit items-center justify-center">
            <label htmlFor="" className="text-sm font-semibold">
              Tags
            </label>
            <input
              type="checkbox"
              checked={tags}
              onChange={handleChangeCheck}
              placeholder="IMO"
              className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
            />
          </div>
          <div className="flex  h-fit items-center justify-center">
            <label htmlFor="" className="text-sm font-semibold">
              Port A
            </label>
            <input
              type="checkbox"
              checked={portA}
              onChange={handleChangePortA}
              placeholder="IMO"
              className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
            />
          </div>
          <div className="flex  h-fit items-center justify-center">
            <label htmlFor="" className="text-sm font-semibold">
              Port SP
            </label>
            <input
              type="checkbox"
              checked={portSP}
              onChange={handleChangePortSP}
              placeholder="IMO"
              className="h-4 w-8 rounded-sm border p-1 text-2xl font-medium outline-none"
            />
          </div>
        </div>
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
        {!(MonthsYears === '-') || searchValue || tags || portA || portSP ? (
          <div className="inline-flex h-10 items-center gap-1 rounded-md bg-[#F59069] p-2 text-firstColors shadow-sm shadow-slate-200 ">
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
      <div className="relative size-full  overflow-x-auto  pr-2">
        <Table
          data={FinalPagination}
          label="Non-conform"
          onClick={handleChange}
        />
      </div>

      {renderPaginationControls()}

      {/* OVERLAY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      */}
      {overlay ? (
        <div className="absolute inset-y-2/4 z-40 h-fit w-full animate-fadIn-up items-center justify-center">
          <div className="absolute left-2/4  top-2/4  h-fit w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded">
            <div className="flex h-full flex-col items-center justify-between gap-2 rounded-sm bg-firstColors py-6">
              <div className="flex w-full items-center justify-center gap-4 px-12">
                <h3 className="w-64 rounded-sm bg-cyan-200 p-2 text-lg font-semibold text-gray-800">
                  Declaration DTCI
                </h3>
                <h3 className="w-64 rounded-sm bg-red-200 p-2 text-lg font-semibold text-gray-800">
                  Declaration TM
                </h3>
              </div>
              <div className="flex justify-center gap-4">
                <form action="" className="flex w-64 flex-col  gap-3">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Imo DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
                      value={data3.imoDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Nom DTCI
                    </label>
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
                        value={data3.nonDTCI}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm outline-none focus:border-none focus:outline-none focus:ring"
                        value={data3.nonDTCI}
                        onChange={event =>
                          setData3({
                            ...data3,
                            nonDTCI: event.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Mouvement DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
                      value={data3.mouvementDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Date DTCI
                    </label>
                    {user?.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" rounded-sm border border-red-500 bg-firstColors p-2 text-sm"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" rounded-sm border border-red-500 bg-firstColors p-2 text-sm outline-none focus:border-none focus:outline-none focus:ring"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                        onChange={event =>
                          setData3({
                            ...data3,
                            dateDTCI: event.target.value
                              .split('-')
                              .reverse()
                              .join('-'),
                          })
                        }
                      />
                    )}
                  </div>
                </form>
                <form action="" className="flex w-64 flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Imo TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" w-64 rounded-sm border border-shadowColors bg-firstColors p-2 text-sm "
                      value={data3.imoTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Nom TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
                      value={data3.nonTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Mouvement TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
                      value={data3.mouvementTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Date TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" rounded-sm border border-red-500 bg-firstColors p-2 text-sm"
                      value={data3.dateTM}
                    />
                  </div>
                </form>
              </div>

              {user.role === 'analyst' ? (
                <>
                  <div className="flex w-full flex-col gap-1 px-14">
                    <label htmlFor="" className="font-semibold text-gray-500">
                      Observation
                    </label>
                    <textarea
                      name="observation"
                      className="h-32 border p-2 outline-none"
                      onChange={event =>
                        setObservation({
                          ...observation,
                          [event.target.name]: event.target.value,
                        })
                      }
                    >
                      {data3.observation}
                    </textarea>

                    <div
                      className={`flex h-8 items-center justify-start gap-1   py-4 text-[#ffffff]`}
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
                    className="flex  h-12 w-40 cursor-pointer items-center justify-center rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
                    onClick={() => {
                      handleSubmit(data3.idInstance, observation);
                    }}
                  >
                    Observation
                  </button>
                </>
              ) : (
                data3.observation && (
                  <div className=" flex w-full flex-col items-center justify-center">
                    <div className="flex w-[33rem] flex-col  gap-1">
                      <label htmlFor="" className="font-semibold text-gray-500">
                        Observation
                      </label>
                      <textarea
                        disabled
                        className="h-32 border p-2 outline-none"
                        value={data3.observation}
                      >
                        {data3.observation}
                      </textarea>
                      <div
                        className={`flex h-8 items-center justify-between gap-1   py-4 text-[#ffffff]`}
                      >
                        {' '}
                        <div className="flex items-center justify-start  gap-1 ">
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
                        <div className="flex items-center justify-end  gap-1 ">
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
                      className="mt-4 flex  h-12 w-40 cursor-pointer items-center justify-center rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
                      onClick={() =>
                        handleUpdateSubmit(
                          data3.idSoumission,
                          data3.nonDTCI,
                          data3.dateDTCI.split('-').reverse().join('-'),
                          data3.consignataireDTCI
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
                className="text-grayBlack"
                onClick={() => server?.showOverlay()}
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
