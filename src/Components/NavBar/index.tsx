import url from '@/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';

import { Icon } from '@iconify/react';

const NavBar = () => {
  const auth = useAuth();
  const user = auth?.user;
  const token = auth?.token;
  const [log, setLog] = useState<boolean>(false);
  const [donne, setDonne] = useState([]);
  console.log(user);
  console.log(token);
  const handleClick = () => {
    setLog(!log);
  };
  useEffect(() => {
    url
      .get('api/user', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          ' Authorization': `Bearer ${token}`,
        },
      })
      .then(res => res.data)
      .then(data => setDonne(data))
      .catch(error => {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'état qui tombe hors de la plage de 2xx
          console.error('Erreur de réponse:', error.response.data);
          console.error('Statut:', error.response.status);
          console.error('En-têtes:', error.response.headers);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Erreur de requête:', error.request);
        } else {
          // Quelque chose s'est passé en configurant la requête qui a déclenché une erreur
          console.error('Erreur:', error.message);
        }
      });
  }, []);
  console.log(donne);

  return (
    <div className="h-[5rem] bg-firstColors w-[full] py-3 px-5 flex justify-between items-center rounded-md shadow-sm shadow-shadowColors">
      <h1 className="text-xl xl:text-2xl font-semibold">
        Declaration des Navires
      </h1>
      <div className="flex gap-3 relative">
        <button className=" p-1 transition duration-100 ease rounded-full hover:rounded-full hover:bg-firstBlue  ">
          <Icon
            icon="mdi:user"
            width="2.3em"
            height="2.3em"
            className="transition duration-100 ease hover:text-firstColors s"
          />
        </button>

        <button
          className="  p-1 transition duration-100 ease rounded-full hover:rounded-full hover:bg-firstBlue "
          onClick={() => {
            handleClick();
          }}
        >
          <Icon
            icon="iconamoon:settings-thin"
            width="2.3em"
            height="2.3em"
            className="transition duration-100 ease hover:text-firstColors "
          />
        </button>

        {log ? (
          <div className=" absolute right-0 top-12 py-4 px-6 flex flex-col gap-4 rounded shadow-md bg-firstColors">
            <p>{donne?.name}</p>
            <button className="flex gap-2  text-gray-700">
              <Icon
                icon="mingcute:information-fill"
                width="1.5em"
                height="1.5em"
              />{' '}
              <p>Information</p>
            </button>
            <button
              className="flex gap-2 text-gray-700 "
              onClick={() => auth?.logout()}
            >
              <Icon icon="ic:outline-logout" width="1.5em" height="1.5em" />
              <p>Deconnexion</p>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default NavBar;
