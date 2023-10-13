import DashboardNav from "../DashboardNav";
import Sidebar from "../Sidebar";

const Parametros = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav link={"/admin/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full p-2 z-10">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Admin / Parametros</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parametros;
