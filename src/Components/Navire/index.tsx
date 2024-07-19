import url from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { headersNavire } from '../Data';

const Navire = () => {
  const [data1, setData1] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    url
      .get('api/navire-soumission-dtci')
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));
  }, []);
  console.log(data1);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(data1.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
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
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  const Navire = data1.map((item: any, index: number) => ({
    id: index + 1,
    imo: item.imo,
    nom: item.nom,
  }));

  return (
    <div className=" flex flex-col gap-6 text-grayBlack w-full ">
      <div className="flex justify-between w-full">
        <p className="rounded-md shadow-sm  p-2 inline-flex items-center bg-firstBlue text-firstColors">
          {' '}
          <Icon
            icon="lucide:ship"
            width="1em"
            height="1em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          Navires : <span className="font-semibold pl-1"> {Navire.length}</span>
        </p>
        <button
          className="rounded-md shadow-sm p-2 inline-flex items-center bg-firstBlue text-firstColors"
          type="button"
        >
          <Icon
            icon="material-symbols:download"
            width="1em"
            height="1em"
            style={{ color: 'rgb(255, 255, 255)' }}
            className="mr-2"
          />
          Export en csv
        </button>
      </div>
      {/* <Tab(les lib={'Navires'} HeaderTable={headersNavire} Table={TableNavire} /> */}
      <table className="w-full pb-6">
        <tr className="flex justify-start  py-4 px-4  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
          {headersNavire.map((item, index) => {
            return (
              <th
                className=" text-start font-semibold lg:w-28 xl:w-72 headerFirst"
                key={index}
              >
                {item}
              </th>
            );
          })}
        </tr>
        {Navire.slice(startIndex, endIndex).map((val: any, id: number) => {
          return (
            <tr
              key={id}
              className="flex justify-start p-4  w-full border-b-2 border-slate-50 "
            >
              <td className="text-start w-32">{val.id}</td>
              <td className="text-start w-72">{val.imo}</td>
              <td className="text-start w-72">{val.nom}</td>
            </tr>
          );
        })}
      </table>
      {renderPaginationControls()}
    </div>
  );
};

export default Navire;
