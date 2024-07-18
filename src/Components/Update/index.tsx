import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Update = () => {
  const { id } = useParams();
  const [data1, setData1] = useState<any>([]);
  useEffect(() => {
    axios
      .get('https://dj-declaration.onrender.com/api/declare-non-conforme')
      .then(res => res.data)
      .then(data => setData1(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Bon retour parmi nous</h1>
      <form className="pt-5 flex gap-3">
        <input
          type="text"
          name=""
          id=""
          //     value={data1.soumission_dtci.imo_dtci}
          className="border outline-none"
        />
        <input
          type="text"
          name=""
          id=""
          //     value={data1.soumission_dtci.nom_navire_dtci}
          className="border outline-none"
        />
        <input
          type="text"
          name=""
          id=""
          //     value={data1.trafic_maritime.nom_navire_trafic}
          className="border outline-none"
        />
        <input
          type="text"
          name=""
          //     value={data1.trafic_maritime.imo_trafic}
          id=""
          className="border outline-none"
        />
      </form>
    </div>
  );
};

export default Update;
