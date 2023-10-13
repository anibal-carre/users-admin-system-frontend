import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminDashboard from "./components/AdminPages/AdminDashboard";
import Parametros from "./components/AdminPages/Parametros";
import Roles from "./components/AdminPages/Roles";
import Usuarios from "./components/AdminPages/Usuarios";
import Bitacoras from "./components/AdminPages/Bitacoras";
import Enlaces from "./components/AdminPages/Enlaces";
import Perfil from "./components/AdminPages/Perfil";
import UserDashboard from "./components/UserPages/UserDashboard";
import UsuarioPerfil from "./components/UserPages/Perfil";
import Historial from "./components/UserPages/Historial";
import Colegas from "./components/UserPages/Colegas";
import UserEnlaces from "./components/UserPages/UserEnlaces";
import LoadPage from "./components/LoadPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/load" element={<LoadPage />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute rol={2} />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/parametros" element={<Parametros />} />
          <Route path="/admin/roles" element={<Roles />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/bitacoras" element={<Bitacoras />} />
          <Route path="/admin/enlaces" element={<Enlaces />} />
          <Route path="/admin/perfil" element={<Perfil />} />
        </Route>

        {/* User Pages */}

        <Route element={<ProtectedRoute rol={1} />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/user/perfil" element={<UsuarioPerfil />} />
          <Route path="/user/historial" element={<Historial />} />
          <Route path="/user/colegas" element={<Colegas />} />
          <Route path="/user/enlaces" element={<UserEnlaces />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
