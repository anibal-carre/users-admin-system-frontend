import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import github from "../assets/Gihub.svg";
import google from "../assets/Google.svg";
import twitter from "../assets/Twitter.svg";
import facebook from "../assets/Facebook.svg";
import devlogo from "../assets/devchallenges.svg";

const LoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
  };

  const handleClaveChange = (event) => {
    setClave(event.target.value);
  };

  const handleRedirection = (idrol) => {
    if (idrol === 1) {
      return navigate("/admindashboard");
    } else if (idrol === 2) {
      return navigate("/userdashboard");
    }
  };

  const handleLoginSuccess = async (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/bitacoras", {
        idusuario: userData.usuario.id,
        usuario: userData.usuario.usuario,
      });

      const bitacoraData = response.data;

      console.log(bitacoraData);
      console.log(userData.usuario.idrol);

      handleRedirection(userData.usuario.idrol);
    } catch (error) {
      console.error("Error al registrar la bitácora:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        usuario: usuario,
        clave: clave,
      });

      const responseData = response.data;

      console.log(responseData.usuario.idrol);

      if (responseData.success) {
        handleLoginSuccess(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen md:flex md:flex-col md:items-center md:justify-center">
      <div className="w-full h-full md:w-[470px] md:h-[700px] md:border-[2px] md:rounded-md md:p-8 md:box-content flex flex-col justify-center items-center gap-10">
        <div className="w-[90%]  h-[20px]">
          <img src={devlogo} alt="devchallenges-logo" />
        </div>
        <div className="w-[90%] flex flex-col gap-5  ">
          <h1 className="text-xl font-[900]">Login </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" w-[90%] h-[260px] flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Email</span>
            <input
              className="border border-[#BDBDBD] h-10 md:h-12 rounded-sm px-3 text-sm"
              type="text"
              name="usuario"
              value={usuario}
              onChange={handleUsuarioChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Password</span>
            <input
              className="border border-[#BDBDBD] h-10 md:h-12 rounded-sm px-3 text-sm"
              type="password"
              name="clave"
              value={clave}
              onChange={handleClaveChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <input
              className="h-10 rounded-md bg-[#2F80ED] hover:bg-blue-300 text-white font-semibold cursor-pointer"
              type="submit"
              name="login"
              value="Login"
            />
          </div>
        </form>

        <div className=" w-[90%] flex flex-col items-center mb-32">
          <p className="mb-5">or continue with these social profile</p>
          <div className="flex justify-center gap-5 w-[70%] ">
            <img src={google} alt="google-icon" />
            <img src={facebook} alt="facebook-icon" />
            <img src={twitter} alt="twitter-icon" />
            <img src={github} alt="github-icon" />
          </div>
          <p className="mt-4">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-blue-400 cursor-pointer">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
