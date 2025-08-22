import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
