import { describe, expect, it } from "vitest";
import Toast, { type ToastProps } from "./Toast";
import { render } from "@testing-library/react";

const renderComponent = ({ type, message }: ToastProps) => {
  return render(<Toast type={type} message={message} />);
};

describe("Toast Component", () => {
  it("should render successfully", () => {
    const { getByTestId } = renderComponent({
      type: "success",
      message: "Success Toast",
    });
    expect(getByTestId("card")).toBeInTheDocument();
  });

  it("should display the correct message", () => {
    const { getByTestId } = renderComponent({
      type: "success",
      message: "Success Toast",
    });
    expect(getByTestId("card")).toHaveTextContent("Success Toast");
  });

  it("should display error message", () => {
    const { getByTestId } = renderComponent({
      type: "error",
      message: "Error Toast",
    });
    expect(getByTestId("card")).toHaveTextContent("Error Toast");
  });
});
