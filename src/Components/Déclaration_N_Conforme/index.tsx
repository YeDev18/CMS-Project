import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';
const DeclaratioNConforme = () => {
  const notConform = useServer().notConform;

  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [data3, setData3] = useState({
    idInstance: '',
    nonDTCI: '',
    imoDTCI: '',
    consignataireDTCI: '',
    mouvementDTCI: '',
    dateDTCI: '',
    nonTM: '',
    imoTM: '',
    consignataireTM: '',
    mouvementTM: '',
    dateTM: '',
  });
  const [form, setForm] = useState(false);
  console.log(notConform);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(TrueData.length / itemsPerPage);
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

  const handleChange = (val: any) => {
    setForm(true);
    setData3({
      ...data3,
      idInstance: val.id,
      nonDTCI: val.soumission_dtci.nom_navire_dtci,
      imoDTCI: val.soumission_dtci.imo_dtci,
      mouvementDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
      consignataireDTCI: val.soumission_dtci.consignataire_dtci,
      dateDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée'
          ? val.soumission_dtci.eta_dtci
          : val.soumission_dtci.etd_dtci,
      nonTM: val.trafic_maritime.nom_navire_trafic,
      imoTM: val.trafic_maritime.imo_trafic,
      consignataireTM: val.trafic_maritime.consignataire_trafic,
      mouvementTM:
        val.trafic_maritime.mouvement_trafic === 'Arrivée' ? 'ETA' : 'ETD',
      dateTM: val.trafic_maritime.date_trafic,
    });
  };
  const modifiedData = notConform.map((item: any) => ({
    idCms: item.id,
    statusCms: item.status,
    dtci: item.soumission_dtci,
    tm: item.trafic_maritimes,
  }));
  const [searchValue, setSearchValue] = useState();
  console.log(modifiedData);
  const TrueData = searchValue
    ? notConform.filter((val: any) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : notConform;
  return (
    <div className="w-screen flex flex-col gap-4  ">
      <div className="flex justify-between w-full pb-6">
        <div className="flex gap-4">
          <Libelle
            icon="charm:notes-cross"
            libelle="Non Conformes"
            color="#F59069"
            number={notConform.length}
          />
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
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
              <select
                name=""
                id=""
                className="bg-none outline-4 bg-firstColors"
                // onChange={e => {
                //   setSelectValue(e.target.value);
                // }}
              >
                {AllMonths.map((month, index) => (
                  <option key={index} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
              <span className="border border-borderColor h-4"></span>
              <select
                name=""
                id=""
                className="bg-none outline-none bg-firstColors"
                // onChange={e => {
                //   setSelectValue2(e.target.value);
                // }}
              >
                {Year.map((year, index) => (
                  <option key={index} value={year.value}>
                    {year.year}
                  </option>
                ))}
              </select>
              <button type="submit">
                {' '}
                <Icon icon="mdi:filter" width="1.5em" height="1.5em" />
              </button>
            </form>
          </div>
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <label htmlFor="">
              <Icon icon="mdi:search" width="1.5em" height="1.5em" />
            </label>
            <input
              type="number"
              placeholder="IMO"
              className="border w-32 outline-none p-1 rounded-sm text-sm font-medium"
              onChange={(e: any) => {
                setSearchValue(e.target.value);
              }}
            />
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
      <table className="w-full pb-6">
        <tr className="flex justify-start  py-4 px-2  w-full rounded-md shadow-sm shadow-testColors1 bg-slate-50 ">
          {headerTable.map((item, index) => {
            return (
              <th
                className=" text-start font-semibold lg:w-28 xl:w-52 headerSecond"
                key={index}
              >
                {item}
              </th>
            );
          })}
        </tr>
        {TrueData.slice(startIndex, endIndex).map((val: any, index: number) => {
          return (
            <>
              <tr
                key={index}
                className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
              >
                <td className="text-start lg:w-32 text-sm xl:text-base">
                  {index + 1}
                </td>
                <td className="text-start lg:w-32 text-sm xl:text-base">
                  {val.soumission_dtci.imo_dtci}
                </td>
                <td className="text-start lg:w-28 xl:w-52 text-sm xl:text-sm">
                  {val.soumission_dtci.nom_navire_dtci}
                </td>
                <td className="text-start lg:w-40 text-sm xl:text-base">
                  {val.soumission_dtci.mouvement_dtci === 'Arrivée'
                    ? 'ETA'
                    : 'ETD'}
                </td>

                <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                  {val.soumission_dtci.mouvement_dtci === 'Arrivée'
                    ? val.soumission_dtci.eta_dtci
                    : val.soumission_dtci.etd_dtci}
                </td>
                <td className="text-end lg:w-28 xl:w-48 ">
                  <button onClick={() => handleChange(val)}>
                    <Icon icon="mingcute:more-2-fill" width="20" height="20" />
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
      {renderPaginationControls()}
      {form ? (
        <div className=" absolute w-full h-full  justify-center items-center  ">
          <div className=" absolute bg-black opacity-15 rounded-md w-full h-full z-[1]"></div>
          <div className="w-[40rem] h-[36rem] bg-red-600 absolute z-[2] top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded">
            <div className="flex gap-2 justify-between py-6 flex-col bg-firstColors rounded-sm items-center h-full">
              <div className="flex justify-center items-center gap-4 w-full px-12">
                <h3 className="w-[16rem] p-2 rounded-sm bg-cyan-200 text-lg text-gray-800 font-semibold">
                  Declaration DTCI
                </h3>
                <h3 className="w-[16rem] p-2 rounded-sm bg-red-200 text-lg text-gray-800 font-semibold">
                  Declaration TM
                </h3>
              </div>
              <div className="flex gap-4 justify-center">
                <form action="" className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Imo DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.imoDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Nom DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.nonDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.mouvementDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Consignataire DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors w-[16rem] text-sm"
                      value={data3.consignataireDTCI}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date DTCI
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
                      value={data3.dateDTCI}
                    />
                  </div>
                </form>
                <form action="" className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Imo TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors w-[16rem] bg-firstColors text-sm "
                      value={data3.imoTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Nom TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.nonTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Mouvement TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.mouvementTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Consignataire TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                      value={data3.consignataireTM}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date TM
                    </label>
                    <input
                      disabled
                      type="text"
                      className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
                      value={data3.dateTM}
                    />
                  </div>
                </form>
              </div>
              <Link
                to={`/update/${data3.idInstance}`}
                className="bg-firstBlue  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center"
              >
                UPDATE
              </Link>
            </div>

            <button className="absolute right-4 top-2">
              <Icon
                icon="ic:round-close"
                width="1.5em"
                height="1.5em"
                className="text-grayBlack: '#000000',
"
                onClick={() => setForm(!form)}
              />
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DeclaratioNConforme;
