import url from '@/api';

type ObservationProps = {
  observation: {
    observation: string;
  };
};
const getCsrf = async () => {
  try {
    const response = await url.get('/api/get-csrf-token/');
    const valueToken = response.data.csrfToken;

    return valueToken;
  } catch (error) {
    console.error('Erreur lors de la recuperation du crsf : ', error);
    throw error;
  }
};

const useServerUpload = () => {
  const postTonnagesDt = async (data: File) => {
    const formData = new FormData();
    const crsfToken = await getCsrf();

    formData.append('file', data);
    await url.post('/api/upload_tonnageDT_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': crsfToken,
      },
      withCredentials: true,
    });
  };

  const postTonnagesPAA = async (data: File) => {
    const formData = new FormData();
    const crsfToken = await getCsrf();
    formData.append('file', data);
    await url.post('/api/upload_port_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': crsfToken,
      },
      withCredentials: true,
    });
  };

  const postBoardDt = async (data: File) => {
    const formData = new FormData();
    const crsfToken = await getCsrf();
    formData.append('file', data);
    await url.post('/api/upload_dtci_file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': crsfToken,
      },
      withCredentials: true,
    });
  };

  const postBoardPAA = async (data: File) => {
    const formData = new FormData();
    const crsfToken = await getCsrf();
    formData.append('file', data);
    await url.post('/api/upload_trafic_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': crsfToken,
      },
      withCredentials: true,
    });
  };

  const putBoardNConforme = async (id: number, data: ObservationProps) => {
    const crsfToken = await getCsrf();
    url.put(`/api/declarationstatus/${id}/add_observation/`, data, {
      headers: {
        'X-CSRFToken': crsfToken,
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
