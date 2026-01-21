import PropTypes from "prop-types";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Zmieniłem nazwę propsa na 'allowedRoles', aby lepiej oddawała to, czym jest (tablicą dozwolonych ról)
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pobieramy dane
  const authData = JSON.parse(localStorage.getItem("authData"));

  // 1. Sprawdź czy jest superuserem (zakładam, że klucz to is_superuser lub isSuperUser)
  const isSuperUser = authData?.is_superuser || authData?.isSuperUser;

  // 2. Sprawdź czy użytkownik ma rolę (obsługa sytuacji, gdy role to string lub tablica)
  const userRole = authData?.role;
  const hasMatchingRole = Array.isArray(userRole) 
    ? userRole.some(r => allowedRoles?.includes(r))
    : allowedRoles?.includes(userRole);

  // 3. Główny warunek: Ma token ORAZ (jest superuserem LUB ma pasującą rolę)
  const isAuthorized = authData?.accessToken && (isSuperUser || hasMatchingRole);

  useEffect(() => {
    // Jeśli nie jest autoryzowany
    if (!isAuthorized) {
      // Jeśli ma token, ale złe uprawnienia -> przekieruj na podstawie roli
      if (authData?.accessToken) {
        // Logika przekierowania dla zalogowanych bez dostępu
        if (authData.role?.includes("admin")) {
           navigate("/admin", { replace: true });
        } else {
           navigate("/", { replace: true });
        }
      } else {
        // Jeśli nie ma tokenu -> login
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthorized, authData, navigate]);

  // Renderowanie
  if (isAuthorized) {
    return <Outlet />;
  } else {
    // Zabezpieczenie renderowania przed useEffect (zapobiega mignięciu treści)
    return authData?.accessToken 
      ? <Navigate to="/" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />;
  }
};

RequireAuth.propTypes = {
  // Oczekujemy tablicy stringów (np. ['admin', 'manager'])
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;