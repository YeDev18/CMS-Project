import useFilter from '@/Components/ui/FilterDeclarative';
import useExportExcel from '@/Components/ui/export-excel';
import useMutateHook from '@/Components/ui/useMutateHook';
import { useUser } from '@/Context/AuthProvider';
import { useDeclarationBoard, useServer } from '@/Context/ServerProvider';
import { DeclarationTypes } from '@/Types';
import url from '@/api';
import { Icon } from '@iconify/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Libelle from '../../ui/Libelle';
import usePagination from '../../ui/pagination';
import Table from '../table-compare';

type ObservationProps = {
  observation: string;
};

const DeclaratioNConforme = () => {
  const queryClient = useQueryClient();
  const server = useServer();
  const { notConform } = useDeclarationBoard();
  let NotConform = notConform;
  const { user } = useUser();
  const overlay = useServer()?.overlay;

  const [observation, setObservation] = useState({
    observation: '',
  });
  // function getCookie(name: string) {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== '') {
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === name + '=') {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // }
  // const csrfToken = getCookie('csrftoken');

  const getCsrf = async () => {
    try {
      const response = await url.get('/api/get-csrf-token/');
      const valueToken = response.data.csrfToken;

      return valueToken;
    } catch (error) {
      console.error('Erreur lors de la recuperation du crsf : ', error);
      throw error;
    }
  };

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
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

  const ADD_OB = async (data: ObservationProps) => {
    const crsfToken = await getCsrf();
    url.put(
      `/api/declarationstatus/${Number(data3.idInstance)}/add_observation/`,
      JSON.stringify(data),
      {
        headers: {
          Referer: 'https://cmscontrole.com/app',
          'X-CSRFToken': crsfToken,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  };
  const ADD_BOARD = async (
    nom_navire_dtci: string,
    date_mouvement: string,
    consignataire_dtci: string
  ) => {
    const crsfToken = await getCsrf();
    url.put(
      `api/update-soumission-dtci-and-status/${Number(data3.idSoumission)}/`,
      {
        nom_navire_dtci,
        date_mouvement,
        consignataire_dtci,
      },
      {
        headers: {
          Referer: 'https://cmscontrole.com/app',
          'X-CSRFToken': crsfToken,
          'Content-Type': 'application/json', // Ajout du bon en-tête
        },
        withCredentials: true,
      }
    );
  };

  const addObservation = useMutateHook({
    mutationFn: ADD_OB,
    onSuccess: () => {
      console.log('Ajoute');
      queryClient.invalidateQueries({ queryKey: ['control_board'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de modification observation :', error);
    },
  });

  const addUdapte = useMutateHook({
    mutationFn: ADD_BOARD,
    onSuccess: () => {
      console.log('Ajoute');
      queryClient.invalidateQueries({ queryKey: ['control_board'] });
    },
    onError: (error: TypeError) => {
      console.error('Erreur lors de modification observation :', error);
    },
  });

  const Observation = (data: any) => {
    return addObservation.mutate(data);
  };
  const BoardObservation = (nom_navire_dtci: any, date_mouvement: any) => {
    return addUdapte.mutate(nom_navire_dtci, date_mouvement);
  };

  const {
    dataTagsChecked,
    MonthsYears,
    searchValue,
    portSP,
    portA,
    filterComponent,
    tags,
  } = useFilter(NotConform, 'NConforme');

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(dataTagsChecked);

  const handleChange = (val: DeclarationTypes) => {
    server?.showOverlay();
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
  const modifiedData = dataTagsChecked.map((item: any, index: number) => ({
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

  const { exportToExcel } = useExportExcel(modifiedData, 'Non_Conforme');
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
                        className={`${
                          addObservation.isSuccess && 'text-[#0e5c2f]'
                        }`}
                      />
                      <p
                        className={`${
                          addObservation.isSuccess && 'text-[#0e5c2f]'
                        }`}
                      >
                        Observation Accepté
                      </p>
                    </div>
                  </div>

                  <button
                    className="flex  h-12 w-40 cursor-pointer items-center justify-center rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
                    onClick={() => {
                      Observation(observation);
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
                              addUdapte.isSuccess && 'text-[#0e5c2f]'
                            }`}
                          />
                          <p
                            className={`${
                              addUdapte.isSuccess && 'text-[#0e5c2f]'
                            }`}
                          >
                            Modification reussie
                          </p>
                        </div>
                        <div className="flex items-center justify-end  gap-1 ">
                          <Icon
                            icon="lets-icons:check-fill"
                            className={`${
                              addUdapte.isError && 'text-[#6E2920]'
                            }`}
                          />
                          <p
                            className={`${
                              addUdapte.isError && 'text-[#6E2920]'
                            }`}
                          >
                            Modification echoue
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="mt-4 flex  h-12 w-40 cursor-pointer items-center justify-center rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
                      onClick={() =>
                        BoardObservation(
                          data3.nonDTCI,
                          data3.dateDTCI.split('-').reverse().join('-')
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
