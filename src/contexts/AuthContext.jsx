import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Invalid type of action...");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function checkToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const res = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Not valid token");
      const data = await res.json();

      dispatch({ type: "login", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function login(username, password) {
    // if (email === FAKE_USER.email && password === FAKE_USER.password)
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) throw new Error("Login Failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      dispatch({ type: "login", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of provider");
  return context;
}

export { AuthProvider, useAuth };
