import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Components/AuthProvider';
import ProtectRoutes from './Components/ProtectRoutes';
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
} from './Pages';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RCLayout />}>
            <Route index element={<Connection />} />
            <Route path="/Register" element={<Register />} />
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route path="/" element={<Home />}>
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/consignataire" element={<Consignataire />} />
              <Route path="/navire" element={<Navire />} />
              <Route path="/periode" element={<Periode />} />

              <Route
                path="/declaration_conforme"
                element={<DeclarationConforme />}
              />
              <Route path="/nom_declaration" element={<NonDeclaration />} />
              <Route path="/nom_conforme" element={<DeclaratioNConforme />} />
            </Route>
          </Route>
          {/* <Route path="/" element={<Home />}>
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/consignataire" element={<Consignataire />} />
            <Route path="/navire" element={<Navire />} />
            <Route path="/periode" element={<Periode />} />
            <Route
              path="/declaration_conforme"
              element={<DeclarationConforme />}
            />
            <Route path="/nom_declaration" element={<NonDeclaration />} />
            <Route path="/nom_declaré" element={<DeclaratioNConforme />} />
          </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
