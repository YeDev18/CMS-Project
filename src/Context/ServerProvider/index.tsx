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
  initialize: boolean;
  overlay: boolean;
  userInitialize: boolean;
  error: boolean;
  success: boolean;
  loading: boolean;
  notification: boolean;
  showOverlay: () => void;
  toInitialize: () => void;
  showUserInitialize: () => void;
  showLoading: () => void;
  showSuccess: () => void;
  showError1: () => void;
  showError2: () => void;
  showSuccess1: () => void;
  showSuccess2: () => void;
  showSuccessError: () => void;
  showshowLoadingFinish: () => void;
  showNotification: () => void;
  showNotificationFinish: () => void;
};
type Props = {
  children: ReactNode;
};
const SeverContext = createContext<Context | any>(null);

const ServerProvider: FC<Props> = ({ children }) => {
  const token = useAuth()?.token;

  const [user, setUser] = useState<[]>([]);
  const [navire, setNavire] = useState<[]>([]);
  const [consignataire, setConsignataire] = useState<[]>([]);
  const [conform, setConform] = useState<[]>([]);
  const [notConform, setNotConform] = useState<[]>([]);
  const [undeclared, setUndeclared] = useState<[]>([]);
  const [initialize, setInitialize] = useState(false);
  const [userInitialize, setUserInitialize] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);

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
  const showNotification = () => {
    setNotification(true);
  };
  const showNotificationFinish = () => {
    setNotification(false);
  };
  const showError1 = () => {
    setError1(true);
  };
  const showError2 = () => {
    setError2(true);
  };
  const showSuccess1 = () => {
    setError1(false);
  };
  const showSuccess2 = () => {
    setError2(false);
  };
  const showSuccess = () => {
    setSuccess(true);
  };
  const showSuccessError = () => {
    setSuccess(false);
  };
  const showLoading = () => {
    setLoading(true);
  };
  const showLoadingFinish = () => {
    setLoading(false);
  };
  const showOverlay = () => {
    setOverlay(!overlay);
  };
  const showUserInitialize = () => {
    setUserInitialize(!userInitialize);
  };
  const toInitialize = () => {
    setInitialize(!initialize);
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
  }, [userInitialize]);

  return (
    <SeverContext.Provider
      value={{
        user,
        navire,
        consignataire,
        undeclared,
        notConform,
        conform,
        overlay,
        loading,
        success,
        error1,
        error2,
        initialize,
        userInitialize,
        showOverlay,
        toInitialize,
        showUserInitialize,
        showError1,
        showError2,
        showSuccess1,
        showSuccess2,
        showSuccess,
        showLoading,
        showSuccessError,
        showLoadingFinish,
        showNotification,
        showNotificationFinish,
        notification,
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
