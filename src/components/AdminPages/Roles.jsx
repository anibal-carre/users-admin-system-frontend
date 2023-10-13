import { useState, useEffect } from "react";

import DashboardNav from "../DashboardNav";
import Sidebar from "../Sidebar";
import RolesModal from "../Modals/RolesModal";

import axios from "axios";
import RolEdit from "../Modals/RolEdit";

const Roles = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/roles");
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/roles/${id}`);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  function formatDate(inputDate) {
    const fechaFormateada = new Date(inputDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return fechaFormateada;
  }

  console.log(formatDate("2023-10-30T20:49:03.000000Z"));
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav link={"/admin/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full p-2 z-10 flex flex-col">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Usuario / Perfil</span>
          </div>
          <div className="w-full h-auto mt-5 flex flex-col justify-center items-center ">
            <div className="w-[75%] h-16 flex justify-between items-center">
              <h2 className="font-semibold text-[20px] mb-2">Roles</h2>
              <RolesModal />
            </div>
            <div className="w-[75%] h-auto border border-[#E0E0E0] bg-white shadow-md rounded-md flex flex-col">
              {apiData.map((e, i) => (
                <div
                  key={i}
                  className="w-full h-24 border flex items-center justify-between px-5"
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold underline">Rol</span>
                    <span className="font-semibold text-[18px]">{e.rol}</span>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold underline">
                      Fecha de Creación
                    </span>
                    <span className="font-semibold text-[18px] ">
                      {formatDate(e.created_at)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <RolEdit id={e.idrol} rol={e.rol} />
                    <button
                      onClick={() => handleDelete(e.idrol)}
                      className="font-semibold border p-2 px-3 rounded-md bg-red-700 text-white"
                    >
                      Eliminar
                    </button>
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

export default Roles;
