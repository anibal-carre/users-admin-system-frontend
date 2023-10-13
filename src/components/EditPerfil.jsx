import profile from "../assets/icons/profile.png";
import { useState, useEffect } from "react";
import axios from "axios";

const EditPerfil = ({ handlePerfil }) => {
  const [usuario, setUsername] = useState("");
  const [clave, setPassword] = useState("");
  const [primernombre, setNombre] = useState("");
  const [primerapellido, setApellido] = useState("");
  const [idPersona, setIdPersona] = useState();
  const [editNombre, setEditNombre] = useState("");
  const [editApellido, setEditApellido] = useState("");

  const storedUserData = localStorage.getItem("userData");

  const user = JSON.parse(storedUserData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    // Obtener los datos de los campos del formulario
    try {
      await axios.put(`http://127.0.0.1:8000/api/usuarios/${user.usuario.id}`, {
        usuario,
        clave,
      });
      console.log("Primera solicitud POST exitosa");
    } catch (error) {
      console.error("Error en la segunda solicitud Put", error);
    }

    // Realizar la segunda solicitud POST
    try {
      await axios.put(`http://127.0.0.1:8000/api/personas/${idPersona}`, {
        primernombre: editNombre,
        primerapellido: editApellido,
      });
      console.log("Segunda solicitud POST exitosa");
    } catch (error) {
      console.error("Error en la segunda solicitud Put", error);
    }

    // Realizar la primera solicitud POST
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/usuarios/${user.usuario.id}`)
      .then((response) => {
        const data = response.data;
        setUsername(data.usuario);
        setPassword(data.clave);
      })
      .catch((error) => console.error(error));
  }, [user.usuario.id]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/personas`)
      .then((response) => {
        const data = response.data;
        console.log(data[0].user);

        const personaConUsuarioCorrecto = data.find(
          (persona) => persona.user === user.usuario.usuario
        );

        if (personaConUsuarioCorrecto) {
          setNombre(personaConUsuarioCorrecto.primernombre);
          setApellido(personaConUsuarioCorrecto.primerapellido);
          setIdPersona(personaConUsuarioCorrecto.id);
          console.log(idPersona);
        }
      })
      .catch((error) => console.error(error));
  }, [user]);

  console.log(typeof idPersona);

  return (
    <div className="w-full h-auto mt-5 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[75%] h-[680px] border border-[#E0E0E0] bg-white shadow-md rounded-md flex flex-col"
      >
        <div className="w-full border-b-[1px] flex items-center justify-between border-[#E0E0E0] h-32 px-5">
          <div className="flex flex-col h-full justify-center ">
            <h2 className="text-[24px] font-semibold">
              Editar Información Personal
            </h2>
            <span className="text-[#828282]">
              Los cambios se reflejarán en todos los servicios.
            </span>
          </div>
        </div>

        <div className="w-full border-b-[1px] flex items-center  border-[#E0E0E0] h-28 px-5">
          <span className="font-semibold text-[#BDBDBD] mr-28 w-[80px]">
            Foto
          </span>

          <div className="bg-zinc-700 p-2 rounded-md">
            <img className="h-12 w-12" src={profile} alt="profile" />
          </div>
        </div>

        <div className="w-full border-b-[1px] flex flex-col justify-center  border-[#E0E0E0] h-24 gap-1 px-5">
          <span className="font-semibold text-[14px] mr-28 w-[80px]">
            Nombre(s)
          </span>
          <input
            type="text"
            className="h-12 w-[80%] rounded-md border px-3"
            name="primernombre"
            placeholder={primernombre}
            onChange={(e) => setEditNombre(e.target.value)}
          />
        </div>

        <div className="w-full border-b-[1px] flex flex-col justify-center  border-[#E0E0E0] h-24 gap-1 px-5">
          <span className="font-semibold text-[14px] mr-28 w-[80px]">
            Apellido(s)
          </span>
          <input
            type="text"
            className="h-12 w-[80%] rounded-md border px-3"
            placeholder={primerapellido}
            name="primerapellido"
            onChange={(e) => setEditApellido(e.target.value)}
          />
        </div>

        <div className="w-full border-b-[1px] flex flex-col justify-center  border-[#E0E0E0] h-24 gap-1 px-5">
          <span className="font-semibold text-[14px] mr-28 w-[80px]">
            Usuario
          </span>
          <input
            type="text"
            className="h-12 w-[80%] rounded-md border px-3"
            placeholder={usuario}
            name="usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full border-b-[1px] flex flex-col justify-center  border-[#E0E0E0] h-24 gap-1 px-5">
          <span className="font-semibold text-[14px] mr-28 w-[80px]">
            Contraseña
          </span>
          <input
            type="password"
            className="h-12 w-[80%] rounded-md border px-3"
            placeholder={clave}
            name="contrasena"
            value={clave}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full px-5 p-3 flex justify-end gap-3">
          <button
            onClick={handlePerfil}
            className="p-2 px-3 border rounded-md bg-blue-700 text-white font-semibold hover:bg-zinc-500"
          >
            Volver
          </button>
          <button
            type="submit"
            className="p-2 px-3 border rounded-md bg-zinc-700 text-white font-semibold hover:bg-zinc-500"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPerfil;
