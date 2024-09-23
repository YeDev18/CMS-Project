import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { FC } from 'react';

type DataProps = {
  data: {
    idInstance: string;
    nonDTCI: string;
    imoDTCI: string;
    consignataireDTCI: string;
    mouvementDTCI: string;
    dateDTCI: string;
    dateDeclaration: string;
    port: string;
    typeNavire: string;
    mrn: string;
    numVoyage: string;
    consignataire: string;
    tonage: string;
    observation: string;
    dateTm: string;
  };
};

const Overlay: FC<DataProps> = ({ data }) => {
  const server = useServer();
  return (
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
            value={data.dateDeclaration}
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
            value={data.imoDTCI}
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
            value={data.mrn}
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
            value={data.nonDTCI}
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
            value={data.mouvementDTCI}
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
            value={data.consignataireDTCI}
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
            value={data.port}
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
            value={data.numVoyage}
          />
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
  );
};

export default Overlay;
