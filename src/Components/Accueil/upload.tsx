import url from '@/api';
import { useServer } from '@/Context/ServerProvider';

const Download = async (file: any, link: any) => {
  const server = useServer();

  const csrfToken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('file', file);
  const response = await url
    .post(link, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true,
    })
    .then(response => {
      server?.showSuccess1();
      server.showNotError1();
      console.log('je sais que je suis mort');
    })
    .catch(error => {
      server.showError1();
      server?.showLoadingFinish();
    });

  return;
};

export default Download;

export function getCookie(name: any) {
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

export const fetchTonnagesPPA = (file: any) => {
  const server = useServer();
  const formData = new FormData();
  formData.append('file', file);
  const response = url
    .post('/api/upload_port_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      withCredentials: true,
    })
    .then(response => {
      // server?.showSuccess2();
      // server.showNotError2();
      console.log('bon');
    })
    .catch(error => {
      // server.showError2();
      // server?.showLoadingFinish();
      console.log('error');
    });
  return response;
};

export const fetchTonnagesDtci = (file: any) => {
  const server = useServer();
  const formData = new FormData();
  formData.append('file', file);
  const response = url
    .post('/api/upload_tonnageDT_file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCookie('csrftoken'),
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
  return response;
};
