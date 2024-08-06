import url from '@/api';
import axios from 'axios';
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
  const [initialize, setInitialize] = useState(false);

  const getData = () => {
    const routes = [
      'api/consignataire-dtci',
      'api/navire-soumission-dtci',
      'api/non-declare',
      'api/declare-non-conforme',
      'api/declare-conforme',
    ];
    axios.all(routes.map(route => url.get(route))).then(
      axios.spread(
        (
          { data: consignataire },
          { data: navire },
          { data: nonDeclare },
          { data: declareNConforme },
          { data: declareConforme }
        ) => {
          setNavire(navire);
          setConsignataire(consignataire);
          setConform(declareConforme);
          setUndeclared(nonDeclare);
          setNotConform(declareNConforme);
        }
      )
    );
  };

  useEffect(() => {
    getData();
  }, [initialize]);
  useEffect(() => {
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
      value={{
        user,
        navire,
        consignataire,
        undeclared,
        notConform,
        conform,
        setInitialize,
      }}
    >
      {children}
    </SeverContext.Provider>
  );
};
export default ServerProvider;
export const useServer = () => {
  return useContext(SeverContext);
};
