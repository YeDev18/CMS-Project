import url from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { AllMonths, headerTable, Year } from '../Data';
import Libelle from '../ui/Libelle';

const DeclaratioNConforme = () => {
  const server = useServer();
  const notConform = useServer().notConform;
  const user = useServer().user;
  const overlay = useServer().overlay;
  const direction = useNavigate();

  const [formValue, setFormValue] = useState({
    months: '',
    years: '',
  });
  const [searchValue, setSearchValue] = useState();
  const [observation, setObservation] = useState({
    observation: '',
  });
  const [tags, setTags] = useState<boolean>(false);

  const handleChangeCheck = () => {
    setTags(!tags);
    server?.toInitialize();
  };

  const [current, setCurrent] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const MonthsYears = formValue.years + '-' + formValue.months;

  const [data3, setData3] = useState({
    idInstance: '',
    idSoumission: '',
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
    observation: '',
  });

  const [form, setForm] = useState(false);

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const handleSubmit = (id: any, data: any) => {
    url
      .put(`api/declarationstatus/${id}/add_observation/`, data)
      .then(res => {
        alert('Data Suucess');
        direction('/nom_conforme');
        server?.toInitialize();
        setForm(false);
      })
      .catch(error => console.log(error));
  };

  const Filter = useMemo(() => {
    return notConform.filter((val: any) =>
      val.soumission_dtci.mouvement_dtci === 'Arrivée'
        ? val.soumission_dtci.eta_dtci.toString().slice(0, 7) === MonthsYears
        : val.soumission_dtci.etd_dtci.toString().slice(0, 7) === MonthsYears
    );
  }, [MonthsYears]);
  const Final = MonthsYears === '-' ? notConform : Filter;
  const dataFinal = searchValue
    ? Final.filter((val: any) =>
        val.soumission_dtci.imo_dtci.toString().includes(searchValue)
      )
    : Final;

  const dataFinalChecked = tags
    ? dataFinal.filter((val: any) => val.observation)
    : dataFinal;

  const modifiedData = dataFinalChecked.map((item: any, index: number) => ({
    Id: index,
    DateDeclaration: item?.soumission_dtci.date_declaration_dtci
      .split('-')
      .reverse()
      .join('-'),
    Port: item?.soumission_dtci.port_dtci,
    Imo: item?.soumission_dtci?.imo_dtci,
    Navire: item?.soumission_dtci?.nom_navire_dtci,
    Mrn: item?.soumission_dtci?.mrn_dtci,
    Consignataire: item?.soumission_dtci?.consignataire_dtci,
    Tonnage: item?.soumission_dtci?.tonnage_facture_dtci,
    Numero_de_Voyage: item?.soumission_dtci?.numero_voyage_dtci,
    Mouvement:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? 'Arrivée'
        : 'Depart',
    Date:
      item?.soumission_dtci?.mouvement_dtci === 'Arrivée'
        ? item?.soumission_dtci?.eta_dtci.split('-').reverse().join('-')
        : item?.soumission_dtci?.etd_dtci.split('-').reverse().join('-'),
  }));

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Decalaration non conforme.xlsx`);
  };
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(dataFinalChecked.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="border text-shadowColors border-shadowColors p-1 rounded active:bg-firstBlue active:border hover:border-firstBlue hover:text-firstColors hover:bg-firstBlue hover:border"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="px-2 w-fit text-center">
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

  const handleUpdateSubmit = (
    id: any,
    nom_navire_dtci: any,
    date_mouvement: any,
    consignataire_dtci: any
  ) => {
    url
      .put(`api/update-soumission-dtci-and-status/${id}/`, {
        nom_navire_dtci,
        date_mouvement,
        consignataire_dtci,
      })
      .then(res => {
        alert('Data Suucess');
        direction('/nom_conforme');
        server?.toInitialize();
        setForm(false);
      })
      .catch(error => (console.log(error), alert(error)));
  };

  const handleChange = (val: any) => {
    setForm(true);
    server.showOverlay();
    setData3({
      ...data3,

      idInstance: val.id,
      idSoumission: val.soumission_dtci.id,
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
      dateTM: val.trafic_maritime.date_trafic.split('-').reverse().join('-'),
      observation: val.observation,
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col gap-2 ">
      <div className="flex justify-between flex-wrap gap-y-4 w-full pb-6">
        <div className="flex gap-4">
          <Libelle
            icon="charm:notes-cross"
            libelle="Non Conformes"
            color="#F59069"
            number={notConform.length}
          />
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-4 items-center">
            <form action="" className="flex gap-2  items-center justify-center">
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
                name="months"
                id=""
                className="bg-none outline-4 bg-firstColors"
                onChange={e => {
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  });
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
                name="years"
                id=""
                className="bg-none outline-none bg-firstColors"
                onChange={e => {
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                {Year.map((year, index) => (
                  <option key={index} value={year.value}>
                    {year.year}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="rounded-md shadow-sm shadow-shadowColors p-2 inline-flex gap-2 items-center">
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
            <span className="border border-borderColor h-4"></span>
            <div className="flex  justify-center items-center">
              <label htmlFor="" className="font-semibold">
                Tags
              </label>
              <input
                type="checkbox"
                checked={tags}
                onChange={handleChangeCheck}
                placeholder="IMO"
                className="border outline-none p-1 rounded-sm text-2xl w-8 h-4 font-medium"
              />
            </div>
          </div>
        </div>
        <button
          className="rounded-md shadow-sm whitespace-nowrap shadow-shadowColors p-2 inline-flex items-center"
          onClick={() => exportToExcel()}
        >
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
      <div className="w-full h-full overflow-x-auto  pr-2 relative">
        <table className="w-full">
          <thead>
            <tr className="gridArray6  w-screen rounded-md shadow-sm shadow-testColors1 bg-slate-50 sticky top-0 ">
              {headerTable.map((item, index) => {
                return (
                  <th
                    className=" text-start font-semibold headerSecond "
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>

          {dataFinalChecked
            .slice(startIndex, endIndex)
            .map((val: any, index: number) => {
              return (
                <tbody>
                  <tr
                    key={index}
                    className="gridArray6 w-full border-b-2 border-slate-50 "
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
                      {val.soumission_dtci.mouvement_dtci}
                    </td>

                    <td className="text-start lg:w-28 xl:w-48 text-sm xl:text-base ">
                      {val.soumission_dtci.mouvement_dtci === 'Arrivée'
                        ? val.soumission_dtci.eta_dtci
                            .split('-')
                            .reverse()
                            .join('-')
                        : val.soumission_dtci.etd_dtci
                            .split('-')
                            .reverse()
                            .join('-')}
                    </td>

                    <td className="text-end lg:w-28 xl:w-48 flex gap-3 ">
                      {!val.observation ? (
                        <button onClick={() => handleChange(val)}>
                          <Icon
                            icon="mingcute:more-2-fill"
                            width="20"
                            height="20"
                          />
                        </button>
                      ) : (
                        <button
                          className="bg-[#F59069] text-firstColors px-2 py-1 font-medium rounded-md text-sm"
                          onClick={() => handleChange(val)}
                        >
                          Mettre á jour
                        </button>
                      )}
                    </td>
                    <td className="text-start line-clamp-2 lg:w-28 xl:w-fit text-sm xl:text-base  ">
                      {val.observation}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

      {renderPaginationControls()}
      {overlay ? (
        <div className="absolute inset-y-2/4 w-full h-fit z-[40] justify-center items-center animate-fadIn-up">
          <div className="w-[40rem] h-fit  absolute  top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded">
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
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm"
                        value={data3.nonDTCI}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
                        value={data3.nonDTCI}
                        onChange={(e: any) =>
                          setData3({
                            ...data3,
                            nonDTCI: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Mouvement DTCI
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
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors w-[16rem] text-sm"
                        value={data3.consignataireDTCI}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" border p-2 rounded-sm border-shadowColors bg-firstColors w-[16rem] text-sm outline-none focus:outline-none focus:ring focus:border-none"
                        value={data3.consignataireDTCI}
                        onChange={(e: any) =>
                          setData3({
                            ...data3,
                            consignataireDTCI: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Date DTCI
                    </label>
                    {user.role === 'analyst' ? (
                      <input
                        type="text"
                        disabled
                        className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                      />
                    ) : (
                      <input
                        type="text"
                        className=" border p-2 rounded-sm border-red-500 bg-firstColors text-sm outline-none focus:outline-none focus:ring focus:border-none"
                        value={data3.dateDTCI.split('-').reverse().join('-')}
                        onChange={(e: any) =>
                          setData3({
                            ...data3,
                            dateDTCI: e.target.value
                              .split('-')
                              .reverse()
                              .join('-'),
                          })
                        }
                      />
                    )}
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

              {user.role === 'analyst' ? (
                <>
                  <div className="flex flex-col w-full px-14 gap-1">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Observation
                    </label>
                    <textarea
                      name="observation"
                      className="border outline-none p-2 h-32"
                      onChange={(e: any) =>
                        setObservation({
                          ...observation,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      {data3.observation}
                    </textarea>
                  </div>
                  <button
                    className="bg-firstBlue  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center"
                    onClick={() => {
                      handleSubmit(data3.idInstance, observation);
                    }}
                  >
                    TAGS
                  </button>
                </>
              ) : (
                <div className=" w-full flex flex-col justify-center items-center">
                  {data3.observation ? (
                    <div className="flex flex-col gap-1  w-[33rem]">
                      <label htmlFor="" className="text-gray-500 font-semibold">
                        Observation
                      </label>
                      <textarea
                        disabled
                        className=" border p-2 rounded-sm bg-firstColors text-sm h-32"
                        value={data3.observation}
                      >
                        {data3.observation}
                      </textarea>
                    </div>
                  ) : (
                    ''
                  )}

                  <button
                    // to={`/update/${data3.idInstance}`}
                    className="bg-firstBlue mt-4  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center"
                    onClick={() =>
                      handleUpdateSubmit(
                        data3.idSoumission,
                        data3.nonDTCI,
                        data3.dateDTCI.split('-').reverse().join('-'),
                        data3.consignataireDTCI
                      )
                    }
                  >
                    UPDATE
                  </button>
                </div>
              )}
            </div>

            <button className="absolute right-4 top-2">
              <Icon
                icon="ic:round-close"
                width="1.5em"
                height="1.5em"
                className="text-grayBlack: '#000000',"
                onClick={() => server.showOverlay()}
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
