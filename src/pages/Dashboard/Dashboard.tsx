import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import LoginService from "../../services/LoginService";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Double-check authentication when component mounts
    const checkAuth = () => {
      const authenticated = LoginService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>Redirecionando para login...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap="4" m="9">
      <Heading as="h1" size="8" color="jade">
        Dashboard - Controle de Gastos
      </Heading>

      <Text size="4" color="gray">
        Bem-vindo! Você está autenticado e pode acessar o dashboard.
      </Text>

      <Text size="2" color="gray">
        Token JWT presente: ✅
      </Text>

      <Button
        size="3"
        color="red"
        variant="outline"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Dashboard;
