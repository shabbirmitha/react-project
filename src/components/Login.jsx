import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, checkToken } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    login(username, password);
    if (isAuthenticated) navigate("/app");
  }

  useEffect(() => {
    checkToken();
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate, checkToken]);

  return (
    <main className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <form className="space-y-6 mx-2" onSubmit={handleLogin}>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="username"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        </div>

        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <button className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
