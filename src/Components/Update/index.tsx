import url from '@/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Update = () => {
  const { id } = useParams();
  const [data1, setData1] = useState<any>([]);
  const [data2, setData2] = useState({});
  useEffect(() => {
    url
      .get(`api/get-soumission-dtci-data/${id}/`)
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));
  }, []);

  console.log(data1);

  return (
    <div>
      <h1>Bon retour parmi nous</h1>
      <form className="pt-5 flex gap-3">
        <input
          type="text"
          disabled
          name=""
          value={data1?.soumission?.nom_navire_dtci || 'bon'}
          id=""
          //     value={data1.soumission_dtci.imo_dtci}
          className="border outline-none"
        />
        <input
          type="text"
          disabled
          name=""
          value={data1?.soumission?.consignataire_dtci || 0}
          id=""
          //     value={data1.soumission_dtci.imo_dtci}
          className="border outline-none"
        />
        <input
          type="text"
          name=""
          value={
            data1?.soumission?.mouvement_dtci === 'Départ'
              ? data1?.soumission?.etd_dtci
              : data1?.soumission?.eta_dtci
          }
          id=""
          //     value={data1.soumission_dtci.imo_dtci}
          className="border outline-none"
        />
      </form>
    </div>
  );
};

export default Update;
