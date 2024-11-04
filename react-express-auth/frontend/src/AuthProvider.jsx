import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import PropTypes from "prop-types";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Check token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    fetch("http://127.0.0.1:5001/verify", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.status != 202) return setIsLoggedIn(false);
      setIsLoggedIn(true);
    });
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
