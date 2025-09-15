import Api from "../../Api/Api";
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
      // console.log('🔐 Logging in...');
      const response = await Api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.token) {
        // console.log('✅ Login successful! New token received');
        
        // Clear and set new token
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', response.data.token);
        Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Log token details
        // try {
        //   const payload = JSON.parse(atob(response.data.token.split('.')[1]));
        //   console.log('� User ID:', payload.id);
        //   console.log('⏰ Token expires:', new Date(payload.exp * 1000));
        // } catch (e) {
        //   console.error('❌ Error decoding token:', e);
        // }
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
    // console.log('🚪 Logging out...');
    localStorage.removeItem('authToken');
    delete Api.defaults.headers.common['Authorization'];
    // console.log('✅ Token cleared');
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