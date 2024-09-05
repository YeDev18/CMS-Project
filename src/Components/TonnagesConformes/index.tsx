import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { AllMonths, headerTableTonnes, Year } from '../Data';
import Libelle from '../ui/Libelle';
const T_Conforme = () => {
  const server = useServer();
  const tonnes = server?.tonnages;
  return (
    <div className="w-full h-full relative flex flex-col gap-6 ">
      <div className="flex justify-start gap-2 flex-wrap w-full">
        {/* <div className="flex gap-4"> */}
        <Libelle
          icon="lucide:anvil"
          libelle="Tonages"
          color="#141A15"
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
          <span className="border border-borderColor h-4"></span>

          <div className="flex  justify-center items-center h-fit">
            <label
              htmlFor=""
              className=" flex gap-1 items-center font-semibold py-1 text-sm bg-[#19a856] text-[#eeeeee]  px-2 rounded-xl"
            >
              <Icon icon="ic:outline-check-circle" className="text-base" />
              Correct
            </label>
            <input
              type="checkbox"
              // checked={tags}
              // onChange={handleChangeCheck}
              placeholder="IMO"
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
          <div className="flex  justify-center items-center h-fit ">
            <label
              htmlFor=""
              className="font-semibold flex gap-1 items-center py-1  text-sm bg-[#F04A1A] text-[#eeeeee]  px-2 rounded-xl"
            >
              <Icon icon="zondicons:close-outline" className="text-sm" />
              Incorrect
            </label>
            <input
              type="checkbox"
              // checked={tags}
              // onChange={handleChangeCheck}
              placeholder="IMO"
              className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full overflow-x-auto  pr-2 relative">
        <table className="w-full">
          <thead>
            <tr className="gridArray8 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 sticky top-0 ">
              {headerTableTonnes.map((item, index) => {
                return (
                  <th
                    key={index}
                    className="text-start text-sm xl:text-base font-semibold headerThird"
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          {tonnes.map((val: any, index: number) => {
            return (
              <tr
                key={index}
                className="gridArray8 w-full border-b-2 border-slate-50  "
              >
                <td className="text-start text-sm xl:text-base headerThird">
                  {index + 1}
                </td>
                <td className="text-start text-sm xl:text-base headerThird">
                  {val.tonnage_dt.nom_navire_dt_tonnage}
                </td>
                <td className="text-start text-sm xl:text-base headerThird">
                  {val.tonnage_dt.imo_dt_tonnage}
                </td>
                <td className="text-start text-sm xl:text-base headerThird">
                  {val.tonnage_dt.mouvement_dt_tonnage === 'Arrivée'
                    ? val.tonnage_dt.eta_dt_tonnage
                    : val.tonnage_dt.etd_dt_tonnage}
                </td>
                <td className="text-start text-sm xl:text-base headerThird">
                  {parseInt(val.tonnage_facture_dt_tonnage)}
                </td>
                <td className="text-start text-sm xl:text-base headerThird">
                  {parseInt(val.tonnage_trafic_national_port)}
                </td>
                <td className="text-start text-sm xl:text-base font-semibold headerThird">
                  {parseInt(val.difference_tonnage)}
                </td>

                <td className="text-start text-sm xl:text-base headerThird">
                  {val.statut === 'Tonnage Incorrect' ? (
                    <div className="flex justify-center text-[#eeeeee] font-medium items-center gap-1  px-2 py-1 rounded-2xl bg-[#F04A1A] w-fit ">
                      <Icon icon="zondicons:close-outline" />
                      <p>Incorrect</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center text-[#eeeeee] font-medium  gap-1  px-2 py-1 rounded-2xl bg-[#19a856] w-fit">
                      <Icon
                        icon="ic:outline-check-circle"
                        className="text-lg"
                      />
                      <p>Correct</p>
                    </div>
                  )}
                  <br />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default T_Conforme;
