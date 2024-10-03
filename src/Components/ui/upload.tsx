import url from '@/api';
import { useServer } from '@/Context/ServerProvider';

type ObservationProps = {
  observation: {
    observation: string;
  };
};

const useServerUpload = () => {
  const server = useServer();
  const postTonnagesDt = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);
    await url.post('/api/upload_tonnageDT_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': server?.csrfToken,
      },
      withCredentials: true,
    });
  };

  const postTonnagesPAA = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);
    await url.post('/api/upload_port_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': server?.csrfToken,
      },
      withCredentials: true,
    });
  };

  const postBoardDt = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);
    await url.post('/api/upload_dtci_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': server?.csrfToken,
      },
      withCredentials: true,
    });
  };

  const postBoardPAA = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);
    await url.post('/api/upload_trafic_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': server?.csrfToken,
      },
      withCredentials: true,
    });
  };

  const putBoardNConforme = (id: number, data: ObservationProps) => {
    url.put(`/api/declarationstatus/${id}/add_observation/`, data, {
      headers: {
        'X-CSRFToken': server?.csrfToken,
      },
      withCredentials: true,
    });
  };
  return {
    postTonnagesDt,
    postBoardDt,
    postBoardPAA,
    postTonnagesPAA,
    putBoardNConforme,
  };
};

export default useServerUpload;
