import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import LoginService from "../../services/LoginService/LoginService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      LoginService.initializeAuth();
      const authenticated = LoginService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    // Verifica autenticação inicialmente
    checkAuth();

    // Configura verificação periódica (a cada 30 segundos)
    const authInterval = setInterval(() => {
      const authenticated = LoginService.isAuthenticated();
      if (!authenticated && isAuthenticated) {
        setIsAuthenticated(false);
      }
    }, 30000);

    // Limpa o interval quando o componente for desmontado
    return () => clearInterval(authInterval);
  }, [isAuthenticated]);

  // Escuta eventos de storage para detectar logout em outras abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken" && !e.newValue) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
        Verificando autenticação...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
