import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Transactions from "./pages/Transactions/Transactions";
import Sidebar from "./components/Sidebar/Sidebar";

const MainContentContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      marginLeft: "280px",
      width: "calc(100% - 280px)",
      minHeight: "100vh",
    }}
  >
    {children}
  </div>
);

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
              <>
                <Sidebar />
                <MainContentContainer>
                  <Dashboard />
                </MainContentContainer>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <MainContentContainer>
                  <Transactions />
                </MainContentContainer>
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminProtectedRoute>
              <>
                <Sidebar />
                <MainContentContainer>
                  <SettingsPage />
                </MainContentContainer>
              </>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
