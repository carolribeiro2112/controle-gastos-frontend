import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import LoginService from "../../services/LoginService/LoginService";
import { getUserRoleFromToken } from "../../utils/getUserData";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      LoginService.initializeAuth();

      const authenticated = LoginService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const userRole = getUserRoleFromToken();
        setIsAdmin(userRole === "ADMIN");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Verificando permissões...
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado mas não for admin, redireciona para dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
