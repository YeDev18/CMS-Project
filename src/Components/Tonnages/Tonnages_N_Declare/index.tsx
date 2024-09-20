import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import * as XLSX from 'xlsx';
import { AllMonths, headerTable, Year } from '../../Data';
import Libelle from '../../ui/Libelle';
const T_NonDeclare = () => {
  const server = useServer();
  const tonnes = server?.tonnages;
  const tonnesDC = server?.undeclaredTonnages;
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tonnesDC);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Tonnages Non conforme.xlsx`);
  };
  console.log(tonnesDC);
  return (
    <div className="w-full h-full relative flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap w-full">
        <Libelle
          icon="lucide:anvil"
          libelle="Tonages"
          color="#F59069"
          number={tonnes.length}
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
        <table className="w-full">
          <thead>
            <tr className="gridArray6 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 sticky top-0">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className="text-start  font-semibold headerSecond "
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {/* {tonnesDC.map((val: any, index: number) => {
            return (
              <tr
                key={index}
                className="gridArray6 w-full border-b-2 border-slate-50 "
              >
                <td className="text-start text-sm xl:text-base headerSecond">
                  {index + 1}
                </td>
                <td className="text-start  text-sm xl:text-sm headerSecond">
                  {val.tonnagedt.nom_navire_dt_tonnages}
                </td>
                <td className="text-start  text-sm xl:text-base headerSecond">
                  {val.tonnagedt.imo_dt_tonnage}
                </td>

                <td className="text-start lg:w-40 text-sm xl:text-base headerSecond">
                  {val.tonnagedt.mouvement_dt_tonnage}
                </td>

                <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base headerSecond ">
                  {val.tonnagedt.mouvement_dtci === 'Arrivée'
                    ? val.tonnagedt.eta_dt_tonnage
                        .split('-')
                        .reverse()
                        .join('-')
                    : val.tonnagedt.etd_dt_tonnage
                        .split('-')
                        .reverse()
                        .join('-')}
                </td>
              </tr>
            );
          })} */}
        </table>
      </div>
    </div>
  );
};

export default T_NonDeclare;
