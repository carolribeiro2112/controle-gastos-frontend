import { styled } from "@stitches/react";

const ToastContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "white",
  padding: "16px",
  borderRadius: "8px",
  position: "fixed",
  top: "16px",
  right: "16px",
  zIndex: 1000,
  animation: "fadeIn 0.5s, fadeOut 0.5s 2.5s forwards",
  variants: {
    color: {
      success: {
        backgroundColor: "rgba(14, 55, 38, 0.7)",
      },
      error:{
        backgroundColor: "rgba(112, 23, 5, 0.7)",
      }
    },
  },
});

const Styled = {
  ToastContainer,
};

export default Styled;
