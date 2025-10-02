import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminProtectedRoute from "./AdminProtectedRoute";

// Mock dos serviços
vi.mock("../../services/LoginService/LoginService", () => ({
  default: {
    initializeAuth: vi.fn(),
    isAuthenticated: vi.fn(),
  },
}));

vi.mock("../../utils/getUserData", () => ({
  getUserRoleFromToken: vi.fn(),
}));

// Mock do React Router
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => {
      mockNavigate(to);
      return <div data-testid="navigate">{to}</div>;
    },
  };
});

import LoginService from "../../services/LoginService/LoginService";
import { getUserRoleFromToken } from "../../utils/getUserData";

describe("AdminProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(false);
    vi.mocked(getUserRoleFromToken).mockReturnValue(null);

    render(
      <MemoryRouter>
        <AdminProtectedRoute>
          <div>Settings Page</div>
        </AdminProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Verificando permissões...")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", async () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(false);
    vi.mocked(getUserRoleFromToken).mockReturnValue(null);

    render(
      <MemoryRouter>
        <AdminProtectedRoute>
          <div>Settings Page</div>
        </AdminProtectedRoute>
      </MemoryRouter>
    );

    // Aguarda a verificação assíncrona
    await screen.findByTestId("navigate");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should redirect to dashboard when user is authenticated but not admin", async () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);
    vi.mocked(getUserRoleFromToken).mockReturnValue("USER");

    render(
      <MemoryRouter>
        <AdminProtectedRoute>
          <div>Settings Page</div>
        </AdminProtectedRoute>
      </MemoryRouter>
    );

    // Aguarda a verificação assíncrona
    await screen.findByTestId("navigate");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("should render children when user is authenticated and is admin", async () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);
    vi.mocked(getUserRoleFromToken).mockReturnValue("ADMIN");

    render(
      <MemoryRouter>
        <AdminProtectedRoute>
          <div>Settings Page</div>
        </AdminProtectedRoute>
      </MemoryRouter>
    );

    // Aguarda a verificação assíncrona e verifica se o conteúdo é renderizado
    expect(await screen.findByText("Settings Page")).toBeInTheDocument();
  });
});
