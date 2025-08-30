import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Register from "./Register";
import { registerUser } from "../../services/RegisterService";

// Mock RegisterService
vi.mock("../../services/RegisterService", () => ({
  registerUser: vi.fn(),
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

// Mock Toast component
vi.mock("../../components/Toast/Toast", () => ({
  default: () => <div data-testid="toast">Success Toast</div>,
}));

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render register form", () => {
    renderRegister();

    expect(screen.getByText("Controle de gastos")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your age")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm your password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrar" })
    ).toBeInTheDocument();
  });

  it("should calculate role based on age", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockResolvedValue();

    renderRegister();

    // Test ADMIN role for age >= 16
    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "adminuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "18");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        login: "adminuser",
        role: "ADMIN", // Age 18 = ADMIN
        age: "18",
        password: "password123",
      });
    });
  });

  it("should handle successful registration", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockResolvedValue();

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        login: "testuser",
        role: "ADMIN", // Age 20 = ADMIN
        age: "20",
        password: "password123",
      });
    });

    // Should show success toast and navigate after delay
    expect(screen.getByTestId("toast")).toBeInTheDocument();
  });

  it("should show validation errors", async () => {
    const user = userEvent.setup();

    renderRegister();

    // Test empty username
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(
      screen.getByText("Por favor, insira um nome de usuário")
    ).toBeInTheDocument();

    // Test short username
    await user.type(screen.getByPlaceholderText("Enter your username"), "ab");
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(
      screen.getByText("O nome de usuário deve ter pelo menos 3 caracteres")
    ).toBeInTheDocument();

    // Clear and add valid username
    await user.clear(screen.getByPlaceholderText("Enter your username"));
    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );

    // Test empty age
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(screen.getByText("Por favor, insira sua idade")).toBeInTheDocument();

    // Test invalid age
    await user.type(screen.getByPlaceholderText("Enter your age"), "150");
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(
      screen.getByText("Por favor, insira uma idade válida (1-120 anos)")
    ).toBeInTheDocument();

    // Clear and add valid age
    await user.clear(screen.getByPlaceholderText("Enter your age"));
    await user.type(screen.getByPlaceholderText("Enter your age"), "25");

    // Test empty password
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(screen.getByText("Por favor, insira uma senha")).toBeInTheDocument();

    // Test short password
    await user.type(screen.getByPlaceholderText("Enter your password"), "123");
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(
      screen.getByText("A senha deve ter pelo menos 6 caracteres")
    ).toBeInTheDocument();

    // Test password mismatch
    await user.clear(screen.getByPlaceholderText("Enter your password"));
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "different"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));
    expect(screen.getByText("As senhas não coincidem")).toBeInTheDocument();
  });

  it("should handle registration error", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockRejectedValue(
      new Error("Username already exists")
    );

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "existinguser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    await waitFor(() => {
      expect(screen.getByText("Username already exists")).toBeInTheDocument();
    });
  });

  it("should navigate to login when login button is clicked", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.click(
      screen.getByRole("button", { name: "Já tem conta? Faça login" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should calculate USER role for under 16", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockResolvedValue();

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "younguser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "15");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        login: "younguser",
        role: "USER", // Age 15 = USER
        age: "15",
        password: "password123",
      });
    });
  });

  it("should disable form during loading", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockImplementation(() => new Promise(() => {})); // Never resolves

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    expect(
      screen.getByRole("button", { name: "Cadastrando..." })
    ).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter your username")).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter your age")).toBeDisabled();
    expect(screen.getByPlaceholderText("Enter your password")).toBeDisabled();
    expect(screen.getByPlaceholderText("Confirm your password")).toBeDisabled();
  });

  it("should handle Enter key press to submit form", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockResolvedValueOnce(undefined);

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );

    // Focus on password field and press Enter
    const passwordField = screen.getByPlaceholderText("Confirm your password");
    passwordField.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        login: "testuser",
        role: "ADMIN",
        age: "20",
        password: "password123",
      });
    });
  });

  it("should not submit form on Enter when loading", async () => {
    const user = userEvent.setup();
    let resolveRegister: () => void;
    const registerPromise = new Promise<void>((resolve) => {
      resolveRegister = resolve;
    });
    vi.mocked(registerUser).mockReturnValueOnce(registerPromise);

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );

    // Start registration
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    // Verify button is in loading state
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Cadastrando..." })
      ).toBeInTheDocument();
    });

    // Try to press Enter while loading
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm your password"
    );
    fireEvent.keyDown(confirmPasswordInput, { key: "Enter", code: "Enter" });

    // Should still only have been called once
    expect(registerUser).toHaveBeenCalledTimes(1);

    // Resolve the promise to complete the test
    resolveRegister!();

    // Wait for success toast to appear
    await waitFor(() => {
      expect(screen.getByTestId("toast")).toBeInTheDocument();
    });
  });
  it("should handle navigation timeout after successful registration", async () => {
    const user = userEvent.setup();
    vi.mocked(registerUser).mockResolvedValueOnce(undefined);

    // Spy on setTimeout and only mock the 2000ms call (our navigation timeout)
    const originalSetTimeout = globalThis.setTimeout;
    const setTimeoutSpy = vi
      .spyOn(globalThis, "setTimeout")
      .mockImplementation((callback, delay) => {
        if (delay === 2000 && typeof callback === "function") {
          // Immediately execute our navigation timeout
          callback();
          return 123 as unknown as ReturnType<typeof setTimeout>;
        }
        // For all other setTimeout calls, use the original implementation
        return originalSetTimeout(callback, delay);
      });

    renderRegister();

    await user.type(
      screen.getByPlaceholderText("Enter your username"),
      "testuser"
    );
    await user.type(screen.getByPlaceholderText("Enter your age"), "20");
    await user.type(
      screen.getByPlaceholderText("Enter your password"),
      "password123"
    );
    await user.type(
      screen.getByPlaceholderText("Confirm your password"),
      "password123"
    );
    await user.click(screen.getByRole("button", { name: "Registrar" }));

    // Wait for the success toast to appear (which is mocked)
    await waitFor(() => {
      expect(screen.getByTestId("toast")).toBeInTheDocument();
    });

    // Navigation should happen immediately due to our setTimeout mock
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    // Restore setTimeout
    setTimeoutSpy.mockRestore();
  });
});
