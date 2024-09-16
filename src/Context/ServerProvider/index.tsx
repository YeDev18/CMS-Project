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
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

type Context = {
  user: [];
  navire: [];
  consignataire: [];
  undeclared: [];
  notConform: [];
  conform: [];
  conformTonnages: [];
  notConformTonnages: [];
  undeclaredTonnages: [];
  tonnages: [];
  getCsrf: [csrfToken: string];
  pathname: string;
  initialize: boolean;
  overlay: boolean;
  userInitialize: boolean;
  error: boolean;
  success: boolean | 0;
  loading: boolean | 0;
  notification: boolean | 0;
  setting: boolean;
  responsive: boolean;
  showOverlay: () => void;
  toInitialize: () => void;
  showUserInitialize: () => void;
  showLoading: () => void;
  showSuccess: () => void;
  showSuccess1: () => void;
  showNotSuccess1: () => void;
  showSuccess2: () => void;
  showNotSuccess2: () => void;
  showError1: () => void;
  showError2: () => void;
  showNotError1: () => void;
  showNotError2: () => void;
  showSuccessError: () => void;
  showLoadingFinish: () => void;
  showNotification: () => void;
  showNotificationFinish: () => void;
  showSetting: () => void;
  showSettingFinish: () => void;
  showResponsive: () => void;
};
type Props = {
  children: ReactNode;
};
const SeverContext = createContext<Context | any>(null);

const ServerProvider: FC<Props> = ({ children }) => {
  const token = useAuth()?.token;
  const { pathname } = useLocation();
  console.log(pathname);

  const [user, setUser] = useState<[]>([]);
  const [navire, setNavire] = useState<[]>([]);
  const [consignataire, setConsignataire] = useState<[]>([]);
  const [conform, setConform] = useState<[]>([]);
  const [notConform, setNotConform] = useState<[]>([]);
  const [undeclared, setUndeclared] = useState<[]>([]);
  const [conformTonnages, setConformTonnages] = useState<[]>([]);
  const [notConformTonnages, setNotConformTonnages] = useState<[]>([]);
  const [undeclaredTonnages, setUndeclaredTonnages] = useState<[]>([]);
  const [getCsrf, setGetCsrf] = useState<[csrfToken: string]>();
  const [tonnages, setTonnages] = useState<[]>([]);
  const [initialize, setInitialize] = useState(false);
  const [userInitialize, setUserInitialize] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [success1, setSuccess1] = useState<boolean>(false);
  const [success2, setSuccess2] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | 0>(0);
  const [loading, setLoading] = useState<boolean | 0>(0);
  const [notification, setNotification] = useState<boolean | 0>(0);
  const [setting, setSetting] = useState<boolean | 0>(false);
  const [responsive, setResponsive] = useState<boolean>(false);

  const getData = () => {
    const routes = [
      'api/consignataire-dtci',
      'api/navire-soumission-dtci',
      'api/non-declare',
      'api/declare-non-conforme',
      'api/declare-conforme',
      'api/calcul-difference-tonnage/',
      'api/declare-conforme-tonnage',
      'api/declare-non-conforme-tonnage',
      'api/non-declare-tonnage',
      'api/get-csrf-token/',
    ];
    axios.all(routes.map(route => url.get(route))).then(
      axios.spread(
        (
          { data: consignataire },
          { data: navire },
          { data: undeclared },
          { data: declareNConforme },
          { data: declareConforme },
          { data: tonnages },
          { data: conformTonnages },
          { data: notConformTonnages },
          { data: undeclaredTonnages },
          { data: getCsrf }
        ) => {
          setNavire(navire);
          setConsignataire(consignataire);
          setConform(declareConforme);
          setUndeclared(undeclared);
          setNotConform(declareNConforme);
          setTonnages(tonnages);
          setConformTonnages(conformTonnages);
          setNotConformTonnages(notConformTonnages);
          setUndeclaredTonnages(undeclaredTonnages);
          setGetCsrf(getCsrf);
        }
      )
    );
  };
  console.log(getCsrf);
  console.log(getCsrf);
  const showSetting = () => {
    setSetting(true);
  };
  const showSettingFinish = () => {
    setSetting(false);
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
  const showNotError1 = () => {
    setError1(false);
  };
  const showError2 = () => {
    setError2(true);
  };
  const showNotError2 = () => {
    setError2(false);
  };
  const showSuccess = () => {
    setSuccess(true);
  };
  const showSuccessError = () => {
    setSuccess(false);
  };
  const showSuccess1 = () => {
    setSuccess1(true);
  };
  const showNotSuccess1 = () => {
    setSuccess1(false);
  };
  const showSuccess2 = () => {
    setSuccess2(true);
  };
  const showNotSuccess2 = () => {
    setSuccess2(false);
  };
  const showLoading = () => {
    setLoading(true);
    console.log(loading);
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
  const showResponsive = () => {
    setResponsive(!responsive);
  };
  const toInitialize = () => {
    setError1(false),
      setError2(false),
      setSuccess1(false),
      setSuccess2(false),
      setError2(false),
      setSuccess(0),
      setLoading(0),
      setInitialize(!initialize);
    token;
  };

  useEffect(() => {
    getData();
    console.log(error1, error2);
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
        conformTonnages,
        notConformTonnages,
        undeclaredTonnages,
        tonnages,
        overlay,
        loading,
        success,
        success1,
        success2,
        error1,
        error2,
        setting,
        initialize,
        userInitialize,
        responsive,
        getCsrf,
        showOverlay,
        toInitialize,
        showUserInitialize,
        showError1,
        showError2,
        showNotError1,
        showNotError2,
        showSuccess,
        showLoading,
        showSuccessError,
        showLoadingFinish,
        showNotification,
        showNotificationFinish,
        showSetting,
        showSettingFinish,
        notification,
        showSuccess1,
        showNotSuccess1,
        showSuccess2,
        showNotSuccess2,
        showResponsive,
        pathname,
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
