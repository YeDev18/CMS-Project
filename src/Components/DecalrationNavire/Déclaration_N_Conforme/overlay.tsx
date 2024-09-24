import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const overlay = ({ data, val }: any) => {
  const server = useServer();
  const user = server?.user;
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
                  value={data.imoDTCI}
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
                    value={data.nonDTCI}
                  />
                ) : (
                  <input
                    type="text"
                    className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm outline-none focus:border-none focus:outline-none focus:ring"
                    value={data.nonDTCI}
                    onChange={(e: any) =>
                      setData3({
                        ...data,
                        nonDTCI: e.target.value,
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
                  value={data.mouvementDTCI}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="font-semibold text-gray-500">
                  Date DTCI
                </label>
                {user.role === 'analyst' ? (
                  <input
                    type="text"
                    disabled
                    className=" rounded-sm border border-red-500 bg-firstColors p-2 text-sm"
                    value={data.dateDTCI.split('-').reverse().join('-')}
                  />
                ) : (
                  <input
                    type="text"
                    className=" rounded-sm border border-red-500 bg-firstColors p-2 text-sm outline-none focus:border-none focus:outline-none focus:ring"
                    value={data.dateDTCI.split('-').reverse().join('-')}
                    onChange={(e: any) =>
                      setData3({
                        ...data,
                        dateDTCI: e.target.value.split('-').reverse().join('-'),
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
                  value={data.imoTM}
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
                  value={data.nonTM}
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
                  value={data.mouvementTM}
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
                  value={data.dateTM}
                />
              </div>
            </form>
          </div>
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
  );
};
