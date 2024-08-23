import url from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { FC, useState } from 'react';

type Lib = {
  libelle: string;
  onClick: () => void;
};

const SelectedFile: FC<Lib> = ({ libelle, onClick }) => {
  const [selectedFile1, setSelectedFile1] = useState<any>(null);
  const [selectedFile2, setSelectedFile2] = useState<any>(null);
  const [dataFinal, setDataFinal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean | number>(0);
  const server = useServer();

  const handleCompare = async () => {
    await fetchDataDTCI();
    await fetchDataTrafic();
    getData();
    console.log(error);
  };

  const getData = () => {
    error === false &&
      url
        .get('/api/compare-declaration-status')
        .then(res => res.data)
        .then(data => {
          setLoading(true);
          setDataFinal(data);
          console.log(dataFinal);
          setLoading(false);
          setSuccess(true);
          // setTimeout(() => {
          //   setSucess(true);
          // }, 100);
          // setTimeout(() => {
          server?.toInitialize();
          // }, 100);
          // server?.showOverlay();
          console.log('e suis bons');
        })
        .catch(error => {
          // setError(true);
          console.log(error);
        });
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile1(file);
  };
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile2(file);
  };
  console.log(selectedFile1, selectedFile2);

  const fetchDataDTCI = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile1);

    console.log('Sending DTCI data:', formData);
    const response = await url
      .post('/api/upload_dtci_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  };
  const fetchDataTrafic = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile2);

    console.log('Sending Trafic Maritime data:', formData);
    const response = await url
      .post('/api/upload_trafic_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className=" absolute inset-y-0 w-full flex-center animate-fadIn-up z-30 ">
      <div className="w-[30%] min-w-[25rem] bg-white rounded-md static  flex-column px-4 shadow">
        <button
          className=" relative w-full bg-slate-600 text-xl"
          onClick={onClick}
        >
          <Icon
            icon="ic:round-close"
            className="text-grayBlack absolute top-0 right-0"
          />
        </button>
        <h3 className="font-bold text-xl">{libelle}</h3>
        <p className="text-neutral-900/60 font-semibold">
          Televersez les fichiers Excel{' '}
        </p>
        <div className="h-48 w-full m-3 border-2 rounded border-dashed flex justify-evenly items-center border-zinc-200 ">
          <div className="bg-firstBlue w-32  h-3/4 p-1 rounded flex flex-col shadow items-center">
            <label
              htmlFor="fileDT"
              className="flex-start text-[#EEEEEC] text-sm font-medium gap-1 cursor-pointer"
            >
              {' '}
              <Icon icon="solar:download-bold" width="4rem" height="4rem" />
            </label>
            <input
              className="hidden"
              accept=".xlsx, .xls"
              type="file"
              id="fileDT"
              onChange={handleFileChange1}
            />
            <p className="font-semibold text-[#EEEEEC]">DTCI</p>
            <p className=" text-[#EEEEEC] text-sm text-center">
              Televersez fichier en .xlsx
            </p>
          </div>
          <div className="bg-firstBlue w-32  h-3/4 p-1 rounded flex flex-col shadow items-center">
            <label
              htmlFor="fileTM"
              className="flex-start text-[#EEEEEC] text-sm font-medium gap-1 cursor-pointer"
            >
              {' '}
              <Icon icon="solar:download-bold" width="4rem" height="4rem" />
            </label>
            <input
              className="hidden"
              accept=".xlsx, .xls"
              type="file"
              id="fileTM"
              onChange={handleFileChange2}
            />
            <p className="font-semibold text-[#EEEEEC]">TM</p>
            <p className=" text-[#EEEEEC] text-sm text-center">
              {' '}
              Televersez fichier en .xlsx
            </p>
          </div>
        </div>
        <div className=" relative w-full flex-column h-32 bg-slate-200/20 rounded-sm flex justify-center items-center flex-col gap-4">
          {!(selectedFile1 || selectedFile2) ? (
            <p className=" text-base text-slate-400 font-normal">
              Aucun Fichier
            </p>
          ) : (
            ''
          )}
          {selectedFile1 && (
            <div className="flex justify-between items-center w-full border p-3 rounded-md shadow-sm">
              <div className="flex justify-center items-center gap-2 text-base">
                <Icon
                  icon="mdi:file-excel-outline"
                  width="1.7em"
                  height="1.7em"
                />
                <p> {selectedFile1?.name} </p>
              </div>
              {selectedFile1 && (
                <div className="flex items-center gap-2">
                  <p className="opacity-60">
                    {Math.trunc(selectedFile1?.size / 1024)} Ko
                  </p>
                  <button onClick={() => setSelectedFile1(null)}>
                    <Icon
                      icon="gridicons:trash"
                      className="text-grayBlack"
                      width="1.5em"
                      height="1.5em"
                    />
                  </button>
                </div>
              )}
            </div>
          )}
          {selectedFile2 && (
            <div className="flex justify-between items-center w-full border p-3 rounded-md shadow-sm">
              <div className="flex justify-center items-center gap-2 text-base">
                <Icon
                  icon="mdi:file-excel-outline"
                  width="1.7em"
                  height="1.7em"
                />
                <p> {selectedFile2?.name} </p>
              </div>
              {selectedFile2 && (
                <div className="flex items-center gap-2">
                  <p className="opacity-60">
                    {Math.trunc(selectedFile2?.size / 1024)} Ko
                  </p>
                  <button onClick={() => setSelectedFile2(null)}>
                    <Icon
                      icon="gridicons:trash"
                      className="text-grayBlack"
                      width="1.5em"
                      height="1.5em"
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {loading || success || error ? (
            <div className="absolute size-full bg-grayBlack/70 inset-0 rounded-sm shadow-sm flex flex-col justify-center items-center">
              {loading && (
                <div className="flex justify-center items-center gap-2">
                  <Icon
                    icon="eos-icons:loading"
                    className="text-firstColors text-4xl"
                  />
                  <h2 className="font-bold text-xl text-firstColors">
                    Analyse des données
                  </h2>
                </div>
              )}

              {success && (
                <div className="flex justify-center items-center gap-2">
                  <Icon
                    icon="gg:check-o"
                    className="text-firstColors text-4xl"
                  />
                  <h2 className="font-bold text-xl text-firstColors">
                    Comparaison Reussie
                  </h2>
                </div>
              )}
              {error && (
                <div className="flex justify-center items-center gap-2">
                  <Icon
                    icon="carbon:close-outline"
                    className="text-firstColors text-4xl"
                  />
                  <h2 className="font-bold text-xl text-firstColors">
                    Comparaison Echoué
                  </h2>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex justify-between gap-4 w-full py-4">
          <button
            className=" border border-grayBlack transition ease-in-out delay-150 w-40 rounded-md text-grayBlack h-12 cursor-pointer font-semibold hover:scale-105 "
            onClick={onClick}
          >
            Quittez
          </button>
          <button
            className="bg-firstBlue w-40 transition ease-in-out delay-150 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold hover:scale-105 "
            onClick={handleCompare}
          >
            Comparez
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedFile;
