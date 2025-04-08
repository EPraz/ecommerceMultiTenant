import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, LoginPage, RegisterPage } from "./pages";
import { ProtectedRoute } from "./router/ProtectedRoute";
import Homepage from "./pages/client/home/Homepage";

function App() {
  return (
    <Routes>
      {/* Client side pages */}
      <Route path="/" element={<Homepage />} />
      {/* Admin side pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
