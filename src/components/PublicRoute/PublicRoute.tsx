import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginService from "../../services/LoginService";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (LoginService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Show the public content (login/register) if not authenticated
  return <>{children}</>;
};

export default PublicRoute;
