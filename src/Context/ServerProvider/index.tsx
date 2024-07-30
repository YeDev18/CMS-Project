import url from '@/api';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../AuthProvider';

type Context = {
  user: [];
  navire: [];
  consignataire: [];
  undeclared: [];
  notConform: [];
  conform: [];
};
type Props = {
  children: ReactNode;
};
const SeverContext = createContext<any>(null);

const ServerProvider: FC<Props> = ({ children }) => {
  const token = useAuth()?.token;

  const [user, setUser] = useState<[]>([]);
  const [navire, setNavire] = useState<[]>([]);
  const [consignataire, setConsignataire] = useState<[]>([]);
  const [conform, setConform] = useState<[]>([]);
  const [notConform, setNotConform] = useState<[]>([]);
  const [undeclared, setUndeclared] = useState<[]>([]);

  useEffect(() => {
    // NAVIRE
    url
      .get('api/consignataire-dtci')
      .then(res => res.data)
      .then(data => setConsignataire(data))
      .catch(error => console.log(error));
    // CONNSIGNATAIRE
    url
      .get('api/navire-soumission-dtci')
      .then(res => res.data)
      .then(data => setNavire(data))
      .catch(error => console.log(error));
    // NON-DECLARE
    url
      .get('api/non-declare')
      .then(res => res.data)
      .then(data => setUndeclared(data))
      .catch(error => console.log(error));
    //NOM-CONFORME
    url
      .get('api/declare-non-conforme')
      .then(res => res.data)
      .then(data => setNotConform(data))
      .catch(error => console.log(error));

    //CONFORME

    url
      .get('api/declare-conforme')
      .then(res => res.data)
      .then(data => setConform(data))
      .catch(error => console.log(error));

    url
      .get('api/user', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          ' Authorization': `Bearer ${token}`,
        },
      })
      .then(res => res.data)
      .then(data => setUser(data))
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

  return (
    <SeverContext.Provider
      value={{ user, navire, consignataire, undeclared, notConform, conform }}
    >
      {children}
    </SeverContext.Provider>
  );
};
export default ServerProvider;
export const useServer = () => {
  return useContext(SeverContext);
};
