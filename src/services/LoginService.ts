import Api from "../Api/Api";
import { AxiosError } from "axios";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: string;
  login: string;
  email?: string;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const LoginService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await Api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);

        Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          // Para preservar o status code, relançar o erro original do axios
          throw error;
        } else if (axiosError.request) {
          throw new Error('Erro de conexão. Verifique se o servidor está rodando.');
        }
      }
      
      throw new Error('Erro inesperado durante o login.');
    }
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    delete Api.defaults.headers.common['Authorization'];
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  initializeAuth: (): void => {
    const token = localStorage.getItem('authToken');
    if (token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

export default LoginService;