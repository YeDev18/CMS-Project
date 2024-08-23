import ServerProvider from '@/Context/ServerProvider';
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
  Tonnages,
  Update,
} from './Pages';

function App() {
  return (
    <BrowserRouter>
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
                <Route path="/tonnages" element={<Tonnages />} />

                <Route
                  path="/declaration_conforme"
                  element={<DeclarationConforme />}
                />
                <Route path="/nom_declaration" element={<NonDeclaration />} />
                <Route path="/nom_conforme" element={<DeclaratioNConforme />} />
                <Route path="/update/:id" element={<Update />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ServerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
