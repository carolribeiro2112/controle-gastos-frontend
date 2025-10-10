import type MessageMap from "../i18n";

const ptBR: MessageMap = {
  app: {
    title: "Controle de Gastos",
  },
  login: {
    title: "Entre na sua conta",
    usernamePrompt: "Por favor, insira seu nome de usuário",
    passwordPrompt: "Por favor, insira sua senha",
    loginError: "Erro durante o login",
    invalidCredentials: "Credenciais inválidas, tente novamente ou cadastre-se",
    userNamePlaceholder: "Insira o nome de usuário",
    passwordPlaceholder: "Insira a senha",
    loggingIn: "Entrando...",
    logIn: "Entrar",
    signUp: "Registre-se"
  },
  register: {
    title: "Crie sua conta",
    usernamePrompt: "Insira um nome de usuário",
    usernameMinLength: "O nome de usuário deve ter pelo menos 3 caracteres",
    agePrompt: "Insira sua idade",
    ageValidation: "Por favor, insira uma idade válida (1-120 anos)",
    passwordPrompt: "Insira uma senha",
    passwordMinLength: "A senha deve ter pelo menos 6 caracteres",
    passwordMismatch: "As senhas não coincidem",
    registrationFailedPrefix: "Falha no cadastro:",
    registrationError: "Erro durante o cadastro",
    registrationSuccess: "Cadastro realizado com sucesso!",
    confirmPassword: "Confirme sua senha",
    loading: "Cadastrando...",
    submitButton: "Registrar",
    alreadyHaveAccount: "Já tem conta? Faça login"
  }
};

export default ptBR;