import Api from "../Api/Api";
import type { AuthResponse } from "./LoginService";
import type { AxiosError } from "axios";

// Define the ApiErrorResponse type
type ApiErrorResponse = {
  message?: string;
  [key: string]: unknown;
};

// Define the RegisterRequest type
export type RegisterRequest = {
  login: string;
  password: string;
  role: string;
};

// Register new user
export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    console.log('Attempting registration for user:', { username: userData.login, role: userData.role });

    const response = await Api.post<AuthResponse>('/auth/register', userData);
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      
      // Add token to default headers for future requests
      Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (axiosError.response) {
        const message = axiosError.response.data?.message || 'Erro no cadastro';
        throw new Error(message);
      } else if (axiosError.request) {
        throw new Error('Erro de conexão. Verifique se o servidor está rodando.');
      }
    }
    
    throw new Error('Erro inesperado durante o cadastro.');
  }
};
