import DashboardNav from "../DashboardNav";
import Sidebar from "../Sidebar";

const AdminDashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav link={"/admin/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full p-2 z-10 flex flex-col">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Admin / Dashboard</span>
          </div>

          <div className="w-full h-16 mt-10 flex justify-center">
            <div className="w-[70%] border bg-zinc-700 border-zinc-800 rounded-sm flex justify-center items-center">
              <h2 className="font-semibold text-[26px] text-white">
                Bienvenido Administrador !!!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
