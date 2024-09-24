import { Icon } from '@iconify/react';
import { headerTableTonnes } from '../Data';
const Table = ({ data, label }: any) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="gridArray8 shadow-testColors1 sticky top-0 w-full rounded-md bg-slate-50 shadow-sm ">
          {headerTableTonnes.map((item: any, index: any) => {
            return (
              <th
                key={index}
                className="headerThird text-start text-sm font-semibold xl:text-base"
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
            <td className="headerThird text-start text-sm xl:text-base">
              {index + 1}
            </td>
            <td className="headerThird text-start text-sm xl:text-base">
              {val.tonnage_dt.nom_navire_dt_tonnage}
            </td>
            <td className="headerThird text-start text-sm xl:text-base">
              {val.tonnage_dt.imo_dt_tonnage}
            </td>
            <td className="headerThird text-start text-sm xl:text-base">
              {val.tonnage_dt.mouvement_dt_tonnage === 'Arrivée'
                ? val.tonnage_dt.eta_dt_tonnage.split('-').reverse().join('-')
                : val.tonnage_dt.etd_dt_tonnage.split('-').reverse().join('-')}
            </td>
            <td className="headerThird text-start text-sm xl:text-base">
              {parseInt(val.tonnage_facture_dt_tonnage) || 0}
            </td>
            <td className="headerThird text-start text-sm xl:text-base">
              {parseInt(val.tonnage_trafic_national_port) || 0}
            </td>
            <td className="headerThird text-start text-sm font-semibold xl:text-base">
              {parseInt(val.difference_tonnage) || 0}
            </td>

            <td className="align-center headerThird flex text-sm">
              {label == 'Conforme' ? (
                <>
                  {val.statut === 'Tonnage Incorrect' ? (
                    <div className="flex w-fit items-center justify-center gap-1 rounded-2xl  bg-[#F04A1A] px-2 py-1 font-medium text-[#eeeeee] ">
                      <Icon icon="zondicons:close-outline" />
                      <p>Incorrect</p>
                    </div>
                  ) : (
                    <div className="flex w-fit items-center justify-center gap-1  rounded-2xl  bg-[#19a856] px-2 py-1 font-medium text-[#eeeeee]">
                      <Icon
                        icon="ic:outline-check-circle"
                        className="text-lg"
                      />
                      <p>Correct</p>
                    </div>
                  )}
                </>
              ) : (
                <>Non Conforme</>
              )}

              <br />
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
