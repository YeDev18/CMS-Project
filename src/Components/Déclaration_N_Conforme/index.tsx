import url from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { headerTable } from '../Data';
const DeclaratioNConforme = () => {
  const [data1, setData1] = useState<any>([]);
  const [data2, setData2] = useState<any>(['']);
  const [data3, setDate3] = useState({
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

  useEffect(() => {
    url
      .get('api/declare-non-conforme')
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));

    setData2(data1);
  }, []);
  console.log(data1);

  const handleChange = (val: any) => {
    setForm(true);
    setDate3({
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
  const modifiedData = data1.map((item: any, index: any) => ({
    idCms: item.id,
    statusCms: item.status,
    dtci: item.soumission_dtci,
    tm: item.trafic_maritimes,
  }));
  console.log(modifiedData);
  return (
    <div className="w-screen flex flex-col gap-4  ">
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
        {data1.map((val: any, index: number) => {
          return (
            <>
              <tr
                key={index}
                className="flex justify-start py-4 px-2 w-full border-b-2 border-slate-50 "
              >
                <td className="text-start lg:w-32 text-sm xl:text-base">
                  {index}
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
                    {/* <Link to={`/update/${val.id}`}> */}
                    <Icon icon="mingcute:more-2-fill" width="20" height="20" />
                    {/* </Link> */}
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
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
                      Date DTCI
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
                      Date DTCI
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
                      Date DTCI
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
                      Date DTCI
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
                      Date DTCI
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
