import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerUser } from './RegisterService'

// Mock Api module
vi.mock('../Api/Api', () => {
  const mockAxios = {
    post: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }
  return {
    default: mockAxios
  }
})

describe('RegisterService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should register user successfully', async () => {
      const mockApi = await import('../Api/Api')
      const mockResponse = {
        status: 201,
        statusText: 'Created',
        data: {}
      }
      vi.mocked(mockApi.default.post).mockResolvedValue(mockResponse)

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      const result = await registerUser(userData)

      expect(result).toBeUndefined() // Success returns void
      expect(mockApi.default.post).toHaveBeenCalledWith('/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': undefined,
        },
        withCredentials: false,
        validateStatus: expect.any(Function)
      })
    })

    it('should throw error for duplicate username (400 status)', async () => {
      const mockApi = await import('../Api/Api')
      const mockResponse = {
        status: 400,
        statusText: 'Bad Request',
        data: { message: 'Username already exists' }
      }
      vi.mocked(mockApi.default.post).mockResolvedValue(mockResponse)

      const userData = {
        login: 'existinguser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Nome de usuário já existe ou dados inválidos. Tente outro nome de usuário.')
    })

    it('should throw error for server error (500 status)', async () => {
      const mockApi = await import('../Api/Api')
      const mockResponse = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { error: 'Server error' }
      }
      vi.mocked(mockApi.default.post).mockResolvedValue(mockResponse)

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Erro interno do servidor (500)')
    })

    it('should handle network errors', async () => {
      const mockApi = await import('../Api/Api')
      const networkError = new Error('Network Error')
      vi.mocked(mockApi.default.post).mockRejectedValue(networkError)

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Erro de conexão com o servidor')
    })

    it('should handle axios errors with response', async () => {
      const mockApi = await import('../Api/Api')
      const axiosError = {
        response: {
          status: 400,
          data: { message: 'Validation error' }
        }
      }
      vi.mocked(mockApi.default.post).mockRejectedValue(axiosError)

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Nome de usuário já existe ou dados inválidos')
    })

    it('should handle different response status codes from success path', async () => {
      const mockApi = await import('../Api/Api')
      
      // Test for a different status code in success path (line 19-20)
      vi.mocked(mockApi.default.post).mockResolvedValue({
        status: 200, // Different from 201
        statusText: 'OK',
        data: { message: 'User created' }
      })

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Erro de rede: Erro do servidor: 200 - OK')
    })

    it('should handle general server status codes', async () => {
      const mockApi = await import('../Api/Api')
      
      // Test for status codes other than 400/500 (line 35)
      vi.mocked(mockApi.default.post).mockResolvedValue({
        status: 403, // Forbidden
        statusText: 'Forbidden',
        data: { message: 'Access denied' }
      })

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Erro do servidor: 403 - Forbidden')
    })

    it('should handle axios errors with unknown status', async () => {
      const mockApi = await import('../Api/Api')
      
      // Test for error with no status (line 61-62)
      const axiosError = {
        response: {
          // No status property
          data: { message: 'Unknown error' }
        }
      }
      vi.mocked(mockApi.default.post).mockRejectedValue(axiosError)

      const userData = {
        login: 'testuser',
        password: 'password123',
        role: 'USER'
      }

      await expect(registerUser(userData)).rejects.toThrow('Erro do servidor: Desconhecido')
    })
  })
})
