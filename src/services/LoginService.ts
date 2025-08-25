import Api from "../Api/Api";
import { AxiosError } from "axios";

// Types for login/register requests and responses
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

// Error response type from backend
interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const LoginService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('Attempting login with credentials:', { username: credentials.login });
      
      const response = await Api.post<AuthResponse>('/auth/login', credentials);
      
      // Store token and user data in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        
        // Add token to default headers for future requests
        Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle Axios errors
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          // Server responded with error status
          const message = axiosError.response.data?.message || 'Erro na autenticação';
          throw new Error(message);
        } else if (axiosError.request) {
          // Request was made but no response received
          throw new Error('Erro de conexão. Verifique se o servidor está rodando.');
        }
      }
      
      // Something else happened
      throw new Error('Erro inesperado durante o login.');
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('authToken');
    delete Api.defaults.headers.common['Authorization'];
  },

  // Get current token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Initialize auth state (call on app startup)
  initializeAuth: (): void => {
    const token = localStorage.getItem('authToken');
    if (token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

export default LoginService;