import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Update the initial state to false
  const navigate = useNavigate();

  const handleuserNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true); // Start loading

    try {
      if (userName.trim() !== "" && password.trim() !== "") {
        // console.log("Data sent to server:", { username: userName, password });
        localStorage.setItem("username", userName);

        const response = await axios.post(
          "http://localhost:8800/api/users/login",
          {
            username: userName,
            password,
          }
        );

        const { token} = response.data;
        // console.log(response.data)

        localStorage.setItem("token", token);

      

        console.log("Successful login");
        alert("Successful login");
        navigate("/dashboard");
      } else {
        alert("Please enter all the details");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Google login implementation
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
        }}
      >
        <div className="py-6 sm:py-8 lg:py-12 w-screen h-screen flex justify-center items-center">
          <div className="bg-white/40 max-w-md py-6 px-4 rounded-lg md:px-8 shadow-lg shadow-slate-200 sm:w-full">
            <h2 className="mb-4 text-center text-2xl font-bold text-bue-800 md:mb-8 lg:text-3xl">
              Login
            </h2>

            <form className="mx-auto max-w-lg rounded-lg border">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <label
                    htmlFor="userName"
                    className="mb-2 inline-block text-sm text-bue-800 sm:text-base"
                  >
                    User Name
                  </label>
                  <input
                    id="userName" // Fixed the ID here
                    type="text" // Changed input type to text
                    value={userName}
                    onChange={handleuserNameChange}
                    className="w-full rounded border bg-slate-200 px-3 py-2 text-gray-800 outline-none ring-grey-300 transition duration-100 focus:ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-bue-800 sm:text-base"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-blue-300 transition duration-100 focus:ring"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  className="block rounded-lg bg-blue-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-700 focus-visible:ring active:bg-blue-600 md:text-base"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>

                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-blue-300"></span>
                  <span className="relative bg-slate-50 px-4 text-sm text-blue-500">
                    Log in with social
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Google icon paths go here */}
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="flex items-center justify-center bg-blue-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <a className="text-blue-500 transition duration-100 hover:text-blue-600 active:text-blue-700">
                      Register
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
