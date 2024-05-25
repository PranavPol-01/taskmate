import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./../../../server/models/notification";
import Dashboard from "./../Pages/Dashboard";
import LogoTM from "./LogoTM";

function Navbar() {
  const [hasEmail, sethasEmail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

 
  useEffect(() => {
    const storedEmail = localStorage.getItem("username");
    sethasEmail(storedEmail);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header
      className="border-b border-gray-700 md:border-b-0 md:border-none"
      // style={{ background: "#C5EBA8" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 ">
        <div className="flex h-16 items-center justify-between md:border-b-2 md:border-gray-200">
          <div className="flex-1 md:flex md:items-center md:gap-12 flex item-center">
            <Link
              to="/tasks"
              className="ml-3 text-xl  hover:text-sky-500"
              style={{ textDecoration: "none" }}
            >
              <a
                className="flex font-medium items-center justify-center hover:text-sky-500 text-gray-900  md:mb-0"
                style={{ textDecoration: "none" }}
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 375 374.999991"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                  className="rounded-full w-10 h-10 "
                >
                  <defs>
                    <clipPath id="fb66969001">
                      <path
                        d="M 12.023438 83.3125 L 363 83.3125 L 363 291.8125 L 12.023438 291.8125 Z M 12.023438 83.3125 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#fb66969001)">
                    <path
                      fill="#00bf63"
                      d="M 12.164062 83.3125 L 133.707031 291.683594 L 187.5 198.964844 L 241.503906 291.683594 L 362.835938 83.3125 L 284.496094 83.3125 L 228.179688 180.308594 L 239.609375 200.015625 L 295.929688 103.4375 L 328.121094 103.4375 L 241.503906 251.84375 L 199.140625 179.253906 L 255.039062 83.3125 L 231.753906 83.3125 L 187.5 159.335938 L 143.246094 83.3125 L 120.171875 83.3125 L 176.066406 179.253906 L 133.707031 251.84375 L 47.089844 103.4375 L 76.546875 103.4375 L 132.863281 200.015625 L 144.507812 180.308594 L 87.976562 83.3125 Z M 12.164062 83.3125 "
                      fillOpacity="1"
                      fillRule="nonzero"
                    />
                  </g>
                </svg> */}
                <LogoTM />
                <span
                  className="ml-3 lg:text-3xl text-xl font-bold hover:text-sky-500  "
                  style={{ textDecoration: "none" }}
                >
                  TaskMate
                </span>
                

              </a>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm uppercase">
              <li>
                  <a>
                    {" "}
                    <Link
                      to="/dashboard"
                      className="text-gray-500 hover:text-sky-500"
                      style={{ textDecoration: "none" }}
                    >
                      Dashboard
                    </Link>{" "}
                  </a>
                </li>
                <li>
                  <a>
                    {" "}
                    <Link
                      to="/tasks"
                      className="text-gray-500 hover:text-sky-500"
                      style={{ textDecoration: "none" }}
                    >
                      My Tasks
                    </Link>{" "}
                  </a>
                </li>
                <li>
                  <a>
                    {" "}
                    <Link
                      to="/taskform"
                      className="text-gray-500 hover:text-sky-500"
                      style={{ textDecoration: "none" }}
                    >
                      Add Task
                    </Link>{" "}
                  </a>
                </li>

                <li>
                  <a>
                    {" "}
                    <Link
                      to="/notifications"
                      className="text-gray-500 hover:text-sky-500 h-5 w-5"
                      style={{ textDecoration: "none" }}
                    >
                      <svg
                        aria-hidden="true"
                        class="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                      </svg>
                    </Link>{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {hasEmail ? (
                <div className="sm:flex sm:gap-4">
                  <Link to="/" className="flex items-center" onClick={logout}>
                    <a className="rounded-md bg-blue-600 lg:px-5 px-3 py-2.5 text-sm font-medium text-white shadow">
                      Logout
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link to="/login" className="flex items-center">
                    <a className="rounded-md bg-blue-600 lg:px-5 px-3 py-2.5 text-sm font-medium text-white shadow">
                      Login
                    </a>
                  </Link>
                </div>
              )}

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={closeMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/notifications"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    Notification
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tasks"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    My Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addtasks"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeMenu}
                  >
                    Add Tasks
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
