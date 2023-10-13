import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import github from "../assets/Gihub.svg";
import google from "../assets/Google.svg";
import twitter from "../assets/Twitter.svg";
import facebook from "../assets/Facebook.svg";
import devlogo from "../assets/devchallenges.svg";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
    habilitado: true, // Puedes ajustar el valor predeterminado según tus necesidades
    idrol: 2, // Puedes ajustar el valor predeterminado según tus necesidades
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );

      const responseData = response.data;

      console.log(responseData.usuario);

      // Registro exitoso
      localStorage.setItem("userData", JSON.stringify(responseData));

      const storedUserData = localStorage.getItem("userData");

      const userData = JSON.parse(storedUserData);

      await redirect(userData);
    } catch (error) {
      console.error(error);
      // Redirige al usuario a una página de error en caso de problemas en la petición.
    }
  };

  const redirect = async (userData) => {
    if (userData.usuario) {
      await navigate("/userdashboard"); // Utiliza await aquí
    }
  };

  return (
    <div className="w-screen h-screen md:flex md:flex-col md:items-center md:justify-center">
      <div className="w-full h-full md:w-[470px] md:h-[800px] md:border-[2px] md:rounded-md md:p-8 md:box-content flex flex-col justify-center items-center gap-10">
        <div className="w-[90%]  h-[20px]">
          <img src={devlogo} alt="devchallenges-logo" />
        </div>
        <div className="w-[90%] flex flex-col gap-5  ">
          <h1 className="text-xl font-[900]">
            Join thousands of learners from around the world{" "}
          </h1>
          <p className="text-sm">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" w-[90%] h-[260px] flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Username</span>
            <input
              className="border border-[#BDBDBD] h-10 md:h-12 rounded-sm px-3 text-sm"
              type="text"
              name="usuario"
              placeholder="Enter your username"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">Password</span>
            <input
              className="border border-[#BDBDBD] h-10 md:h-12 rounded-sm px-3 text-sm"
              type="password"
              name="clave"
              placeholder="Enter your password"
              value={formData.clave}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <input
              className="h-10 rounded-md bg-[#2F80ED] hover:bg-blue-300 text-white font-semibold cursor-pointer"
              type="submit"
              name="name"
              value="Start coding now"
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
            Aldready a member?{" "}
            <Link to="/" className="text-blue-400 cursor-pointer">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
