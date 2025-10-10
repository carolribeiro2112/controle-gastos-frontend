import type MessageMap from "../i18n";

const enUS: MessageMap = {
  app: {
    title: "Expense Tracker",
  },
  login: {
    title: "Login to your account",
    usernamePrompt: "Please enter your username",
    passwordPrompt: "Please enter your password",
    loginError: "Login error",
    invalidCredentials: "Invalid credentials, try again or sign up",
    userNamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
    loggingIn: "Logging in...",
    logIn: "Log in",
    signUp: "Sign up"
  },
  register: {
    title: "Create your account",
    usernamePrompt: "Enter your username",
    usernameMinLength: "Username must be at least 3 characters",
    agePrompt: "Enter your age",
    ageValidation: "Please enter a valid age (1–120 years)",
    passwordPrompt: "Enter your password",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    registrationFailedPrefix: "Registration failed:",
    registrationError: "Registration error",
    registrationSuccess: "Registration successful!",
    confirmPassword: "Confirm your password",
    loading: "Registering...",
    submitButton: "Register",
    alreadyHaveAccount: "Already have an account? Log in"
  }
};

export default enUS;