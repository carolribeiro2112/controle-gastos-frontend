import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Styled from "./Toast.styles";
import { useEffect, useState } from "react";

export interface ToastProps {
  type: "success" | "error";
  message: string;
  duration: number;
}
const Toast = ({ type, message, duration }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <Styled.ToastContainer data-testid="card" role="alert" color={type}>
      {type === "success" ? (
        <CheckCircledIcon height={20} width={20} />
      ) : (
        <CrossCircledIcon height={20} width={20} />
      )}
      <p style={{ margin: 0 }}>{message}</p>
    </Styled.ToastContainer>
  );
};

export default Toast;
