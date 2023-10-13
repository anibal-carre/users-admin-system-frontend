import DashboardNav from "../DashboardNav";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import UsuarioModal from "../Modals/UsuarioModal";
import UsuarioEdit from "../Modals/UsuarioEdit";
import axios from "axios";
import UsuarioDelete from "../Modals/UsuarioDelete";

const Usuarios = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios");
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const data = await response.json();

        setApiData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  function formatDate(inputDate) {
    const fechaFormateada = new Date(inputDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return fechaFormateada;
  }
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav link={"/admin/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full p-2 z-10">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Admin / Usuarios</span>
          </div>
          <div className="w-full h-auto mt-5 flex flex-col justify-center items-center">
            <div className="w-[75%] h-16 flex justify-between items-center">
              <h2 className="font-semibold text-[20px] mb-2">Usuarios</h2>
              <UsuarioModal />
            </div>
            <div className="w-[85%] h-[700px] overflow-y-auto border border-[#E0E0E0] bg-white shadow-md rounded-md flex flex-col">
              <div className="w-full h-24 py-3 border flex items-center justify-between px-5 bg-zinc-700 text-white">
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Usuario</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">
                    Fecha de Creación
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="font-semibold underline">Estado</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-semibold underline w-[160px]">
                    Acciones
                  </span>
                </div>
              </div>

              {apiData.map((e, i) => (
                <div
                  key={i}
                  className="w-full h-24 py-3 border flex items-center justify-between px-5"
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px]">
                      {e.usuario}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px] ">
                      {formatDate(e.created_at)}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center">
                    <button className="font-semibold border p-1 px-3 rounded-md bg-blue-500 text-white">
                      {e.habilitado === 1 ? "Habilitado" : "Desactivado"}
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <UsuarioEdit
                      id={e.id}
                      estado={e.habilitado}
                      rol={e.idrol}
                      user={e.usuario}
                      contrasena={e.clave}
                    />
                    <UsuarioDelete id={e.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
