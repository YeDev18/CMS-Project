import url from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';

const DeclarationConforme = () => {
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>(['']);
  const Data3: any = [];
  const [selectValue, setSelectValue] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const MonthsYears = selectValue2 + '-' + selectValue;
  const [modal, setModal] = useState<boolean>(false);
  const [data3, setDate3] = useState({
    idInstance: '',
    nonDTCI: '',
    imoDTCI: '',
    consignataireDTCI: '',
    mouvementDTCI: '',
    dateDTCI: '',
    dateDeclaration: '',
    port: '',
    typeNavire: '',
    mrn: '',
    numVoyage: '',
    consignataire: '',
    tonage: '',
  });

  const handleChange = (val: any) => {
    setModal(true);
    setDate3({
      ...data3,
      idInstance: val.id,
      nonDTCI: val.soumission_dtci.nom_navire_dtci,
      imoDTCI: val.soumission_dtci.imo_dtci,
      mouvementDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
      consignataireDTCI: val.soumission_dtci.consignataire_dtci,
      dateDeclaration: val?.soumission_dtci?.date_declaration_dtci,
      port: val?.soumission_dtci?.port_dtci,
      typeNavire: val?.soumission_dtci?.type_de_navire_dtci,
      mrn: val?.soumission_dtci?.mrn_dtci,
      numVoyage: val?.soumission_dtci?.numero_voyage_dtci,
      consignataire: val?.soumission_dtci?.consignataire_dtci,
      tonage: val?.soumission_dtci?.tonage_facture_dtci,
      dateDTCI:
        val.soumission_dtci.mouvement_dtci === 'Arrivée'
          ? val.soumission_dtci.eta_dtci
          : val.soumission_dtci.etd_dtci,
    });
  };
  useEffect(() => {
    url
      .get('/api/declare-conforme')
      .then(res => res.data)
      .then(data => {
        setData1(data);
      })
      .catch(error => console.log(error));
  }, []);
  // console.log(data1);

  const modifiedData = data1.map((item: any, index: number) => ({
    id: index,
    imo: item?.soumission_dtci?.imo_dtci,
    libDTCI: item?.soumission_dtci?.nom_navire_dtci,
    mouvement:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée' ? 'ETA' : 'ETD',
    date:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? item?.soumission_dtci?.eta_dtci
        : item?.soumission_dtci?.etd_dtci,
  }));
  // console.log(modifiedData);
  for (let index = 1; index < modifiedData.length; index++) {
    Data3.push(modifiedData[index]);
  }
  const Filter2 = useMemo(() => {
    return modifiedData.filter((item: any) => item?.date);
  }, [MonthsYears == '-' || 'All-All']);
  // console.log(Filter2);

  const handleClick2 = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Filter2);
    console.log(selectValue);
    console.log(MonthsYears);
  };

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(data8.length / itemsPerPage);
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
  const [searchValue, setSearchValue] = useState();
  const data8 = searchValue
    ? data1.filter(val =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : data1;
  console.log(data8);

  return (
    <>
      <div className="w-screen flex flex-col gap-6 ">
        <div className="flex justify-between w-full pb-6">
          <div className="flex gap-4">
            <Libelle
              icon="lucide:circle-check-big"
              libelle="Conformes"
              color="#114837"
              number={data1.length}
            />
            <div></div>
            <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
              <form
                action=""
                className="flex gap-3  items-center justify-center"
                onSubmit={handleClick2}
              >
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
                  onChange={e => {
                    setSelectValue(e.target.value);
                  }}
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
                  onChange={e => {
                    setSelectValue2(e.target.value);
                  }}
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
                value={searchValue}
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
          {data8.slice(startIndex, endIndex).map((val: any, index: number) => {
            return (
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
                <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                  <button onClick={() => handleChange(val)}>
                    <Icon icon="weui:eyes-on-filled" width="1em" height="1em" />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>

        {renderPaginationControls()}
        {modal ? (
          <div className="absolute w-full h-full justify-center items-center ">
            <div className="absolute bg-black opacity-15 rounded-md w-full h-[90%] z-[1]"></div>
            <div className="w-96 h-fit absolute z-[2] inset-1/2 flex flex-col justify-center items-center gap-2 bg-firstColors -translate-x-2/4  -translate-y-2/4 shadow-sm shadow-slate-100 rounded-sm p-6">
              <div className="flex flex-col gap-1 w-full px-2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Date de declaration
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.dateDeclaration}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  IMO
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.imoDTCI}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2 ">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  MRN
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.mrn}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Nom
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.nonDTCI}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Mouvement
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.mouvementDTCI}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2 ">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Consignataire
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.consignataireDTCI}
                />
              </div>
              <div className="flex flex-col gap-1 w-full px-2 ">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Port
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.port}
                />
              </div>

              <div className="flex flex-col gap-1 w-full px-2 ">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Numero Voyage
                </label>
                <input
                  disabled
                  type="text"
                  className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                  value={data3.numVoyage}
                />
              </div>

              <button
                className="absolute right-4 top-2"
                onClick={() => setModal(false)}
              >
                <Icon
                  icon="majesticons:close"
                  width="1.5em"
                  height="1.5em"
                  className="text-black"
                />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default DeclarationConforme;
