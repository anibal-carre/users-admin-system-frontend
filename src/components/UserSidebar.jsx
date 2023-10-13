import { Link } from "react-router-dom";
import usuarios from "../assets/icons/users.png";
import bitacoras from "../assets/icons/logs.png";
import link from "../assets/icons/link.png";
import dashboard from "../assets/icons/dashboard.png";

import { useState, useEffect } from "react";

const UserSidebar = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/paginas");
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const data = await response.json();

        const adminPages = data.filter((page) => page.tipo === "user");

        setApiData(adminPages);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  console.log(apiData);
  return (
    <aside className="w-full h-full bg-zinc-800 px-4 py-10">
      <div className="w-full h-14 flex items-center">
        <Link to={apiData[0]?.url} className="flex items-center gap-2">
          <img
            src={apiData[0]?.icono === "dashboard" ? dashboard : dashboard}
            alt={apiData[0]?.nombre}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="text-white font-semibold cursor-pointer">
            Dashboard
          </span>
        </Link>
      </div>
      <div className="h-[1px] w-[90%] bg-zinc-400 mb-5 mt-3" />
      <div className="w-full h-14 flex items-center">
        <Link to={apiData[1]?.url} className="flex items-center gap-2">
          <img
            src={apiData[1]?.icono === "usuarios" ? usuarios : usuarios}
            alt={apiData[1]?.nombre}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="text-white font-semibold cursor-pointer">
            {apiData[1]?.nombre ? apiData[1]?.nombre : "..."}
          </span>
        </Link>
      </div>
      <div className="w-full h-14 flex items-center">
        <Link to={apiData[2]?.url} className="flex items-center gap-2">
          <img
            src={apiData[2]?.icono === "enlaces" ? link : link}
            alt={apiData[2]?.nombre}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="text-white font-semibold cursor-pointer">
            {apiData[2]?.nombre ? apiData[2]?.nombre : "..."}
          </span>
        </Link>
      </div>

      <div className="w-full h-14 flex items-center">
        <Link to={apiData[3]?.url} className="flex items-center gap-2">
          <img
            src={apiData[3]?.icono === "bitacoras" ? bitacoras : bitacoras}
            alt={apiData[3]?.nombre}
            className="w-8 h-8 cursor-pointer"
          />
          <span className="text-white font-semibold cursor-pointer">
            {apiData[3]?.nombre ? apiData[3]?.nombre : "..."}
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default UserSidebar;
