import url from '@/api';
import { useServer } from '@/Context/ServerProvider';
import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Lib = {
  libelle: string;
  onClick: () => void;
};

const SelectedFile: FC<Lib> = ({ libelle, onClick }) => {
  const [selectedFile1, setSelectedFile1] = useState<any>(null);
  const [selectedFile2, setSelectedFile2] = useState<any>(null);
  const server = useServer();
  const direction = useNavigate();
  const csrf = server?.csrf?.csrfToken;
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

  const handleCompare = async () => {
    // server?.showOverlay();
    // await server?.showNotification();
    server?.showLoading();
    await fetchDataDTCI();
    await fetchDataTrafic();
    await getData();

    // await server?.showSettingFinish();
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
            {libelle === 'VOYAGES' ? (
              <p className="font-semibold text-[#EEEEEC]">TM</p>
            ) : (
              <p className="font-semibold text-[#EEEEEC]">PAA</p>
            )}
            <p className=" text-[#EEEEEC] text-sm text-center">
              {' '}
              Televersez fichier en .xlsx
            </p>
          </div>
        </div>
        <div className=" relative w-full flex-column h-40 bg-slate-200/20 rounded-sm flex justify-center items-center flex-col gap-4">
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
                <div className="flex flex-col justify-center items-start">
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
              <div className="flex justify-between items-center w-full border p-3 rounded-md shadow-sm">
                <div className="flex justify-center items-center gap-2 text-base">
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="1.7em"
                    height="1.7em"
                  />
                  <div className="flex flex-col justify-center items-start">
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
        <div className=" w-full text-black  py-3 flex h-10 flex-col justify-between">
          {server?.loading === true && (
            <div
              className={`flex justify-center bg-[#009fe3] items-center gap-1 py-1 px-2 rounded-sm font-semibold`}
            >
              <Icon
                icon="eos-icons:loading"
                className="text-[#ffffff] "
                width="1.2em"
                height="1.2em"
              />
              <p className="text-[#ffffff] text-sm">Chargement</p>
            </div>
          )}

          {server.success1 === true &&
            server.success2 === true &&
            server.success === true && (
              <div
                className={`flex justify-center items-center gap-1 bg-[#0e5c2f]  py-1 px-2 rounded-sm font-semibold`}
              >
                <p className="text-[#ffffff] text-sm">Reussite</p>
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
              className={`flex text-right justify-center items-center gap-1 bg-[#750b0b] p-1 rounded-sm font-semibold`}
            >
              <p className="text-[#ffffff] text-sm">Echec</p>
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
        <div className="flex justify-between gap-4 w-full py-4">
          <button
            className=" border border-grayBlack transition ease-in-out delay-150 w-40 rounded-md text-grayBlack h-12 cursor-pointer font-semibold hover:scale-105 "
            onClick={onClick}
          >
            Quittez
          </button>
          <button
            className="bg-firstBlue w-40 transition ease-in-out delay-150 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold hover:scale-105 "
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
