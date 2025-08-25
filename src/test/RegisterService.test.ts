import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerUser } from '../services/RegisterService'

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
  })
})
