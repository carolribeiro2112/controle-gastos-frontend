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
  },
  dashboard: {
    title: "Dashboard - Expense Tracker",
    description: "Description",
    value: "Value",
    date: "Date",
    actions: "Actions",
    redirectingToLogin: "Redirecting to login...",
    yourTransactions: "Your transactions",
    loadingTransactions: "Loading transactions...",
    transactionDeleted: "Your transaction has been successfully deleted."
  },
  settings: {
    title: "Settings",
    usernameSearchPrompt: "Please enter a username to search",
    fetchUserErrorPrefix: "Error fetching user:",
    fetchUserError: "Failed to fetch user. Please try again.",
    bindUserErrorPrefix: "Error binding user:",
    bindUserError: "Failed to bind user. Please try again.",
    typeUsername: "Type user name",
    enterUsername: "Enter the user name",
    searching: "Searching...",
    searchButton: "Search",
    bindUserButton: "Bind user",
    bindUserSuccess: "User successfully bound!",
    id: "ID",
    username: "Username",
    age: "Age"
  }
};

export default enUS;