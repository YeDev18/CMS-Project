import url from '@/api';
import { useServer } from '@/Context/ServerProvider';

export const postTonnagesDt = async (data: File) => {
  const formData = new FormData();
  formData.append('file', data);
  await url.post('/api/upload_dtci_file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': useServer()?.csrfToken,
    },
    withCredentials: true,
  });
};

export const postTonnagesPAA = async (data: File) => {
  const formData = new FormData();
  formData.append('file', data);
  await url.post('/api/upload_port_file/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': useServer()?.csrfToken,
    },
    withCredentials: true,
  });
};
