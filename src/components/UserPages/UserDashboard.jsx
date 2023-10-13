import DashboardNav from "../DashboardNav";
import UserSidebar from "../UserSidebar";

const UserDashboard = () => {
  const storedUserData = localStorage.getItem("userData");

  const userData = JSON.parse(storedUserData);
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav link={"/user/perfil"} />
      <div className="w-full h-full flex">
        <div className="w-[25%] max-w-[300px] h-full">
          <UserSidebar />
        </div>
        <div className="w-full h-full p-2 z-10 flex flex-col">
          <div className="w-full h-12 flex items-center justify-end px-3">
            <span className="font-semibold">Usuario / Dashboard</span>
          </div>

          <div className="w-full h-16 mt-10 flex justify-center">
            <div className="w-[70%] border bg-zinc-700 border-zinc-800 rounded-sm flex justify-center items-center">
              <h2 className="font-semibold text-[26px] text-white">
                Bienvenido {userData.usuario.usuario} !!!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
