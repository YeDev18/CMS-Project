import usePagination from '@/Components/ui/pagination';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import * as XLSX from 'xlsx';
import { AllMonths, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
import Table from '../table-tonnages';
const T_NonConforme = () => {
  const server = useServer();
  const tonnes = server?.tonnages;
  const tonnesNc = server?.notConformTonnages;
  console.log(tonnesNc);
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tonnesNc);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Tonnages Non conforme.xlsx`);
  };

  const { renderPaginationControls, endIndex, startIndex } =
    usePagination(tonnesNc);
  let FinalPagination = tonnesNc.slice(startIndex, endIndex);
  return (
    <div className="w-full h-full relative flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap w-full">
        <Libelle
          icon="lucide:anvil"
          libelle="Nom comfomes"
          color="#F59069"
          number={tonnesNc.length}
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
                // onChange={e => {
                //   setFormValue({
                //     ...formValue,
                //     [e.target.name]: e.target.value,
                //   });
                // }}
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
                // onChange={e => {
                //   setFormValue({
                //     ...formValue,
                //     [e.target.name]: e.target.value,
                //   });
                // }}
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
            // value={searchValue}
            className=" border-b w-28 outline-none pb-1 text-sm  h-fit font-medium"
            onChange={(e: any) => {
              // setSearchValue(e.target.value);
            }}
          />
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
      </div>
      <div className="w-full h-full overflow-x-auto  pr-2 relative">
        <Table data={FinalPagination} label="Non-comforme" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_NonConforme;
