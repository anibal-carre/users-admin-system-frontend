import DashboardNav from "../DashboardNav";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";

const Bitacoras = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/bitacoras");
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
            <span className="font-semibold">Admin / Bitacoras</span>
          </div>
          <div className="w-full h-auto mt-5 flex flex-col justify-center items-center ">
            <div className="w-[90%] h-16 flex justify-between items-center">
              <h2 className="font-semibold text-[20px] mb-2">Bitacoras</h2>
            </div>
            <div className="w-[90%] h-[700px] overflow-y-auto border border-[#E0E0E0] bg-white shadow-md rounded-md flex flex-col">
              <div className="w-full h-24 py-3 border flex items-center justify-between px-5 bg-zinc-700 text-white">
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Usuario</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Fecha</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Hora</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Ip</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">So</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold underline">Navegador</span>
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
                      {e.fecha}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px] ">{e.hora}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px] ">{e.ip}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px] ">{e.so}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-[18px] ">
                      {e.navegador}
                    </span>
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

export default Bitacoras;
