import url from '@/api';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Context = {
  navire: [];
  consignataire: [];
  undeclared: [];
  notConform: [];
};
type Props = {
  children: ReactNode;
};
const SeverContext = createContext<any>(null);

const ServerProvider: FC<Props> = ({ children }) => {
  const [navire, setNavire] = useState<[]>([]);
  const [consignataire, setConsignataire] = useState<[]>([]);
  const [notConform, setNotConform] = useState<[]>([]);
  const [undeclared, setUndeclared] = useState<[]>([]);
  // const flag = useRef(false);

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
  }, []);

  return (
    <SeverContext.Provider
      value={{ navire, consignataire, undeclared, notConform }}
    >
      {children}
    </SeverContext.Provider>
  );
};
export default ServerProvider;
export const useServer = () => {
  return useContext(SeverContext);
};
