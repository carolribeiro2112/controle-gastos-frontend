import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Login from "./Login";
import LoginService from "../../services/LoginService";

// Mock LoginService
vi.mock("../../services/LoginService", () => ({
  default: {
    login: vi.fn(),
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

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form", () => {
    renderLogin();

    expect(screen.getByText("Controle de gastos")).toBeInTheDocument();
    expect(screen.getByText("Login to your account")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registre-se" })
    ).toBeInTheDocument();
  });

  it("should handle successful login", async () => {
    const user = userEvent.setup();
    vi.mocked(LoginService.login).mockResolvedValue({ token: "test-token" });

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(LoginService.login).toHaveBeenCalledWith({
        login: "testuser",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should show error when login fails", async () => {
    const user = userEvent.setup();
    vi.mocked(LoginService.login).mockRejectedValue(
      new Error("Invalid credentials")
    );

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "wrongpassword"
    );
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("should show validation error for empty username", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      screen.getByText("Por favor, insira seu nome de usuário")
    ).toBeInTheDocument();
  });

  it("should show validation error for empty password", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByText("Por favor, insira sua senha")).toBeInTheDocument();
  });

  it("should navigate to register when register button is clicked", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Registre-se" }));

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("should handle Enter key press", async () => {
    const user = userEvent.setup();
    vi.mocked(LoginService.login).mockResolvedValue({ token: "test-token" });

    renderLogin();

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(LoginService.login).toHaveBeenCalledWith({
        login: "testuser",
        password: "password123",
      });
    });
  });

  it("should disable form during loading", async () => {
    const user = userEvent.setup();
    vi.mocked(LoginService.login).mockImplementation(
      () => new Promise(() => {})
    ); // Never resolves

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("button", { name: "Entrando..." })).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter your username")).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter your password")).toBeDisabled();
  });

  it("should show Toast when login fails with 403 error", async () => {
    const user = userEvent.setup();

    // Create a mock AxiosError with 403 status
    const mockAxiosError = {
      response: {
        status: 403,
        data: { message: "Forbidden" },
      },
      message: "Request failed with status code 403",
    };

    vi.mocked(LoginService.login).mockRejectedValue(mockAxiosError);

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "wrongpassword"
    );
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(
        screen.getByText("Credenciais inválidas tente novamente ou cadastre-se")
      ).toBeInTheDocument();
    });

    // Verify that no error message is shown (only Toast)
    expect(
      screen.queryByText("Request failed with status code 403")
    ).not.toBeInTheDocument();
  });
});
