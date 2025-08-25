import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Styled from "./Toast.styles";

export interface ToastProps {
  type: "success" | "error";
  message: string;
}
const Toast = ({ type, message }: ToastProps) => {
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
