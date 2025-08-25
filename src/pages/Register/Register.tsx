import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { registerUser } from "../../services/RegisterService";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    login: "",
    role: "",
    password: "",
    confirmPassword: "",
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

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.login.trim()) {
      return "Por favor, insira um nome de usuário";
    }

    if (formData.login.trim().length < 3) {
      return "O nome de usuário deve ter pelo menos 3 caracteres";
    }

    if (!formData.role.trim()) {
      return "Por favor, insira um cargo";
    }

    if (!formData.password.trim()) {
      return "Por favor, insira uma senha";
    }

    if (formData.password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      return "As senhas não coincidem";
    }

    return null;
  };

  // Handle form submission
  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await registerUser({
        login: formData.login.trim(),
        role: formData.role,
        password: formData.password,
      });

      console.log("Registration successful:", response);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error instanceof Error ? error.message : "Erro durante o cadastro"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login navigation
  const handleGoToLogin = () => {
    navigate("/");
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleRegister();
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" m="9">
      <Heading as="h1" size="9" color="teal">
        Controle de gastos
      </Heading>
      <Heading as="h1" size="8" color="teal">
        Create your account
      </Heading>

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
        placeholder="Enter your role"
        type="text"
        size="3"
        style={{ width: "300px" }}
        value={formData.role}
        onChange={(e) => handleInputChange("role", e.target.value)}
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

      <TextField.Root
        placeholder="Confirm your password"
        type="password"
        size="3"
        style={{ width: "300px" }}
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />

      <Button
        size="3"
        style={{ width: "300px" }}
        color="teal"
        onClick={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? "Cadastrando..." : "Registrar"}
      </Button>

      <Button
        variant="ghost"
        color="teal"
        size="3"
        style={{ width: "275px" }}
        onClick={handleGoToLogin}
        disabled={isLoading}
      >
        Já tem conta? Faça login
      </Button>
    </Flex>
  );
};

export default Register;
