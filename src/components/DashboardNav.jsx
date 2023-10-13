import devlogo from "../assets/devchallenges-light.svg";

import Example from "./Prueba";

const DashboardNav = ({ link }) => {
  return (
    <header className="w-full h-20 flex items-center justify-between px-5 bg-zinc-700">
      <img src={devlogo} alt="" />

      <Example link={link} />
    </header>
  );
};

export default DashboardNav;
