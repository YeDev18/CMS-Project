import { Icon } from '@iconify/react';
import { headerTableTonnes } from '../Data';
const Table = ({data}:any) => {
  return (
    <table className="w-full">
          <thead>
            <tr className="gridArray8 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 sticky top-0 ">
              {headerTableTonnes.map((item:any, index:any) => {
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
          {data?.map((val: any, index: number) => {
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
                    ? val.tonnage_dt.eta_dt_tonnage.split('-').reverse().join('-')
                    : val.tonnage_dt.etd_dt_tonnage.split('-').reverse().join('-')}
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

                <td className="flex align-center text-sm headerThird">
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
  )
}

export default Table