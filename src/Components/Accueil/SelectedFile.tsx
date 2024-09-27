import url from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { postTonnagesDt, postTonnagesPAA } from './upload';

type Lib = {
  libelle: string;
  onClick: () => void;
};

const SelectedFile: FC<Lib> = ({ libelle, onClick }) => {
  const queryClient = useQueryClient();
  const [selectedFile1, setSelectedFile1] = useState<any>(null);
  const [selectedFile2, setSelectedFile2] = useState<any>(null);
  const server = useServer();
  const csrf = server?.csrfToken;
  console.log(csrf);
  function getCookie(name: any) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrfToken = getCookie('csrftoken');
  console.log(csrfToken);

  let postTonnagesDTCI = postTonnagesDt(selectedFile1);
  let postTonnagesPort = postTonnagesPAA(selectedFile2);

 Y const handleCompare = async () => {
    server?.showLoading();
    await fetchDataDTCI();
    await fetchDataTrafic();
    await getData();
  };

  const handleTonnage = async () => {
    await fetchTonnagesDtci();
    await fetchTonnagesPPA();
    await getTonnagesDtci();
  };

  const getData = async () => {
    await url
      .get('/api/compare-declaration-status')
      .then(res => res.data)
      .then(data => {
        server?.showLoadingFinish();
        server?.showSuccess();
      })
      .catch(error => {
        server.showSuccessError();
      });

    setTimeout(() => {
      server?.toInitialize();
      server?.showOverlay();
    }, 4000);
  };
  const getTonnagesDtci = async () => {
    await url
      .get('/api/control-tonnage-status')
      .then(res => res.data)
      .then(data => {
        server?.showLoadingFinish();
        server?.showSuccess();
        console.log(data);
      })
      .catch(error => {
        server.showSuccessError();
      });

    setTimeout(() => {
      server?.toInitialize();
      server?.showOverlay();
    }, 4000);
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

  ////DONNEES TONNAGES ////////////////////////////////////////////////

  const fetchTonnagesDtci = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile1);
    const response = await url
      .post('/api/upload_tonnageDT_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      })
      .then(response => {
        server?.showSuccess1();
        server.showNotError1();
      })
      .catch(error => {
        server.showError1();
        server?.showLoadingFinish();
      });
  };

  const fetchTonnagesPPA = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile2);
    const response = await url
      .post('/api/upload_port_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      })
      .then(response => {
        server?.showSuccess2();
        server.showNotError2();
      })
      .catch(error => {
        server.showError2();
        server?.showLoadingFinish();
      });
  };

  ////DONNEES DECLARATION ////////////////////////////////////////////////
  const fetchDataDTCI = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile1);
    const response = await url
      .post('/api/upload_dtci_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      })
      .then(response => {
        server?.showSuccess1();
        server.showNotError1();
      })
      .catch(error => {
        server.showError1();
        server?.showLoadingFinish();
      });
  };
  const fetchDataTrafic = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile2);
    const response = await url
      .post('/api/upload_trafic_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      })
      .then(response => {
        server?.showSuccess2();
        server?.showNotError2();
      })
      .catch(error => {
        server?.showError2();
        server?.showLoadingFinish();
      });
  };

  return (
    <div className=" flex-center absolute inset-y-0 z-30 w-full animate-fadIn-up ">
      <div className="flex-column static w-[30%] min-w-[25rem] rounded-md  bg-white px-4 shadow">
        <button
          className=" relative w-full bg-slate-600 text-xl"
          onClick={onClick}
        >
          <Icon
            icon="ic:round-close"
            className="absolute right-0 top-0 text-grayBlack"
          />
        </button>
        <h3 className="text-xl font-bold">{libelle}</h3>
        <p className="font-semibold text-neutral-900/60">
          Televersez les fichiers Excel{' '}
        </p>
        <div className="m-3 flex h-48 w-full items-center justify-evenly rounded border-2 border-dashed border-zinc-200 ">
          <div className="flex h-3/4  w-32 flex-col items-center rounded bg-firstBlue p-1 shadow">
            <label
              htmlFor="fileDT"
              className="flex-start cursor-pointer gap-1 text-sm font-medium text-[#EEEEEC]"
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
            <p className=" text-center text-sm text-[#EEEEEC]">
              Televersez fichier en .xlsx
            </p>
          </div>
          <div className="flex h-3/4  w-32 flex-col items-center rounded bg-firstBlue p-1 shadow">
            <label
              htmlFor="fileTM"
              className="flex-start cursor-pointer gap-1 text-sm font-medium text-[#EEEEEC]"
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
            {libelle === 'VOYAGES' ? (
              <p className="font-semibold text-[#EEEEEC]">TM</p>
            ) : (
              <p className="font-semibold text-[#EEEEEC]">PAA</p>
            )}
            <p className=" text-center text-sm text-[#EEEEEC]">
              {' '}
              Televersez fichier en .xlsx
            </p>
          </div>
        </div>
        <div className=" flex-column relative flex h-40 w-full flex-col items-center justify-center gap-4 rounded-sm bg-slate-200/20">
          {!(selectedFile1 || selectedFile2) ? (
            <p className=" text-base font-normal text-slate-400">
              Aucun Fichier
            </p>
          ) : (
            ''
          )}
          {selectedFile1 && (
            <div className="flex w-full items-center justify-between rounded-md border p-3 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-base">
                <Icon
                  icon="mdi:file-excel-outline"
                  width="1.7em"
                  height="1.7em"
                />
                <div className="flex flex-col items-start justify-center">
                  <p> {selectedFile1?.name} </p>
                  <p className="text-xs text-grayBlack/60">Fichier DTCI</p>
                </div>
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
            <>
              <div className="flex w-full items-center justify-between rounded-md border p-3 shadow-sm">
                <div className="flex items-center justify-center gap-2 text-base">
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="1.7em"
                    height="1.7em"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p> {selectedFile2?.name} </p>
                    <p className="text-xs text-grayBlack/60">
                      Fichier Trafic Maritime
                    </p>
                  </div>
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
            </>
          )}
        </div>
        <div className=" flex h-10  w-full flex-col justify-between py-3 text-black">
          {server?.loading === true && (
            <div
              className={`flex items-center justify-center gap-1 rounded-sm bg-[#009fe3] px-2 py-1 font-semibold`}
            >
              <Icon
                icon="eos-icons:loading"
                className="text-[#ffffff] "
                width="1.2em"
                height="1.2em"
              />
              <p className="text-sm text-[#ffffff]">Chargement</p>
            </div>
          )}

          {server.success1 === true &&
            server.success2 === true &&
            server.success === true && (
              <div
                className={`flex items-center justify-center gap-1 rounded-sm  bg-[#0e5c2f] px-2 py-1 font-semibold`}
              >
                <p className="text-sm text-[#ffffff]">Reussite</p>
                <Icon
                  icon="gg:check-o"
                  width="1.1em"
                  height="1.1em"
                  className="text-[#ffffff]"
                />
              </div>
            )}
          {server.error1 == true || server.error2 == true ? (
            <div
              className={`flex items-center justify-center gap-1 rounded-sm bg-[#750b0b] p-1 text-right font-semibold`}
            >
              <p className="text-sm text-[#ffffff]">Echec</p>
              <Icon
                icon="carbon:close-outline"
                width="1.2em"
                height="1.2em"
                className="text-[#ffffff]"
              />
            </div>
          ) : (
            ' '
          )}
        </div>
        <div className="flex w-full justify-between gap-4 py-4">
          <button
            className=" h-12 w-40 cursor-pointer rounded-md border border-grayBlack font-semibold text-grayBlack transition delay-150 ease-in-out hover:scale-105 "
            onClick={onClick}
          >
            Quittez
          </button>
          <button
            className="h-12 w-40 cursor-pointer rounded-md bg-firstBlue font-semibold text-[#EEEEEC] transition delay-150 ease-in-out hover:scale-105 "
            onClick={libelle === 'VOYAGES' ? handleCompare : handleTonnage}
          >
            Comparez
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedFile;
