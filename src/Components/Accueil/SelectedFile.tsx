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
  const server = useServer();
  //   const [selectedFile3, setSelectedFile3] = useState<any>(null);

  const handleCompare = () => {
    fetchDataDTCI();
    fetchDataTrafic();
    setTimeout(() => {
      url
        .get('/api/compare-declaration-status')
        .then(res => res.data)
        .then(data => {
          setDataFinal(data);
          console.log(dataFinal);
          setTimeout(() => {
            server?.toInitialize();
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    }, 5000);
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
    try {
      console.log('Sending DTCI data:', formData);
      const response = await url.post('/api/upload_dtci_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log('Error response:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
  };
  const fetchDataTrafic = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile2);
    try {
      console.log('Sending Trafic Maritime data:', formData);
      const response = await url.post('/api/upload_trafic_file/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log('Error response:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <div className=" absolute inset-y-0 w-full flex-center animate-fadIn-up ">
      <div className="w-[25%] min-w-[25rem] bg-white rounded-md static z-30 h-1/3 flex-column">
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
        <div className="w-full flex-column gap-4">
          <div className="w-full h-14 rounded-md border border-shadowColors  flex-between p-2 gap-3">
            <div className="bg-firstBlue w-32 p-1 rounded">
              <label
                htmlFor="fileDT"
                className="flex-start text-[#EEEEEC] text-sm font-medium gap-1"
              >
                {' '}
                <Icon
                  icon="mdi:cloud-upload-outline"
                  width="1.8rem"
                  height="1.8rem"
                />
                Fichier DTCI
              </label>
              <input
                className="hidden"
                accept=".xlsx, .xls"
                type="file"
                id="fileDT"
                onChange={handleFileChange1}
              />
            </div>
            <p> {selectedFile1?.name} </p>
            {selectedFile1 && (
              <button onClick={() => setSelectedFile1(null)}>
                <Icon icon="gridicons:trash" className="text-grayBlack" />
              </button>
            )}
          </div>
          <div className="w-full h-14 rounded-md border border-shadowColors flex-between p-2 gap-3">
            <div className="bg-firstBlue w-32 p-1 rounded">
              <label
                htmlFor="fileEx"
                className="flex-start text-[#EEEEEC] text-sm font-medium gap-1"
              >
                {' '}
                <Icon
                  icon="mdi:cloud-upload-outline"
                  width="1.8rem"
                  height="1.8rem"
                />
                {libelle === 'VOYAGES' ? 'Fichier TM' : 'Fichier PAA'}
              </label>
              <input
                className="hidden"
                accept=".xlsx, .xls"
                type="file"
                id="fileEx"
                onChange={handleFileChange2}
              />
            </div>
            <p>{libelle === 'VOYAGES' ? selectedFile2?.name : 'Name'}</p>
            {selectedFile2 && (
              <button onClick={() => setSelectedFile2(null)}>
                <Icon icon="gridicons:trash" className="text-grayBlack" />
              </button>
            )}
          </div>
        </div>
        <button
          className="bg-firstBlue w-40 rounded-md text-[#EEEEEC] h-12 cursor-pointer font-semibold "
          onClick={handleCompare}
        >
          Comparez
        </button>
      </div>
    </div>
  );
};

export default SelectedFile;
