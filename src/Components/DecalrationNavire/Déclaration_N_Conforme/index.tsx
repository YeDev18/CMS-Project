import url from '@/api';
import useExportExcel from '@/Components/ui/export-excel';
import useFilter from '@/Components/ui/FilterDeclarative';
import { useUser } from '@/Context/AuthProvider';
import { useDeclarationBoard, useServer } from '@/Context/ServerProvider';
import { DeclarationTypes } from '@/Types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
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

  const csrfToken = server?.csrfToken;
  const overlay = useServer()?.overlay;

  const [observation, setObservation] = useState({
    observation: '',
  });
  const [tags, setTags] = useState<boolean>(false);
  const [notificationTags, setNotificationTags] = useState<boolean>(false);
  const [notificationUpdate, setNotificationUpdate] = useState<
    boolean | number
  >(0);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleChangeCheck = () => {
    setTags(!tags);
    server?.toInitialize();
  };

  const [data3, setData3] = useState({
    idInstance: '',
    idSoumission: 0,
    nonDTCI: '',
    imoDTCI: '',
    consignataireDTCI: '',
    mouvementDTCI: '',
    dateDTCI: '',
    nonTM: '',
    imoTM: 0,
    consignataireTM: '',
    mouvementTM: '',
    dateTm: '',
    observation: '',
  });
  const handleSubmit = (id: number, data: ObservationProps) => {
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

  const {
    dataTagsChecked,
    MonthsYears,
    searchValue,
    portSP,
    portA,
    filterComponent,
  } = useFilter(NotConform, 'NConforme');

  const { exportToExcel } = useExportExcel(dataTagsChecked, 'nom declare');

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(dataTagsChecked);

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
      dateTm: val.trafic_maritime.date_trafic.split('-').reverse().join('-'),
      observation: val.observation,
    });
  };
  const FinalPagination = dataTagsChecked.slice(startIndex, endIndex);
  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="relative flex w-full justify-between gap-2 gap-y-4">
        <div className="flex gap-4">
          <Libelle
            icon="charm:notes-cross"
            libelle="Non Conformes"
            color="#F59069"
            number={notConform.length}
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
          {!(MonthsYears === '-') || searchValue || tags || portA || portSP ? (
            <div className="inline-flex h-10 items-center gap-1 rounded-md bg-[#F59069] p-2 text-firstColors shadow-sm shadow-slate-200  whitespace-nowrap">
              <Icon
                icon="charm:notes-cross"
                width="1.2em"
                height="1.2em"
                className="mr-2"
              />
              Quantite : {dataTagsChecked.length}
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
                      value={data3.dateTm}
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
                      handleSubmit(Number(data3.idInstance), observation);
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
                          data3.idSoumission.toString(),
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
