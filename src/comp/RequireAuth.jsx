import PropTypes from "prop-types";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = ({ hasAllowedRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("authData"));

  useEffect(() => {
    if (!hasAllowedRole && authData?.accessToken) {
      console.log("authData", authData);
      if (authData.role.includes("admin")) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else if (!authData?.accessToken) {
      navigate("/login", { replace: true });
    }
  }, [hasAllowedRole, authData, navigate]);

  if (hasAllowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

RequireAuth.propTypes = {
  hasAllowedRole: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;
