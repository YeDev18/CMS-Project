import ServerProvider from '@/Context/ServerProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectRoutes from './Components/ProtectRoutes';
import AuthProvider from './Context/AuthProvider';
import {
  Accueil,
  Connection,
  Consignataire,
  DeclaratioNConforme,
  DeclarationConforme,
  Home,
  Navire,
  NonDeclaration,
  NotFound,
  Periode,
  RCLayout,
  Register,
  T_Conforme,
  T_NonConforme,
  T_NonDeclare,
  Update,
} from './Pages';

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ServerProvider>
            <Routes>
              <Route path="/" element={<RCLayout />}>
                <Route index element={<Connection />} />
                <Route path="/inscription" element={<Register />} />
              </Route>
              {/* <Route path="/" element={<Home />}>
            <Route path="/accueil" element={<Accueil />} />
          </Route> */}
              <Route element={<ProtectRoutes />}>
                <Route path="/" element={<Home />}>
                  <Route path="/accueil" element={<Accueil />} />
                  <Route path="/consignataire" element={<Consignataire />} />
                  <Route path="/navire" element={<Navire />} />
                  <Route path="/periode" element={<Periode />} />
                  <Route path="/tonnages-conformes" element={<T_Conforme />} />
                  <Route
                    path="/tonnages-non-conformes"
                    element={<T_NonConforme />}
                  />
                  <Route
                    path="/tonnages-non-declares"
                    element={<T_NonDeclare />}
                  />

                  <Route
                    path="/declaration_conforme"
                    element={<DeclarationConforme />}
                  />
                  <Route path="/nom_declaration" element={<NonDeclaration />} />
                  <Route
                    path="/nom_conforme"
                    element={<DeclaratioNConforme />}
                  />
                  <Route path="/update/:id" element={<Update />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ServerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
