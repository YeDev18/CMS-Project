import axios from 'axios';
import { useState } from 'react';
import { headerTable, TableConforme } from '../Data';
import SecondTables from '../ui/SecondTables';

const DeclarationConforme = () => {
  const [data1, setData1] = useState<any[]>(['']);
  const data2 = [];
  const handleConforme = () => {
    axios
      .get('https://dj-declaration.onrender.com/api/declare-conforme')
      .then(res => res.data)
      .then(data => {
        setData1(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  };
  console.log(data1);

  for (let index = 0; index < data1.length; index++) {
    data2.push(typeof data1[index].soumission_dtci);
  }
  console.log(data2);
  return (
    <div className="w-screen ">
      <SecondTables
        liv={'lucide:circle-check-big'}
        color={'#008000'}
        lib={'Déclaré conforme'}
        HeaderTable={headerTable}
        Table={TableConforme}
      />
      <button
        className="bg-firstBlue p-2 w-40 rounded-md text-[#EEEEEC] h-12"
        onClick={handleConforme}
      >
        GET
      </button>
    </div>
  );
};

export default DeclarationConforme;
