import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginService from "../../services/LoginService/LoginService";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (LoginService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PublicRoute;
