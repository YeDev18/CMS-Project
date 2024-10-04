import url from '@/api';
import {
  BoardProps,
  ConsigneeProps,
  DeclarationTypes,
  TonnesTypes,
} from '@/Types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  user: any;
  navire: BoardProps[];
  consignataire: ConsigneeProps[];
  undeclared: DeclarationTypes[];
  notConform: DeclarationTypes[];
  conform: DeclarationTypes[];
  controlBoard: DeclarationTypes[];
  conformTonnages: TonnesTypes[];
  notConformTonnages: TonnesTypes[];
  undeclaredTonnages: TonnesTypes[];
  tonnages: TonnesTypes[];
  controlTonnages: TonnesTypes[];
  csrfToken: string | null;
  pathname: string;
  overlay: boolean;
  userInitialize: boolean;
  success1: boolean;
  success2: boolean;
  error1: boolean;
  error2: boolean;
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
const SeverContext = createContext<Context | null>(null);

const ServerProvider: FC<Props> = ({ children }) => {
  const token = useAuth()?.token;
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<[]>([]);
  const [navire, setNavire] = useState<[]>([]);
  const [consignataire, setConsignataire] = useState<[]>([]);
  const [conform, setConform] = useState<[]>([]);
  const [notConform, setNotConform] = useState<[]>([]);
  const [undeclared, setUndeclared] = useState<[]>([]);
  const [conformTonnages, setConformTonnages] = useState<[]>([]);
  const [notConformTonnages, setNotConformTonnages] = useState<[]>([]);
  const [undeclaredTonnages, setUndeclaredTonnages] = useState<[]>([]);
  const [controlTonnages, setControlTonnages] = useState<[]>([]);
  const [controlBoard, setControlBoard] = useState<[]>([]);
  const [tonnages, setTonnages] = useState<[]>([]);
  const [userInitialize, setUserInitialize] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [success1, setSuccess1] = useState<boolean>(false);
  const [success2, setSuccess2] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
  const [responsive, setResponsive] = useState<boolean>(false);

  function getCookie(name: string) {
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
  const csrfToken = getCookie('csrftoken');

  const get_declaration_board = async () => {
    const routes = [
      'api/non-declare',
      'api/declare-non-conforme',
      'api/declare-conforme',
    ];

    try {
      const responses = await Promise.all(routes.map(route => url.get(route)));

      const [undeclared, declareNConforme, declareConforme] = responses.map(
        response => response.data
      );
      setConform(declareConforme);
      setUndeclared(undeclared);
      setNotConform(declareNConforme);
    } catch {
      console.error('Failed to fetch data:');
    }
    return routes;
  };

  const get_control_board = async () => {
    url
      .get('/api/compare-declaration-status')
      .then(response => response.data)
      .then(data => setControlBoard(data))
      .catch(error => console.log('Eurreur de reponse :', error));
  };

  const { isFetching, isSuccess, isError } = useQuery({
    queryKey: ['board'],
    queryFn: get_declaration_board,

    gcTime: 500,
    staleTime: 1500,
    // refetchOnWindowFocus: true,
  });
  if (isSuccess) {
    // queryClient.invalidateQueries({ queryKey: ['tonnages'] });
  }
  if (isFetching) {
    console.log('Loading...');
  } else if (isError) {
    // console.error('Error fetching data');
  } else {
    console.log('Data fetched successfully');
  }

  const {
    isFetching: BoardFetch,
    isSuccess: BoardSuccess,
    isError: BoardError,
  } = useQuery({
    queryKey: ['control_board'],
    queryFn: get_control_board,
    gcTime: 500,
    staleTime: 1500,
  });

  if (BoardFetch) {
    console.log('Controle telechargement');
  }
  if (BoardSuccess) {
    console.log('Controle Success');
    queryClient.invalidateQueries({ queryKey: ['board'] });
  }
  if (BoardError) {
    console.log('Controle Error');
  }

  const get_tonnages_board = async () => {
    const routes = [
      'api/calcul-difference-tonnage/',
      '/api/control-tonnage-status',
      'api/declare-conforme-tonnage',
      'api/declare-non-conforme-tonnage',
      'api/non-declare-tonnage',
    ];
    try {
      const responses = await Promise.all(routes.map(route => url.get(route)));
      const [
        tonnages,
        controlTonnages,
        conformTonnages,
        notConformTonnages,
        undeclaredTonnages,
      ] = responses.map(response => response.data);
      setTonnages(tonnages);
      setControlTonnages(controlTonnages);
      setConformTonnages(conformTonnages);
      setNotConformTonnages(notConformTonnages);
      setUndeclaredTonnages(undeclaredTonnages);
    } catch {
      console.error('Failed to fetch data');
    }
    return routes;
  };

  const { isFetching: fetchingTonnages, isError: errorTonnages } = useQuery({
    queryKey: ['tonnages'],
    queryFn: get_tonnages_board,
    gcTime: 1000,
    staleTime: 3000,
    refetchOnWindowFocus: true,
  });
  if (fetchingTonnages) {
    console.log('Loading Tonnes...');
  } else if (errorTonnages) {
    // console.error('Error Tonnes fetching data');
  } else {
    // console.log('Data Tonnes fetched successfully');
  }

  const get_board_consignor = async () => {
    const routes = ['api/consignataire-dtci', 'api/navire-soumission-dtci'];
    try {
      const responses = await Promise.all(routes.map(route => url.get(route)));
      const [consignataire, navire] = responses.map(response => response.data);
      setNavire(navire);
      setConsignataire(consignataire);
    } catch {
      console.log('Les Eurreur');
    }
    return routes;
  };

  const { isFetching: boar_consignor, isError: errorBoar_consignor } = useQuery(
    {
      queryKey: ['boar_consignor'],
      queryFn: get_board_consignor,
      gcTime: 1000,
      staleTime: 3000,
      refetchOnWindowFocus: true,
    }
  );
  if (boar_consignor) {
    console.log('Loading Navires...');
  } else if (errorBoar_consignor) {
    // console.error('Error Navires  data');
  } else {
    console.log('Data Navires ');
  }

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
  const toInitialize = () => {};

  // useEffect(() => {
  //   getData();
  //   // console.log(error1, error2);
  // }, [initialize]);
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
        console.error('Erreur:', error.message);
      });
  }, [userInitialize]);

  return (
    <SeverContext.Provider
      value={{
        user,
        navire,
        consignataire,
        controlBoard,
        undeclared,
        notConform,
        conform,
        controlTonnages,
        conformTonnages,
        notConformTonnages,
        undeclaredTonnages,
        tonnages,
        csrfToken,
        overlay,
        loading,
        success,
        success1,
        success2,
        error1,
        error2,
        setting,
        userInitialize,
        responsive,
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

export const useConsigneeBoard = () => {
  const { consignataire, navire } = useServer() ?? {
    consignataire: [],
    navire: [],
  };
  if (!consignataire && !navire) {
    throw new Error('useConsigneeBoard must be used within a Provider');
  }
  return { consignataire, navire };
};

export const useDeclarationBoard = () => {
  const { conform, notConform, undeclared } = useServer() ?? {
    conform: [],
    notConform: [],
    undeclared: [],
  };
  if (!conform && !notConform && !undeclared) {
    throw new Error('useConsigneeBoard must be used within a Provider');
  }
  return { conform, notConform, undeclared };
};

export const useTonnesBoard = () => {
  const { conformTonnages, notConformTonnages, undeclaredTonnages, tonnages } =
    useServer() ?? {
      tonnages: [],
      conformTonnages: [],
      notConformTonnages: [],
      undeclaredTonnages: [],
    };
  if (
    !conformTonnages &&
    !notConformTonnages &&
    !undeclaredTonnages &&
    !tonnages
  ) {
    throw new Error('useTonnesBoard must be used within a Provider');
  }
  return { conformTonnages, notConformTonnages, undeclaredTonnages, tonnages };
};
