import { Icon } from '@iconify/react';
import { headerTable } from '../Data';
const Table = ({ data, label, onClick }: any) => {
  return (
    <table className="w-full pb-6">
      <thead>
        <tr className="gridArray6 shadow-testColors1 w-full rounded-md bg-slate-50 shadow-sm ">
          {headerTable.map((item, index) => {
            return (
              <th
                className=" headerSecond text-start font-semibold"
                key={index}
              >
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((val: any, index: number) => {
          return (
            <tr
              key={index}
              className="gridArray6 w-full border-b-2 border-slate-50 "
            >
              <td className="headerSecond text-start text-sm xl:text-base">
                {index + 1}
              </td>
              <td className="headerSecond whitespace-normal text-start text-sm xl:text-sm">
                {label === 'Non Declare' ? (
                  <>{val.trafic_maritime.nom_navire_trafic}</>
                ) : (
                  <>{val.soumission_dtci.nom_navire_dtci}</>
                )}
              </td>
              <td className="headerSecond text-start text-sm xl:text-base">
                {label === 'Non Declare' ? (
                  <>{val.trafic_maritime.imo_trafic}</>
                ) : (
                  <>{val.soumission_dtci.imo_dtci}</>
                )}
              </td>
              <td className="headerSecond text-start text-sm lg:w-40 xl:text-base">
                {label === 'Non Declare' ? (
                  <> {val.trafic_maritime.mouvement_trafic}</>
                ) : (
                  <>{val.soumission_dtci.mouvement_dtci}</>
                )}
              </td>

              <td className="headerSecond text-start text-sm lg:w-28 xl:w-48 xl:text-base">
                {label === 'Non Declare' ? (
                  <>
                    {val.trafic_maritime.date_trafic
                      .split('-')
                      .reverse()
                      .join('-')}
                  </>
                ) : (
                  <>
                    {val.soumission_dtci.mouvement_dtci === 'Arrivée'
                      ? val.soumission_dtci.eta_dtci
                          .split('-')
                          .reverse()
                          .join('-')
                      : val.soumission_dtci.etd_dtci
                          .split('-')
                          .reverse()
                          .join('-')}
                  </>
                )}
              </td>
              <td className="text-start  text-sm xl:text-base ">
                {label === 'Non Declare' ? (
                  <></>
                ) : (
                  <>
                    <button onClick={() => onClick(val)}>
                      {label === 'conform' ? (
                        <>
                          <Icon
                            icon="weui:eyes-on-filled"
                            width="1em"
                            height="1em"
                          />
                        </>
                      ) : (
                        <>
                          {label === 'Non-conform' ? (
                            <>
                              {val.observation ? (
                                <button className=" bg-[#f59069] text-white p-2 text-sm font-semibold rounded-md shadow-sm">
                                  Mettre a jour
                                </button>
                              ) : (
                                <Icon
                                  icon="mingcute:more-2-fill"
                                  width="20"
                                  height="20"
                                />
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
