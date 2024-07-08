import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Libs } from '../Data';
import Sideba2 from '../Sideba2.tsx';
import { Component1 } from './Component';

interface Lib {
  id: number;
  lib: string;
}

const Accueil = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const dataDtci = useRef<string[]>([]);
  const dataTM = useRef<string[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lib: Lib
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(prevFiles => [...prevFiles, file]);
      console.log(`Selected file for ${lib.lib}:`, file.name);
      if (lib.lib === 'DTCI') {
        dataDtci.current.push(file.name);
      } else {
        dataTM.current.push(file.name);
      }
    }
  };
  console.log(selectedFile);

  // const handleDeleteFile = (lib: Lib) => {
  //   if (lib.lib === File.name) {
  //     console.log(dataDtci);
  //   } else {
  //     console.log(dataTM);
  //   }
  // };

  const fleDT: string[] = dataDtci.current;
  const flaTM: string[] = dataTM.current;

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

      <div className="flex gap-12">
        <div className="w-fit mt-2 flex gap-8 ">
          <Component1
            index={1}
            icon1="lucide:ship"
            icon2="mingcute:arrow-up-fill"
            name="Navire"
            number={285}
          />
          <Component1
            index={2}
            icon1="lucide:contact"
            icon2="mingcute:arrow-up-fill"
            name="Consignataire"
            number={85}
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
                onChange={e => handleFileChange(e, lib)}
                className="hidden"
                accept=".xlsx, .xls"
                type="file"
                id={`fileId-${lib.id}`}
              />
            </div>
          ))}
          <div className="flex flex-col gap-4 rounded-md h-40 mt-2 items-center justify-center border-2 px-1">
            <div className="flex items-center justify-center">
              {fleDT.length > 0 && (
                <div className=" flex flex-col items-center justify-center px-2">
                  <Icon
                    icon="vscode-icons:file-type-excel"
                    width="40"
                    height="40"
                  />
                  <p className="text-[12px] font-medium ">{fleDT[0]}</p>
                </div>
              )}
              {flaTM.length > 0 && (
                <div className=" flex flex-col items-center justify-start px-2">
                  <Icon
                    icon="vscode-icons:file-type-excel"
                    width="40"
                    height="40"
                  />
                  <p className="text-[12px] font-medium ">{flaTM[0]}</p>
                </div>
              )}
            </div>

            {flaTM.length > 0 && fleDT.length > 0 && (
              <div className="flex gap-4">
                <input
                  type="date"
                  name=""
                  id=""
                  className="p-2 border-2 rounded-md bg-bgColors"
                />
                <button className="text-lg text-firstColors rounded-md bg-firstBlue  py-1 px-4 w-fit">
                  {' '}
                  Vérification
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Sideba2 />
    </div>
  );
};

export default Accueil;
