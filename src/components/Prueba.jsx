import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import profile from "../assets/icons/profile.png";
import { Link, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ link }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");

    navigate("/");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-20 h-20 justify-center items-center gap-x-1.5 rounded-[50%] bg-zinc-700 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-zinc-500">
          <img className="" src={profile} alt="" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-[150px] absolute right-0 z-50 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={link}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm font-semibold"
                  )}
                >
                  Perfil
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm font-semibold"
                  )}
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
