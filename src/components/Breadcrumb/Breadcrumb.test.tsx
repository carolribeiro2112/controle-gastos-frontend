import { render, screen } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { BrowserRouter } from "react-router";
import Breadcrumb from "./Breadcrumb";
import { Theme } from "@radix-ui/themes";

// Mock do useLocation
const mockUseLocation = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

const BreadcrumbWrapper = ({ children }: { children: React.ReactNode }) => (
  <Theme>
    <BrowserRouter>{children}</BrowserRouter>
  </Theme>
);

describe("Breadcrumb Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render breadcrumb for dashboard page", () => {
    mockUseLocation.mockReturnValue({ pathname: "/dashboard" });

    render(
      <BreadcrumbWrapper>
        <Breadcrumb />
      </BreadcrumbWrapper>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render breadcrumb for settings page", () => {
    mockUseLocation.mockReturnValue({ pathname: "/settings" });

    render(
      <BreadcrumbWrapper>
        <Breadcrumb />
      </BreadcrumbWrapper>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Configurações")).toBeInTheDocument();
  });

  it("should not render when there is only one breadcrumb item", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });

    const { container } = render(
      <BreadcrumbWrapper>
        <Breadcrumb />
      </BreadcrumbWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render custom breadcrumb items when provided", () => {
    const customItems = [
      { label: "Home", path: "/", isActive: false },
      { label: "Custom Page", path: "/custom", isActive: true },
    ];

    render(
      <BreadcrumbWrapper>
        <Breadcrumb items={customItems} />
      </BreadcrumbWrapper>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Custom Page")).toBeInTheDocument();
  });

  it("should show home icon by default", () => {
    mockUseLocation.mockReturnValue({ pathname: "/dashboard" });

    render(
      <BreadcrumbWrapper>
        <Breadcrumb />
      </BreadcrumbWrapper>
    );

    // Verifica se o ícone home está presente
    const homeIcon = screen.getByRole("img", { hidden: true });
    expect(homeIcon).toBeInTheDocument();
  });

  it("should hide home icon when showHomeIcon is false", () => {
    const customItems = [
      { label: "Home", path: "/", isActive: false },
      { label: "Dashboard", path: "/dashboard", isActive: true },
    ];

    render(
      <BreadcrumbWrapper>
        <Breadcrumb items={customItems} showHomeIcon={false} />
      </BreadcrumbWrapper>
    );

    // Verifica se não há ícone home
    const homeIcon = screen.queryByRole("img", { hidden: true });
    expect(homeIcon).not.toBeInTheDocument();
  });
});
