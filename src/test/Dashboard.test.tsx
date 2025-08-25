import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginService from "../services/LoginService";

// Mock LoginService
vi.mock("../services/LoginService", () => ({
  default: {
    isAuthenticated: vi.fn(),
    logout: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render dashboard when user is authenticated", async () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);

    renderDashboard();

    await waitFor(() => {
      expect(
        screen.getByText("Dashboard - Controle de Gastos")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Bem-vindo! Você está autenticado e pode acessar o dashboard."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Token JWT presente: ✅")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Logout" })
      ).toBeInTheDocument();
    });
  });

  it("should redirect to login when user is not authenticated", async () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(false);

    renderDashboard();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    expect(
      screen.getByText("Redirecionando para login...")
    ).toBeInTheDocument();
  });

  it("should handle logout", async () => {
    const user = userEvent.setup();
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);

    renderDashboard();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Logout" })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Logout" }));

    expect(LoginService.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should check authentication on mount", () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);

    renderDashboard();

    expect(LoginService.isAuthenticated).toHaveBeenCalled();
  });
});
