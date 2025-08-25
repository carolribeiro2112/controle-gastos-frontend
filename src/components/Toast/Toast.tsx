import * as React from "react";
const Toast = () => {
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      data-testid="card"
      style={{
        backgroundColor: "rgba(14, 55, 38, 0.7)",
        color: "white",
        // color: #27b08b,
        padding: "16px",
        borderRadius: "8px",
      }}
      role="alert"
    >
      <p style={{ margin: 0 }}>Cadastro realizado com sucesso!</p>
    </div>
  );
};

export default Toast;
