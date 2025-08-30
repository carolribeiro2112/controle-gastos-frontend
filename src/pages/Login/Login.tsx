import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoginService from "../../services/LoginService";
import Toast from "../../components/Toast/Toast";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
    if (showToast) setShowToast(false);
  };

  const handleLogin = async () => {
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
    setShowToast(false);

    try {
      await LoginService.login({
        login: formData.login.trim(),
        password: formData.password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.status === 403) {
          setShowToast(true);
        } else {
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Erro durante o login";
          setError(errorMessage);
        }
      } else {
        setError(
          error instanceof Error ? error.message : "Erro durante o login"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" m="9">
      <Heading as="h1" size="9" color="jade">
        Controle de gastos
      </Heading>
      <Heading as="h1" size="8" color="jade">
        Login to your account
      </Heading>

      {showToast && (
        <Toast
          type="error"
          message="Credenciais inválidas tente novamente ou cadastre-se"
          duration={2000}
        />
      )}

      {error && !showToast && (
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
        color="jade"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <Button
        variant="ghost"
        color="jade"
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
