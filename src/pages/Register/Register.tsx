import { Button, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useState } from "react";
import { registerUser } from "../../services/RegisterService/RegisterService";
import Toast from "../../components/Toast/Toast";
import { LogoLandingPage } from "../../components/Logo/Logo";
import { useIntl } from "react-intl";

const Register = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

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
      return formatMessage({ id: "register.usernamePrompt" });
    }

    if (formData.login.trim().length < 3) {
      return formatMessage({ id: "register.usernameMinLength" });
    }

    if (!formData.age.trim()) {
      return formatMessage({ id: "register.agePrompt" });
    }

    const age = parseInt(formData.age.trim());
    if (isNaN(age) || age < 1 || age > 120) {
      return formatMessage({ id: "register.ageValidation" });
    }

    if (!formData.password.trim()) {
      return formatMessage({ id: "register.passwordPrompt" });
    }

    if (formData.password.length < 6) {
      return formatMessage({ id: "register.passwordMinLength" });
    }

    if (formData.password !== formData.confirmPassword) {
      return formatMessage({ id: "register.passwordMismatch" });
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
      console.error(
        formatMessage({ id: "register.registrationFailedPrefix" }),
        error,
      );
      setError(
        error instanceof Error
          ? error.message
          : formatMessage({ id: "register.registrationError" }),
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
            message={formatMessage({ id: "register.registrationSuccess" })}
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
          placeholder={formatMessage({ id: "register.usernamePrompt" })}
          size="3"
          style={{ width: "300px" }}
          value={formData.login}
          onChange={(e) => handleInputChange("login", e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />

        <TextField.Root
          placeholder={formatMessage({ id: "register.agePrompt" })}
          type="text"
          size="3"
          style={{ width: "300px" }}
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />

        <TextField.Root
          placeholder={formatMessage({ id: "register.passwordPrompt" })}
          type="password"
          size="3"
          style={{ width: "300px" }}
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />

        <TextField.Root
          placeholder={formatMessage({ id: "register.confirmPassword" })}
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
          radius="large"
        >
          {isLoading
            ? formatMessage({ id: "register.loading" })
            : formatMessage({ id: "register.submitButton" })}
        </Button>

        <Button
          variant="ghost"
          color="jade"
          size="3"
          style={{ width: "275px", cursor: "pointer" }}
          onClick={handleGoToLogin}
          disabled={isLoading}
          radius="large"
        >
          {formatMessage({ id: "register.alreadyHaveAccount" })}
        </Button>
      </Flex>
    </div>
  );
};

export default Register;
