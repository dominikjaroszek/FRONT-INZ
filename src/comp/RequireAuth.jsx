import PropTypes from "prop-types";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const authData = JSON.parse(localStorage.getItem("authData"));

  const isSuperUser = authData?.is_superuser || authData?.isSuperUser;

  const userRole = authData?.role;
  const hasMatchingRole = Array.isArray(userRole) 
    ? userRole.some(r => allowedRoles?.includes(r))
    : allowedRoles?.includes(userRole);

  const isAuthorized = authData?.accessToken && (isSuperUser || hasMatchingRole);

  useEffect(() => {
    if (!isAuthorized) {
      if (authData?.accessToken) {
        if (authData.role?.includes("admin")) {
           navigate("/admin", { replace: true });
        } else {
           navigate("/", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthorized, authData, navigate]);

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return authData?.accessToken 
      ? <Navigate to="/" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />;
  }
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;