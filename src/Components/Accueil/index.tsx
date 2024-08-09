import { default as api, default as url } from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Chart } from './Chart';
import { Component1 } from './Component';

const Accueil = () => {
  const [selectedFile1, setSelectedFile1] = useState<File | null | ''>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null | ''>(null);
  const [dataDtci, setDataDtci] = useState<any[]>(['']);
  const [dataTM, setDataTM] = useState<any[]>(['']);
  const navire = useServer().navire;
  const consignataire = useServer().consignataire;
  const conform = useServer().conform;
  const notConform = useServer().notConform;
  const undeclared = useServer().undeclared;
  const [dat, setDat] = useState<any[]>(['']);
  const [selected, setSelected] = useState(false);
  const selection = selectedFile1 && selectedFile2 ? true : false;
  const [IsLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  console.log(selectedFile1);
  console.log(selectedFile2);

  const handleCompare = () => {
    fetchDataDtci();
    fetchDataTM();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    api
      .get('/api/compare-declaration-status')
      .then(res => res.data)
      .then(data => {
        setDat(data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });

    setSelected(true);
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile1(file);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
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
    } catch (error: any) {
      setError(true);
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
    // fetchDataTM();
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
    } catch (error: any) {
      setError(true);
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
  const dateFormatter = new Intl.DateTimeFormat('fr-FR');
  const formattedDate = dateFormatter.format(newDate);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-2">
        <div className="text-borderColor font-semibold">{formattedDate}</div>
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
        <div className="flex flex-col items-center justify-start lg:flex-row gap-4">
          <div className="w-full lg:w-2/5 flex-center gap-4">
            <Component1
              index={1}
              icon1="lucide:ship"
              icon2="mingcute:arrow-up-fill"
              name="Navires"
              number={navire.length}
              route="/navire"
            />
            <Component1
              index={2}
              icon1="lucide:contact"
              icon2="mingcute:arrow-up-fill"
              name="Consignataires"
              number={consignataire.length}
              route="/consignataire"
            />
          </div>
          <div className="w-full flex justify-start gap-4 items-center lg:w-3/5">
            <div className="h-48 w-full lg:w-[50%]  flex flex-col justify-between bg-firstColors rounded-md shadow-sm shadow-shadowColors pt-4 ">
              <div className="flex-between  px-4">
                <h3 className="font-bold text-[1.25rem] text-[#272A2D]">
                  VOYAGES
                </h3>
                <Link
                  to={''}
                  className=" bg-firstBlue  w-fit p-1 rounded-md text-2xl cursor-pointer"
                >
                  <Icon
                    icon="mingcute:arrow-up-fill"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: '#EEEEEC' }}
                    className="rotate-45"
                  />
                </Link>
              </div>

              <div className="mx-4 flex-center w-fit border rounded-md px-2 py-3 gap-2">
                <div className="bg-firstBlue text-xl rounded-md text-firstColors p-2 w-fit">
                  <Icon icon="octicon:feed-plus-16" />
                </div>
                <p className="text-md font-medium ">Comparaison Voyages</p>
              </div>

              <div className="grid grid-cols-3 w-full place-items-center h-10 bg-[#f7f7f8] rounded-b-md">
                <div className=" flex-center border-r-2 w-full gap-2 text-xl text-[#2563eb]">
                  <Icon
                    icon="lucide:circle-check-big"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">
                    {conform.length}
                  </p>
                </div>
                <div className="flex-center border-r-2 w-full gap-2 text-xl text-[#f59069] ">
                  <Icon icon="charm:notes-cross" className="drop-shadow-sm" />
                  <p className="font-medium  drop-shadow-sm">
                    {notConform.length}
                  </p>
                </div>
                <div className="flex-center w-full gap-2 text-xl  text-[#f0352b]">
                  <Icon icon="ph:x-circle" className="drop-shadow-sm " />
                  <p className="font-medium drop-shadow-sm">
                    {undeclared.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-48 w-full lg:w-[50%]  flex flex-col justify-between bg-firstColors rounded-md shadow-sm shadow-shadowColors pt-4 ">
              <div className="flex-between  px-4">
                <h3 className="font-bold text-[1.25rem] text-[#272A2D]">
                  TONNAGES
                </h3>
                <Link
                  to={''}
                  className=" bg-firstBlue  w-fit p-1 rounded-md text-2xl cursor-pointer"
                >
                  <Icon
                    icon="mingcute:arrow-up-fill"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: '#EEEEEC' }}
                    className="rotate-45"
                  />
                </Link>
              </div>
              <div className="mx-4 flex-center w-fit border rounded-md px-2 py-3 gap-2">
                <div className="bg-firstBlue text-xl rounded-md text-firstColors p-2 w-fit">
                  <Icon icon="octicon:feed-plus-16" />
                </div>
                <p className="text-md font-medium ">Comparaison Tonnages</p>
              </div>

              <div className="grid grid-cols-2 w-full place-items-center h-10 bg-[#f7f7f8] rounded-b-md">
                <div className=" flex-center border-r-2 w-full gap-2 text-xl text-[#2563eb]">
                  <Icon
                    icon="solar:graph-up-broken"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">12</p>
                </div>
                <div className="flex-center w-full gap-2 text-xl text-[#f59069] ">
                  <Icon
                    icon="solar:graph-up-broken"
                    className="drop-shadow-sm"
                  />
                  <p className="font-medium  drop-shadow-sm">13</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex gap-4 items-center justify-center">
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
          </div> */}
          {/* {selected ? (
            ''
          ) : (
            <div className="flex flex-col justify-between gap-4 p-1 rounded-sm">
              <div className="flex flex-col gap-3  py-2">
                {selectedFile1 ? (
                  <div className=" p-2 gap-4 w-48 bg-orange-100 rounded-sm flex justify-between items-center shadow-sm">
                    <p className="font-semibold text-base whitespace-nowrap">
                      Fichier Navires DTCI
                    </p>
                    <button onClick={() => setSelectedFile1('')}>
                      <Icon icon="mdi:trash-outline" />
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {selectedFile2 ? (
                  <div className="p-2  gap-4 w-48 bg-red-100 rounded-sm flex justify-between shadow-sm">
                    <p className="font-semibold text-base whitespace-nowrap">
                      {' '}
                      Fichier Navires Trafic
                    </p>
                    <button onClick={() => setSelectedFile2('')}>
                      <Icon icon="mdi:trash-outline" />
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {selection === true ? (
                <button
                  className="bg-firstBlue w-40 rounded-md text-[#EEEEEC] h-10 shadow-sm"
                  onClick={() => handleCompare()}
                >
                  Comparez
                </button>
              ) : (
                ''
              )}
            </div>
          )} */}
        </div>
        <div className="w-[100%] h-fit flex flex-col mb-2 lg:flex-row gap-6">
          <div className="w-full  lg:w-[50%]">
            <Chart />
          </div>
          <div className="w-full lg:w-fit h-fit border rounded-md flex flex-col justify-start items-start p-4 gap-6">
            <h2 className="font-semibold text-xl">
              Tonages des differents navires
            </h2>
            <div className=" w-full flex flex-row justify-between lg:flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
                <div className="w-80 h-8 bg-black opacity-5 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-fit bottom-0 left-0  flex justify-end items-end">
        {(IsLoading || success || error) && (
          <div className="absolute  bg-sky-100 w-96 h-16 rounded-sm shadow-lg inline-flex align-middle px-4">
            {IsLoading ? (
              <div className="flex items-center justify-center gap-2">
                <p className="font-medium">Envoi des Données</p>
                <Icon
                  icon="eos-icons:three-dots-loading"
                  width="2em"
                  height="2em"
                />
              </div>
            ) : (
              ''
            )}
            {success ? (
              <div className="flex items-center justify-center gap-2">
                <Icon
                  icon="lucide:circle-check-big"
                  width="1.2em"
                  height="1.2em"
                  className="text-green-700"
                />
                <p className="font-medium">Comparaison Reussie</p>
              </div>
            ) : (
              ''
            )}
            {error ? (
              <div className="flex items-center justify-center gap-2">
                <Icon
                  icon="ph:x-circle"
                  width="1.2em"
                  height="1.2em"
                  className="text-red-600"
                />
                <p className="font-medium">Comparaison Echoue</p>
              </div>
            ) : (
              ''
            )}
            a
          </div>
        )}
      </div>
    </div>
  );
};

export default Accueil;
