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
    <div className="absolute inset-y-2/4 z-50 h-fit w-full animate-fadIn-up items-center justify-center ">
      <div className="absolute inset-1/2 z-[2] flex h-fit w-96 -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-2  rounded-sm bg-firstColors p-6 shadow-sm shadow-slate-100">
        <div className="flex w-full flex-col gap-1 px-2">
          <label htmlFor="" className="font-semibold text-gray-500">
            Date de declaration
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.dateDeclaration}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2">
          <label htmlFor="" className="font-semibold text-gray-500">
            IMO
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.imoDTCI}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2 ">
          <label htmlFor="" className="font-semibold text-gray-500">
            MRN
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.mrn}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2">
          <label htmlFor="" className="font-semibold text-gray-500">
            Nom
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.nonDTCI}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2">
          <label htmlFor="" className="font-semibold text-gray-500">
            Mouvement
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.mouvementDTCI}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2 ">
          <label htmlFor="" className="font-semibold text-gray-500">
            Consignataire
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.consignataireDTCI}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-2 ">
          <label htmlFor="" className="font-semibold text-gray-500">
            Port
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
            value={data.port}
          />
        </div>

        <div className="flex w-full flex-col gap-1 px-2 ">
          <label htmlFor="" className="font-semibold text-gray-500">
            Numero Voyage
          </label>
          <input
            disabled
            type="text"
            className=" rounded-sm border border-shadowColors bg-firstColors p-2 text-sm"
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
