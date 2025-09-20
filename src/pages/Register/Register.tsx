import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { registerUser } from "../../services/RegisterService/RegisterService";
import Toast from "../../components/Toast/Toast";
import { LogoLandingPage } from "../../components/Logo/Logo";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const getRoleFromAge = (age: number): string => {
    return age >= 16 ? "ADMIN" : "USER";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.login.trim()) {
      return "Por favor, insira um nome de usuário";
    }

    if (formData.login.trim().length < 3) {
      return "O nome de usuário deve ter pelo menos 3 caracteres";
    }

    if (!formData.age.trim()) {
      return "Por favor, insira sua idade";
    }

    const age = parseInt(formData.age.trim());
    if (isNaN(age) || age < 1 || age > 120) {
      return "Por favor, insira uma idade válida (1-120 anos)";
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

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const age = parseInt(formData.age.trim());
      const role = getRoleFromAge(age);

      await registerUser({
        login: formData.login.trim(),
        role: role,
        age: formData.age.trim(),
        password: formData.password,
      });

      setShowSuccessToast(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error instanceof Error ? error.message : "Erro durante o cadastro"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate("/");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleRegister();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        {showSuccessToast && (
          <Toast
            type="success"
            message="Cadastro realizado com sucesso!"
            duration={2000}
          />
        )}
        <LogoLandingPage />
        <Heading as="h3" size="6" color="jade">
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
          placeholder="Enter your age"
          type="text"
          size="3"
          style={{ width: "300px" }}
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
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
          style={{ width: "300px", cursor: "pointer" }}
          color="jade"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Registrar"}
        </Button>

        <Button
          variant="ghost"
          color="jade"
          size="3"
          style={{ width: "275px", cursor: "pointer" }}
          onClick={handleGoToLogin}
          disabled={isLoading}
        >
          Já tem conta? Faça login
        </Button>
      </Flex>
    </div>
  );
};

export default Register;
