import { Icon } from '@iconify/react';
import { headerTable } from '../Data';
const Table = ({ data, label, onClick }: any) => {
  return (
    <table className="w-full pb-6">
      <thead>
        <tr className="gridArray6 w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
          {headerTable.map((item, index) => {
            return (
              <th
                className=" text-start font-semibold headerSecond"
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
              <td className="text-start text-sm xl:text-base headerSecond">
                {index + 1}
              </td>
              <td className="text-start whitespace-normal text-sm xl:text-sm headerSecond">
                {label === 'Non Declare' ? (
                  <>{val.trafic_maritime.nom_navire_trafic}</>
                ) : (
                  <>{val.soumission_dtci.nom_navire_dtci}</>
                )}
              </td>
              <td className="text-start text-sm xl:text-base headerSecond">
                {label === 'Non Declare' ? (
                  <>{val.trafic_maritime.imo_trafic}</>
                ) : (
                  <>{val.soumission_dtci.imo_dtci}</>
                )}
              </td>
              <td className="text-start lg:w-40 text-sm xl:text-base headerSecond">
                {label === 'Non Declare' ? (
                  <> {val.trafic_maritime.mouvement_trafic}</>
                ) : (
                  <>{val.soumission_dtci.mouvement_dtci}</>
                )}
              </td>

              <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base headerSecond">
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
                              {' '}
                              <Icon
                                icon="mingcute:more-2-fill"
                                width="20"
                                height="20"
                              />
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
