import Api from "../Api/Api";
import type { AuthResponse } from "./LoginService";

export type RegisterRequest = {
  login: string;
  password: string;
  role: string;
};

export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse | void> => {
  try {
    const response = await Api.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': undefined,
      },
      withCredentials: false,
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      }
    });
    
    if (response.status === 201) {
      return;
    }
    
    console.error(`❌ Registration failed with status ${response.status}`);
    if (response.status === 400) {
      throw new Error('Nome de usuário já existe ou dados inválidos. Tente outro nome de usuário.');
    }
    if (response.status === 500) {
      throw new Error(`Erro interno do servidor (500). Dados da resposta: ${JSON.stringify(response.data)}`);
    }
    
    throw new Error(`Erro do servidor: ${response.status} - ${response.statusText}`);
    
  } catch (error: unknown) {
    console.error('❌ Registration error caught:');
    
    const isAxiosError = (err: unknown): err is { response?: { status?: number; data?: unknown; headers?: unknown }; message?: string; code?: string } => {
      return typeof err === 'object' && err !== null && 'response' in err;
    };

    if (!isAxiosError(error)) {
      console.error('🌐 Network Error - possibly CORS or connection issue');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error message:', errorMessage);
      
      if (errorMessage?.includes('Network Error')) {
        throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando e se há problemas de CORS.');
      }
      
      throw new Error(`Erro de rede: ${errorMessage}`);
    }
    
    if (error.response?.status === 400) {
      throw new Error('Nome de usuário já existe ou dados inválidos. Tente outro nome de usuário.');
    }
    
    if (error.response?.status === 500) {
      throw new Error(`Erro interno do servidor (500). Detalhes: ${JSON.stringify(error.response?.data)}`);
    }
    
    throw new Error(`Erro do servidor: ${error.response?.status || 'Desconhecido'}`);
  }
};
