import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, redirectTo = "/", rol }) => {
  const storedUserData = localStorage.getItem("userData");

  const userData = JSON.parse(storedUserData);

  const user = userData;
  if (!user || user.usuario.idrol === rol) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};
