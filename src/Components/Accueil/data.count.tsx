import { Icon } from '@iconify/react';
const DataCount = ({ conform, notConform, undeclared }: any) => {
  return (
    <div className="grid h-10 w-full grid-cols-3 place-items-center rounded-b-md bg-[#f7f7f8]">
      <div className=" flex-center w-full gap-2 border-r-2 text-xl text-[#2563eb]">
        <Icon icon="lucide:circle-check-big" className="drop-shadow-sm" />
        <p className="font-medium  drop-shadow-sm">{conform?.length}</p>
      </div>
      <div className="flex-center w-full gap-2 border-r-2 text-xl text-[#f59069] ">
        <Icon icon="charm:notes-cross" className="drop-shadow-sm" />
        <p className="font-medium  drop-shadow-sm">{notConform?.length}</p>
      </div>
      <div className="flex-center w-full gap-2 text-xl  text-[#f0352b]">
        <Icon icon="ph:x-circle" className="drop-shadow-sm " />
        <p className="font-medium drop-shadow-sm">{undeclared?.length}</p>
      </div>
    </div>
  );
};

export default DataCount;
