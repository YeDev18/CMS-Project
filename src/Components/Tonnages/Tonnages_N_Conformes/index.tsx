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
  const FinalPagination = tonnesNc.slice(startIndex, endIndex);
  return (
    <div className="relative flex size-full flex-col gap-6 ">
      <div className="flex w-full flex-wrap justify-start gap-2">
        <Libelle
          icon="lucide:anvil"
          libelle="Nom comfomes"
          color="#F59069"
          number={tonnesNc.length}
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
            <div className="p size-fit whitespace-nowrap rounded-sm border ">
              <select
                name="months"
                id=""
                className="border-none bg-firstColors bg-none"
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
                className="border-none bg-firstColors bg-none"
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
        <div className="inline-flex h-10 items-center gap-2 rounded-md p-2 shadow-sm shadow-slate-200 ">
          <label htmlFor="">
            <Icon icon="mdi:search" width="1.1em" height="1.1em" />
          </label>
          <input
            type="number"
            placeholder="IMO"
            // value={searchValue}
            className=" h-fit w-28 border-b pb-1 text-sm  font-medium outline-none"
            onChange={(e: any) => {
              // setSearchValue(e.target.value);
            }}
          />
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
      </div>
      <div className="relative size-full overflow-x-auto  pr-2">
        <Table data={FinalPagination} label="Non-comforme" />
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default T_NonConforme;
