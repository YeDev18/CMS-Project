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
                  value={data.imoDTCI}
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
                    value={data.nonDTCI}
                  />
                ) : (
                  <input
                    type="text"
                    className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
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
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Mouvement DTCI
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data.mouvementDTCI}
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
                    value={data.dateDTCI.split('-').reverse().join('-')}
                  />
                ) : (
                  <input
                    type="text"
                    className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
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
            <form action="" className="flex flex-col gap-3 w-[16rem]">
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Imo TM
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors w-[16rem] bg-firstColors text-sm "
                  value={data.imoTM}
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
                  value={data.nonTM}
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
                  value={data.mouvementTM}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Date TM
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
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
