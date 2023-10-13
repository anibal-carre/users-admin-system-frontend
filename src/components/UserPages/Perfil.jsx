import DashboardNav from "../DashboardNav";
import EditPerfil from "../EditPerfil";
import PerfilCard from "../PerfilCard";
import UserSidebar from "../UserSidebar";

import { useState } from "react";
const UsuarioPerfil = () => {
  const [perfil, setPerfil] = useState(true);

  const handlePerfil = () => setPerfil(!perfil);

  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav profileLink={"/user/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <UserSidebar />
        </div>
        <div className="w-full h-full p-2 z-10 flex flex-col">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Usuario / Perfil</span>
          </div>
          {perfil ? (
            <PerfilCard handlePerfil={handlePerfil} />
          ) : (
            <EditPerfil handlePerfil={handlePerfil} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsuarioPerfil;
