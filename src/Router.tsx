import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Transactions from "./pages/Transactions/Transactions";
import { Flex } from "@radix-ui/themes";
import Sidebar from "./components/Sidebar/Sidebar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Flex>
                <Sidebar />
                <Dashboard />
              </Flex>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Flex>
                <Sidebar />
                <Transactions />
              </Flex>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminProtectedRoute>
              <Flex>
                <Sidebar />
                <SettingsPage />
              </Flex>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
