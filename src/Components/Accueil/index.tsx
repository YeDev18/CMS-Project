import { default as api, default as url } from '@/api';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Libs } from '../Data';
import { Chart } from './Chart';
import { Component1 } from './Component';

const Accueil = () => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [dataDtci, setDataDtci] = useState<any[]>(['']);
  const [dataTM, setDataTM] = useState<any[]>(['']);
  const [dat, setDat] = useState<any[]>(['']);
  const [countNavire, setCountNavire] = useState<number>(0);
  const [countConsignataire, setCountConsignataire] = useState<number>(0);
  const selected = selectedFile1 && selectedFile2 ? true : false;
  console.log(selected);

  useEffect(() => {
    fetchDataDtci();
  }, [selectedFile1]);
  useEffect(() => {
    fetchDataTM();
  }, [selectedFile2]); // Remplacez par les valeurs que vous voulez exclure
  useEffect(() => {
    handleCompare();
    console.log(`C'est fait`);
  }, [selected === true]);

  useEffect(() => {
    url
      .get('api/navire-soumission-dtci')
      .then(res => res.data)
      .then(data => setCountNavire(data.length))
      .catch(error => console.log(error));

    url
      .get('api/consignataire-dtci')
      .then(res => res.data)
      .then(data => setCountConsignataire(data.length))
      .catch(error => console.log(error));
  }, []);
  console.log(countNavire);
  console.log(countConsignataire);

  // const excelDateToJSDate = (serial: number) => {
  //   const excelEpoch = new Date(Date.UTC(1900, 0, 0)); // 1 Janvier 1900
  //   const jsDate = new Date(
  //     excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000
  //   ); // Ajustement pour le nombre de jours
  //   const day = jsDate.getUTCDate().toString().padStart(2, '0');
  //   const month = (jsDate.getUTCMonth() + 1).toString().padStart(2, '0');
  //   const year = jsDate.getUTCFullYear();

  //   return `${day}/${month}/${year}`;
  // };

  const handleCompare = () => {
    console.log(10 + 1);
    api
      .get('/api/compare-declaration-status')
      .then(res => res.data)
      .then(data => {
        setDat(data);
        console.log(dat);
      })
      .catch(error => console.log(error));
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile1(file);
    console.log(file.name);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setDataDtci(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };
  const fetchDataDtci = async () => {
    if (!selectedFile1) {
      return console.log(1 + 2);
    }

    const formData = new FormData();
    formData.append('file', selectedFile1);

    try {
      console.log('Sending DTCI data:', formData);
      const response = await url.post('/api/upload_dtci_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error: any) {
      if (error.response) {
        console.log('Error response:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile2(file);
    console.log(file.name);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setDataTM(parsedData);
    };

    reader.readAsArrayBuffer(file);
    fetchDataTM();
  };

  const fetchDataTM = async () => {
    if (!selectedFile2) {
      return console.log(1 + 1);
    }

    const formData = new FormData();
    formData.append('file', selectedFile2);

    try {
      console.log('Sending TM data:', formData);
      const response = await url.post('/api/upload_trafic_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error: any) {
      if (error.response) {
        console.log('Error response:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  function Days(date: Date, day: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + day);
    return newDate;
  }

  const todayDate = new Date();
  const days = 0;
  const newDate = Days(todayDate, days);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-borderColor">{newDate.toDateString()}</div>
        <div className="flex justify-center items-center border-[0.5px] border-borderColor rounded-2xl px-2 py-1  w-fit">
          <Icon
            icon="typcn:location"
            width="1.2rem"
            height="1.2rem"
            style={{ color: '#313131' }}
          />
          <p className="text-borderColor">Abidjan</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center flex-wrap  gap-12">
          <div className="w-fit mt-2 flex gap-8 ">
            <Component1
              index={1}
              icon1="lucide:ship"
              icon2="mingcute:arrow-up-fill"
              name="Navire"
              number={countNavire}
            />
            <Component1
              index={2}
              icon1="lucide:contact"
              icon2="mingcute:arrow-up-fill"
              name="Consignataire"
              number={countConsignataire}
            />
          </div>
          <div className="flex gap-4 items-center justify-center">
            {Libs.map(lib => (
              <div
                key={lib.id}
                className="border-dashed w-48 h-40 mt-2 rounded-md border-2 p-2 border-firstBlue flex flex-col gap-2 justify-around items-center"
              >
                <label
                  htmlFor={`fileId-${lib.id}`}
                  className="flex flex-col gap-2 justify-between items-center cursor-pointer"
                >
                  <h2 className="font-medium text-[1.2rem] text-grayBlack">
                    File {lib.lib}
                  </h2>
                  <div className="block bg-firstBlue rounded-full p-2 ">
                    <Icon
                      icon="mdi:cloud-upload-outline"
                      width="2rem"
                      height="2rem"
                      color="#EEEEEC"
                    />
                  </div>

                  <p className="text-[0.6rem] text-testColors1 text-center">
                    Import file from your computer(*.xls)
                  </p>
                </label>
                <input
                  onChange={
                    lib.lib === 'DTCI' ? handleFileChange1 : handleFileChange2
                  }
                  className="hidden"
                  accept=".xlsx, .xls"
                  type="file"
                  id={`fileId-${lib.id}`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-4 p-1 rounded-sm">
            <div className="flex flex-col gap-3  py-2">
              <div className=" p-2 gap-4 bg-orange-100 rounded-sm flex justify-between shadow-sm">
                <p className="font-semibold text-base">File Navires DTCI</p>
                <button>
                  <Icon icon="ic:round-close" width="1em" height="1.5em" />
                </button>
              </div>
              <div className="p-2 w-fit gap-4 bg-red-100 rounded-sm flex justify-between shadow-sm">
                <p className="font-semibold text-base"> File Navires Trafic</p>
                <button>
                  <Icon icon="ic:round-close" width="1em" height="1.5em" />
                </button>
              </div>
            </div>
            <button
              className="bg-firstBlue w-40 rounded-md text-[#EEEEEC] h-10 shadow-sm"
              onClick={handleCompare}
            >
              Comparez
            </button>
          </div>
        </div>
        <div className="w-[50%] h-40">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Accueil;
