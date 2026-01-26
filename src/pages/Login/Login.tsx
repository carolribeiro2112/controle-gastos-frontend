import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoginService from "../../services/LoginService/LoginService";
import Toast from "../../components/Toast/Toast";
import { AxiosError } from "axios";
import { LogoLandingPage } from "../../components/Logo/Logo";
import { useIntl } from "react-intl";

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

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
      setError(formatMessage({ id: "login.usernamePrompt" }));
      return;
    }

    if (!formData.password.trim()) {
      setError(formatMessage({ id: "login.passwordPrompt" }));
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
      console.error(formatMessage({ id: "login.loginError" }), error);

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.status === 403) {
          setShowToast(true);
        } else {
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            formatMessage({ id: "login.loginError" });
          setError(errorMessage);
        }
      } else {
        setError(
          error instanceof Error
            ? error.message
            : formatMessage({ id: "login.loginError" }),
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
      <LogoLandingPage />
      <Heading as="h3" size="6" color="jade">
        {formatMessage({ id: "login.title" })}
      </Heading>

      {showToast && (
        <Toast
          type="error"
          message={formatMessage({ id: "login.invalidCredentials" })}
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
        placeholder={formatMessage({ id: "login.userNamePlaceholder" })}
        size="3"
        style={{ width: "300px" }}
        value={formData.login}
        onChange={(e) => handleInputChange("login", e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />

      <TextField.Root
        placeholder={formatMessage({ id: "login.passwordPlaceholder" })}
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
        style={{ width: "300px", cursor: "pointer" }}
        color="jade"
        onClick={handleLogin}
        disabled={isLoading}
        radius="large"
      >
        {isLoading
          ? formatMessage({ id: "login.loggingIn" })
          : formatMessage({ id: "login.logIn" })}
      </Button>

      <Button
        variant="ghost"
        color="jade"
        size="3"
        style={{ width: "275px", cursor: "pointer" }}
        onClick={handleRegister}
        disabled={isLoading}
        radius="large"
      >
        {formatMessage({ id: "login.signUp" })}
      </Button>
    </Flex>
  );
};

export default Login;
