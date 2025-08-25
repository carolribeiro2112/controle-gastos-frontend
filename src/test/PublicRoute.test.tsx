import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import LoginService from "../services/LoginService";

// Mock LoginService
vi.mock("../services/LoginService", () => ({
  default: {
    isAuthenticated: vi.fn(),
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

const TestComponent = () => (
  <div data-testid="public-content">Public Content</div>
);

const renderPublicRoute = () => {
  return render(
    <BrowserRouter>
      <PublicRoute>
        <TestComponent />
      </PublicRoute>
    </BrowserRouter>
  );
};

describe("PublicRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render children when user is not authenticated", () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(false);

    renderPublicRoute();

    expect(screen.getByTestId("public-content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should redirect to dashboard when user is authenticated", () => {
    vi.mocked(LoginService.isAuthenticated).mockReturnValue(true);

    renderPublicRoute();

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    // Content still renders before redirect happens
    expect(screen.getByTestId("public-content")).toBeInTheDocument();
  });
});
