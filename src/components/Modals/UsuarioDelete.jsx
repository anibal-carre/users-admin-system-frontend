import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import axios from "axios";

export default function UsuarioDelete({ id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [apiData, setApiData] = useState([]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}`);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="font-semibold border p-2 px-3 rounded-md bg-red-700 text-white"
        >
          Eliminar
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
                    Estas seguro de que quieres eliminar este usuario?
                  </Dialog.Title>
                  <div className="mt-5 w-full flex gap-3 ">
                    <button
                      onClick={closeModal}
                      className="font-semibold border p-2 px-3 rounded-md bg-zinc-700 text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDelete}
                      className="font-semibold border p-2 px-3 rounded-md bg-red-700 text-white"
                    >
                      Eliminar
                    </button>
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
