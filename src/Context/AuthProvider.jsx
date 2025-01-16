import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      setAuth(parsedAuthData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
