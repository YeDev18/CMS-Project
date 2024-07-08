import { Icon } from '@iconify/react';
import { FC, useState } from 'react';

type Lib = {
  lib: string;
  HeaderTable: string[];
  liv: string;
  Table: any;
  nonDeclare?: boolean;
  color?: string;
};
interface Current {
  id: string;
  libDTCI: string;

  type: string;
  mouvement: string;
  date: string;
}

const SecondTables: FC<Lib> = ({
  lib,
  HeaderTable,
  Table,
  liv,
  color,
  nonDeclare,
}) => {
  const [current, setCurrent] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Table.slice(startIndex, endIndex);
  console.log(setItemsPerPage);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(Table.length / itemsPerPage);
    return (
      <div className="flex justify-end">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-bgColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="px-2 w-16 text-center">
          <span className="font-medium text-borderColor">{current}</span> /{' '}
          <span className="text-borderColor">{totalPages}</span>
        </div>
        <button
          onClick={goToNextPage}
          disabled={current === totalPages}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-bgColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  return (
    <div className=" flex flex-col gap-6 text-grayBlack">
      <div className="flex justify-between">
        <div className="flex gap-8">
          <button className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center">
            {' '}
            <Icon
              icon={liv}
              width="1em"
              height="1em"
              style={{ color: color }}
              className="mr-2"
            />
            {lib} : <span className="font-semibold">{Table.length}</span>
          </button>
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center">
            {' '}
            <form action="" className="flex gap-3  items-center justify-center">
              <label htmlFor="">
                <Icon
                  icon="lucide:calendar-days"
                  width="1.5em"
                  height="1.5em"
                  style={{ color: '#0a0a0a' }}
                  className="mr-2"
                />
              </label>
              <select name="" id="" className="bg-none outline-4 bg-bgColors">
                <option value="">Month</option>
                <option datatype="" value="July">
                  Dog
                </option>
                <option value="August">Cat</option>
                <option value="September">Hamster</option>
                ::after
              </select>
              <span className="border border-borderColor h-4"></span>
              <select
                name=""
                id=""
                className="bg-none outline-none bg-bgColors"
              >
                <option value="">Year</option>
                <option value="July">2024</option>
                <option value="August">2025</option>
                <option value="September">2026</option>
              </select>
            </form>
          </div>
        </div>

        <button className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex items-center">
          <Icon
            icon="material-symbols:download"
            width="1em"
            height="1em"
            style={{ color: '#313131' }}
            className="mr-2"
          />
          Export en csv
        </button>
      </div>
      <div className=" w-full flex flex-col gap-6 ">
        <table className="w-full">
          <tr className="flex justify-start gap  p-4  w-full rounded-md shadow-sm shadow-testColors1 ">
            {nonDeclare ? (
              <th className="font-normal text-start w-24">
                <input type="checkbox" name="" id="" />
              </th>
            ) : (
              ``
            )}

            {HeaderTable.map((item, index) => {
              return (
                <th className="font-normal text-start w-60" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
          {currentItems.map((val: Current, id: number) => {
            return (
              <tr
                key={id}
                className="flex justify-start p-4  w-full border-b-2 "
              >
                {nonDeclare ? (
                  <td className="text-start w-24">
                    <input type="checkbox" name="" id="" />
                  </td>
                ) : (
                  ``
                )}

                <td className="text-start w-60">{val.id}</td>
                <td className="text-start w-60">{val.libDTCI}</td>

                <td className="text-start w-60">{val.type}</td>
                <td className="text-start w-60">{val.mouvement}</td>
                <td className="text-start w-60 ">{val.date}</td>
                {nonDeclare ? (
                  <td className="text-end w-60 ">
                    <button>
                      <Icon
                        icon="mingcute:more-2-fill"
                        width="24"
                        height="24"
                      />
                    </button>
                  </td>
                ) : (
                  ''
                )}
              </tr>
            );
          })}
        </table>
        {renderPaginationControls()}
      </div>
    </div>
  );
};

export default SecondTables;
