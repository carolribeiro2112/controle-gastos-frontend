import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoginService from "../../services/LoginService";

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Handle form submission
  const handleLogin = async () => {
    // Basic validation
    if (!formData.login.trim()) {
      setError("Por favor, insira seu nome de usuário");
      return;
    }

    if (!formData.password.trim()) {
      setError("Por favor, insira sua senha");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await LoginService.login({
        login: formData.login.trim(),
        password: formData.password,
      });

      console.log("Login successful:", response);

      // Navigate to dashboard or home page after successful login
      navigate("/dashboard"); // Change this route as needed
    } catch (error) {
      console.error("Login failed:", error);
      setError(error instanceof Error ? error.message : "Erro durante o login");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register navigation
  const handleRegister = () => {
    navigate("/register");
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" m="9">
      <Heading as="h1" size="9" color="teal">
        Controle de gastos
      </Heading>
      <Heading as="h1" size="8" color="teal">
        Login to your account
      </Heading>

      {/* Error message */}
      {error && (
        <Text
          color="red"
          size="2"
          style={{ textAlign: "center", maxWidth: "300px" }}
        >
          {error}
        </Text>
      )}

      <TextField.Root
        placeholder="Enter your username"
        size="3"
        style={{ width: "300px" }}
        value={formData.login}
        onChange={(e) => handleInputChange("login", e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />

      <TextField.Root
        placeholder="Enter your password"
        type="password"
        size="3"
        style={{ width: "300px" }}
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />

      <Button
        size="3"
        style={{ width: "300px" }}
        color="teal"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <Button
        variant="ghost"
        color="teal"
        size="3"
        style={{ width: "275px" }}
        onClick={handleRegister}
        disabled={isLoading}
      >
        Registre-se
      </Button>
    </Flex>
  );
};

export default Login;
