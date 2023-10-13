import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import parametros from "../../assets/icons/gear.png";
import roles from "../../assets/icons/roles.png";
import usuarios from "../../assets/icons/users.png";
import bitacoras from "../../assets/icons/logs.png";
import link from "../../assets/icons/link.png";
import dashboard from "../../assets/icons/dashboard.png";

import axios from "axios";

export default function EnlaceModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [estado, setEstado] = useState("");
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");
  const [tipo, setTipo] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(url, estado, nombre, icono, tipo);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/paginas", {
        url: url,
        estado: "activo",
        nombre: nombre,
        icono: icono,
        tipo: tipo,
      });
      console.log("Enlace created:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error while create an user:", error);
    }
  }

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="font-semibold border p-2 px-3 rounded-md bg-zinc-700 text-white"
        >
          Crear Enlace
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Crear Nuevo Enlace
                  </Dialog.Title>
                  <div className="mt-2 w-full">
                    <form className="w-full" action="" onSubmit={handleSubmit}>
                      <div className="w-full flex flex-col gap-1">
                        <span className="font-semibold underline">Url</span>
                        <input
                          className="border h-10 rounded-md px-3"
                          type="text"
                          placeholder="Url"
                          onChange={(e) => setUrl(e.target.value)}
                          value={url}
                        />
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="font-semibold underline">Nombre</span>
                        <input
                          className="border h-10 rounded-md px-3"
                          type="text"
                          placeholder="Nombre"
                          onChange={(e) => setNombre(e.target.value)}
                          value={nombre}
                        />
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="font-semibold underline">Icono</span>
                        <select
                          className="border h-10 rounded-md px-3 "
                          onChange={(e) => setIcono(e.target.value)}
                        >
                          <option value="" defaultValue>
                            Elegir Icono
                          </option>
                          <option value="parametros">Parametros</option>
                          <option value="dashboard">Dashboard</option>
                          <option value="link">Enlace</option>
                          <option value="roles">Roles</option>
                          <option value="bitacoras">Bitacoras</option>
                          <option value="usuarios">Usuarios</option>
                        </select>
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        <span className="font-semibold underline">Tipo</span>
                        <select
                          className="border h-10 rounded-md px-3"
                          onChange={(e) => setTipo(e.target.value)}
                        >
                          <option value="" defaultValue>
                            Elegir Tipo
                          </option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Crear
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
