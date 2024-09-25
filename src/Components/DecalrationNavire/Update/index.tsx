import url from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Data1Props = {
  soumission: {
    id: string;
  };
  trafic_maritime: {
    date_trafic: string;
    nom_navire_trafic: string;
    consignataire_trafic: string;
  };
};

type Data2Props = {
  nom_navire_dtci: string;
  date_mouvement: string;
  consignataire_dtci: string;
};
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data1, setData1] = useState<Data1Props>();
  const [data2, setData2] = useState<Data2Props>({
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
      .put(`api/update-soumission-dtci-and-status/${id2}/`, data2)
      .then(res => {
        alert('Data Suucess');
        console.log(res);
        navigate('/nom_conforme');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className=" flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" flex w-[30rem] flex-col  items-center gap-4 rounded-sm bg-firstColors py-6 align-middle shadow-md shadow-slate-200"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-semibold text-gray-500">
            Nom DTCI
          </label>
          <input
            type="text"
            required
            name=""
            onChange={e =>
              setData2({ ...data2, nom_navire_dtci: e.target.value })
            }
            className="w-[22rem] rounded-sm border border-shadowColors  bg-firstColors p-2 text-sm outline-none"
            id=""
          />
          <span className="text-[0.75rem] font-semibold text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.nom_navire_trafic || '...'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-semibold text-gray-500">
            Nom Consignataire DTCI
          </label>
          <input
            type="text"
            name=""
            required
            onChange={e =>
              setData2({ ...data2, consignataire_dtci: e.target.value })
            }
            id=""
            className="w-[22rem] rounded-sm border border-shadowColors bg-firstColors p-2 text-sm outline-none"
          />
          <span className="text-[0.75rem] font-semibold text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.consignataire_trafic || '...'}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-semibold text-gray-500">
            Date DTCI
          </label>
          <input
            type="text"
            name=""
            required
            onChange={e =>
              setData2({ ...data2, date_mouvement: e.target.value })
            }
            id=""
            className="w-[22rem] rounded-sm border border-shadowColors bg-firstColors p-2 text-sm outline-none"
          />
          <span className="text-[0.75rem] font-semibold text-slate-500">
            Nom Trafic : {data1?.trafic_maritime?.date_trafic || '...'}
          </span>
        </div>

        <button
          type="submit"
          className="flex  h-12 w-40 cursor-pointer items-center justify-center rounded-md bg-firstBlue font-semibold text-[#EEEEEC]"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Update;
