import url from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data1, setData1] = useState<any>([]);
  const [data2, setData2] = useState({
    nom_navire_dtci: '',
    date_mouvement: '',
    consignataire_dtci: '',
  });
  useEffect(() => {
    url
      .get(`api/get-soumission-and-trafic-data-from-status/${id}/`)
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));
  }, []);
  const id2 = data1?.soumission?.id || 0;
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    url
      .post(`api/update-soumission-dtci-and-status/${id2}/`, data2)
      .then(res => {
        alert('Data Suucess');
        navigate('/nom_conforme');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className=" w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4  align-middle items-center bg-firstColors shadow-md shadow-slate-200 w-[30rem] py-6 rounded-sm"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-gray-500 font-semibold">
            Nom DTCI
          </label>
          <input
            type="text"
            name=""
            onChange={e =>
              setData2({ ...data2, nom_navire_dtci: e.target.value })
            }
            className="border outline-none p-2 rounded-sm  border-shadowColors w-[22rem] bg-firstColors text-sm"
            id=""
          />
          <span className="font-semibold text-[0.75rem] text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.nom_navire_trafic || '...'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-gray-500 font-semibold">
            Nom Consignataire DTCI
          </label>
          <input
            type="text"
            name=""
            onChange={e =>
              setData2({ ...data2, consignataire_dtci: e.target.value })
            }
            id=""
            className="border outline-none p-2 rounded-sm border-shadowColors w-[22rem] bg-firstColors text-sm"
          />
          <span className="font-semibold text-[0.75rem] text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.consignataire_trafic || '...'}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-gray-500 font-semibold">
            Date DTCI
          </label>
          <input
            type="text"
            name=""
            onChange={e =>
              setData2({ ...data2, date_mouvement: e.target.value })
            }
            id=""
            className="border outline-none p-2 rounded-sm border-shadowColors w-[22rem] bg-firstColors text-sm"
          />
          <span className="font-semibold text-[0.75rem] text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.date_trafic || '...'}
          </span>
        </div>

        <button
          type="submit"
          className="bg-firstBlue  w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold flex items-center justify-center"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Update;
